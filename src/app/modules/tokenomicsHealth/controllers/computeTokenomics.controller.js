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
const TokenomicsAllocationService = require("../services/tokenomicsAllocation.services");

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
      utility,
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
            reserve: reservedPercentage,
          },
        };
        return createResponse(`${message}`, tokenomicsResults)(res, HTTP.OK);
      }
    } else {
      // validate Allocation percnetage and get rserved percentage
      let totalPercentage = 0;
      let reservedPercentage;
      let newAllocatioonDataArr = [];
      // Search For allocation data
      console.log("ALLOCATION DATA =====", allocation_data);
      for (let i = 0; i < allocation_data.length; i++) {
        const allocationDataExists =
          await new TokenomicsAllocationService().findOne({
            research_id: research_id,
            indicator_name: allocation_data[i].name,
          });
        console.log("ALLOCATION Data ===== ", allocationDataExists);
        if (allocationDataExists) {
          console.log(
            "ALOCATION ITEM PERCENTAGE ======= ",
            allocation_data[i].percentage
          );
          // add total up
          const dataToAdd =
            Number(allocationDataExists.indicator_percentage) ||
            Number(allocation_data[i].percentage);
          totalPercentage += dataToAdd;
          console.log(
            "total Percentage for Allocation Exits ",
            totalPercentage
          );
          // update
          const updateData = {
            indicator_percentage: allocation_data[i].percentage,
            indicator_total_allocation: allocation_data[i].total_allocation,
          };
          const UpdatedTokenomicsAllocation =
            await new TokenomicsAllocationService().update(
              {
                research_id: research_id,
                indicator_name: allocation_data[i].name,
              },
              updateData
            );
        } else {
          // add up total
          totalPercentage += Number(allocation_data[i].percentage);
          console.log("TOTAL PERCENTAGE FOR NEW ALLOCATION ", totalPercentage);
          // add to newAlocation arr
          newAllocatioonDataArr.push({
            research_id: research_id,
            indicator_name: allocation_data[i].name,
            indicator_percentage: allocation_data[i].indicator_percentage,
            indicator_total_allocation:
              allocation_data[i].indicator_total_allocation,
          });
        }
      }
      if (totalPercentage > 100) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message:
                "Tokenomics Perentage Has Exceeded 100, please re-compute",
              statusCode: HTTP.OK,
              data: {},
              code: HTTP.OK,
            },
          ])
        );
      } else {
        if (totalPercentage < 100) {
          console.log("total Percentage Less Than 100");
          reservedPercentage = 100 - Number(totalPercentage);
        }
        // save Allocation data
        for(let i = 0; i < newAllocatioonDataArr.length; i++){
          const NewTokenomicsAllocation =
          await new TokenomicsAllocationService().create(newAllocatioonDataArr[i]);
        }
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
                {
                  is_draft: false,
                  ...req.body,
                  reserve_allocation: reservedPercentage,
                }
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
                    reserve: reservedPercentage,
                  },
                };
                // update base research
                const dataToUpdateResearch = {
                  research_price,
                };
                const updatedResearch = await new ResearchService().update(
                  {
                    _id: research_id,
                    researcher_id: req.user.user_id,
                  },
                  dataToUpdateResearch
                );
                console.log("UPDATE RESEARCH ====== ", updatedResearch);
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
              utility,
              allocation_data,
              has_dao,
              reserve_allocation: reservedPercentage,
              is_draft: false,
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
                  reserve: reservedPercentage,
                },
              };
              // update base research
              const dataToUpdateResearch = {
                tokenomics_rating: message,
              };
              const updatedResearch = await new ResearchService().update(
                {
                  _id: research_id,
                  researcher_id: req.user.user_id,
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
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
