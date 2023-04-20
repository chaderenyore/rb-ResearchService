const axios = require("axios").default;
const { init_pusher } = require("../../../../_events/pusher")
const { HTTP } = require('../../../../_constants/http');
const { RESPONSE } = require('../../../../_constants/response');
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const ResearchService = require("../../research/services/research.services");
const CommunityResearchService = require("../../communityresearchmodule/services/communityResearch.services");
const SavedResearchService = require("../../communityresearchmodule/services/savedResearch.services");
const CommentService = require('../services/comments.services');
const KEYS = require("../../../../_config/keys");

// const logger = require('../../../../../logger.conf');

exports.createComment = async (req, res, next) => {
  // Check the research type and add it accordingly
  try {
    // check if post exist
   const research = await new ResearchService().findAResearch({_id:req.body.research_id});
   if(!research){
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
          // Get user Info creating research
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
             firstname = user.data.data.first_name;
             fullname = firstname;
            }
            if(user.data.data.last_name && user.data.data.last_name !== " "){
              firstname = user.data.data.first_name;
             fullname = `${firstname} ${user.data.data.last_name}`
            }
               // create comment
    const dataToCommentModel = {
      research_id: research._id,
      commenter_id: req.user.user_id,
      is_parent: true,
      commenter_image: user.data.data.image ? user.data.data.image : "",
      commenter_fullname: fullname,
      commenter_username: user.data.data.username,
      comment_body_text: req.body.comment_body_text,
      type: 'original'
    }
    const newComment = await new CommentService().create(dataToCommentModel);
    // update community
    const updatedCommunity = await new CommunityResearchService().update(
      { original_post_id: req.body.research_id },
      { $inc: { 'total_comments': 1 } }
    )
      // // Real time update frontend
      // const pusher = await init_pusher();
      // pusher.trigger("research_comments", dataToCommentModel);
      //  update research model
      const updatedResearch = await new ResearchService().update(
        { _id: req.body.research_id },
        { $inc: { 'total_comments': 1 } }
      );
      console.log("UPDATED RESEARCH COMMENT COUNT === ", updatedResearch);
      console.log("COMMUNITY RESEARCH COMMENT COUNT === ", updatedCommunity);

      return createResponse('Comment Created', newComment)(res, HTTP.OK);
   }

          }
 
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
