const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.validateFavSchema = Joi.object({
  user_id: Joi.objectId().required()
  asset_id: Joi.string().required(),
  coin_name: Joi.string().required(),
});
