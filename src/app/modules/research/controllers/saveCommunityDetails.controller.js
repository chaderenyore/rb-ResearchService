const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../services/research.services");
const CommunityDetailsService = require("../services/researchCommunity.service");

exports.saveCommunitySpiritInfo = async (req, res, next) => {
  try {
    // check if data exist for this research
    const researchTeamInfoExist = await new CommunityDetailsService().findOne({
      research_id: req.body.research_id,
      is_draft: false,
    });
    if (researchTeamInfoExist) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Research Team Info Exist Exists",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // check if action is to save as draft
      if (req.query.save_as_draft === true) {
        const dataToCommunitySpirit = {
          is_draft: true,
          ...req.body,
        };
        const draftEntry = await new CommunityDetailsService().create(
          dataToCommunitySpirit
        );
        return createResponse(`Draft Saved`, draftEntry)(res, HTTP.OK);
      } else {
        if (req.body.was_draft === true) {
          // search for draft Com Details
          const communityDetailsDraft =
            await new CommunityDetailsService().findOne({
              research_id: req.body.research_id,
            });
          if (communityDetailsDraft) {
            // update community details
            const updatedCommunityDetails =
              await new CommunityDetailsService().update(
                { research_id: research_id },
                { ...req.body }
              );
            return createResponse(`Data Saved`, updatedCommunityDetails)(
              res,
              HTTP.OK
            );
          }
        } else {
          // search for research
          const research = await new ResearchService().findAResearch({
            _id: req.body.research_id,
          });
          if (research) {
            // create Community Detail  entry
            const dataToCommunityDetails = {
              research_id: req.body.research_id,
              is_draft: false,
              ...req.body,
            };
            const newCommunityDetailsData =
              await new CommunityDetailsService().create(
                dataToCommunityDetails
              );
            return createResponse(`Data Saved`, newCommunityDetailsData)(
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
