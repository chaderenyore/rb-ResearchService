const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../../Research/services/research.services");
const ResearchComparisonService = require("../services/comparison.services");

exports.saveResearchComparisonInfo = async (req, res, next) => {
  try {
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
            research_id: req.body.research_id,
          });
        if (researchComparisonDraft) {
          // update community details
          const updatedResearchComparison =
            await new ResearchComparisonService().update(
              { research_id: research_id },
              { ...req.body }
            );
          return createResponse(`Data Saved`, updatedResearchComparison)(
            res,
            HTTP.OK
          );
        }
      }
      // search for research
      const research = await new ResearchService().findAResearch({
        _id: req.body.research_id,
      });
      if (research) {
        // create Community Detail  entry
        const dataToResearchComparison = {
          research_id: research_id,
          is_draft: false,
          ...req.body,
        };
        const newRsearchComparisonData =
          await new ResearchComparisonService().create(
            dataToResearchComparison
          );
        return createResponse(`Data Saved`, newRsearchComparisonData)(
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
