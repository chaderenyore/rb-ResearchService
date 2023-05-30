const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const CommunityResearchService = require("../services/communityResearch.services");

exports.fetchAllCommunityResearch = async (req, res, next) => {
  try {
    const allResearch = await new CommunityResearchService().all(
      req.query.limit,
      req.query.page,
      { is_visible: true,  researcher_id: req.query.user_id}  // is_banned: false TO ADD
    );
    if (allResearch && allResearch.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Research Found",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `All Users Public Research Fetched`,
        allResearch
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
