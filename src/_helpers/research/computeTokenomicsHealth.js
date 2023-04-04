exports.computeTokenomicsHealth = async (coinData) => {
  try {
    const thresHold = 0;
    // TOD ::::::: More Conditions To Be aaded
    if (coinData < 2) {
      // add points here as required
      totalPoint += 1;
    }
    // check for points and return acoridngly
    if (totalPoint === 0) {
      return {
        message: "Very Bad",
        data: totalPoint,
      };
    } else if (totalPoint <= 5) {
      return {
        message: "Poor",
        data: totalPoint,
      };
    } else if (totalPoint <= 10) {
      return {
        message: "Fair",
        data: totalPoint,
      };
    } else if (totalPoint >= 15) {
      return {
        message: "Good",
        data: totalPoint,
      };
    } else if (totalPoint === 20) {
      return {
        message: "Excellent",
        data: totalPoint,
      };
    }
  } catch (error) {
    console.error(error);
  }
};
