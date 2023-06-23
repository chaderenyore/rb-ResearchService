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
      lastTweetTimeInDays_limit,
      lastTweetTimeInDays_point,
      launch_age_point,
      twitter_age_point,
      active_on_social_media_point,
      project_satus_point,
      total_pass_mark,
    } = req.body;
    console.log("BODY PAYLOAD  ====== ", req.body);
    // check validity of LastTweetTimeInDays_limit
    if (lastTweetTimeInDays_limit > 31) {
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
    // check if premcheck control exists
    const premcheckExist = await new PremCheckControlService().findOne({
      name: "premCheck",
    });
    if (premcheckExist) {
      let payloadSumHolder = [];
      let totalSumHolder = [];
      messageData = "Updated";
      // compute total score
      let premCheckControlHolder = {
        launch_age_point: Number(launch_age_point) || 0,
        twitter_age_point: Number(twitter_age_point) || 0,
        active_on_social_media_point:
          Number(active_on_social_media_point) || 0,
        project_satus_point: Number(project_satus_point) || 0,
      };
      // compare payload with saved sum
      let controlsNamesNotUpdated = [];
      for (const [key, value] of Object.entries(premCheckControlHolder)) {
        console.log(key);
        console.log(value);
        if (value === 0) {
          // push value saved to sum holder
          controlsNamesNotUpdated.push(key);
        }
        payloadSumHolder.push(value);
      }
      // get premcheck sums
      for (let i = 0; i < controlsNamesNotUpdated.length; i++) {
        totalSumHolder.push(premcheckExist[controlsNamesNotUpdated[i]]);
      }
      let allSums = [...totalSumHolder, ...payloadSumHolder];
      // check sum up
      let totalSumValue =
        allSums.length !== 0
          ? allSums.reduce(function (a, b) {
              return a + b;
            })
          : 0;
      // sum must not be greater than 100
      if (totalSumValue !== 100) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: `Sum of Controls Must Be Equal To 100`,
              statusCode: HTTP.OK,
              data: {
                payloadControl: premCheckControlHolder,
                totalSumValue,
              },
              code: HTTP.OK,
            },
          ])
        );
      }
      // update
      const updatedPrecheck = await new PremCheckControlService().update(
        { name: "premCheck" },
        req.body
      );
      dataToReturn = updatedPrecheck;
    }
    if (!premcheckExist) {
      // check sum of all indicators(must be less than 100)
      let ageIndicator = Number(twitter_age_point) || Number(launch_age_point);
      let sumOfPoints =
        Number(ageIndicator) +
        Number(active_on_social_media_point) +
        Number(lastTweetTimeInDays_point) +
        Number(project_satus_point);
      if (sumOfPoints !== 100) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: `Points Must Sum Up To 100percent [Twitter Age or Launchdate date Points, active oscial media point and project status point]`,
              statusCode: HTTP.OK,
              data: {},
              code: HTTP.OK,
            },
          ])
        );
      }
      // create new prem Check control
      let dataToCreateModel = {
        admin_id: req.user.user_id,
        admin_username: req.user.username,
        name: "premCheck",
        ...req.body,
      };
      const newPremCheck = await new PremCheckControlService().create(
        dataToCreateModel
      );
      messageData = "Added";
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
