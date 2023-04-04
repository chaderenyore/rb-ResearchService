const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ReplyService = require("../services/reply.service");
const logger = require("../../../../../logger.conf");

exports.getAllCommentReplies = async (req, res, next) => {
  try {
    // query data
    const dataToQuery = {
        comment_id: req.query.comment_id
    } 
    const replies = await new ReplyService().GetAllRecords(req.query.limit, req.query.page, dataToQuery);
    if (replies.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Comment Has No Replies",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
        return createResponse("Comments Replies Retreived", replies)(res, HTTP.OK);
      } 
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
