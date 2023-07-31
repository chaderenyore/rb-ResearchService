const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.addFavCoinBodySchema = Joi.object({
  asset_id: Joi.string().required(),
  coin_name: Joi.string().required(),
  price: Joi.string().required(),
  chg24hrs: Joi.string().required(),
  market_cap: Joi.string().required(),
  volume: Joi.string().required(),
  vol_per_market_cap: Joi.string().required(),

});
