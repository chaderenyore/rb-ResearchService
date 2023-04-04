const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const CommentsService = require("../../../comments/services/comments.services");
const CommentLikeService = require("../../services/commentLikes.services");
const logger = require("../../../../../../logger.conf");

exports.unLikeAComment = async (req, res, next) => {
  try {
    // search if usr owns post
    const comment = await new CommentsService().findARecord({
      _id: req.query.comment_id,
    });
    if (!comment) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Comment Does Not Exist",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
        // check if like exists
        const likeExist = await new CommentLikeService().findARecord({
          comment_id: req.query.comment_id,
          user_id: req.user.user_id,
        });
        if (!likeExist) {
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: "You Have Not LIke This Comment",
                statusCode: HTTP.OK,
                data: null,
                code: HTTP.OK,
              },
            ])
          );
        } else {
          const Like = await new CommentLikeService().deletOne({
            comment_id: req.query.comment_id,
            user_id: req.user.user_id,
          });
          // decrement like count on post
          const updatedComment = await new CommentsService().update(
            { _id: req.query.comment_id },
            { $inc: { 'total_likes': -1 } }
          );
          return createResponse("You UnLiked A Comment", Like)(res, HTTP.OK);
        }

    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
