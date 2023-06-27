const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const logger = require("../../../../../../logger.conf");
const PremCheckControlService = require("../../services/premCheckControl.service");
const TokenomicsControlService = require("../../services/tokenomicsControl.service");


exports.adminFetchAllResearchControl = async (req, res, next) => {
  try {
    let dataToReturn = {};
    let controlsArr = [];
    const premCheckControl = await new PremCheckControlService().all(
      req.query.limit,
      req.query.page,
    );
    const tokenomicsHealthControl = await new TokenomicsControlService().all(
        req.query.limit,
        req.query.page,
      );
    if ((premCheckControl && premCheckControl.data.length === 0) || (tokenomicsHealthControl && tokenomicsHealthControl.data.length === 0)) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Research Controls Yet",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // save tokenomics control object
      const tokenomicsControlObject = {
        _id: tokenomicsHealthControl.data[0]._id || "Using Default",
        admin_username: tokenomicsHealthControl.data[0].admin_username || "Using Default",
        name:tokenomicsHealthControl.data[0].name || "tokenomics",
        controlData: {
          is_main_token_score:tokenomicsHealthControl.data[0].is_main_token_score || 5,
          has_enough_utils_score: tokenomicsHealthControl.data[0].has_enough_utils_score || 5,
          has_dao_score:tokenomicsHealthControl.data[0].has_dao_score || 1, 
          token_type_deflationary_score:tokenomicsHealthControl.data[0].token_type_deflationary_score || 5,
          tradeable_token_score: tokenomicsHealthControl.data[0].tradeable_token_score || 4,
          positive_indicators: tokenomicsHealthControl.data[0].positive_indicators,
          postive_indicators_points:tokenomicsHealthControl.data[0].postive_indicators_points || 80,
          lower_limit_for_excellence: tokenomicsHealthControl.data[0].lower_limit_for_excellence || 70,
          upper_limit_for_good: tokenomicsHealthControl.data[0].upper_limit_for_good || 70,
          lower_limit_for_good: tokenomicsHealthControl.data[0].lower_limit_for_good || 60,
          upper_limit_for_fair: tokenomicsHealthControl.data[0].upper_limit_for_fair || 60,
          lower_limit_for_fair: tokenomicsHealthControl.data[0].lower_limit_for_fair || 50,
          upper_limit_for_poor: tokenomicsHealthControl.data[0].upper_limit_for_poor || 50,
          lower_limit_for_poor: tokenomicsHealthControl.data[0].lower_limit_for_poor || 20,
          upper_limit_for_vpoor: tokenomicsHealthControl.data[0].upper_limit_for_vpoor || 20,
          lower_limit_for_vpoor: tokenomicsHealthControl.data[0].lower_limit_for_vpoor || 5,
        }
      }
      const premCheckControlObject = {
        _id: premCheckControl.data[0]._id || "Using Default",
        admin_username: premCheckControl.data[0].admin_username || "Using Default",
        name: premCheckControl.data[0].name || "premCheck",
        controlData: {
          twitter_age_limit: premCheckControl.data[0].twitter_age_limit || 4,
          launch_age_limit: premCheckControl.data[0].launch_age_limit || 4, 
          lastTweetTimeInDays_limit: premCheckControl.data[0].lastTweetTimeInDays_limit || 30,
          lastTweetTimeInDays_point: premCheckControl.data[0].lastTweetTimeInDays_point || 10,
          launch_age_point: premCheckControl.data[0].launch_age_point || 45, 
          twitter_age_point: premCheckControl.data[0].twitter_age_point || 45, 
          active_on_social_media_point: premCheckControl.data[0].active_on_social_media_point || 25, 
          project_satus_point: premCheckControl.data[0].project_satus_point || 20,
          total_pass_mark: premCheckControl.data[0].total_pass_mark || 60
        }
      }
        controlsArr.push(tokenomicsControlObject);
        controlsArr.push(premCheckControlObject);
        dataToReturn.data = controlsArr;
        dataToReturn.pagination = premCheckControl.pagination;
        dataToReturn.pagination.totalCount = premCheckControl.pagination.totalCount + tokenomicsHealthControl.pagination.totalCount;
        dataToReturn.pagination.pageSize = premCheckControl.pagination.pageSize;
      return createResponse(
        `All Research Controls Retrieved`,
        dataToReturn
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
