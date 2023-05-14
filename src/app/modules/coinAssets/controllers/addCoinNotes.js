const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ResearchService = require("../../research/services/research.services");
const CoinNotesService = require("../services/notes.services");

exports.createNote = async (req, res, next) => {
  try {
    //   //  check if note exist for coin
    // const coinNoteExists = await new CoinNotesService().findARecord({user_id: req.user_id, community_id: research.community_id});
    // if(coinNoteExists){
    //   return next(
    //     createError(HTTP.OK, [
    //       {
    //         status: RESPONSE.SUCCESS,
    //         message: "Coin Note Exists On Reserach",
    //         statusCode: HTTP.Ok,
    //         data: {},
    //         code: HTTP.Ok,
    //       },
    //     ])
    //   );
    // }
      const dataToCoinNoteModel = {
        user_id: req.user.user_id,
        coin_id: req.body.coin_id,
        note_text: req.body.note_text,
      };
      const newNote = await new CoinNotesService().create(dataToCoinNoteModel);

      return createResponse("Coin Note Created", newNote)(res, HTTP.OK);
    
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
