const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ResearchService = require("../../Research/services/research.services");
const CommunityResearchService = require("../services/communityResearch.services");
const KEYS = require("../../../../_config/keys");
const logger = require("../../../../../logger.conf");

exports.shareResearch = async (req, res, next) => {
  try {
    // search if usr owns post
    const research = await new ResearchService().findAResearch({
      _id: req.query.original_research_id,
    });
    if (!research) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Research Does Not Exist Or Is Deleted",
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
        //  save to users repost
        const dataToReResearchModel = {
          poster_id: req.user.user_id,
          researcher_id: research.researcher_id,
          original_research_id: research._id
        };
        const referenceResearchForUsereSharing = await new ResearchService().create(dataToReResearchModel);
        // save to community
        const dataToCommunityResearchModel = {
          poster_id: req.user.user_id,
          researcher_id: research.researcher_id,
          original_research_id: research._id,
          reposter_id: req.user.user_id,
          reposter_image: user.data.data.image ? user.data.data.image : "",
          reposter_username: user.data.data.username
            ? user.data.data.username
            : "",
            is_shared: true,
            research_child:research
        };
        const communityResearch = await new CommunityResearchService().create(
            dataToCommunityResearchModel
        );
        return createResponse("Research Shared Successfuly", communityResearch)(
          res,
          HTTP.OK
        );
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
