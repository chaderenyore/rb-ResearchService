const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../services/research.services");
const UserLikedResearchService = require("../../likes/services/userLikedResearch.service");

const KEYS = require("../../../../_config/keys");

exports.getSuggestedResearch = async (req, res, next) => {
  try {
    // conatiner to hold tag
    const tagsContainer = []
    const allUsersResearch = await new UserLikedResearchService().all(
      req.query.limit,
      req.query.page,
      { user_id: req.user.user_id, is_banned: false, is_visible:true }
    );
    if (allUsersResearch && allUsersResearch.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Research Found",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // collect tags from array and push to tags container
      for(let i = 0; i < allUsersResearch.data.length; i++ ){
        tagsContainer.push(allUsersResearch.data[i].tags);
      }
      // flaten array to a single array
      const singleArray = tagsContainer.flat(1)
      // search research with similar tags
      const suggestedResearch = await new ResearchService().all(
        req.query.limit,
        req.query.page,
        { tags: { "$in" : [singleArray]} }
      );
      return createResponse(`All Research Retrieved`, suggestedResearch)(
        res,
        HTTP.OK
      );
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
