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

exports.deleteResearch = async (req, res, next) => {
  try {
    // check if research exists
    const researchExist = await new ResearchService().findAResearch({
      _id: req.params.research_id,
    });
    if (researchExist) {
      // search and delete for all research dependents
      const researchPremChecks = await new PremCheckService().deleteOne({
        research_id: req.params.research_id,
      });
      const researchTokenomics = await new TokenomicsService().deleteOne({
        research_id: req.params.research_id,
      });
      const researchAdoptionAndRecognition =
        await new AdoptionAndRecognitionService().deleteOne({
            research_id: req.params.research_id,
          });
      const researchComparison = await new ResearchComparisonService().deleteOne({
        research_id: req.params.research_id,
      });
      const researchTeamSpirit = await new ResearchCommunityAndSpiritService().deleteOne({
        research_id: req.params.research_id,
      });
      const communityResearch = await new CommunityResearchService().deleteOne({
        research_id: req.params.research_id,
      });
      const deletedResearch = await new ResearchService().deleteOne({
        _id: req.params.research_id,
      });
      return createResponse(`Research Deleted`, deletedResearch)(
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
