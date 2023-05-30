const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchListService = require("../services/researchList.services");

exports.fetchAllResearchList = async (req, res, next) => {
  try {
    const allResearchList = await new ResearchListService().all(
      req.query.limit,
      req.query.page,
      {user_id: req.user.user_id}
    );
    if (allResearchList && allResearchList.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No List Found",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `Research List Retrieved`,
        allResearchList
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
