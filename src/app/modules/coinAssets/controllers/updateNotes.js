const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const CoinNotesService = require("../services/notes.services");

const logger = require("../../../../../logger.conf");

exports.editResearchNote = async (req, res, next) => {
  try {
    // check if same parameters where inputed
    if (Object.entries(req.body).length > 0 === false) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "No Fields Marked For Edit",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
        const updatedcoinNote = await new CoinNotesService().update(
          { user_id: req.user.user_id, _id: req.query.note_id},
          { note_text: req.body.note_text }
        );
        if (!updatedcoinNote) {
          return next(
            createError(HTTP.BAD_REQUEST, [
              {
                status: RESPONSE.ERROR,
                message: "This Coin Note Does Not Exist",
                statusCode: HTTP.BAD_REQUEST,
                data: {},
                code: HTTP.BAD_REQUEST,
              },
            ])
          );
        } else {
          return createResponse(`Coin Note Edited`, updatedcoinNote)(res, HTTP.OK);
        }
      }
    
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
