const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const DoPremCheck =
  require("../../../../_helpers/research/doPremCheck").doPremCheck;
const UpdateResearchVerditScore =
  require("../../../../_helpers/research/updateVerditScore").updateVerditSore;
const ResearchService = require("../../research/services/research.services");
const logger = require("../../../../../logger.conf");
const PremCheckService = require("../services/premCheck.service");
const KEYS = require("../../../../_config/keys");

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
    // check if premcheck is independent to be used as a tool
    if (req.query.is_independent === "true") {
      const coinData = {
        twitter_account_age,
        twitter_createdAt,
        date_of_project_launch,
        project_status,
        last_tweet_date,
        is_social_media_active,
      };
      const { message, data } = await DoPremCheck(coinData);
      const premCheckResults = {
        research_id: newResearch._id,
        premCheckResult: {
          verdit: message,
          data: {
            totalPoint: data,
          },
        },
      };
      return createResponse(`${message}`, premCheckResults)(res, HTTP.OK);
    } else {
      if (was_draft === true) {
        // search for draft Premcheck
        const draftPrmeCheck = await new PremCheckService().update(
          {
            research_id: req.body.research_id,
          },
          { is_draft: false, ...req.body }
        );
        // update info and do prem check
        if (draftPrmeCheck) {
          // get Prem check results from criteria
          const coinData = {
            twitter_createdAt:
              draftPrmeCheck.twitter_createdAt || twitter_createdAt,
            twitter_account_age:
              draftPrmeCheck.twitter_account_age || twitter_account_age,
            date_of_project_launch:
              draftPrmeCheck.date_of_project_launch || date_of_project_launch,
            project_status: draftPrmeCheck.project_status || project_status,
            last_tweet_date: draftPrmeCheck.last_tweet_date || last_tweet_date,
            is_social_media_active:
              draftPrmeCheck.is_social_media_active || is_social_media_active,
          };
          const { message, data } = await DoPremCheck(coinData);
          const premCheckResults = {
            research_id: newResearch._id,
            premCheckResult: {
              verdit: message,
              data: {
                totalPoint: data,
              },
            },
          };
          return createResponse(`${message}`, premCheckResults)(res, HTTP.OK);
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
        // Get user Info for creating premcheck
        const user = await axios.get(
          `${KEYS.USER_SERVICE_URI}/users/v1/user/${req.user.user_id}?platform=web`,
          {
            headers: {
              Authorization: `Bearer ${req.token}`,
            },
          }
        );
        console.log("USER DETAILS ====== ", user.data.data)
        if (user && user.data && user.data.code === 200) {
          // Create Research with tags supplied
          const dataToResearch = {
            researcher_id: req.user.user_id,
            researcher_username: user.data.data.username
              ? user.data.data.username
              : "",
            researcher_firstname: user.data.data.first_name
              ? user.data.data.first_name
              : "",
            researcher_lastame: user.data.data.last_name
              ? user.data.data.last_name
              : "",
            poster_id: req.user.user_id,
            researcher_image_url: user.data.data.image
              ? user.data.data.image
              : "",
            is_draft: false,
            is_launched: false,
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
              twitter_createdAt,
              date_of_project_launch,
              project_status,
              last_tweet_date,
              is_social_media_active,
            };
            const { message, data } = await DoPremCheck(coinData);
            const premCheckResults = {
              research_id: newResearch._id,
              premCheckResult: {
                verdit: message,
                data: {
                  totalPoint: data,
                },
              },
            };
            // send current verdit to research service
            const resultData = { type: "prem", grade: message };
            const CummulateVerditScore = await UpdateResearchVerditScore(
              newResearch._id,
              resultData
            );
            console.log("RESEARCH UPDATED ======= ", CummulateVerditScore);
            return createResponse(`${message}`, premCheckResults)(res, HTTP.OK);
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
