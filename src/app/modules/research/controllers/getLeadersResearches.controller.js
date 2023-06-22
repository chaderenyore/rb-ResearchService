const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../services/research.services");
const KEYS = require("../../../../_config/keys");

exports.getLeadersResearch = async (req, res, next) => {
  try {
    let followingIdsArray = [];
    let follwingResearches = [];
    // pass the user id to the following from user sevice
    const DataToUserService = {};
    const followingData = await axios.post(
      `${KEYS.USER_SERVICE_URI}/userss/v1/following-all?platform=web&limit=${req.query.limit}&page=${req.query.page}`,
      Data,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );
    if (user && user.data && user.data.code === 200) {
      // saved ids of evry entry retrieved
      for (let i = 0; i < user.data.data.data.length; i++) {
        followingIdsArray.push(user.data.data.data[i].following_id);
      }
      if (followingIdsArray.lenth === 0) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "You Are Not Folloiwng Any User Yet",
              statusCode: HTTP.OK,
              data: {},
              code: HTTP.OK,
            },
          ])
        );
      } else {
        // search for research created by the following i reasearch array that are visible
        console.log("FOLLOWING IDS  ============= ", followingIdsArray);
        for (let i = 0; i < followingIdsArray.length; i++) {
          const followingResearch = await new ResearchService().findAResearch({
            is_shared: false,
            is_visible: true,
            is_banned: false,
            researcher_id: followingIdsArray[i],
          });
          follwingResearches.push(followingResearch);
        }
        console.log("FOllowingResearhes ============ ", follwingResearches);
        if (follwingResearches.length === 0) {
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: "No Research Found For Your Following",
                statusCode: HTTP.OK,
                data: {},
                code: HTTP.OK,
              },
            ])
          );
        } else {
          // add pagination to retrn data
          follwingResearches.push(user.data.data.pagination);
          return createResponse(
            `All Leaders Research Retrieved`,
            follwingResearches
          )(res, HTTP.OK);
        }
      }
    } else {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Following Details Not Retrieved, We Know We are on it",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
