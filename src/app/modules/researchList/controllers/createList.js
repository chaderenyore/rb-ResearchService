const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ResearchListService = require("../services/researchList.services");

exports.createResearchList = async (req, res, next) => {
  try {
    // convwert title to lower case
    const name = req.body.list_name;
    // check if research list exist
    const researchListExist = await new ResearchListService().findARecord({
      list_name: name,
    });
    if (researchListExist) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This List Name Exists",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {
      const dataToListModel = {
        user_id: req.user.user_id,
        list_name: name,
      };
      const newList = await new ResearchListService().create(dataToListModel);

      return createResponse("List Created", newList)(res, HTTP.OK);
    }
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
