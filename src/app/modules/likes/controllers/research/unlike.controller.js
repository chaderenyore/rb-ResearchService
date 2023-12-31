const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const ResearchService = require("../../../research/services/research.services");
const SavedResearchService = require("../../../communityresearchmodule/services/savedResearch.services");
const CommunityRsearchService = require("../../../communityresearchmodule/services/communityResearch.services");
const ResearchLikeService = require("../../services/researchLikes.services");
const LikeResearchService = require("../../services/userLikedResearch.service");
const logger = require("../../../../../../logger.conf");

exports.unLikeAResearch = async (req, res, next) => {
  try {
    // search if research exists
    const research = await new ResearchService().findAResearch({
      community_id: req.query.community_id,
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
        community_id: req.query.community_id,
        user_id: req.user.user_id,
      });
      if (!likeExist) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "You Have Not Liked This Research",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      } else {
        const Like = await new ResearchLikeService().deletOne({
          community_id: req.query.community_id,
          user_id: req.user.user_id,
        });
        // decrement like count on research
        const updatedCommunityPost = await new CommunityRsearchService().update(
          { _id: req.query._id },
          { $inc: { 'total_likes': -1 } }
        );

        const updatedResearch = await new ResearchService().update(
          { community_id: req.query.community_id },
          { $inc: { 'total_likes': -1 } }
        );
        // update saved research
        const updatedSavedResearch = await new SavedResearchService().update(
          { community_id: req.query.community_id },
          { $inc: { 'total_likes': -1 } }
        );
        // update User likedRsearch Model
        const queryDataToUserLikedResearch = {
          user_id: req.user.user_id,
          community_id: req.query.community_id,
        };
        const userLikedResearch = await new LikeResearchService().deletOne(
          queryDataToUserLikedResearch
        );

        return createResponse("You UnLiked A Research", Like)(res, HTTP.OK);
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
