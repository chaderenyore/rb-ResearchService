const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const PremCheckService = require("../../premcheck/services/premCheck.service");
const TokenomicsService = require("../../tokenomicsHealth/services/tokenomics.service");
const AdoptionAndRecognitionService = require("../services/researchAdoption.service");
const ResearchCommunityAndSpiritService = require("../services/researchCommunity.service");
const ResearchComparisonService = require("../services/comparison.services");
const ResearchService = require("../services/research.services");
const CommunityResearchService = require("../../communityresearchmodule/services/communityResearch.services");
const PublishToUpdateUserQueue = require("../../../../_queue/publishers/updateUserDetails.publisher");
const PublishToNotifyFollowersQueue = require("../../../../_queue/publishers/bulkFollowers.publisher");

exports.launchResearch = async (req, res, next) => {
  try {
    // check if research has been launched
    const researchLaunched = await new ResearchService().findAResearch({
      _id: req.query.research_id, is_launched: true, researcher_id: req.user.user_id
    });
    console.log(researchLaunched);
    if(researchLaunched){
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Research Has Been Launched By You",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else{
        // check if research exists
        const researchExist = await new ResearchService().findAResearch({
          _id: req.query.research_id, researcher_id: req.user.user_id 
        });
        if (researchExist) {;
          // search for all research dependents
          const researchPremChecks = await new PremCheckService().update(
            {
              research_id: req.query.research_id,
            },
            { is_saved: true }
          );
          const researchTokenomics = await new TokenomicsService().update(
            {
              research_id: req.query.research_id,
            },
            { is_saved: true, is_draft: false }
          );
          const researchAdoptionAndRecognition =
            await new AdoptionAndRecognitionService().update(
              {
                research_id: req.query.research_id,
              },
              { is_saved: true, is_draft: false }
            );
          const researchComparison = await new ResearchComparisonService().update(
            {
              research_id: req.query.research_id,
            },
            { is_saved: true, is_draft: false }
          );
          const researchTeamSpirit =
            await new ResearchCommunityAndSpiritService().update(
              {
                research_id: req.query.research_id,
              },
              { is_saved: true, is_draft: false }
            );
          // check if research is broken or full
          if (
            !researchTeamSpirit ||
            !researchComparison ||
            !researchAdoptionAndRecognition ||
            !researchTokenomics ||
            !researchPremChecks
          ) {
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message: "This Was Not Fully Researched, Hence Broken",
                  statusCode: HTTP.OK,
                  data: {},
                  code: HTTP.OK,
                },
              ])
            );
          } else {
            // update base research
            const DataToResearch = {
              original_research_id: researchExist._id,
              poster_id:req.user.user_id,
              researcher_id: req.user.user_id,
              is_launched:true,
              is_draft: false,
              is_visible: req.query.is_visible
            };
            const updatedResearch = await new ResearchService().update({_id: researchExist._id},
              DataToResearch
            );
            console.log("Research In memory", researchExist);
            // create community copy
            const DataToCommunityResearch = {
              researcher_image_url: researchExist.researcher_image_url,
              researcher_username: researchExist.researcher_username,
              researcher_firstname: researchExist.researcher_firstname,
              researcher_lastname: researchExist.researcher_lastname,
              ticker: researchExist.ticker,
              research_label: researchExist.research_label,
              coin_name: researchExist.coin_name,
              coin_image: researchExist.coin_image,
              tokenomics_rating: researchExist.tokenomics_rating,
              research_price: researchExist.research_price,
              verdict: researchExist.verdit,
              preliminary_score:researchExist.preliminary_score,
              verdit_score: researchExist.verdit_score,
              potential_return: researchExist.potential_return,
              age: researchExist.age,
              verdit_score: researchExist.verdit_score,
              is_working_product:researchExist.is_working_product,
              is_visible: req.query.is_visible,
              original_research_id: researchExist._id,
              research_label:researchExist.research_label,
              researcher_id: req.user.user_id,
              tags: researchExist.tags,
            };
            const communityResearch = await new CommunityResearchService().create(
              DataToCommunityResearch
            );
            // update all research to have community id
            if(communityResearch){
              const filterData = {
                _id: researchExist._id
              }
              const dataToUpdate = {
                community_id: communityResearch._id,
                is_draft: false,
              }
              const updateResearch = await new ResearchService().update(filterData, dataToUpdate);
              // // publsih increment to user details queue
              await PublishToUpdateUserQueue.publishToUpdateUserQueue(
                req.user.user_id,
                { $inc: { 'total_public_post': 1 } }
              );

              // publsih to notify followers queue
              // build data
           const dataToInnAppQueue = {
            user_id: req.user.user_id,
            notification_type: 'following_launch_research',
            message: `${updatedResearch.researcher_username} just Launched A New Research `,
            notifier_image:updatedResearch.researcher_image_url ? updatedResearch.researcher_image_url : "",
            origin_service: 'Research',
            origin_platform: req.query.platform
          }
              await PublishToNotifyFollowersQueue.publishAllFollowersNotifcation(
                req.user.user_id,
                dataToInnAppQueue
              );
              return createResponse(`Research Launched`, communityResearch)(
                res,
                HTTP.OK
              );
            }
          }
        } else {
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: "Research Does Not Exist or UnAuthorised",
                statusCode: HTTP.OK,
                data: {},
                code: HTTP.OK,
              },
            ])
          );
        }
    }

  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
