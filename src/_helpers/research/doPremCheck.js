// import map control
const PremCheckMaps = require("../../_helpers/research/premCheckMaps");
exports.doPremCheck = async (coinData) => {
  try {
    const totalPoint = 0;
    // TOD ::::::: More Conditions To Be aaded
    if (coinData.twitter_account_age < 2) {
      // add points here as required
      const pointsHere =
        PremCheckMaps.premCheckMaps.is_social_media_active.true;
      totalPoint += pointsHere;
    }
    if (coinData.twitter_account_age > 2) {
      //   add points as required here
      const pointsHere =
        PremCheckMaps.premCheckMaps.is_social_media_active.true;
      totalPoint += pointsHere;
    }
    // check for points and return acoridngly
    if (totalPoint === 0) {
      return {
        message: "Prem Check Very Very Bad",
        data: totalPoint,
      };
    } else if (totalPoint <= 5) {
      return {
        message: "Prem Check Very Poor",
        data: totalPoint,
      };
    } else if (totalPoint <= 10) {
      return {
        message: "Prem Check Fair",
        data: totalPoint,
      };
    } else if (totalPoint >= 15) {
      return {
        message: "Prem Check Good",
        data: totalPoint,
      };
    } else if (totalPoint === 20) {
      return {
        message: "Prem Check Excellent",
        data: totalPoint,
      };
    }
  } catch (error) {
    console.error(error);
  }
};
