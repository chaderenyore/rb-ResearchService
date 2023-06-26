const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const PremCheckControlService = require("../../services/premCheckControl.service");

const logger = require("../../../../../../logger.conf");

exports.deletePremCheckControl = async (req, res, next) => {
  try {
    // check if control exists
    const premControl = await new PremCheckControlService().findOne({
      _id: req.params.id,
    });
    if (!premControl) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This PremCheck Control Does Not Exist",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // delete
      const deletedPremControl = await new PremCheckControlService().deleteOne({
        _id: req.params.id,
      });

      return createResponse(`PremCheck Control Deleted`, deletedPremControl)(
        res,
        HTTP.OK
      );
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
