const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const CommentLikeService = require("../../services/commentLikes.services");
const logger = require("../../../../../../logger.conf");

exports.getACommentLikes = async (req, res, next) => {
  try {
    // query data
    const dataToQuery = {
        comment_id: req.query.comment_id
    } 
    const Likes = await new CommentLikeService().GetAllRecords(req.query.limit, req.query.page, dataToQuery);
    if (Likes.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Comments Has No Likes",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
        return createResponse("Comments Likes Retreived", Likes)(res, HTTP.OK);
      } 
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
