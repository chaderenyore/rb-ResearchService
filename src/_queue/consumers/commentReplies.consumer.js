const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 
const CommentRepliesServiceService = require('../../app/modules/comments/services/reply.service');

const CommentRepliesConsumer = new Connnection(KEYS.AMQP_URI, KEYS.UPDATE_USER_RESEARCH_COMMENTREPLIES_DETAILS,
  async (msg) => {
    const channel = CommentRepliesConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        id,
        bodyData
      } = JSON.parse(message);

      try {
    //    update records here
    const updatedrecords = await new CommentRepliesServiceService().updateMany({user_id:id}, bodyData);
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while updating research comment replies: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  });

  module.exports = CommentRepliesConsumer;
