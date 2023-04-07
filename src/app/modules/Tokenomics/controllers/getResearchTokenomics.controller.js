const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const TokenomicsService = require("../services/tokenomics.service");


exports.getSingleResearchTokenomics = async (req, res, next) => {
  try {
    const singleTokenomics = await new  TokenomicsService().findOne(
      { research_id: req.params.research_id, researcher_id: req.user.user_id }
    );
    if (!singleTokenomics) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Tokenomics Found/UnAUthorized",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `Research Tokenomics Retrieved`,
        singleTokenomics
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
