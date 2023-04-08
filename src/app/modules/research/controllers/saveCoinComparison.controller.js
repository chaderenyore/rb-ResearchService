const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../services/research.services");
const ResearchComparisonService = require("../services/comparison.services");
const UpdateResearchVerditScore =
  require("../../../../_helpers/research/updateVerditScore").updateVerditSore;
exports.saveResearchComparisonInfo = async (req, res, next) => {
  try {
    // check if comparison exist for this research
    const researchComparisExist =
      await new ResearchComparisonService().findOne({
        research_id: req.body.research_id, is_draft:false
      });
    if (researchComparisExist) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Research Comparison Exists",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // check if action is to save as draft
      if (req.query.save_as_draft === true) {
        const dataToComparison = {
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
              research_id: req.body.research_id, is_draft:true
            });
          if (researchComparisonDraft) {
            // update community details
            const updatedResearchComparison =
              await new ResearchComparisonService().update(
                { research_id: req.body.research_id },
                { ...req.body }
              );
            // update Research
            const updateData = {
              research_price: req.body.main_coin_info.current_price,
              potential_return: req.body.main_coin_info.average_return,
            };
            const updatedResearch = await new ResearchService().update(
              {
                _id: req.body.research_id,
              },
              updateData
            );
            return createResponse(
              `Coin Comparison Data Saved`,
              updatedResearchComparison
            )(res, HTTP.OK);
          }
        } else {
          // search for research
          const research = await new ResearchService().findAResearch({
            _id: req.body.research_id,
          });
          if (research) {
            // create Community Detail  entry
            const dataToResearchComparison = {
              research_id: req.body.research_id,
              main_coin_name: research.coin_name,
              is_draft: false,
              ...req.body,
            };
            const newRsearchComparisonData =
              await new ResearchComparisonService().create(
                dataToResearchComparison
              );
            // update Research
            const updateData = {
              research_price: req.body.main_coin_info.current_price,
              potential_return: req.body.main_coin_info.average_return,
            };
            const updatedResearch = await new ResearchService().update(
              {
                _id: req.body.research_id,
              },
              updateData
            );
            // save current verdit
            const resultData = { type: "comparison", grade: req.body.main_coin_info.average_return };
            const CummulateVerditScore = await UpdateResearchVerditScore(
              req.body.research_id,
              resultData
            );
            console.log("RESEARCH UPDATED ======= ", CummulateVerditScore);
            return createResponse(
              `Coin Comparison Data Saved`,
              newRsearchComparisonData
            )(res, HTTP.OK);
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
