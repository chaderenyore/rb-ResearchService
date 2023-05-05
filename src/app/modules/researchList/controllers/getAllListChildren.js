const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../../research/services/research.services");


exports.fetchAllResearchInList = async (req, res, next) => {
  try {
    const allResearch = await new ResearchService().all(
      req.query.limit,
      req.query.page,
      { research_list_id: req.body.research_list_id }
    );
    if (allResearch && allResearch.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Research Found In specified List/Invalid List",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `All Research In List Retrieved`,
        allResearch
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
