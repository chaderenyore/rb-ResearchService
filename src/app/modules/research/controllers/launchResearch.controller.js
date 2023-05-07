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
        if (researchExist) {
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
              researcher_id: req.user.user_id,
              is_launched:true,
              is_draft: false,
              is_visible: req.query.is_visible
            };
            const updatedResearch = await new ResearchService().update({_id: researchExist._id},
              DataToResearch
            );
            // create community copy
            const DataToCommunityResearch = {
              is_visible: req.query.is_visible,
              original_research_id: researchExist._id,
              research_label:researchExist.research_label,
              researcher_id: req.user.user_id,
              tags: researchExist.tags,
              ...researchExist,
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
              const updateResearch = await new ResearchService().update(filterData, dataToUpdate) ;
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
