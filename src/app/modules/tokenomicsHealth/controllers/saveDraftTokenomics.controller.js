const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../../research/services/research.services");
const TokenomicsService = require("../services/tokenomics.service");

exports.saveDraftTokenomics = async (req, res, next) => {
  try {
    //   search for research
    const research = await new ResearchService().findAResearch({
      _id: req.body.research_id,
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
      // check if drafts exist and update
      const draftExist = await new TokenomicsService().findOne({
        research_id: req.body.research_id,
        is_draft: true,
      });
      if (draftExist) {
        // update
        const updatedDraftTokenomics = await new TokenomicsService().update(
          { research_id: req.body.research_id, is_draft: true },
          { ...req.body }
        );
        return createResponse(`Draft Saved`, updatedDraftTokenomics)(
          res,
          HTTP.OK
        );
      } else {
        // create tokenomics entry
        const dataToTokenomics = {
          research_id: req.body.research_id,
          is_draft: true,
          ...req.body,
        };
        const draftTokenomics = await new TokenomicsService().create(
          dataToTokenomics
        );
        return createResponse(`Draft Saved`, draftTokenomics)(res, HTTP.OK);
      }
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
