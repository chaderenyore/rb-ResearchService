const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const logger = require("../../../../../../logger.conf");
const PremCheckControlService = require("../../services/premCheckControl.service");
const TokenomicsControlService = require("../../services/tokenomicsControl.service");


exports.adminFetchAllResearchControl = async (req, res, next) => {
  try {
    let dataToReturn = {};
    let controlsArr = [];
    const premCheckControl = await new PremCheckControlService().all(
      req.query.limit,
      req.query.page,
    );
    const tokenomicsHealthControl = await new TokenomicsControlService().all(
        req.query.limit,
        req.query.page,
      );
    if ((premCheckControl && premCheckControl.data.length === 0) || (tokenomicsHealthControl && tokenomicsHealthControl.data.length === 0)) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Research Controls Yet",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
        controlsArr.push(premCheckControl.data);
        controlsArr.push(tokenomicsHealthControl.data);
        dataToReturn.data = controlsArr;
        dataToReturn.pagination = premCheckControl.pagination;
        dataToReturn.pagination.totalCount = premCheckControl.pagination.totalCount;
        dataToReturn.pagination.pageSize = premCheckControl.pagination.pageSize;


      return createResponse(
        `All Research Controls Retrieved`,
        dataToReturn
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
