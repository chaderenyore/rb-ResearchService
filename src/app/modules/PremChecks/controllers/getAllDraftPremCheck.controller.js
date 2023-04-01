const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const PremCheckService = require("../services/premCheck.service");
const KEYS = require("../../../../_config/keys");

exports.getDraftPremCheck = async (req, res, next) => {
  try {
    const allDraftPremCheck = await new PremCheckService().all(
      req.query.limit,
      req.query.page,
      { researcher_id: req.user.user_id, is_draft: true }
    );
    if (allDraftPremCheck.data.length === 0) {
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
        `All Prem Checks Drafts Retrieved`,
        allDraftPremCheck
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
