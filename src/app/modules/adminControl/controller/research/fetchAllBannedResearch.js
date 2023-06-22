const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const logger = require("../../../../../../logger.conf");
const CommunityResearchService = require("../../../communityresearchmodule/services/communityResearch.services");

exports.adminFetchAllBannedResearch = async (req, res, next) => {
  try {
    const allBannedResearch = await new CommunityResearchService().all(
      req.query.limit,
      req.query.page,
      {is_banned: true}
    );
    if (allBannedResearch && allBannedResearch.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Banned Research Found",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `All Banned Research Retrieved`,
        allBannedResearch
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
