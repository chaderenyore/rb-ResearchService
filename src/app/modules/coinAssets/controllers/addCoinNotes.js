const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ResearchService = require("../../research/services/research.services");
const CoinNotesService = require("../services/notes.services");

exports.createNote = async (req, res, next) => {
  try {
    // check if research exist
    const research = await new ResearchService().findAResearch({
      community_id: req.query.research_community_id,
    });
    if (!research) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Research Does Not Exist",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {
      const dataToCoinNoteModel = {
        user_id: req.user.user_id,
        research_id: research._id,
        community_id: research.community_id,
        note_text: req.body.note_text,
      };
      const newNote = await new CoinNotesService().create(dataToCoinNoteModel);

      return createResponse("Coin Note Created", newNote)(res, HTTP.OK);
    }
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
