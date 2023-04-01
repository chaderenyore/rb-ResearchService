const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const PremCheckService = require("../services/premCheck.service");
const KEYS = require("../../../../_config/keys");

exports.getSingleResearchPremCheck = async (req, res, next) => {
  try {
    const singlePremCheck = await new PremCheckService().findOne(
      { research_id: req.body.research_id }
    );
    if (!singlePremCheck) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No PremCheck Found",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `Research Prem Check Retrieved`,
        singlePremCheck
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
