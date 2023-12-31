const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const { createResponse } = require("../../../../_helpers/createResponse");
const createError = require("../../../../_helpers/createError");
const ResearchListService = require("../services/researchList.services");
const ListDetailService = require("../services/listDetail.service");


exports.deleteResearchList = async (req, res, next) => {
  try {
    const deletedList = await new ResearchListService().deletOne({
      _id: req.query.list_id,
    });
    if(deletedList && deletedList.deletedCount === 0){
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "List Does Not Exist/UnAuthorised",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {
      // unlink all lsit research belongs to
      const deletedResearchDetails = await new ListDetailService().deleteAll({list_id:req.query.list_id});
      return createResponse("Research List Deleted", deletedList)(res, HTTP.OK);
    }
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
