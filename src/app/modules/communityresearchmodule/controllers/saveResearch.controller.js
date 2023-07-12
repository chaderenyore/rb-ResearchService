const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const MySavedResearchService = require("../services/savedResearch.services");
const ResearchService = require("../../research/services/research.services");
const CommunityResearchService = require("../../communityresearchmodule/services/communityResearch.services");


exports.saveResearch = async (req, res, next) => {
  try {
    // Get body info
    const { original_research_id } = req.query;
    //  check if I own research
    const isMyRserach = await new ResearchService().findAResearch({
      _id: original_research_id,
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
      // find reserach child
      const childResearch = await new ResearchService().findAResearch({
        _id: original_research_id,
      });
      if (childResearch) {
        const dataToSavedResearch = {
          community_id:childResearch.community_id,
          research_id: original_research_id,
          researcher_id: childResearch.researcher_id,
          saver_id: req.user.user_id,
        };
        const savedResearch = await new MySavedResearchService().create(
          dataToSavedResearch
        );
        // update save count accross all models
        const queryUpdate = {
          _id: original_research_id,
        };

        const updatedBaseResearch = await new ResearchService().update(
          queryUpdate,
          { $inc: { 'total_times_saved': 1 } }
        );

        const updatedCommunityResearch = await new CommunityResearchService().update(
          {original_research_id: original_research_id},
          { $inc: { 'total_times_saved': 1 } }
        );
        return createResponse(`Research Saved`, savedResearch)(res, HTTP.OK);
      } else{
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "Reserach Does Not Exist/Cannot Access Research",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      }
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
