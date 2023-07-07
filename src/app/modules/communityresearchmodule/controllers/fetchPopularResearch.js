const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const CommunityResearchService = require("../services/communityResearch.services");

exports.fetchAllPopularResearch = async (req, res, next) => {
  try {
    // sort filter
    const sortFilter = req.query.sort_by === "comments" ? {total_comments: -1} : req.query.sort_by === "likes" ? {total_likes: -1} : req.query.sortFilter === "shares" ? {total_times_shared: -1} : {total_likes: -1};
    const popularResearch = await new CommunityResearchService().fetchAllOrderBy(
      req.query.limit,
      req.query.page,
      { $or:[ {'total_comments':{$gt:1}}, {'total_likes':{$gt:1}}, {'total_times_shared':{$gt: 1}} ]},
      sortFilter
    );
    if (popularResearch && popularResearch.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Popular Reasearch Found",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `Popular Research Retrieved`,
        popularResearch
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
