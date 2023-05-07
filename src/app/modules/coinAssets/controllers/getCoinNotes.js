const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const CoinNotesService = require("../services/notes.services");


exports.getResearchNote = async (req, res, next) => {
  try {
    // check if research exist
    const coinNotes = await new CoinNotesService().all(req.query.limit, req.query.page, {
      research_community_id: req.query.community_id,
    });
    if (coinNotes && coinNotes.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Coin Notes For This Coin",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {

      return createResponse("Coin Notes Retrieved", coinNotes)(res, HTTP.OK);
    }
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
