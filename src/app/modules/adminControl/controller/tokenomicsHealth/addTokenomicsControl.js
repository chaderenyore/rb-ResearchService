const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const TokenomicsControlService = require("../../services/tokenomicsControl.service");
const logger = require("../../../../../../logger.conf");

exports.addPremCheckControl = async (req, res, next) => {
  try {
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
        negative_indicators,
        positive_indicators,
        upperLimit_for_excellence,
        upperLimit_for_good,
        upperlimit_for_fair,
        upperlimit_for_poor,
        upperlimit_for_vpoor
    } = req.body;

    // check sum of positive indicators passed
    for(let i = 0; i < positive_indicators.length; i++){
        sumOfPositiveIndicatorsPoints += positive_indicators[i].indicator_score;
    }
    // check sum of all intitial indicators(must be less than 100)
     sumOfPoints =
      Number(tradeable_token_score) + 
      Number(is_main_token_score) +
      Number(has_enough_utils_score) + Number(has_dao_score) + Number(token_type_deflationary_score) + sumOfPositiveIndicatorsPoints;
    if (sumOfPoints > 100) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: `Sum Of All Indicators Must Total 100percent, re-compute`,
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    }
    const tokenomicsExist = await new TokenomicsControlService().findOne({
      name: "tokenomics",
    });
    if (tokenomicsExist) {
      messageData = "Updated";
      // update
      const updatedTokenomics = await new TokenomicsControlService().update(
        { name: "tokenomics" },
        req.body
      );
      dataToReturn = updatedTokenomics;
    } else {
      // create new prem Check control
      const newTokenomics = await new TokenomicsControlService().create(req.body);
      messageData = "Added";
      dataToReturn = newTokenomics;
    }
    return createResponse(`Tokenomics Control ${messageData}`, dataToReturn)(
      res,
      HTTP.OK
    );
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
