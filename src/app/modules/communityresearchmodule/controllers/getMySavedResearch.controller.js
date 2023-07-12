const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const SavedResearchService = require("../services/savedResearch.services");
const CommunityResearchService = require("../../communityresearchmodule/services/communityResearch.services");

exports.fetchMySavedResearch = async (req, res, next) => {
  try {
    const allSavedResearch = await new SavedResearchService().all(
      req.query.limit,
      req.query.page,
      {saver_id: req.user.user_id }
    );
    if (allSavedResearch && allSavedResearch.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "You Have No Saved Research",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // fecth research from community
      let savedResearch = {};
      let researchCount = 0;
      for(let i =0 ; i < allSavedResearch.data.length; i++){
        const mySaves = await new CommunityResearchService().findOne({_id: allSavedResearch.data[i].community_id});
        if(mySaves){
          savedResearch.data = mySaves;
          researchCount ++;
        }
      }
      savedResearch.pagination = allSavedResearch.pagination;
      saveResearch.pagination.pageCount = Number(researchCount)
      return createResponse(
        `Saved Research Retrieved`,
        savedResearch
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
