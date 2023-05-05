const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const ResearchListService = require("../services/researchList.services");

exports.deleteResearchList = async (req, res, next) => {
  try {
    const deletedList = await new ResearchListService().deletOne({
      list_id: req.query.list_id,
    });

    return createResponse("Research List Deleted", deletedList)(res, HTTP.OK);
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
