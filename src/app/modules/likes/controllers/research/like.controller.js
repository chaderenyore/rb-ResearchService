const axios = require("axios").default;
const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const ResearchService = require("../../../Research/services/research.services");
const SavedResearchService = require("../../../CommunityResearch/services/savedResearch.services");
const CommunityRsearchService = require("../../../CommunityResearch/services/communityResearch.services");
const ResearchLikeService = require("../../services/researchLikes.services");
const logger = require("../../../../../../logger.conf");
const KEYS = require("../../../../../_config/keys");

exports.likeARsearch = async (req, res, next) => {
  try {
      // check if like exists
      const likeExist = await new ResearchLikeService().findARecord({
        research_id: req.query.original_research_id,
        user_id: req.user.user_id,
      });
      if (likeExist) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "You Have ALready Liked This Post",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      }
    // search if user owns research
    const research = await new ResearchService().findAResearch({
      _id: req.query.original_research_id,
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
        if(user.data.data.first_name && user.data.data.firstname !== " "){
         firstname = user.data.data.firstname;
         fullname = firstname;
        }
        if(user.data.data.last_name && user.data.data.last_name !== " "){
         fullname = `${firstname} ${user.data.data.last_name}`
        }
        //  save to users repost
        const dataToLikeModel = {
          research_id: research._id,
          user_id: req.user.user_id,
          fullname: fullname || "",
          username: user.data.data.username ? user.data.data.username : "",
          user_image: user.data.data.image ? user.data.data.image : "",
        };
      
        const Like = await new ResearchLikeService().create(dataToLikeModel);
        // increment like count on research
        const updatedCommunityPost = await new CommunityRsearchService().update(
          { original_research_id: req.query.original_research_id },
          { $inc: { 'total_likes': 1 } }
        );

        const updatedBaseResearch = await new ResearchService().update(
          { _id: req.query.original_research_id },
          { $inc: { 'total_likes': 1 } }
        );
    // update saved research
    const updatedSavedResearch = await new SavedResearchService().update(
      { research_id: req.query.original_research_id },
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
