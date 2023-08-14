const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const CommentsLikesService = require("../services/commentLikes.services");
const ResewarchLikeService = require("../services/researchLikes.services");
const logger = require("../../../../../logger.conf");

exports.validateLike = async (req, res, next) => {
  try {
    if (!req.query.community_id || !req.query.comment_id) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No query params, please pass comment id or community id",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    }
    // search for likes in any entry related to like
    if(req.query.community_id){
      const researchLikeExist = await new ResewarchLikeService().findARecord({
        community_id: req.query.community_id,
        user_id: req.user.user_id,
      });
    }
    if(req.query.comment_id){
      const commentLikeExist = await new CommentsLikesService().findARecord({
        comment_id: req.query.comment_id,
        user_id: req.user.user_id,
      });
    }
    if (req.query.community_id && !commentLikeExist) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Like Invalid",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } 
    if (req.query.comment_id && !commentLikeExist) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Like Invalid",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    }
      return createResponse("Like Valid", {})(res, HTTP.OK);
    
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
