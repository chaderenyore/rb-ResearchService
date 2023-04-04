const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const TokenomicsService = require("../services/tokenomics.service");
const KEYS = require("../../../../_config/keys");

exports.getTokenomicsDraftCheck = async (req, res, next) => {
  try {
    const allTokenomicsDrafts = await new TokenomicsService().all(
      req.query.limit,
      req.query.page,
      { researcher_id: req.user.user_id, is_draft: true }
    );
    if (allTokenomicsDrafts.data.length === 0) {
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
        `All Tokenomics Drafts Retrieved`,
        allTokenomicsDrafts
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
