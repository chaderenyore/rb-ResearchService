const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
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
      coin_image,
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
            // Get user Info for creating post
    const user = await axios.get(
        `${KEYS.USER_SERVICE_URI}/users/v1/user/${req.user.user_id}?platform=web`,
        {
          headers: {
            Authorization: `Bearer ${req.token}`,
          },
        }
      );
      if (user && user.data && user.data.code === 200) {
              // Create Research with tags supplied
      const dataToResearch = {
        researcher_id: req.user.user_id,
        researcher_username: user.data.data.username ? user.data.data.username : "",
        researcher_firstname: user.data.data.firstname ? user.data.data.firstname : "",
        researcher_lastame: user.data.data.lastname ? user.data.data.lastname : "",
        poster_id: req.user.user_id,
        researcher_image_url: user.data.data.image ? user.data.data.image : "",
        is_draft: false,
        coin_image,
        coin_name,
        ...req.body,
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

    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
