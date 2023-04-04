const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const ResearchService = require("../../../Research/services/research.services");
const SavedResearchService = require("../../../CommunityResearch/services/savedResearch.services");
const CommunityRsearchService = require("../../../CommunityResearch/services/communityResearch.services");
const ResearchLikeService = require("../../services/researchLikes.services");
const logger = require("../../../../../../logger.conf");

exports.unLikeAResearch = async (req, res, next) => {
  try {
    // search if research exists
    const research = await new ResearchService().findAResearch({
      _id: req.query.original_research_id,
    });
    if (!research) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Research Does Not Exist",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
        // check if like exists
        const likeExist = await new ResearchLikeService().findARecord({
          post_id: req.query.original_research_id,
          user_id: req.user.user_id,
        });
        if (!likeExist) {
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: "You Have Not Liked This Post",
                statusCode: HTTP.OK,
                data: null,
                code: HTTP.OK,
              },
            ])
          );
        } else {
          const Like = await new ResearchLikeService().deletOne({
            post_id: req.query.original_research_id,
            user_id: req.user.user_id,
          });
          // decrement like count on research
          const updatedCommunityPost = await new CommunityRsearchService().update(
            { original_research_id: req.query.original_research_id },
            { $inc: { 'total_likes': -1 } }
          );

          const updatedResearch = await new ResearchService().update(
            { post_id: req.query.original_research_id },
            { $inc: { 'total_likes': -1 } }
          );
              // update saved research
    const updatedSavedResearch = await new SavedResearchService().update(
      { post_id: req.query.original_research_id },
      { $inc: { 'total_likes': -1 } }
    )

          return createResponse("You UnLiked A Research", Like)(res, HTTP.OK);
        }

    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
