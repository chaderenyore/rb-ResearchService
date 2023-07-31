const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FavCoinService = require("../services/favCoin.servicies");


exports.removefavCoin = async (req, res, next) => {
    try {
      // check if research exist
      const deletedFavCoion = await new FavCoinService().deletOne({
       user_id: req.user.user_id,
       asset_id: req.query.asset_id,
       coin_name: req.query.coin_name
      });
    if(deletedFavCoion.deletedCount === 0){
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Favourite Coin Does Not Exist/UnAuthorised",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {
      return createResponse("Favourite Coin Removed", deletedFavCoion)(res, HTTP.OK);
        
    }
      
    } catch (err) {
      console.log(err);
  
      return next(createError.InternalServerError(err));
    }
  };