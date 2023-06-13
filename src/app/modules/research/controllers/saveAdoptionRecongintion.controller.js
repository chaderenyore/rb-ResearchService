const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../services/research.services");
const AdoptionRecognitionService = require("../services/researchAdoption.service");
const UpdateResearchVerditScore =
  require("../../../../_helpers/research/updateVerditScore").updateVerditSore;

exports.saveAdoptionAndRecognitionInfo = async (req, res, next) => {
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
      if (req.query.save_as_draft === true) {
        const dataToAdoptionAndRec = {
          is_draft: true,
          ...req.body,
        };
        const draftEntry = await new AdoptionRecognitionService().create(
          dataToAdoptionAndRec
        );
        return createResponse(`Draft Saved`, draftEntry)(res, HTTP.OK);
      } else {
        if (req.body.was_draft === true) {
          // search for draft Adoption
          const draftAdoption = await new AdoptionRecognitionService().findOne({
            research_id: req.body.research_id,
          });
          if (draftAdoption) {
            // update Adoption And Recognition
            const updatedAdoptiuon =
              await new AdoptionRecognitionService().update(
                { research_id: research_id },
                { is_draft: false, ...req.body }
              );
            // save current verdit
            const resultData = {
              type: "aandd",
              info: {
                has_known_partners: req.body.has_known_partners,
                marketing_stage: req.body.marketing_stage,
                media_link:
                  req.body.partners_info.link_to_partnership_anouncement,
                partner_link: req.body.media_links.link,
              },
            };
            const CummulateVerditScore = await UpdateResearchVerditScore(
              req.body.research_id,
              resultData
            );
            console.log("RESEARCH UPDATED ======= ", CummulateVerditScore);
            return createResponse(`Data Saved`, updatedAdoptiuon)(res, HTTP.OK);
          } else {
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message: "Adoption And Recognition Draft Does Not Exist",
                  statusCode: HTTP.OK,
                  data: null,
                  code: HTTP.OK,
                },
              ])
            );
          }
        } else {
          // search if  info exist
          const AdoptionAndRecognitionInfoExists =
            await new AdoptionRecognitionService().findOne({
              research_id: req.body.research_id,
            });
          if (AdoptionAndRecognitionInfoExists) {
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message:
                    "This Research Has Adoption And Recognition Info, Retrieve As Draft To Continue Research",
                  statusCode: HTTP.OK,
                  data: null,
                  code: HTTP.OK,
                },
              ])
            );
          } else {
            // create Adoption ANd Recognition  entry
            const dataToAdoption = {
              research_id: req.body.research_id,
              is_draft: false,
              ...req.body,
            };
            const newAdoptionRecognitionData =
              await new AdoptionRecognitionService().create(dataToAdoption);
            // save current verdit
            const resultData = {
              type: "aandd",
              info: {
                has_known_partners: req.body.has_known_partners,
                marketing_stage: req.body.marketing_stage,
                media_link:
                  req.body.partners_info.link_to_partnership_anouncement,
                partner_link: req.body.media_links.link,
              },
            };
            const CummulateVerditScore = await UpdateResearchVerditScore(
              req.body.research_id,
              resultData
            );
            console.log("RESEARCH UPDATED ======= ", CummulateVerditScore);
            return createResponse(`Data Saved`, newAdoptionRecognitionData)(
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
