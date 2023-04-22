const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 
const CommentLikesService = require('../../app/modules/likes/services/commentLikes.services');

const CommentLikesConsumer = new Connnection(KEYS.AMQP_URI, KEYS.UPDATE_USER_RESEARCH_COMMENTS_LIKES_DETAILS,
  async (msg) => {
    const channel = CommentLikesConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        id,
        bodyData
      } = JSON.parse(message);

      try {
    //    update records here
    const updatedrecords = await new CommentLikesService().updateMany({user_id:id}, bodyData);
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while updating research comment likes: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  });

  module.exports = CommentLikesConsumer;
