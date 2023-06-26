const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const TokenomicsControlService = require("../../services/tokenomicsControl.service");

const logger = require("../../../../../../logger.conf");

exports.deleteTokenomicsControl = async (req, res, next) => {
  try {
    // check if control exists
    const tokenomicsControl = await new TokenomicsControlService().findOne({
      _id: req.params.id,
    });
    if (!tokenomicsControl) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Tokenomics Control Does Not Exist",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // delete
      const deletedTokenomicsControl = await new TokenomicsControlService().deleteOne({
        _id: req.params.id,
      });

      return createResponse(`Tokenomics Control Deleted`, deletedTokenomicsControl)(
        res,
        HTTP.OK
      );
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
