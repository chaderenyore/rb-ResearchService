const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const { createResponse } = require("../../../../_helpers/createResponse");
const createError = require("../../../../_helpers/createError");
const CoinNotesService = require("../services/notes.services");


exports.deleteNote = async (req, res, next) => {
  try {
    // check if research exist
    const deletedNote = await new CoinNotesService().deletOne({
     _id: req.query.note_id,
     user_id: req.user.user_id
    });
  if(deletedNote.deletedCount === 0){
    return next(
      createError(HTTP.OK, [
        {
          status: RESPONSE.SUCCESS,
          message: "Note Does Not Exist/UnAuthorised",
          statusCode: HTTP.Ok,
          data: {},
          code: HTTP.Ok,
        },
      ])
    );
  } else {
    return createResponse("Coin Note Deleted", deletedNote)(res, HTTP.OK);
      
  }
    
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
