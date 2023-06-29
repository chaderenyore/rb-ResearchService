const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const logger = require("../../../../../../logger.conf");
const ResearchService = require("../../../research/services/research.services");

exports.fetchNumberOfResearch = async (req, res, next) => {
  try {
    const count = await new ResearchService().countDocuments({});
    if (!count) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Total Research Count Failed",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `Total Number Of Research Computed`,
        count
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
