const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ComparsionService = require("../services/comparison.services");
const KEYS = require("../../../../_config/keys");

exports.getComparisonDraft = async (req, res, next) => {
  try {
    const allComparisonDrafts = await new ComparsionService().all(
      req.query.limit,
      req.query.page,
      { researcher_id: req.user.user_id, is_draft: true }
    );
    if (allComparisonDrafts && allComparisonDrafts.data.length === 0) {
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
        `All Coin Comparison Drafts Retrieved`,
        allComparisonDrafts
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
