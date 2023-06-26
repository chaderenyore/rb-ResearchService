const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const TokenomicsControlService = require("../../services/tokenomicsControl.service");
const logger = require("../../../../../../logger.conf");

exports.addTokenomicsControl = async (req, res, next) => {
  try {
    // validate if any payload was passed
    if (Object.entries(req.body).length > 0 === false) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Control Field Entered",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      let messageData;
      let dataToReturn;
      let sumOfPoints;
      let sumOfPositiveIndicatorsPoints = 0;
      // check if the sum of tokenomics values is valid
      const {
        tradeable_token_score,
        is_main_token_score,
        has_enough_utils_score,
        has_dao_score,
        token_type_deflationary_score,
        postive_indicators_points,
      } = req.body;
      if (postive_indicators_points === 0 || !postive_indicators_points) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message:
                "Please pass the limt allocation for positive indicators",
              statusCode: HTTP.OK,
              data: {},
              code: HTTP.OK,
            },
          ])
        );
      }
      if (postive_indicators_points) {
        sumOfPositiveIndicatorsPoints += Number(postive_indicators_points);
      }
      // check sum of all intitial indicators(must be less than 100)
      sumOfPoints =
        Number(tradeable_token_score) +
        Number(is_main_token_score) +
        Number(has_enough_utils_score) +
        Number(has_dao_score) +
        Number(token_type_deflationary_score) +
        Number(postive_indicators_points);

      // check if sum is greater than 100
      if (sumOfPoints > 100) {
        // check abnomally
        let sumOfIntialIndicators =
          Number(tradeable_token_score) +
          Number(is_main_token_score) +
          Number(has_enough_utils_score) +
          Number(has_dao_score) +
          Number(token_type_deflationary_score);
        let positiveIndicatorsPoints = Number(postive_indicators_points);
        let firstDifferencInSums =
          positiveIndicatorsPoints - sumOfIntialIndicators;
        if (firstDifferencInSums > 0) {
          let valueToAddToInitialIndicators = 100 - positiveIndicatorsPoints;
          let valueToAddToPositiveIndicators = 100 - sumOfIntialIndicators;
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: `Sum Of All Indicators Must Total 100, Please Add To Either One Of the Following in data body`,
                statusCode: HTTP.OK,
                data: {
                  positiveIndicators: {
                    PositiveIndiactorsShouldBe: valueToAddToPositiveIndicators,
                  },
                  otherIndicators: {
                    indiactors: [
                      "tradeable_token_score",
                      "is_main_token_score",
                      "has_enough_utils_score",
                      "has_dao_score",
                      "token_type_deflationary_score",
                    ],
                    OtherIndicatorsShouldBe: valueToAddToInitialIndicators,
                  },
                },
                code: HTTP.OK,
              },
            ])
          );
        }
      }
      // check if sum is lesss than 100
      if (sumOfPoints < 100) {
        // check abnomally
        let sumOfIntialIndicators =
          Number(tradeable_token_score) +
          Number(is_main_token_score) +
          Number(has_enough_utils_score) +
          Number(has_dao_score) +
          Number(token_type_deflationary_score);
        let positiveIndicatorsPoints = Number(postive_indicators_points);
        let firstDifferencInSums =
          positiveIndicatorsPoints - sumOfIntialIndicators;
        if (firstDifferencInSums > 0) {
          let valueToAddToInitialIndicators = 100 - positiveIndicatorsPoints;
          let valueToAddToPositiveIndicators = 100 - sumOfIntialIndicators;
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: `Sum Of All Indicators Must Total 100, Please Add To Either One Of the Following in data body`,
                statusCode: HTTP.OK,
                data: {
                  positiveIndicators: {
                    PositiveIndiactorsShouldBe: valueToAddToPositiveIndicators,
                  },
                  otherIndicators: {
                    indiactors: [
                      "tradeable_token_score",
                      "is_main_token_score",
                      "has_enough_utils_score",
                      "has_dao_score",
                      "token_type_deflationary_score",
                    ],
                    OtherIndicatorsShouldBe: valueToAddToInitialIndicators,
                  },
                },
                code: HTTP.OK,
              },
            ])
          );
        }
      }
      const tokenomicsExist = await new TokenomicsControlService().findOne({
        name: "tokenomics",
      });
      if (tokenomicsExist) {
        messageData = "Updated";
        // update
        const updatedTokenomics = await new TokenomicsControlService().update(
          { name: "tokenomics" },
          { ...req.body }
        );
        dataToReturn = updatedTokenomics;
      }
      if (!tokenomicsExist) {
        let dataToCreateReturn = {
          admin_id: req.user._id,
          admin_username: req.user.username,
          name: "tokenomics",
          ...req.body,
        };
        // create new prem Check control
        const newTokenomics = await new TokenomicsControlService().create(
          dataToCreateReturn
        );
        messageData = "Added";
        dataToReturn = newTokenomics;
      }
      return createResponse(`Tokenomics Control ${messageData}`, dataToReturn)(
        res,
        HTTP.OK
      );
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
