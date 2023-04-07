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
          original_research_id: research._id,
          type: "shared",
        };
        const referenceResearchForUsereSharing =
          await new ResearchService().createResearch(dataToReResearchModel);
        console.log("Rsearch =========== ", research);
        // save to community
        // build child research  child view data
        let researchChild;
        const childResearch = {
          original_research_id: research._id,
          research_child: research.research_child,
          researcher_image_url: research.researcher_image_url,
          researcher_username: research.reposter_image,
          researcher_firstname: research.researcher_firstname,
          researcher_lastame: research.researcher_lastname,
          coin_name: research.coin_name,
          coin_url: research.coin_url,
          coin_image: research.coin_image,
          tokenomics_rating: research.tokenomics_rating,
          verdit_score: research.verdit_score,
          is_working_product: research.is_working_product,
          research_price: research.research_price,
          is_visible: research.is_visible,
          is_sponsored: research.is_sponsored,
          is_draft: research.is_draft,
          tags: research.tags,
          type: research.type,
        };
        // build research child

        if (research.is_visible && research.is_visible === false) {
          researchChild = "Researched Shared Is Turned Off";
        } else {
          researchChild = research;
        }

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
          type: "shared",
          research_child: researchChild,
        };
        const communityResearch = await new CommunityResearchService().create(
          dataToCommunityResearchModel
        );
        // update save count 
        const queryUpdate = {
          _id: req.query.original_research_id,
        }
  
        const updatedBaseResearch = await new ResearchService().update(
          queryUpdate,
          { $inc: { 'total_times_shared': 1 } }
        )
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
