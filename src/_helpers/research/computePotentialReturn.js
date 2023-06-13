exports.computePotentialReturn = async (
  main_coin_market_cap,
  comparisonsCoinsInfo
) => {
  try {
    let verdictMessage;
    let comparisonInfo;
    let totalPoints = 0;
    for (let i = 0; i < comparisonsCoinsInfo.length; i++) {
      let PR = comparisonsCoinsInfo[i] / main_coin_market_cap;
      comparisonInfo.comparisonsCoinsInfo[i].coin_name = `${PR}x`;
      //   add total points up
      totalPoints += comparisonsCoinsInfo[i].market_cap;
    }
    // take the average potential return
    let AVR = totalPoints / main_coin_market_cap;
    // set AVR in return data
    if (AVR > 4) {
      verdictMessage = "Looks Good!!";
    }
    if (AVR > 5) {
      verdictMessage = "You Have Found A Gem!!";
    }
    comparisonInfo.potential_return = `${AVR}x`;

    return comparisonInfo;
  } catch (error) {
    console.log(error);
  }
};
