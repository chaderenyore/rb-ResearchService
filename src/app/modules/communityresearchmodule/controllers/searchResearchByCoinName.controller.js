const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const CommunityResearchService = require("../services/communityResearch.services");

exports.searchReserachByCoinName = async (req, res, next) => {
  try {
    const { coin_name } = req.query;
    const filteredCommunityResearch = await new CommunityResearchService().getAll(
      req.query.limit,
      req.query.page,

      { coin_name: { $regex: ".*" + coin_name + ".*", $options: "i" } }
    );
    if (filteredCommunityResearch && filteredCommunityResearch.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: `No Matches For ${coin_name}`,
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(`Match For ${coin_name} Fetched`, filteredCommunityResearch)(
        res,
        HTTP.OK
      );
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
