const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FavCoinService = require("../services/favCoin.servicies");


exports.fetchUsersFavCoin = async (req, res, next) => {
    try {
      // check if research exist
      const favCoin = await new FavCoinService().all(req.query.limit, req.query.page, {
        user_id: req.user.user_id
      });
      if (favCoin && favCoin.data.length === 0) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: `No Favourite Coins Yet`,
              statusCode: HTTP.Ok,
              data: {},
              code: HTTP.Ok,
            },
          ])
        );
      } else {
  
        return createResponse(`Users favourite Coins Retrieved`, favCoin)(res, HTTP.OK);
      }
    } catch (err) {
      console.log(err);
  
      return next(createError.InternalServerError(err));
    }
  };
