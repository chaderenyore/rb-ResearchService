const AllPuposeIndicator = require("./tokenomicsIndicator");
const TokenomicsControlService = require("../../app/modules/adminControl/services/tokenomicsControl.service");

exports.computeTokenomicsHealth = async (coinData) => {
  try {
    // retirieve tokenomics control
    const tokenomicsControl = await new TokenomicsControlService().findOne({
      name: "tokenomics",
    });
    let positivetiveIndexes = AllPuposeIndicator.positivetiveIndicators,
      negativeIndexes = AllPuposeIndicator.negativeIndicators,
      negativePercentageScoreArray = [],
      positivePercentageScoreArray = [],
      negativeSum,
      positiveSum,
      totalPoint = 0;
    // control Indicators
    let positiveControlIndicators = [];
    let negativeControlIndicators = [];
    // save control indicators
    if (tokenomicsControl) {
      for (let i = 0; i < tokenomicsControl.positive_indicators.length; i++) {
        positiveControlIndicators.push(
          tokenomicsControl.positive_indicators[i]
        );
      }
    }
    // check if allocation data was passed
    if (coinData.allocation_data && coinData.allocation_data.length === 0) {
      return {
        error: true,
        message: "Please Pass Valid Tokenomics Indicators",
        data: {},
      };
    } else {
      // get first step data from coinData and compute score
      if (Number(coinData.number_of_tradeable_tokens)) {
        // increase total points by value
        totalPoint += Number(coinData.number_of_tradeable_tokens);
      }
      let isMainTokenPoint = tokenomicsControl
        ? Number(tokenomicsControl.is_main_token_score) || 5
        : 5;
      if (coinData.is_main_token === true) {
        //   add 5
        totalPoint += isMainTokenPoint;
      }
      let hasEnoughUtilityPoint = tokenomicsControl
        ? Number(tokenomicsControl.has_enough_utils_score) || 5
        : 5;
      if (coinData.has_enough_utility === "yes") {
        //   add 5
        totalPoint += hasEnoughUtilityPoint;
      }
      let deflationaryPoint = tokenomicsControl
        ? Number(tokenomicsControl.token_type_deflationary_score) || 5
        : 5;
      if (coinData.token_type === "deflationary") {
        //   add 5
        totalPoint += deflationaryPoint;
      }
      let hasDaoPoint = tokenomicsControl
        ? Number(tokenomicsControl.has_dao_score) || 1
        : 1;
      if (coinData.has_dao === true) {
        //   add 1
        totalPoint += hasDaoPoint;
      }
      // get token indicators score
      for (let i = 0; i < coinData.allocation_data.length; i++) {
        if (
          positiveControlIndicators.includes(
            coinData.allocation_data[i].name
          ) ||
          positivetiveIndexes.includes(coinData.allocation_data[i].name)
        ) {
          positivePercentageScoreArray.push(
            coinData.allocation_data[i].percentage
          );
        }
        if (
          negativeControlIndicators.includes(
            coinData.allocation_data[i].name
          ) ||
          negativeIndexes.includes(coinData.allocation_data[i].name)
        ) {
          negativePercentageScoreArray.push(
            coinData.allocation_data[i].percentage
          );
        }
      }
      // get sums of negative and positives

      positiveSum =
        positivePercentageScoreArray.length !== 0
          ? positivePercentageScoreArray.reduce(function (a, b) {
              return a + b;
            })
          : 0;
      negativeSum =
        negativePercentageScoreArray.length !== 0
          ? negativePercentageScoreArray.reduce(function (a, b) {
              return a + b;
            })
          : 0;

      //   compare sum values and increment total point as required
      if (negativeSum === positiveSum) {
        totalPoint += 40;
        console.log("condition 1");
      }
      if (negativeSum > positiveSum && negativeSum < 70) {
        totalPoint += 0;
        console.log("condition 2");
      }
      if (negativeSum < positiveSum && positiveSum < 70) {
        totalPoint += 50;
        console.log("condition 3");
      }
      if (positiveSum >= 70 && positiveSum < 100) {
        totalPoint += 70;
        console.log("condition 4");
      }
      if (negativeSum >= 70) {
        totalPoint += 0;
        console.log("condition 5");
      }
      if (positiveSum === 100) {
        totalPoint += 80;
        console.log("condition 5");
      }
      console.log(
        "TOTAL POINTS AFTER MAIN INDICATORS ANALYSIS  ========= ",
        totalPoint
      );
      //  check if indicators where passed //
      // define limits
      let lowerLimitForExcellence = tokenomicsControl
        ? Number(tokenomicsControl.lower_limit_for_excellence) || 20
        : 20;
      let upperLimitForGood = tokenomicsControl
        ? Number(tokenomicsControl.upper_limit_for_good) || 70
        : 70;
      let lowerLimitForGood = tokenomicsControl
        ? Number(tokenomicsControl.lower_limit_for_good) || 60
        : 60;
      let upperLimitForFair = tokenomicsControl
        ? Number(tokenomicsControl.upper_limit_for_fair) || 60
        : 60;
      let lowerLimitForFair = tokenomicsControl
        ? Number(tokenomicsControl.lower_limit_for_fair) || 50
        : 50;
      let upperLimitForPoor = tokenomicsControl
        ? Number(tokenomicsControl.upper_limit_for_poor) || 50
        : 50;
      let lowerLimitForPoor = tokenomicsControl
        ? Number(tokenomicsControl.lower_limit_for_poor) || 20
        : 20;
      let upperLimitForVeryPoor = tokenomicsControl
        ? Number(tokenomicsControl.upper_limit_for_vpoor) || 20
        : 20;
      let lowerLimitForVeryPoor = tokenomicsControl
        ? Number(tokenomicsControl.lower_limit_for_vpoor) || 5
        : 5;
      if (totalPoint === 0) {
        return {
          error: false,
          message: "Very Poor",
          data: totalPoint,
        };
      } else if (
        totalPoint >= lowerLimitForVeryPoor &&
        totalPoint <= upperLimitForVeryPoor
      ) {
        return {
          error: false,
          message: "Very Poor",
          data: totalPoint,
        };
      } else if (
        totalPoint > lowerLimitForPoor &&
        totalPoint < upperLimitForPoor
      ) {
        return {
          error: false,
          message: "Poor",
          data: totalPoint,
        };
      } else if (totalPoint === lowerLimitForFair) {
        return {
          error: false,
          message: "fair",
          data: totalPoint,
        };
      } else if (
        totalPoint > lowerLimitForFair &&
        totalPoint < upperLimitForFair
      ) {
        return {
          error: false,
          message: "fair",
          data: totalPoint,
        };
      } else if (
        totalPoint >= lowerLimitForGood &&
        totalPoint < upperLimitForGood
      ) {
        return {
          error: false,
          message: "good",
          data: totalPoint,
        };
      } else if (totalPoint > lowerLimitForExcellence) {
        return {
          error: false,
          message: "excellent",
          data: totalPoint,
        };
      }
    }
  } catch (error) {
    console.error(error);
  }
};
