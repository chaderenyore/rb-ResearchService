const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ResearchService = require("../../research/services/research.services");
const CommentService = require("../services/comments.services");

const logger = require("../../../../../logger.conf");

exports.getAllResearchComments = async (req, res, next) => {
  try {
    // check if post exist
    const research = await new ResearchService().findAResearch({ _id: req.query.research_id });
    console.log("Research ============== ", research);
    if (!research) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Research Does Not Exist",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {
      // get all commnets
      const comments = await new CommentService().all(
        req.query.limit,
        req.query.page,
        { research_id: req.query.research_id }
      );
      if (comments.data.length === 0) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "This Research Has No Comments Yet",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      } else {
        return createResponse("Research Comments Fetched", comments)(res, HTTP.OK);
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
