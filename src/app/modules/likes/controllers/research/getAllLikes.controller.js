const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const ResearchLikeService = require("../../services/researchLikes.services");
const logger = require("../../../../../../logger.conf");

exports.getAResearchLikes = async (req, res, next) => {
  try {
    // query data
    const dataToQuery = {
      community_id: req.query.community_id
    } 
    const likes = await new ResearchLikeService().all(req.query.limit, req.query.page, dataToQuery);
    if (likes.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Research Has No Likes",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
        return createResponse("Research Likes Retreived", likes)(res, HTTP.OK);
      } 
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
