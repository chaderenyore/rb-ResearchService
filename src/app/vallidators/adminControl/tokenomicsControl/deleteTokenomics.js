const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.deleteTokenomicsControlParamsSchema = Joi.object({
  id: Joi.objectId().required(),
});
