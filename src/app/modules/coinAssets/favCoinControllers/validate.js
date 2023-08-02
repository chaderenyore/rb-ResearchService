const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FavCoinService = require("../services/favCoin.servicies");

exports.validateFavCoin = async (req, res, next) => {
  try {
    // search for fav
    const filter = {
        user_id: req.user.user_id,
        asset_id: asset_id, 
        coin_name: coin_name
    }
      const favCoinExist = await new FavCoinService().findARecord(filter);
    
    if (!favCoinExist) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Favourite Is Invalid",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse("Favourite Valid", favCoinExist)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
