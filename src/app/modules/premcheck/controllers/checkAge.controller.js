const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const CalculateAge = require("../../../../_helpers/research/ageCalculator").calculateAge;
const { createResponse } = require("../../../../_helpers/createResponse");

const logger = require("../../../../../logger.conf");

exports.checkAccountAge = async (req, res, next) => {
  try {
     const { date_to_check } = req.query;
     const accountAge = await CalculateAge(date_to_check); 
     console.log("accounAge Info ==========", accountAge)
     if(accountAge.error){
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: accountAge.message,
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
     } else {
      return createResponse(`Age Computed Successfully`, accountAge)(res, HTTP.OK);
     }

  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
