const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const CoinNotesService = require("../services/notes.services");


exports.getResearchNote = async (req, res, next) => {
  try {
    // check if research exist
    const coinNote = await new CoinNotesService().findARecord({
      research_community_id: req.query.community_id,
    });
    if (!coinNote) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Coin Note Does Not Exist",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {

      return createResponse("Coin Note Retrieved", coinNote)(res, HTTP.OK);
    }
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
