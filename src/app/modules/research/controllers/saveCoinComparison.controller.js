const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../services/research.services");
const ResearchComparisonService = require("../services/comparison.services");
const ComputePotentialReturn = require("../../../../_helpers/research/computePotentialReturn");
const UpdateResearchVerditScore =
  require("../../../../_helpers/research/updateVerditScore").updateVerditSore;
exports.saveResearchComparisonInfo = async (req, res, next) => {
  try {
    // check if research exists
    const researchExists = await new ResearchService().findAResearch({
      _id: req.body.research_id,
    });
    if (!researchExists) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Research Does Not Exist",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // compute AVERAGE POTENTIAL RETURN
      const AVRData = await ComputePotentialReturn.computePotentialReturn(
        Number(req.body.main_coin_info.market_cap),
        req.body.reference_coins_data
      );
      console.log("AVR DATA ====== ", AVRData);
      // check if action is to save as draft
      if (req.query.save_as_draft === true) {
        const dataToComparison = {
          average_potential_return_info: AVRData || {},
          main_coin_AVR: AVRData.main_coin_AVR,
          is_draft: true,
          ...req.body,
        };
        const draftEntry = await new ResearchComparisonService().create(
          dataToComparison
        );
        return createResponse(`Draft Saved`, draftEntry)(res, HTTP.OK);
      } else {
        if (req.body.was_draft === true) {
          // search for draft Details
          const researchComparisonDraft =
            await new ResearchComparisonService().findOne({
              research_id: req.body.research_id,
              is_draft: true,
            });
          if (researchComparisonDraft) {
            // update community details
            const updatedResearchComparison =
              await new ResearchComparisonService().update(
                { research_id: req.body.research_id },
                {
                  ...req.body,
                  average_potential_return_info: AVRData,
                  main_coin_AVR: AVRData.main_coin_AVR,
                }
              );
            // update Research
            const updateData = {
              research_price: req.body.main_coin_info.current_price,
              potential_return: AVRData.main_coin_AVR,
            };
            const updatedResearch = await new ResearchService().update(
              {
                _id: req.body.research_id,
              },
              updateData
            );
            // save current verdit
            const resultData = {
              type: "comparison",
              grade: AVRData.main_coin_AVR,
            };
            const CummulateVerditScore = await UpdateResearchVerditScore(
              req.body.research_id,
              resultData
            );
            // dataToReturn
            const dataToReturn = {
              ComparisonData: updatedResearchComparison,
              MainCoinPotentialReturn: `${AVRData.main_coin_AVR}x`,
              Verdict: AVRData.verdict,
            };
            return createResponse(`Coin Comparison Data Saved`, dataToReturn)(
              res,
              HTTP.OK
            );
          } else {
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message: "Coin Comparison Draft Does Not Exist",
                  statusCode: HTTP.OK,
                  data: null,
                  code: HTTP.OK,
                },
              ])
            );
          }
        } else {
          // search if comparison info exist
          const comparisonInfoExists =
            await new ResearchComparisonService().findOne({
              research_id: req.body.research_id,
            });
          if (comparisonInfoExists) {
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message:
                    "This Research Has A Compariosn Info, Retrieve As Draft To Continue Research",
                  statusCode: HTTP.OK,
                  data: null,
                  code: HTTP.OK,
                },
              ])
            );
          } else {
            // create Comparison Detail  entry
            const dataToResearchComparison = {
              research_id: req.body.research_id,
              main_coin_name: researchExists.coin_name,
              is_draft: false,
              average_potential_return_info: AVRData.coins_comparisons_info,
              main_coin_info: AVRData.main_coin_AVR,
              ...req.body,
            };
            const newRsearchComparisonData =
              await new ResearchComparisonService().create(
                dataToResearchComparison
              );
            // update Research
            const updateResearchData = {
              research_price: req.body.main_coin_info.current_price,
              potential_return: AVRData.main_coin_AVR,
            };
            const updatedResearch = await new ResearchService().update(
              {
                _id: req.body.research_id,
              },
              updateResearchData
            );
            // save current verdit
            const resultData = {
              type: "comparison",
              grade: AVRData.main_coin_AVR,
            };
            const CummulateVerditScore = await UpdateResearchVerditScore(
              req.body.research_id,
              resultData
            );
            // dataToReturn
            const dataToReturn = {
              ComparisonData: newRsearchComparisonData,
              MainCoinPotentialReturn: `${AVRData.main_coin_AVR}x`,
              Verdict: AVRData.verdict,
            };
            return createResponse(`Coin Comparison Data Saved`, dataToReturn)(
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
