const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const PremCheckService = require("../../PremChecks/services/premCheck.service");
const TokenomicsService = require("../../Tokenomics/services/tokenomics.service");
const AdoptionAndRecognitionService = require("../../Research/services/researchAdoption.service");
const ResearchCommunityANdSpiritService = require("../../Research/services/researchCommunity.service");
const ResearchComparisonService = require("../../Research/services/comparison.services");
const ResearchService = require("../../Research/services/research.services");
const CommunityResearchService = require("../../CommunityResearch/services/communityResearch.services");

exports.launchResearch = async (req, res, next) => {
  try {
    // check if research exists
    const researchExist = await new ResearchService().findAResearch({
      _id: req.query.research_id,
    });
    if (researchExist) {
      // search for all research dependents
      const researchPremChecks = await new PremCheckService().update(
        {
          research_id: req.query.research_id,
        },
        {is_saved:true}
      );
      const researchTokenomics = await new TokenomicsService().update({
        research_id: req.query.research_id,
      },
      {is_saved:true});
      const researchAdoptionAndRecognition =
        await new AdoptionAndRecognitionService().update({
          research_id: req.query.research_id,
        },
        {is_saved:true});
      const researchCommunityAndTeamSpirit =
        await new ResearchCommunityANdSpiritService().findOne({
          research_id: req.query.research_id,
        });
      const researchComparison = await new ResearchComparisonService().findOne({
        research_id: req.query.research_id,
      });
      // create community copy
      const DataToCommunityResearch = {
        original_research_id: researchExist._id,
        ...researchExist
      }
      const communityResearch = await new CommunityResearchService().create(DataToCommunityResearch);
      return createResponse(`Research Launched`, communityResearch)(
        res,
        HTTP.OK
      );
    } else {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Research Does Not Exist",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
