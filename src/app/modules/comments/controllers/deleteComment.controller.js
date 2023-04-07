const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ResearchService = require("../../Research/services/research.services");
const CommunityResearchService = require("../../CommunityResearch/services/communityResearch.services");
const SavedResearchService = require("../../CommunityResearch/services/savedResearch.services");
const CommentService = require('../services/comments.services');


const logger = require("../../../../../logger.conf");

exports.deleteComment = async (req, res, next) => {
  try {
    // check if comment exists/user owns the comment
      const comment = await new CommentService().findARecord(
        {_id: req.query.comment_id, commenter_id: req.user.user_id}
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
        console.log("COmment ====== ", comment);
           // check if research exist
     const research = await new ResearchService().findAResearch({_id:comment.research_id});
     if(research){
      // delete comment
      const deletedComment = await new CommentService().deletOne({_id: req.query.comment_id});
      const CommentReplies = await new CommentService().deleteAll({comment_id: req.query.comment_id});

      console.log("deleted COmment =========== " , deletedComment);
      // update community
      const updatedCommunity = await new CommunityResearchService().update(
        { original_research_id: comment.research_id },
        { $inc: { 'total_comments': -1 } }
      )
      // update saved research
      const updatedSavedResearch = await new SavedResearchService().update(
        { post_id: req.body.research_id },
        { $inc: { 'total_comments': -1 } }
      )
          // Real time update frontend
         
        //  update post model
        const updatedResearch = await new ResearchService().update(
          { _id: comment.research_id },
          { $inc: { 'total_comments': -1 } }
        );
      return createResponse(`Comment Deleted`, deletedComment)(res, HTTP.OK);
     } else {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "This Post Does Not Exist",
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
