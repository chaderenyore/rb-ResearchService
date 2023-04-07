const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ResearchService = require("../services/research.services");
const SavedResearchService = require("../../CommunityResearch/services/savedResearch.services");
const CommunityResearchService = require("../../CommunityResearch/services/communityResearch.services");
const logger = require("../../../../../logger.conf");

exports.updateResearchInfo = async (req, res, next) => {
  try {
    // check if same parameters where inputed
    if (Object.entries(req.body).length > 0 === false) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Fields Marked For Update",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      const research = await new ResearchService().findAResearch({
        _id: req.params.research_id,
        researcher_id: req.user.user_id,
      });
      if (!research) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "Research Does Not Exist/UnAuthorised",
              statusCode: HTTP.OK,
              data: {},
              code: HTTP.OK,
            },
          ])
        );
      } else {
        const dataToUpdateResearch = {
          was_edited: true,
          ...req.body,
        };
        const updatedResearch = await new ResearchService().update(
          { _id: req.params.research_id, researcher_id: req.user.user_id },
          dataToUpdateResearch
        );
        //  update community research
        const dataToUpdateCommunity = {
          was_edited: true,
          ...req.body,
        };
        const researchInCommunity = await new CommunityResearchService().update(
          { original_research_id: req.params.research_id, researcher_id: req.user.user_id },
          dataToUpdateCommunity
        );

        const dataToUpdateSavedResearch = {
            was_edited: true,
            ...req.body,
          };
          const researchInSavedCOllection = await new SavedResearchService().updateMany(
            { original_research_id: req.params.research_id, researcher_id: req.user.user_id },
            dataToUpdateSavedResearch
          );
        return createResponse(`Research Updated`, updatedResearch)(res, HTTP.OK);
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
