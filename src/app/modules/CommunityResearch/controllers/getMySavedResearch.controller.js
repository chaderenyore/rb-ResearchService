const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const SavedResearchService = require("../services/savedResearch.services");

exports.fetchMySavedResearch = async (req, res, next) => {
  try {
    const allSavedResearch = await new SavedResearchService().all(
      req.query.limit,
      req.query.page,
      { is_visible: true, saver_id: req.user.user_id }
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
      return createResponse(
        `Saved Research Retrieved`,
        allSavedResearch
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
