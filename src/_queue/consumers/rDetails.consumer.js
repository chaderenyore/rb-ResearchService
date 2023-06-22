const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");
const ResearchDetailsService = require("../../app/modules/research/services/research.services");
const CommunityResearchService = require("../../app/modules/communityresearchmodule/services/communityResearch.services");
const SavedResearchService = require("../../app/modules/communityresearchmodule/services/savedResearch.services");

const ResearchDetailsConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.UPDATE_USER_RESEARCH_DETAILS,
  async (msg) => {
    const channel = await ResearchDetailsConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { id, bodyData } = JSON.parse(message);

      try {
        //    update records here for image url
        if (bodyData.imageUrl) {
          const updatedCommunityRecords =
            await new CommunityResearchService().updateMany(
              { poster_id: id },
              { reposter_image: bodyData.imageUrl }
            );
          const updatedCommunityRecords2 =
            await new CommunityResearchService().updateMany(
              { researcher_id: id },
              bodyData
            );
          const updatedResearchRecords =
            await new ResearchDetailsService().updateMany(
              { researcher_id: id },
              { researcher_image_url: bodyData.imageUrl }
            );
          return channel.ack(msg);
        } else {
          if (bodyData.firstName && bodyData.username && bodyData.lastName) {
            const updatedCommunityRecords =
              await new CommunityResearchService().updateMany(
                { reposter_id: id },
                { reposter_username: bodyData.username }
              );
            const updatedCommunityRecords2 =
              await new CommunityResearchService().updateMany(
                { researcher_id: id },
                {
                  researcher_username: bodyData.username,
                  researcher_firstname: bodyData.firstName,
                  researcher_lastname: bodyData.lastName,
                }
              );
            const updatedResearchRecords =
              await new ResearchDetailsService().updateMany(
                { researcher_id: id },
                {
                  researcher_username: bodyData.username,
                  researcher_firstname: bodyData.firstName,
                  researcher_lastname: bodyData.lastName,
                }
              );
            return channel.ack(msg);
          }
          if (bodyData.lastName && bodyData.firstName) {
            const updatedCommunityRecords2 =
              await new CommunityResearchService().updateMany(
                { researcher_id: id },
                {
                  researcher_lastname: bodyData.lastName,
                  researcher_lastname: bodyData.lastName,
                }
              );
            const updatedResearchRecords =
              await new ResearchDetailsService().updateMany(
                { researcher_id: id },
                {
                  researcher_lastname: bodyData.lastName,
                  researcher_lastname: bodyData.lastName,
                }
              );
            return channel.ack(msg);
          }
          if (bodyData.firstName && bodyData.username) {
            const updatedCommunityRecords =
              await new CommunityResearchService().updateMany(
                { reposter_id: id },
                { reposter_username: bodyData.username }
              );
            const updatedCommunityRecords2 =
              await new CommunityResearchService().updateMany(
                { researcher_id: id },
                {
                  researcher_username: bodyData.username,
                  researcher_firstname: bodyData.firstName,
                }
              );
            const updatedResearchRecords =
              await new ResearchDetailsService().updateMany(
                { researcher_id: id },
                {
                  researcher_username: bodyData.username,
                  researcher_firstname: bodyData.firstName,
                }
              );
            return channel.ack(msg);
          }
          if (bodyData.username && bodyData.lastName) {
            const updatedCommunityRecords =
              await new CommunityResearchService().updateMany(
                { reposter_id: id },
                { reposter_username: bodyData.username }
              );
            const updatedCommunityRecords2 =
              await new CommunityResearchService().updateMany(
                { researcher_id: id },
                {
                  researcher_username: bodyData.username,
                  researcher_lastname: bodyData.lastName,
                }
              );
            const updatedResearchRecords =
              await new ResearchDetailsService().updateMany(
                { researcher_id: id },
                {
                  researcher_username: bodyData.username,
                  researcher_lastname: bodyData.lastName,
                }
              );
            return channel.ack(msg);
          }
          if (bodyData.firstName && !bodyData.username && !bodyData.lastName) {
            const updatedCommunityRecords2 =
              await new CommunityResearchService().updateMany(
                { researcher_id: id },
                { researcher_firstname: bodyData.firstName }
              );
            const updatedResearchRecords =
              await new ResearchDetailsService().updateMany(
                { researcher_id: id },
                { researcher_firstname: bodyData.firstName }
              );
            return channel.ack(msg);
          }
          if (bodyData.username && !bodyData.firstName && !bodyData.lastName) {
            const updatedCommunityRecords =
              await new CommunityResearchService().updateMany(
                { reposter_id: id },
                { reposter_username: bodyData.username }
              );
            const updatedCommunityRecords2 =
              await new CommunityResearchService().updateMany(
                { researcher_id: id },
                {
                  researcher_username: bodyData.username,
                }
              );
            const updatedResearchRecords =
              await new ResearchDetailsService().updateMany(
                { researcher_id: id },
                {
                  researcher_username: bodyData.username,
                }
              );
            return channel.ack(msg);
          }
          if (bodyData.lastName && !bodyData.firstName && !bodyData.username) {
            const updatedCommunityRecords2 =
              await new CommunityResearchService().updateMany(
                { researcher_id: id },
                {
                  researcher_lastname: bodyData.lastName,
                }
              );
            const updatedResearchRecords =
              await new ResearchDetailsService().updateMany(
                { researcher_id: id },
                {
                  researcher_lastname: bodyData.lastName,
                }
              );
            return channel.ack(msg);
          }
        }
      } catch (error) {
        console.error(`Error while updating Research Details: ${error}`);
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

module.exports = ResearchDetailsConsumer;
