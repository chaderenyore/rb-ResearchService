const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.removeFavCoinQuerySchema = Joi.object({
  asset_id: Joi.string().required(),
  coin_name: Joi.string().required(),
});
