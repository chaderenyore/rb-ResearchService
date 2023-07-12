const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
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
    const LeadersResearchhData = {};
    const user = await axios.get(
      `${KEYS.USER_SERVICE_URI}/users/v1/following-all?platform=web&limit=${req.query.limit}&page=${req.query.page}`,
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
            is_visible: true,
            is_launched: true,
            is_banned: false,
            researcher_id: followingIdsArray[i],
          });
          // console.log("FOllowing Research ", followingResearch)
          if(followingResearch && followingResearch !== null){
          console.log("FOllowing Research  WHen Found", followingResearch)
            follwingResearches.push(followingResearch);
          } 
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
          console.log("FOllwing Research Array Length ======= ", follwingResearches.length)
          LeadersResearchhData.data = follwingResearches;
          LeadersResearchhData.pagination = user.data.data.pagination
          LeadersResearchhData.pagination.pageSize = Number(req.query.limit);
          LeadersResearchhData.pagination.totalCount = Number(follwingResearches.length);
          // set pagination info
          return createResponse(
            `All Leaders Research Retrieved`,
            LeadersResearchhData
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
