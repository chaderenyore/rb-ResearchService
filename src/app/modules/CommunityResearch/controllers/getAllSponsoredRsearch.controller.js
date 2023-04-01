const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const CommunityResearchService = require("../services/communityResearch.services");
const KEYS = require("../../../../_config/keys");

exports.fetchAllSponsoredResearch = async (req, res, next) => {
  try {
    const allSponsoredResearch = await new CommunityResearchService().all(
      req.query.limit,
      req.query.page,
      { is_visible: true, is_sponsored: true }
    );
    if (allSponsoredResearch && allSponsoredResearch.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Drafts Found",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `All Sponsored Research Retrieved`,
        allSponsoredResearch
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
