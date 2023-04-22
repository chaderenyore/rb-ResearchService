const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 
const ResearchDetailsService = require('../../app/modules/research/services/research.services');
const CommunityResearchService = require("../../app/modules/communityresearchmodule/services/communityResearch.services");
const SavedResearchService = require("../../app/modules/communityresearchmodule/services/savedResearch.services");

const ResearchDetailsConsumer = new Connnection(KEYS.AMQP_URI, KEYS.UPDATE_USER_RESEARCH_DETAILS,
  async (msg) => {
    const channel = ResearchDetailsConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        id,
        bodyData
      } = JSON.parse(message);

      try {
    //    update records here
    const updatedCommunityRecords = await new CommunityResearchService().updateMany({poster_id:id}, bodyData);
    const updatedCommunityRecords2 = await new CommunityResearchService().updateMany({researcher_id:id}, bodyData);
    const updatedResearchRecords = await new ResearchDetailsService().updateMany({researcher_id:id}, bodyData);
    const updatedSavedResearchRecords = await new SavedResearchService().updateMany({researcher_id:id}, bodyData);

        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while updating Research Details: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  });

  module.exports = ResearchDetailsConsumer;
