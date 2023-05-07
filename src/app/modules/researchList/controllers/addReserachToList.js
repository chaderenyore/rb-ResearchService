const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ResearchListService = require("../services/researchList.services");
const ListDetailService = require("../services/listDetail.service");
const ResearchService = require("../../research/services/research.services");

exports.addResearchToList = async (req, res, next) => {
  try {
    //   check if research exists
    const researchExist = await new ResearchService().findAResearch({
      _id: req.query.research_id,
      researcher_id: req.user.user_id,
    });
    if (!researchExist) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Research Does Not Exists/ UnAuthorised",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {
      //  check if list is valid/exists
      const listIsValid = await new ResearchListService().findARecord({
        _id: req.query.list_id,
      });
      if (!listIsValid) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "List Invalid",
              statusCode: HTTP.Ok,
              data: {},
              code: HTTP.Ok,
            },
          ])
        );
      } else {
        // check if research is already in list
        const isInList = await new ListDetailService().findARecord({
          list_id: listIsValid._id,
          research_id: req.query.research_id,
        });
        if(isInList){
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: `Research Exists In ${listIsValid.list_name.toUpperCase()} List`,
                statusCode: HTTP.Ok,
                data: {},
                code: HTTP.Ok,
              },
            ])
          );
        } else {
          // push to research List Detail model
          const listDetail = await new ListDetailService().create({
            list_id: listIsValid._id,
            research_id: req.query.research_id,
          });
          if (listDetail) {
            // update number in list
            const updatedList = await new ResearchListService().update(
              { _id: req.query.list_id },
              { $inc: { 'no_in_list': 1 } }
            );
            return createResponse(
              `Research Added To ${listIsValid.list_name} List`,
              updatedList
            )(res, HTTP.OK);
          }
        }
      }
    }
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
