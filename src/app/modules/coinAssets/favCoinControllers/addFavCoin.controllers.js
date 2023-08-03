const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FavCoinService = require("../services/favCoin.servicies");

exports.addFavCoin = async (req, res, next) => {
    try {
        // search if already favourite
        const {
            asset_id,
            coin_name
        } = req.body
        const isFav = await new FavCoinService().findARecord({user_id:req.user.user_id,asset_id, coin_name})
        if(isFav){
            return next(
                createError(HTTP.OK, [
                  {
                    status: RESPONSE.SUCCESS,
                    message: "ALready In Your Favourites",
                    statusCode: HTTP.OK,
                    data: {},
                    code: HTTP.OK,
                  },
                ])
              );
        } else {
            const favCoin = await new FavCoinService().create({user_id:req.user.user_id,...req.body});

            return createResponse("Favourite Coin Saved", favCoin)(res, HTTP.OK);
        }


    } catch (err) {
        console.log(err);

        return next(createError.InternalServerError(err));
    }
};
