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
      let sumOfPositiveIndicatorsPoints;
      // check if the sum of tokenomics values is valid
      const {
        tradeable_token_score,
        is_main_token_score,
        has_enough_utils_score,
        has_dao_score,
        token_type_deflationary_score,
        postive_indicators_points,
      } = req.body;
      const tokenomicsExist = await new TokenomicsControlService().findOne({
        name: "tokenomics",
      });
      if (tokenomicsExist) {
        let tradeableTokensPoints =
          Number(tradeable_token_score) ||
          Number(tokenomicsExist.tradeable_token_score);
        let isMainTokenScore =
          Number(is_main_token_score) ||
          Number(tokenomicsExist.is_main_token_score);
        let hasEnoughUtilsScore =
          Number(has_enough_utils_score) ||
          Number(tokenomicsExist.has_enough_utils_score);
        let HasDaoScore =
          Number(has_dao_score) || Number(tokenomicsExist.has_dao_score);
        let deflationaryScore =
          Number(token_type_deflationary_score) ||
          Number(tokenomicsExist.token_type_deflationary_score);
        let positiveIndicatorsScore =
          Number(postive_indicators_points) ||
          Number(tokenomicsExist.positiveIndicators);
        // check sum of all intitial indicators(must be less than 100)
        sumOfPoints =
          Number(tradeableTokensPoints) +
          Number(isMainTokenScore) +
          Number(hasEnoughUtilsScore) +
          Number(HasDaoScore) +
          Number(deflationaryScore) +
          Number(positiveIndicatorsScore);
          console.log("SUM OF ALL INDIACTORS ===== ", sumOfPoints)
        if (sumOfPoints !== 100) {
          let sumOfIntialIndicators =
            Number(tradeableTokensPoints) +
            Number(isMainTokenScore) +
            Number(hasEnoughUtilsScore) +
            Number(HasDaoScore) +
            Number(deflationaryScore);
            console.log("SUM OF INITIAL INDIACTORS ===== ", sumOfIntialIndicators)
          let positiveIndicatorsPoints = Number(positiveIndicatorsScore);
          if (positiveIndicatorsPoints < 100 && sumOfIntialIndicators < 100) {
            let valueToAddToInitialIndicators = 100 - positiveIndicatorsPoints;
            let valueToAddToPositiveIndicators =
              100 - valueToAddToInitialIndicators;
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message: `Sum Of All Indicators Must Total 100, Please Add To Either One Of the Following in data body`,
                  statusCode: HTTP.OK,
                  data: {
                    positiveIndicators: {
                      PositiveIndiactorsShouldBe:
                        valueToAddToPositiveIndicators,
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
          if (positiveIndicatorsPoints > 100 && sumOfIntialIndicators > 100) {
            let valueToAddToInitialIndicators = 20;
            let valueToAddToPositiveIndicators = 80;
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message: `Sum Of All Indicators Must Total 100, Please Add To Either One Of the Following in data body`,
                  statusCode: HTTP.OK,
                  data: {
                    positiveIndicators: {
                      PositiveIndiactorsShouldBe:
                        valueToAddToPositiveIndicators,
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
        messageData = "Updated";
        // update
        const updatedTokenomics = await new TokenomicsControlService().update(
          { name: "tokenomics" },
          { ...req.body }
        );
        dataToReturn = updatedTokenomics;
      } else {
        let tradeableTokensPoints = Number(tradeable_token_score) || 0;
        let isMainTokenScore = Number(tokenomicsExist.is_main_token_score) || 0;
        let hasEnoughUtilsScore = Number(has_enough_utils_score) || 0;
        let HasDaoScore = Number(has_dao_score) || 0;
        let deflationaryScore = Number(token_type_deflationary_score) || 0;
        let positiveIndicatorsScore = Number(postive_indicators_points) || 0;
        // check sum of all intitial indicators(must be less than 100)
        sumOfPoints =
          Number(tradeableTokensPoints) +
          Number(isMainTokenScore) +
          Number(hasEnoughUtilsScore) +
          Number(HasDaoScore) +
          Number(deflationaryScore) +
          Number(positiveIndicatorsScore);
        if (sumOfPoints > 100 || sumOfPoints < 100) {
          let sumOfIntialIndicators =
            Number(tradeableTokensPoints) +
            Number(isMainTokenScore) +
            Number(hasEnoughUtilsScore) +
            Number(HasDaoScore) +
            Number(deflationaryScore);
          let positiveIndicatorsPoints = Number(positiveIndicatorsScore);
          if (positiveIndicatorsPoints < 100 && sumOfIntialIndicators < 100) {
            let valueToAddToInitialIndicators = 100 - positiveIndicatorsPoints;
            let valueToAddToPositiveIndicators =
              100 - valueToAddToInitialIndicators;
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message: `Sum Of All Indicators Must Total 100, Please Add To Either One Of the Following in data body`,
                  statusCode: HTTP.OK,
                  data: {
                    positiveIndicators: {
                      PositiveIndiactorsShouldBe:
                        valueToAddToPositiveIndicators,
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
          if (positiveIndicatorsPoints > 100 && sumOfIntialIndicators > 100) {
            let valueToAddToInitialIndicators = 20;
            let valueToAddToPositiveIndicators = 80;
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message: `Sum Of All Indicators Must Total 100, Please Add To Either One Of the Following in data body`,
                  statusCode: HTTP.OK,
                  data: {
                    positiveIndicators: {
                      PositiveIndiactorsShouldBe:
                        valueToAddToPositiveIndicators,
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
