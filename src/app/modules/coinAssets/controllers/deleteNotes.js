const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const CoinNotesService = require("../services/notes.services");


exports.deleteResearchNote = async (req, res, next) => {
  try {
    // check if research exist
    const deletedNote = await new CoinNotesService().deletOne({
     note_id: req.query.note_id,
    });

      return createResponse("Coin Note Deleted", deletedNote)(res, HTTP.OK);
    
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
