const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const CommentsLikesService = require("../services/commentLikes.services");
const ResewarchLikeService = require("../services/researchLikes.services");
const logger = require("../../../../../logger.conf");

exports.validateLike = async (req, res, next) => {
  try {
    // search for likes in any entry related to like
    const researchLikeExist = await new ResewarchLikeService().findARecord({
      community_id: req.query.community_id,
      user_id: req.user.user_id,
    });
    console.log("Research LIKE ==== ", researchLikeExist);
    const commentLikeExist = await new CommentsLikesService().findARecord({
      comment_id: req.query.comment_id,
      user_id: req.user.user_id,
    });
    console.log("COMMENT LIKE ==== ", commentLikeExist);
    if (!researchLikeExist && ! commentLikeExist) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Liked Invalid",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse("Liked Valid", {})(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
