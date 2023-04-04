const axios = require("axios").default;
const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const CommentsService = require("../../../comments/services/comments.services");
const CommentLikeService = require("../../services/commentLikes.services");
const logger = require("../../../../../../logger.conf");
const KEYS = require("../../../../../_config/keys");

exports.likeAComment = async (req, res, next) => {
  try {
          // check if like exists
          const likeExist = await new CommentLikeService().findARecord({
            comment_id: req.query.comment_id,
            user_id: req.user.user_id,
          });
          if (likeExist) {
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message: "You Have ALready Liked This Comment",
                  statusCode: HTTP.OK,
                  data: null,
                  code: HTTP.OK,
                },
              ])
            );
          }
    // search if user owns post
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
      // Get user Info creating post
      const user = await axios.get(
        `${KEYS.USER_SERVICE_URI}/users/v1/user/${req.user.user_id}?platform=web`,
        {
          headers: {
            Authorization: `Bearer ${req.token}`,
          },
        }
      );
      if (user && user.data && user.data.code === 200) {
        let firstname;
        let fullname;
        if(user.data.data.first_name && user.data.data.firstname !== " "){
         firstname = user.data.data.firstname;
         fullname = firstname;
        }
        if(user.data.data.last_name && user.data.data.last_name !== " "){
         fullname = `${firstname} ${user.data.data.last_name}`
        }
        //  save to users repost
        const dataToLikeModel = {
          comment_id: comment._id,
          user_id: req.user.user_id,
          fullname: fullname || "",
          username: user.data.data.username ? user.data.data.username : "",
          user_image: user.data.data.image ? user.data.data.image : "",
        };
      
        const Like = await new CommentLikeService().create(dataToLikeModel);
        // increment like count on comment
        const updatedComment = await new CommentsService().update(
          { _id: req.query.comment_id },
          { $inc: { 'total_likes': 1 } }
        );
        return createResponse("You Liked A Comment", Like)(res, HTTP.OK);
      } else {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "Something Is Not Right Try Again",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
