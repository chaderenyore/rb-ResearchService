const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const { createResponse } = require("../../../../_helpers/createResponse");
const createError = require("../../../../_helpers/createError");
const ResearchListService = require("../services/researchList.services");
const ListDetailService = require("../services/listDetail.service");


exports.deleteResearchList = async (req, res, next) => {
  try {
    const deletedResearch = await new ListDetailService().deletOne({
      research_id: req.query.research_id,
      list_id: req.query.list_id,
    });
    if(deletedResearch && deletedResearch.deletedCount === 0){
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
      // update research in list count
      const updatedList = await new ResearchListService().update(
        { _id: req.query.list_id },
        { $inc: { 'no_in_list': -1 } }
      )
      return createResponse(`Research Deleted From List ${updatedList.list_name}`, {})(res, HTTP.OK);
    }
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
