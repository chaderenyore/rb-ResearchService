// import map control
const PremCheckMaps = require("./tokenomicsIndicator");
const calculateAge = require("./ageCalculator").calculateAge
exports.doPremCheck = async (coinData) => {
  try {
    // points tracker
    let  totalPoint = 0
    const passMark = 60;
    // calculate age form twitter cretaedAt
    const TwitterAgeInMonths = await calculateAge(coinData.twitter_createdAt);
    const LaunchDateAgeInMonths = await calculateAge(coinData.date_of_project_launch);

    if(TwitterAgeInMonths.ageConvertedToMonths || LaunchDateAgeInMonths.ageConvertedToMonths ){
      if (TwitterAgeInMonths.ageConvertedToMonths >= 4 || LaunchDateAgeInMonths.ageConvertedToMonths >= 4) {
        // add points here as required
       totalPoint += 40;
      }
    }
    if (coinData.is_social_media_active == true) {
      //   add points as required here
      totalPoint += 20
    }
    // get last tweet timeline
    const LastTweetTimeInDays = await calculateAge(coinData.last_tweet_date).ageConvertedToDays;
    if(LastTweetTimeInDays && LastTweetTimeInDays < 30){
        totalPoint += 10
    }
    if(coinData.project_status === "yes"){
        totalPoint += 30
    }
    // check for points and return acoridngly
    if (totalPoint >= 60) {
      return {
        message: "pass",
        data: totalPoint,
      };
    } else {
      return {
        message: "fail",
        data: totalPoint,
      };
    }
  } catch (error) {
    console.error(error);
  }
};
