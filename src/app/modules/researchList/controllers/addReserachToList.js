const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ResearchListService = require("../services/researchList.services");
const ResearchService = require("../../research/services/research.services");
const CommunityResearchService = require("../../communityresearchmodule/services/communityResearch.services");

exports.addResearchToList = async (req, res, next) => {
  try {
    //   check if research exists
    const researchExist = await new ResearchService().findAResearch({
      community_id: req.body.research_community_id,
      researcher_id: req.user.user_id,
    });
    if (!researchExist) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Thsi Research Does Not Exists/ UnAuthorised",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {
      //  check if lst is valid/exists
      const listIsValid = await new ResearchListService().findARecord({
        _id: req.body.list_id,
      });
      if (!listIsValid) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "List Invalid. Please Creata To Continue",
              statusCode: HTTP.Ok,
              data: {},
              code: HTTP.Ok,
            },
          ])
        );
      } else {
        // update Research with List id
        const updatedResearch = await new ResearchService().update(
          { community_id: req.body.research_community_id },
          { research_list_id: listIsValid._id }
        );
        // update community service
        const updatedCommunityResearch =
          await new CommunityResearchService().update(
            { community_id: req.body.research_community_id },
            { research_list_id: listIsValid._id }
          );
        if (updatedCommunityResearch && updatedResearch) {
          return createResponse(
            `Research Added To ${listIsValid.list_title} List`,
            updatedResearch
          )(res, HTTP.OK);
        }
      }
    }
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
