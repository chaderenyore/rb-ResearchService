// import control
const PremCheckControl = require("../../app/modules/adminControl/services/premCheckControl.service");
const calculateAge = require("./ageCalculator").calculateAge;

exports.doPremCheck = async (coinData) => {
  try {
    // points tracker
    let totalPoint = 0;
    let passMark;
    // retrieve control
    const premCheckControl = await new PremCheckControl().findOne({
      name: "premCheck",
    });
    if (premCheckControl && Number(premCheckControl.total_pass_mark)) {
      passMark = Number(premCheckControl.total_pass_mark)
    }
    // calculate age form twitter cretaedAt
    const TwitterAgeInMonths = await calculateAge(coinData.twitter_createdAt);
    const LaunchDateAgeInMonths = await calculateAge(
      coinData.date_of_project_launch
    );
    if (
      TwitterAgeInMonths.ageConvertedToMonths ||
      LaunchDateAgeInMonths.ageConvertedToMonths
    ) {
      let twitterAgeLimit = premCheckControl ? Number(premCheckControl.twitter_age_limit) || 4 : 4;
      let launchAgeLimit = premCheckControl ? Number(premCheckControl.launch_age_limit) || 4 : 4;
      let agePoint = premCheckControl ? Number(premCheckControl.twitter_age_point) || Number(premCheckControl.launch_age_point) || 45 : 45;
      if (
        TwitterAgeInMonths.ageConvertedToMonths >= twitterAgeLimit ||
        LaunchDateAgeInMonths.ageConvertedToMonths >= launchAgeLimit
      ) {
        // add points here as required
        totalPoint += agePoint;
      }
    }
    let socialMediaActivePoint = premCheckControl ? Number(premCheckControl.active_on_social_media_point) || 25 : 25;
    if (coinData.is_social_media_active == true) {
      //   add points as required here
      totalPoint += socialMediaActivePoint;
    }
    let lastTweetLimit = premCheckControl ? Number(premCheckControl.lastTweetTimeInDays_limit) || 30 : 30;
    let lastTweetTimePoints = premCheckControl ? Number(premCheckControl.lastTweetTimeInDays_point) || 10 : 10;
    // get last tweet timeline
    const LastTweetTimeInDays = await calculateAge(coinData.last_tweet_date)
      .ageConvertedToDays;
    if (LastTweetTimeInDays && LastTweetTimeInDays < lastTweetLimit) {
      totalPoint += lastTweetTimePoints;
    }
    let projectStatusPoint = premCheckControl ? Number(premCheckControl.project_satus_point) || 20 : 20;
    if (coinData.project_status === "yes") {
      totalPoint += projectStatusPoint;
    }
    // check for points and return acoridngly
    if (totalPoint >= (passMark || 60)) {
      return {
        message: "pass",
        accountAge: TwitterAgeInMonths.fullAge,
        data: totalPoint,
      };
    } else {
      return {
        message: "fail",
        accountAge: TwitterAgeInMonths.fullAge,
        data: totalPoint,
      };
    }
  } catch (error) {
    console.error(error);
  }
};
