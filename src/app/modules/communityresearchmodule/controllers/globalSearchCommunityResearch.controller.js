const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const CommunityResearchService = require("../services/communityResearch.services");

exports.searchResearchGlobally = async (req, res, next) => {
  try {
    const { filterString } = req.query
    const filteredResearch = await new CommunityResearchService().all(
      req.query.limit,
      req.query.page,
    {
      $or: [
        { research_label: { $regex: '.*' + filterString + '.*', $options: "i" } },
        { coin_name: { $regex: '.*' + filterString + '.*', $options: "i" } },
        { researcher_username: { $regex: '.*' + filterString + '.*', $options: "i" } },
        { researcher_firstname: { $regex: '.*' + filterString + '.*', $options: "i" } },
        { researcher_lastame: { $regex: '.*' + filterString + '.*', $options: "i" } },
        { tags: { $regex: '.*' + filterString + '.*', $options: "i" } },
      ],
    }
    );
    if (filteredResearch && filteredResearch.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: `No Matches For ${filterString}`,
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `Match For ${filterString} Fetched`,
        filteredResearch
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
