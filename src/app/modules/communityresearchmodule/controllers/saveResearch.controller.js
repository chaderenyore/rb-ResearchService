const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const MySavedResearchService = require("../services/savedResearch.services");
const ResearchService = require("../../research/services/research.services");

exports.saveResearch = async (req, res, next) => {
  try {
    // Get body info
    const { research_info } = req.body;
    //  check if I won research
    const isMyRserach = await new ResearchService().findAResearch({
      _id: req.query.original_research_id,
      researcher_id: req.user.user_id,
    });
    if (isMyRserach) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "You Can Not Save A Research Created By You",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // build child research view data
      const childResearch = {
        original_research_id: isMyRserach._id,
        research_child: isMyRserach.research_child,
        researcher_image_url: isMyRserach.researcher_image_url,
        researcher_username: isMyRserach.reposter_image,
        researcher_firstname: isMyRserach.researcher_firstname,
        researcher_lastame: isMyRserach.researcher_lastname,
        coin_name: isMyRserach.coin_name,
        coin_url: isMyRserach.coin_url,
        coin_image: isMyRserach.coin_image,
        tokenomics_rating: isMyRserach.tokenomics_rating,
        verdit_score: isMyRserach.verdit_score,
        is_working_product: isMyRserach.is_working_product,
        research_price: isMyRserach.research_price,
        is_visible: isMyRserach.is_visible,
        is_sponsored: isMyRserach.is_sponsored,
        is_draft: isMyRserach.is_draft,
        tags: isMyRserach.tags,
        type: isMyRserach.type,
      };
      const dataToSavedResearch = {
        research_id: research_info._id,
        researcher_id: research_info.researcher_id,
        saver_id: req.user.user_id,
        research_info: childResearch,
      };
      const savedResearch = await new MySavedResearchService().create(
        dataToSavedResearch
      );
      // update save count accross all models

      const queryUpdate = {
        _id: req.query.original_research_id,
      };

      const updatedBaseResearch = await new ResearchService().update(
        queryUpdate,
        { $inc: { 'total_times_saved': 1 } }
      );
      return createResponse(`Research Saved`, savedResearch)(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
