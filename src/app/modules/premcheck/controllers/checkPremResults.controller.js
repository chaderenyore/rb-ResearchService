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
      research_label,
      twitter_url,
      twitter_account_age,
      twitter_createdAt,
      date_of_project_launch,
      project_status,
      project_about,
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
      const { message, data, accountAge } = await DoPremCheck(coinData);
      const premCheckResults = {
        premCheckResult: {
          verdict: message,
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
          const { message, data, accountAge } = await DoPremCheck(coinData);
          const premCheckResults = {
            research_id: req.body.research_id,
            premCheckResult: {
              verdict: message,
              data: {
                totalPoint: data,
              },
            },
          };
          // update Research
          const updatedResearch = await new ResearchService().update(
            { _id: req.body.research_id },
            { ...req.body, age: accountAge, preliminary_score:message}
          );
          // send current verdit to research service
          const resultData = { type: "prem", grade: message };
          const CummulateVerditScore = await UpdateResearchVerditScore(
            updatedResearch._id,
            resultData
          );
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
            researcher_lastname: user.data.data.last_name
              ? user.data.data.last_name
              : "",
            poster_id: req.user.user_id,
            researcher_image_url: user.data.data.image
              ? user.data.data.image
              : "",
            is_draft: true,
            is_visible: req.body.is_visible,
            is_launched: false,
            coin_image,
            coin_name,
            project_about,
            research_label,
            is_working_product:
              req.body.project_status === "yes" ? "true" : "false",
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
              project_about: req.body.project_about,
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
            const { message, data, accountAge } = await DoPremCheck(coinData);
            const premCheckResults = {
              research_id: newResearch._id,
              premCheckResult: {
                verdict: message,
                data: {
                  totalPoint: data,
                },
              },
            };
            // update Research Age Info
            const updatedResearchAge = await new ResearchService().update({_id:  newResearch._id}, {age: accountAge,preliminary_score:message})
            // send current verdit to research service
            const resultData = { type: "prem", grade: message };
            const CummulateVerditScore = await UpdateResearchVerditScore(
              newResearch._id,
              resultData
            );
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
