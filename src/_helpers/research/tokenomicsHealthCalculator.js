const AllPuposeIndicator = require("./tokenomicsIndicator");

exports.computeTokenomicsHealth = async (coinData) => {
  try {
    console.log("COIN DATA =============== ", coinData);
    let positivetiveIndexes = AllPuposeIndicator.positivetiveIndicators,
      negativeIndexes = AllPuposeIndicator.negativeIndicators,
      negativePercentageScoreArray = [],
      positivePercentageScoreArray = [],
      negativeSum,
      positiveSum,
      totalPoint = 0;
    // check if allocation data was passed
    if (coinData.allocation_data && coinData.allocation_data.length === 0) {
      return {
        error: true,
        message: "Please Pass Valid Tokenomics indicators",
        data: {},
      };
    } else {
      // get first step data from coinData and compute score
      if (Number(coinData.number_of_tradeable_tokens)) {
        // increase total points by value
        totalPoint += Number(coinData.number_of_tradeable_tokens);
      }
      if (coinData.is_main_token === true) {
        //   add 5
        totalPoint += 5;
      }
      if (coinData.has_enough_utility === "yes") {
        //   add 5
        totalPoint += 5;
      }
      if (coinData.token_type === "deflationary") {
        //   add 5
        totalPoint += 5;
      }
      if (coinData.has_dao === true) {
        //   add 1
        totalPoint += 1;
      }
      console.log("TOTAL POINT ============ ", totalPoint);
      // get token indicators score
      for (let i = 0; i < coinData.allocation_data.length; i++) {
        if (positivetiveIndexes.includes(coinData.allocation_data[i].name)) {
          positivePercentageScoreArray.push(
            coinData.allocation_data[i].percentage
          );
        }
        if (negativeIndexes.includes(coinData.allocation_data[i].name)) {
          negativePercentageScoreArray.push(
            coinData.allocation_data[i].percentage
          );
        }
      }
      console.log(
        "Positive Indicator Passed =================== ",
        positivePercentageScoreArray
      );
      console.log(
        "Negative Indicator Passed =================== ",
        negativePercentageScoreArray
      );
      // get sums of negative and positives
      console.log("POSITIVE SUM LENGTH ========= ", positivePercentageScoreArray.length !== 0);
    
        positiveSum = (positivePercentageScoreArray.length !== 0) ? positivePercentageScoreArray.reduce(function (a, b) {
          return a + b;
        }): 0;
        negativeSum = (negativePercentageScoreArray.length !== 0) ? negativePercentageScoreArray.reduce(function (a, b) {
          return a + b;
        }) : 0;
        console.log("NEGATIVE SUM ============ ", negativeSum);
        console.log("PositIVE SUM ============ ", positiveSum);

        //   compare sum values and increment total point as required
        if (negativeSum === positiveSum) {
          totalPoint += 40;
          console.log("condition 1")
        }
        if (negativeSum > positiveSum && negativeSum < 70) {
          totalPoint += 0;
          console.log("condition 2")
        }
        if (negativeSum < positiveSum && positiveSum < 70) {
          totalPoint += 50;
          console.log("condition 3")
        }
        if (positiveSum >= 70 && positiveSum < 100) {
          totalPoint += 70;
          console.log("condition 4")
        }
        if (negativeSum >= 70) {
          totalPoint += 0;
          console.log("condition 5")
        }
        if (positiveSum === 100) {
          totalPoint += 80;
          console.log("condition 5")
        }
        console.log(
          "TOTAL POINTS AFTER MAIN INDICATORS ANALYSIS  ========= ",
          totalPoint
        );
      
      //  check if indicators where passed //
      if (totalPoint === 0) {
        return {
          error: false,
          message: "Very Poor",
          data: totalPoint,
        };
      } else if (totalPoint >= 5 && totalPoint <= 20) {
        return {
          error: false,
          message: "Very Poor",
          data: totalPoint,
        };
      } else if (totalPoint > 20 && totalPoint < 50) {
        return {
          error: false,
          message: "Poor",
          data: totalPoint,
        };
      } else if (totalPoint === 50) {
        return {
          error: false,
          message: "Fair",
          data: totalPoint,
        };
      } else if (totalPoint > 50 && totalPoint < 60) {
        return {
          error: false,
          message: "Fair",
          data: totalPoint,
        };
      } else if (totalPoint >= 60 && totalPoint < 70) {
        return {
          error: false,
          message: "Good",
          data: totalPoint,
        };
      } else if (totalPoint > 70) {
        return {
          error: false,
          message: "Excellent",
          data: totalPoint,
        };
      }
    }
  } catch (error) {
    console.error(error);
  }
};
