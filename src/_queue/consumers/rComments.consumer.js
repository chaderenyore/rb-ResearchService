const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 
const ResearchCommentsService = require('../../app/modules/comments/services/comments.services');

const ResearchCommentConsumer = new Connnection(KEYS.AMQP_URI, KEYS.UPDATE_USER_RESEARCH_COMMENT_DETAILS,
  async (msg) => {
    const channel = ResearchCommentConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        id,
        bodyData
      } = JSON.parse(message);

      try {
    //    update records here
    const updatedrecords = await new ResearchCommentsService().updateMany({ commenter_id:id}, bodyData);
    
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while updating research comments: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  });

  module.exports = ResearchCommentConsumer;
