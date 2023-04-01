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
        message: "Tokenomics Very Very Bad",
        data: totalPoint,
      };
    } else if (totalPoint <= 5) {
      return {
        message: "Tokenomics Very Poor",
        data: totalPoint,
      };
    } else if (totalPoint <= 10) {
      return {
        message: "Tokenomics Fair",
        data: totalPoint,
      };
    } else if (totalPoint >= 15) {
      return {
        message: "Tokenomics Good",
        data: totalPoint,
      };
    } else if (totalPoint === 20) {
      return {
        message: "Tokenomics Excellent",
        data: totalPoint,
      };
    }
  } catch (error) {
    console.error(error);
  }
};
