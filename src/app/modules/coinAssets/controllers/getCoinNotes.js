const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const CoinNotesService = require("../services/notes.services");


exports.getCoinNote = async (req, res, next) => {
  try {
    // check if research exist
    const coinNotes = await new CoinNotesService().all(req.query.limit, req.query.page, {
      user_id: req.user.user_id,
      coin_id: req.query.coin_id
    });
    if (coinNotes && coinNotes.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: `No Coin Notes Found ${req.query.coin_id}`,
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {

      return createResponse(`${req.query.coin_id} notes retrieved`, coinNotes)(res, HTTP.OK);
    }
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
