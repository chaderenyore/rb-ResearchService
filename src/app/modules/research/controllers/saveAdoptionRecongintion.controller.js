const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../services/research.services");
const AdoptionRecognitionService = require("../services/researchAdoption.service");

exports.saveAdoptionAndRecognitionInfo = async (req, res, next) => {
  try {
    // check if data exist for this research
    const dataExist = await new AdoptionRecognitionService().findOne({
      research_id: req.body.research_id,
      is_draft: false,
    });
    if (dataExist) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message:
              "Adoption And Recognition Data Already Exists For This Research",
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
            return createResponse(`Data Saved`, updatedAdoptiuon)(res, HTTP.OK);
          }
        } else {
          // search for research
          const research = await new ResearchService().findAResearch({
            _id: req.body.research_id,
          });
          if (research) {
            // create Adoption ANd Recognition  entry
            const dataToAdoption = {
              research_id: req.body.research_id,
              is_draft: false,
              ...req.body,
            };
            const newAdoptionRecognitionData =
              await new AdoptionRecognitionService().create(dataToAdoption);
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
