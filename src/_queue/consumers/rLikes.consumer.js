const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");
const ResearchLikesService = require("../../app/modules/likes/services/researchLikes.services");

const ResearchLikesConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.UPDATE_USER_RESEARCH_LIKE_DETAILS,
  async (msg) => {
    const channel = await ResearchLikesConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { id, bodyData } = JSON.parse(message);

      try {
        //    update records here
        if (bodyData.imageUrl) {
          const updatedrecords = await new ResearchLikesService().updateMany(
            { user_id: id },
            { user_image: bodyData.imageUrl }
          );

          return channel.ack(msg);
        }
      } catch (error) {
        console.error(`Error while updating Research Likes: ${error}`);
        return channel.ack(msg);
      }
    }
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
    // return null;
  }
);

module.exports = ResearchLikesConsumer;
