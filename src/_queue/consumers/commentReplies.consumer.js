const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");
const CommentRepliesServiceService = require("../../app/modules/comments/services/reply.service");

const CommentRepliesConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.UPDATE_USER_RESEARCH_COMMENTREPLIES_DETAILS,
  async (msg) => {
    const channel = await CommentRepliesConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { id, bodyData } = JSON.parse(message);

      try {
        //    update records here
        if (bodyData.imageUrl) {
          const updatedrecords =
            await new CommentRepliesServiceService().updateMany(
              { user_id: id },
              { user_image: bodyData.imageUrl }
            );
          return channel.ack(msg);
        } else {
          if (bodyData.fullName && bodyData.username) {
            const updatedrecords =
              await new CommentRepliesServiceService().updateMany(
                { user_id: id },
                {
                  user_fullname: bodyData.fullName,
                  user_username: bodyData.username,
                }
              );
            return channel.ack(msg);
          }
          if (bodyData.fullName && !bodyData.username) {
            const updatedrecords =
              await new CommentRepliesServiceService().updateMany(
                { user_id: id },
                { user_fullname: bodyData.fullName }
              );
            return channel.ack(msg);
          }
          if (bodyData.username && !bodyData.fullName) {
            const updatedrecords =
              await new CommentRepliesServiceService().updateMany(
                { user_id: id },
                { user_username: bodyData.username }
              );
            return channel.ack(msg);
          }
        }
      } catch (error) {
        console.error(
          `Error while updating research comment replies: ${error}`
        );
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

module.exports = CommentRepliesConsumer;
