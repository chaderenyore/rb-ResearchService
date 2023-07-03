const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ComputeTokenomicsHealth =
  require("../../../../_helpers/research/tokenomicsHealthCalculator").computeTokenomicsHealth;
  const UpdateResearchVerditScore =
  require("../../../../_helpers/research/updateVerditScore").updateVerditSore;
const ResearchService = require("../../research/services/research.services");
const logger = require("../../../../../logger.conf");
const TokenomicsService = require("../services/tokenomics.service");

exports.computeTokenomics = async (req, res, next) => {
  try {
    // get body data
    const {
      research_id,
      number_of_tradeable_tokens,
      is_main_token,
      has_enough_utility,
      token_type,
      research_price,
      circulating_supply,
      total_supply,
      max_supply,
      allocation_data,
      has_dao,
      was_draft,
    } = req.body;
    // check if tokenomics is been used as a tool
    if (req.query.is_independent === "true") {
      // get Tokenomics results from criteria
      const coinData = {
        number_of_tradeable_tokens,
        is_main_token,
        has_enough_utility,
        token_type,
        allocation_data,
        has_dao,
      };
      const { error, message, data } = await ComputeTokenomicsHealth(coinData);
      if (error) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: message,
              statusCode: HTTP.OK,
              data,
              code: HTTP.OK,
            },
          ])
        );
      } else {
        const tokenomicsResults = {
          research_id: research_id,
          tokenomicsResults: {
            message,
            score: data,
          },
        };
        return createResponse(`${message}`, tokenomicsResults)(res, HTTP.OK);
      }
    } else {
      // check if User owns this research
      const isMyResearch = await new ResearchService().findAResearch({
        researcher_id: req.user.user_id,
        _id: String(research_id),
      });
      if (!isMyResearch) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "This Research Does Not Exist/UnAuthorize",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      } else {
        if (was_draft === true) {
          // search for draft Tokenomics
          const draftTokenomics = await new TokenomicsService().findOne({
            research_id: research_id,
            is_draft: true,
          });
          // update info and compute tokenomics check
          if (draftTokenomics) {
            // update Tokenomics Data
            const updateTokenomics = await new TokenomicsService().update(
              { research_id: research_id },
              { is_draft: false, ...req.body }
            );
            // get Prem check results from criteria
            const coinData = {
              number_of_tradeable_tokens,
              is_main_token,
              has_enough_utility,
              token_type,
              allocation_data,
              has_dao,
            };
            const { error, message, data } = await ComputeTokenomicsHealth(
              coinData
            );
            if (error) {
              return next(
                createError(HTTP.OK, [
                  {
                    status: RESPONSE.SUCCESS,
                    message: message,
                    statusCode: HTTP.OK,
                    data,
                    code: HTTP.OK,
                  },
                ])
              );
            } else {
              const tokenomicsResults = {
                research_id: research_id,
                tokenomicsResults: {
                  message,
                  score: data,
                },
              };
              // update base research
              const dataToUpdateResearch = {
                research_price,
              };
              const updatedResearch = await new ResearchService().update(
                {
                  _id: research_id,
                  researcher_id: req.user.user_id
                },
                dataToUpdateResearch
              );
              console.log("UPDATE RESEARCH ====== ", updatedResearch)
              const resultData = { type: "tokenomics", grade: message };
              const CummulateVerditScore = await UpdateResearchVerditScore(
                research_id,
                resultData
              );
              return createResponse(`${message}`, tokenomicsResults)(
                res,
                HTTP.OK
              );
            }
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
              allocation_data,
              has_dao,
              is_draft: false
            };
            const researchTokenomics = await new TokenomicsService().create(
              dataToTokenomics
            );
            // get Tokenomics results from criteria
            const coinData = {
              number_of_tradeable_tokens,
              is_main_token,
              has_enough_utility,
              token_type,
              allocation_data,
              has_dao,
            };
            const { error, message, data } = await ComputeTokenomicsHealth(
              coinData
            );
            if (error) {
              return next(
                createError(HTTP.OK, [
                  {
                    status: RESPONSE.SUCCESS,
                    message: message,
                    statusCode: HTTP.OK,
                    data,
                    code: HTTP.OK,
                  },
                ])
              );
            } else {
              const tokenomicsResults = {
                research_id: research_id,
                tokenomicsResults: {
                  message,
                  score: data,
                },
              };
              // update base research
              const dataToUpdateResearch = {
                tokenomics_rating: message
              };
              const updatedResearch = await new ResearchService().update(
                {
                  _id: research_id,
                  researcher_id:req.user.user_id
                },
                dataToUpdateResearch
              );

              const resultData = { type: "tokenomics", grade: message };
              const CummulateVerditScore = await UpdateResearchVerditScore(
                research_id,
                resultData
              );
              return createResponse(`${message}`, tokenomicsResults)(
                res,
                HTTP.OK
              );
            }
          
        }
      }
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
