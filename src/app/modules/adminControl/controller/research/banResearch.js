const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const logger = require("../../../../../../logger.conf");
const ResearchService = require("../../../research/services/research.services");
const CommunityResearchService = require("../../../communityresearchmodule/services/communityResearch.services");
const SavedResearchService = require("../../../communityresearchmodule/services/savedResearch.services");

exports.banResearch = async (req, res, next) => {
  try {
    const research = await new ResearchService().findAResearch({
      _id: req.query.research_id,
    });
    if (!research) {
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
    } else {
      // ban
      // update base Research
      const bannedBaseResearch = await new ResearchService().update(
        { _id: req.query.research_id },
        { is_banned: true }
      );
      // update community Research
      const bannedCommunityResearch =
        await new CommunityResearchService().update(
          { original_research_id: req.query.research_id },
          { is_banned: true }
        );
      //    update saved Research
      const bannedSavedResearch = await new SavedResearchService().update(
        { research_id: req.query.research_id },
        { is_banned: true }
      );
      return createResponse(`Research Banned`, bannedBaseResearch)(
        res,
        HTTP.OK
      );
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
