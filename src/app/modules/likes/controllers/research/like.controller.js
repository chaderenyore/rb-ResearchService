const axios = require("axios").default;
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
const KEYS = require("../../../../../_config/keys");

exports.likeARsearch = async (req, res, next) => {
  try {
      // check if like exists
      const likeExist = await new ResearchLikeService().findARecord({
        community_id: req.query.community_id,
        user_id: req.user.user_id,
      });
      if (likeExist) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "You Have ALready Liked This Research",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      }
    // search if user owns research
    const research = await new ResearchService().findAResearch({
      community_id: req.query.community_id,
    });
    console.log("Research =================== ", research)
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
        if(user.data.data.first_name && user.data.data.first_name !== " "){
         firstname = user.data.data.first_name;
         fullname = firstname;
        }
        if(user.data.data.last_name && user.data.data.last_name !== " "){
         firstname = user.data.data.first_name;
         fullname = `${firstname} ${user.data.data.last_name}`
        }
        //  save to users repost
        const dataToLikeModel = {
          community_id: research.community_id,
          user_id: req.user.user_id,
          fullname: fullname || "",
          username: user.data.data.username ? user.data.data.username : "",
          user_image: user.data.data.image ? user.data.data.image : "",
        };
      
        const Like = await new ResearchLikeService().create(dataToLikeModel);
        // increment like count on research
        const updatedCommunityPost = await new CommunityRsearchService().update(
          { _id: req.query.community_id },
          { $inc: { 'total_likes': 1 } }
        );

        const updatedBaseResearch = await new ResearchService().update(
          { community_id: req.query.community_id },
          { $inc: { 'total_likes': 1 } }
        );
        // save to likedRsearch Model
        const dataToUserLikedResearch = {
          user_id: req.user.user_id,
          community_id: req.query.community_id,
          research_tags: research.tags
        }
        const userLikedResearch = await new LikeResearchService().create(
          dataToUserLikedResearch
        );
    // update saved research
    const updatedSavedResearch = await new SavedResearchService().update(
      { community_id: req.query.community_id},
      { $inc: { 'total_likes': 1 } }
    )

        return createResponse("You Liked A Research", Like)(res, HTTP.OK);
      } else {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "Something Is Not Right Try AGain",
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
