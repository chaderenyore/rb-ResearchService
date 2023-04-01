const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../../Research/services/research.services");
const TokenomicsService = require("../services/premCheck.service");

exports.saveDraftTokenomics = async (req, res, next) => {
  try {
//   search for research
      const research = await new ResearchService().findAResearch(
        {_id: req.body.research_id}
      );
      if (research) {
        // create tokenomics entry
        const dataToTokenomics = {
          research_id: research_id,
          is_draft: true,
          ...req.body,
        };
        const draftTokenomics = await new TokenomicsService().create(
            dataToTokenomics
        );
        return createResponse(`Draft Saved`, draftTokenomics)(res, HTTP.OK);
      }
    

  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
