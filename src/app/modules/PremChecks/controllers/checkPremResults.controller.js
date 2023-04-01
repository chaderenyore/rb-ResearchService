const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const DoPremCheck =
  require("../../../../_helpers/research/doPremCheck").doPremCheck;
const ResearchService = require("../../Research/services/research.services");
const logger = require("../../../../../logger.conf");
const PremCheckService = require("../services/premCheck.service");

exports.premCheck = async (req, res, next) => {
  try {
    // get body data
    const {
      coin_name,
      twitter_url,
      twitter_account_age,
      twitter_createdAt,
      date_of_project_launch,
      project_status,
      last_tweet_date,
      is_social_media_active,
      tags,
      was_draft,
    } = req.body;
    if (was_draft === true) {
      // search for draft Premcheck
      const draftPrmeCheck = await new PremCheckService().findOne({
        research_id: req.body.research_id,
      });
      // update info and do prem check
      if (draftPrmeCheck) {
        // get Prem check results from criteria
        const coinData = {
          twitter_account_age,
          date_of_project_launch,
          project_status,
          last_tweet_date,
          is_social_media_active,
        };
        const { message, data } = await DoPremCheck(coinData);
        const premCheckResults = {
          research_id: newResearch._id,
          premCheckResult: {
            message,
            data,
          },
        };
        return createResponse(`${message}`, premCheckResults)(
          res,
          HTTP.OK
        );
      } else {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "This Draft Is Invalid",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      }
    } else {
      // Create Research with tags supplied
      const dataToResearch = {
        researcher_id: req.user.user_id,
        coin_name,
        tags,
      };
      const newResearch = await new ResearchService().createResearch(
        dataToResearch
      );
      if (newResearch) {
        // create prem check entry
        const dataToPremCheck = {
          research_id: newResearch._id,
          researcher_id: req.user.user_id,
          twitter_url,
          twitter_account_age,
          twitter_createdAt,
          date_of_project_launch,
          project_status,
          last_tweet_date,
          is_social_media_active,
          is_saved: false,
          tags,
        };
        const researchPremCheck = await new PremCheckService().create(
          dataToPremCheck
        );
        // get Prem check results from criteria
        const coinData = {
          twitter_account_age,
          date_of_project_launch,
          project_status,
          last_tweet_date,
          is_social_media_active,
        };
        const { message, data } = await DoPremCheck(coinData);
        const premCheckResults = {
          research_id: newResearch._id,
          premCheckResult: {
            message,
            data,
          },
        };
        return createResponse(`${message}`, premCheckResults)(
          res,
          HTTP.OK
        );
      }
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
