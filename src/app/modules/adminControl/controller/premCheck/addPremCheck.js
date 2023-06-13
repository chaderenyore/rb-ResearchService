const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const PremCheckControlService = require("../../services/premCheckControl.service");
const logger = require("../../../../../../logger.conf");

exports.addPremCheckControl = async (req, res, next) => {
  try {
    let messageData;
    let dataToReturn;
    // check if the sum of prem check values is valid
    const {
      LastTweetTimeInDays_limit,
      launch_age_point,
      twitter_age_point,
      active_on_social_media_point,
      project_satus_point,
      total_pass_mark,
    } = req.body;
    // check validity of LastTweetTimeInDays_limit
    if (LastTweetTimeInDays_limit > 31) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: `${LastTweetTimeInDays_limit} days is Invalid`,
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    }
    // check sum of all indicators(must be less than 100)
    let ageIndicator = launch_age_point || twitter_age_point;
    let sumOfPoints =
      Number(ageIndicator) +
      Number(active_on_social_media_point) +
      Number(project_satus_point);
    if (sumOfPoints > 100) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: `The follwing Indicators Must Total 100percent [Twitter Age or Launchdate date Points, active oscial media point and project status point]`,
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    }
    const premcheckExist = await new PremCheckControlService().findOne({
      name: "premCheck",
    });
    if (premcheckExist) {
      messageData = "Updated";
      // update
      const updatedPrecheck = await new PremCheckControlService().update(
        { name: "premCheck" },
        req.body
      );
      messageData = "Added";
      dataToReturn = updatedPrecheck;
    } else {
      // create new prem Check control
      const newPremCheck = await new PremCheckControlService().create(req.body);
      dataToReturn = newPremCheck;
    }
    return createResponse(`PremCheck Control ${messageData}`, dataToReturn)(
      res,
      HTTP.OK
    );
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
