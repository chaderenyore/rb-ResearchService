const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const PremCheckService = require("../../premcheck/services/premCheck.service");
const TokenomicsService = require("../../tokenomicsHealth/services/tokenomics.service");
const TokenomicsAllocationService = require("../../tokenomicsHealth/services/tokenomicsAllocation.services");
const AdoptionAndRecognitionService = require("../../research/services/researchAdoption.service");
const ResearchCommunityANdSpiritService = require("../../research/services/researchCommunity.service");
const ResearchComparisonService = require("../../research/services/comparison.services");
const ResearchService = require("../../research/services/research.services");

exports.getResearchDetails = async (req, res, next) => {
  try {
    // check if research exists
    const researchExist = await new ResearchService().findAResearch({
      _id: req.query.research_id, is_banned: false
    });
    if (researchExist) {
      // search for all research dependents
      const researchPremChecks = await new PremCheckService().findOne({
        research_id: req.query.research_id,
      });
      const researchTokenomics = await new TokenomicsService().findOne({
        research_id: req.query.research_id,
      });
      const researchTokenomicsAllocation = await new TokenomicsAllocationService().all({research_id: req.query.research_id})
      const researchAdoptionAndRecognition =
        await new AdoptionAndRecognitionService().findOne({
          research_id: req.query.research_id,
        });
      const researchCommunityAndTeamSpirit =
        await new ResearchCommunityANdSpiritService().findOne({
          research_id: req.query.research_id,
        });
      const researchComparison = await new ResearchComparisonService().findOne({
        research_id: req.query.research_id,
      });
      let dataMessage = {
        message: "Not Found"
      }
      const DataToClient = {
        PremChecks: researchPremChecks || dataMessage,
        Preliminary_Results:researchExist.preliminary_score,
        Tokenomics: researchTokenomics || dataMessage,
        Tokenomics_AllocationData: researchTokenomicsAllocation || dataMessage,
        Tokenomics_Rating:researchExist.tokenomics_rating,
        Adoption_And_Recognition: researchAdoptionAndRecognition || dataMessage,
        Community_And_TeamSpirit: researchCommunityAndTeamSpirit || dataMessage,
        Comparison: researchComparison || dataMessage,
        BaseResearch: researchExist || dataMessage,
        Tags: researchExist.tags,
        ResearchBuddyVerdit: researchExist.ResearchBuddyVerdit || dataMessage
      };
      //   update Resaerch Clicks
      const UpdateResearhClicks = await new ResearchService().update(
        { _id: req.query.research_id },
        { $inc: { 'total_clicks': 1 } }
      );
      return createResponse(`Research Details Fetched`, DataToClient)(
        res,
        HTTP.OK
      );
    } else {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Research Does Not Exist/Cannot Access Research",
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
