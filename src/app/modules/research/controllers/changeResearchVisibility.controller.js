const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ResearchService = require("../services/research.services");
const CommunityResearch = require("../../communityresearchmodule/services/communityResearch.services");
const logger = require("../../../../../logger.conf");

exports.changeVisibility = async (req, res, next) => {
  try {
    // search if usr owns post
    const myResearch = await new ResearchService().findAResearch({researcher_id:req.user.user_id, research_id:req.query.research_id});
    if (!myResearch) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "Unauthorized To Perform This Action",
            statusCode: HTTP.UNAUTHORIZED,
            data: null,
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    } else {
      if(req.query.visible === "true" && myPost.is_visible === true){
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "Visibility ALready Turned On",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      }
      if(req.query.visible === "false" && myPost.is_visible === false){
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "Visibility ALready Turned Off",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      }
      let visibilityState;
      let resmessage;
      if(req.query.visible === "true"){
         visibilityState = true;
         resmessage = `Visibility Turned On`;
      }
      if(req.query.visible === "false"){
         visibilityState = false;
        resmessage = `Visibility Turned Off`;

      }
      // update Posts in community, posts, blocked, tweets, reposts
  const updatedCommunityResearchPost = await new CommunityResearch().update(
    { original_research_id: req.body.original_research_id, poster_id: req.user.user_id },
    { original_post_isVisible: visibilityState }
  );
 const updatedbaseResearch = await new ResearchService().update(
            { poster_id: req.user.user_id, _id: req.query.research_id },
            { is_visible: visibilityState }
          );
          return createResponse(resmessage, updatedbaseResearch)(
            res,
            HTTP.OK
          );
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
