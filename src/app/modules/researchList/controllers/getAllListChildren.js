const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../../research/services/research.services");
const ResearchListDetailService = require("../services/listDetail.service");

exports.fetchAllResearchInList = async (req, res, next) => {
  try {
    // ids container
    let research_ids = [];
    let resData = {};
    let researchItems = [];
    const listDetails = await new ResearchListDetailService().all(
      req.query.limit,
      req.query.page,
      { list_id: req.query.list_id }
    );
    if (listDetails && listDetails.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This List Has No Research Yet/List Does Not Exist",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // psuh research ids to container
      for (let i = 0; i < listDetails.data.length; i++) {
        research_ids.push(listDetails.data[i].research_id);
      }
      console.log("RESERACH IDS ============== " , research_ids);
      if (research_ids.length !== 0) {
        for (let i = 0; i < research_ids.length; i++) {
          const research = await new ResearchService().findAResearch({
            _id: research_ids[i],
          });
          // resData.data[i] = research
          researchItems.push(research);
        }
        console.log("RESDATA ==========", resData);
         resData.researchItems = researchItems;
        resData.pagination = listDetails.pagination;
        return createResponse(`All Research In List Retrieved`, resData)(
          res,
          HTTP.OK
        );
      } else {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "No Research Found In List",
              statusCode: HTTP.OK,
              data: {},
              code: HTTP.OK,
            },
          ])
        );
      }
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
