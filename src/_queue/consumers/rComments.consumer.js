const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");
const ResearchCommentsService = require("../../app/modules/comments/services/comments.services");

const ResearchCommentConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.UPDATE_USER_RESEARCH_COMMENT_DETAILS,
  async (msg) => {
    const channel = await ResearchCommentConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { id, bodyData } = JSON.parse(message);

      try {
        //    update records here
        if (bodyData.imageUrl) {
          const updatedrecords = await new ResearchCommentsService().updateMany(
            { commenter_id: id },
            { commenter_image: bodyData.imageUrl }
          );
          return channel.ack(msg);
        } else {
          if (bodyData.fullName && !bodyData.username) {
            const updatedrecords =
              await new ResearchCommentsService().updateMany(
                { user_id: id },
                { commenter_fullname: bodyData.fullName }
              );
            return channel.ack(msg);
          }
          if (bodyData.username && !bodyData.fullName) {
            const updatedrecords =
              await new ResearchCommentsService().updateMany(
                { user_id: id },
                { commenter_username: bodyData.username }
              );
            return channel.ack(msg);
          }
          if (bodyData.fullName && bodyData.username) {
            const updatedrecords =
              await new ResearchCommentsService().updateMany(
                { user_id: id },
                {
                  commenter_fullname: bodyData.fullName,
                  commenter_username: bodyData.username,
                }
              );
            return channel.ack(msg);
          }
        }
      } catch (error) {
        console.error(`Error while updating research comments: ${error}`);
        return channel.ack(msg);
      }
    }
    process.on("exit", (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
    });
    // return null;
  }
);

module.exports = ResearchCommentConsumer;
