const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const AdoptionAndRecognitionService = require("../services/researchAdoption.service");

exports.getAdoptionAndRecognitionDraft = async (req, res, next) => {
  try {
    const allAdoptionAndRecognitionDrafts = await new AdoptionAndRecognitionService().all(
      req.query.limit,
      req.query.page,
      { researcher_id: req.user.user_id, is_draft: true }
    );
    if (allAdoptionAndRecognitionDrafts && allAdoptionAndRecognitionDrafts.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Drafts Found",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `All Adoption And Recognituion Drafts Retrieved`,
        allAdoptionAndRecognitionDrafts
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
