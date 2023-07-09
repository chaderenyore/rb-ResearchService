exports.computePotentialReturn = async (
  main_coin_market_cap,
  comparisonsCoinsInfo
) => {
  try {
    let verdictMessage;
    let AVR;
    let sumOfPR;
    let totalPR = [];
    let comparisonInfo = [];
    console.log("COINS COMPARISON LENGTH ==== ", comparisonsCoinsInfo.length);
    for (let i = 0; i < comparisonsCoinsInfo.length; i++) {
      let PR = comparisonsCoinsInfo[i].market_cap / main_coin_market_cap;
      totalPR.push(PR);
      console.log("PR   === ", PR);
      console.log("TOTAL PR   === ", totalPR);

      console.log(
        "ComparisonCoinsData  ===== ",
        comparisonsCoinsInfo[i].coin_name
      );
      let coinEntry = {};
      coinEntry[comparisonsCoinsInfo[i].coin_name] = `${PR}x`;
      comparisonInfo.push(coinEntry);
      console.log(" comparisonInfo  === ", comparisonInfo);
    }
    // take the average potential return
    sumOfPR = totalPR.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    console.log("SUM OF AVRS  ======= ", sumOfPR);
    AVR = sumOfPR / comparisonsCoinsInfo.length;
    console.log("AVR ===== ", AVR);
    // set AVR in return data
    if (AVR >= 4) {
      verdictMessage = "Looks Good!!";
    }
    if (AVR >= 5) {
      verdictMessage = "You Have Found A Gem!!";
    }
    if (AVR < 4) {
        verdictMessage = "Opps...Not To Good, Wish To Continue??!!";
      }
    const returnData = {
      coins_comparisons_info: comparisonInfo,
      main_coin_AVR: AVR.toFixed(2),
      verdict: verdictMessage,
    };

    return returnData;
  } catch (error) {
    console.log(error);
  }
};
