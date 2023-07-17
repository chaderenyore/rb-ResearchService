const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../services/research.services");
const CommunityDetailsService = require("../services/researchCommunity.service");
const UpdateResearchVerditScore =
  require("../../../../_helpers/research/updateVerditScore").updateVerditSore;

exports.saveCommunitySpiritInfo = async (req, res, next) => {
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
      // check if action is to save as draft
      if (req.query.save_as_draft === "true") {
        // chekc if draft exist
        const draftExist = await new CommunityDetailsService().findOne({
          research_id: req.body.research_id,
          is_draft: true,
        });
        if (draftExist) {
          // update
          const updatedDraftEntry = await new CommunityDetailsService().update(
            { research_id: req.body.research_id, is_draft: true },
            { ...req.body }
          );
          return createResponse(`Draft Saved`, updatedDraftEntry)(res, HTTP.OK);
        } else {
          const dataToCommunitySpirit = {
            research_id: req.body.research_id,
            is_draft: true,
            ...req.body,
          };
          const draftEntry = await new CommunityDetailsService().create(
            dataToCommunitySpirit
          );
          return createResponse(`Draft Saved`, draftEntry)(res, HTTP.OK);
        }
      } else {
        if (req.query.was_draft === "true") {
          // search for draft Com Details
          const communityDetailsDraft =
            await new CommunityDetailsService().findOne({
              research_id: req.body.research_id,
            });
          if (communityDetailsDraft) {
            // update community details
            const updatedCommunityDetails =
              await new CommunityDetailsService().update(
                { research_id: req.body.research_id },
                { ...req.body }
              );
            // save current verdit
            const resultData = {
              type: "team",
              info: {
                team_spirit: req.body.team_spirit,
                community_spirit: req.body.community_spirit,
              },
            };
            const CummulateVerditScore = await UpdateResearchVerditScore(
              req.body.research_id,
              resultData
            );
            return createResponse(`Data Saved`, updatedCommunityDetails)(
              res,
              HTTP.OK
            );
          } else {
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message: "Community Team Spirit Info Draft Does Not Exist",
                  statusCode: HTTP.OK,
                  data: null,
                  code: HTTP.OK,
                },
              ])
            );
          }
        } else {
          // check if data exist for this research
          const researchTeamInfoExist =
            await new CommunityDetailsService().findOne({
              research_id: req.body.research_id,
              is_draft: false,
            });
          if (researchTeamInfoExist) {
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message: "Research Team Info Exists",
                  statusCode: HTTP.OK,
                  data: null,
                  code: HTTP.OK,
                },
              ])
            );
          } else {
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
            // save current verdit
            const resultData = {
              type: "team",
              info: {
                team_spirit: req.body.team_spirit,
                community_spirit: req.body.community_spirit,
              },
            };
            const CummulateVerditScore = await UpdateResearchVerditScore(
              req.body.research_id,
              resultData
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
