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
    // check if premcheck control exists
    const premcheckExist = await new PremCheckControlService().findOne({
      name: "premCheck",
    });
    if (premcheckExist) {
      messageData = "Updated";
      // compute total score
      let premCheckControlHolder = [
        Number(launch_age_point) || 0,
        Number(twitter_age_point) || 0,
        Number(active_on_social_media_point) || 0,
        Number(project_satus_point) || 0,
      ];
      let savedControlHolder = [
        Number(premcheckExist.launch_age_point) || 0,
        Number(premcheckExist.twitter_age_point) || 0,
        Number(premcheckExist.active_on_social_media_point) || 0,
        Number(premcheckExist.project_satus_point) || 0,
      ];
      // check sum up
      let savedSum =
        savedControlHolder.length !== 0
          ? savedControlHolder.reduce(function (a, b) {
              return a + b;
            })
          : 0;
      let payloadSum =
        premCheckControlHolder.length !== 0
          ? premCheckControlHolder.reduce(function (a, b) {
              return a + b;
            })
          : 0;
      // sum must not be greater than 100
      if (savedSum + payloadSum > 100) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: `Sum of Controls Must Be Equal To 100`,
              statusCode: HTTP.OK,
              data: {
                payloadControl: premCheckControlHolder,
                payloadSum: payloadSum,
                ExistingControl: savedControlHolder,
                existingSum: savedSum,
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
    if (!premcheckExist) {
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
      // create new prem Check control
      let dataToCreateModel = {
        admin_id: req.user.user_id,
        admin_username: req.user.username,
        name:"premCheck",
        ...req.body
      }
      const newPremCheck = await new PremCheckControlService().create(dataToCreateModel);
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
