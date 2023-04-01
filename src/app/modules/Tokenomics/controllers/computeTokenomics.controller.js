const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ComputeTokenomicsHealth =
  require("../../../../_helpers/research/computeTokenomicsHealth").computeTokenomicsHealth;
const ResearchService = require("../../Research/services/research.services");
const logger = require("../../../../../logger.conf");
const TokenomicsService = require("../services/tokenomics.service");

exports.computeTokenomics = async (req, res, next) => {
  try {
    // get body data
    const {
      coin_name,
      research_id,
      number_of_tradeable_tokens,
      is_main_token,
      has_enough_utility,
      token_type,
      circulating_supply,
      total_supply,
      max_supply,
      purpose,
      has_dao,
      was_draft,
      tags,
    } = req.body;

    if (was_draft === true) {
      // search for draft Tokenomics
      const draftTokenomics = await new TokenomicsService().findOne({
        research_id: research_id,
      });
      // update info and compute tokenomics check
      if (draftTokenomics) {
        // update Tokenomics Data
        const updateTokenomics = await new TokenomicsService().update({researcher_id: research_id},
            {...req.body})
        // get Prem check results from criteria
        const coinData = {
          twitter_account_age,
          number_of_tradeable_tokens,
          is_main_token,
          has_enough_utility,
          token_type,
          circulating_supply,
          total_supply,
          max_supply,
          purpose,
          has_dao,
        };
        const { message, data } = await ComputeTokenomicsHealth(coinData);
        const premCheckResults = {
          research_id: research_id,
          tokenomicsResults: {
            message,
            score: data,
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
      // get associated Research
      const research = await new ResearchService().findAResearch({
        research_id: research_id,
      });
      if (research) {
        // create tokenomics
        const dataToTokenomics = {
          research_id: research_id,
          number_of_tradeable_tokens,
          is_main_token,
          has_enough_utility,
          token_type,
          circulating_supply,
          total_supply,
          max_supply,
          purpose,
          has_dao,
        };
        const researchTokenomics = await new TokenomicsService().create(
          dataToTokenomics
        );
        // get Prem check results from criteria
        const coinData = {
          number_of_tradeable_tokens,
          is_main_token,
          has_enough_utility,
          token_type,
          circulating_supply,
          total_supply,
          max_supply,
          purpose,
          has_dao,
        };
        const { message, data } = await ComputeTokenomicsHealth(coinData);
        const tokenomicsResults = {
          research_id: research_id,
          tokenomicsResults: {
            message,
            score: data,
          },
        };
        return createResponse(`${message}`, tokenomicsResults)(res, HTTP.OK);
      }
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
