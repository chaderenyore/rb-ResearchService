const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../services/research.services");
const KEYS = require("../../../../_config/keys");

exports.getUsersResearch = async (req, res, next) => {
  try {
    let querydata;
    // check for type to be fetched
    if(req.query.timeline === "true"){
      querydata = {
         poster_id: req.user.user_id
      }
    } 
    if(req.query.myresearch === "true"){
      querydata = {
        researcher_id: req.user.user_id
     }
    }
    const allUsersResearch = await new ResearchService().all(
      req.query.limit,
      req.query.page,
      querydata
    );
    if (allUsersResearch.data.length === 0) {
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
      return createResponse(
        `All Research Retrieved`,
        allUsersResearch
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
