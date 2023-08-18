const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ResearchService = require("../../research/services/research.services");
const CommentService = require("../services/comments.services");
const ReplyService = require("../services/reply.service");
const InAppNotificationQueue = require("../../../../_queue/publishers/inAppNotifcation.publishers");

const KEYS = require("../../../../_config/keys");

const logger = require("../../../../../logger.conf");

exports.replyAComment = async (req, res, next) => {
  try {
    // check if comment exists/user owns the comment
      const comment = await new CommentService().findARecord(
        {_id: req.body.comment_id}
      );
      if (!comment) {
        return next(
          createError(HTTP.BAD_REQUEST, [
            {
              status: RESPONSE.ERROR,
              message: "This Comment Does Not Exist",
              statusCode: HTTP.BAD_REQUEST,
              data: {},
              code: HTTP.BAD_REQUEST,
            },
          ])
        );
      } else {
           // check if research exist
     const research = new ResearchService().findAResearch({_id:comment.research_id});
     if(research){
        // get users details
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
            if(user.data.data.first_name && user.data.data.first_name !== " "){
             firstname = user.data.data.first_name;
             fullname = firstname;
            }
            if(user.data.data.last_name && user.data.data.last_name !== " "){
             firstname = user.data.data.first_name;
             fullname = `${firstname} ${user.data.data.last_name}`
            };
               // create A Reply
        const dataToReplyModel = {
            comment_id: comment._id,
            user_id: req.user.user_id,
            user_image: user.data.data.image ? user.data.data.image : "",
            user_fullname: fullname,
            user_username: user.data.data.username,
            reply_body_text: req.body.reply_body_text,
            type: "reply",
        }
        const newCommentReply = await new ReplyService().create(dataToReplyModel);
        //  update research model
        const updatedComment = await new CommentService().update(
          { _id: comment._id },
          { $inc: { 'total_replies': 1 } }
        );
        if(comment.user_id !== req.user.user_id){
          // publish to InApp Notificaton
        // build data
        const dataToInnAppQueue = {
         user_id: comment.user_id,
         notification_type: 'research_comment_reply',
         message: `${user.data.data.username} just Replied Your Comment`,
         notifier_image:user.data.data.image ? user.data.data.image : "",
         notifier_username: user.data.data.username,
         notifier_fullname: `${fullname}`,
         origin_service: 'Research',
         origin_platform: req.query.platform
       }
       // publish here
       await InAppNotificationQueue.publishInAppNotifcation(research.poster_id, dataToInnAppQueue);
  }
        return createResponse(`Replied A Comment Successfuly`, newCommentReply)(res, HTTP.OK);
        } else {
            return next(
                createError(HTTP.BAD_REQUEST, [
                  {
                    status: RESPONSE.ERROR,
                    message: "Error.. Please Try Again",
                    statusCode: HTTP.BAD_REQUEST,
                    data: {},
                    code: HTTP.BAD_REQUEST,
                  },
                ])
              );
             }
        } else {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "This Research Does Not Exist",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
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
