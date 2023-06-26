const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.deletePremCheckControlParamsSchema = Joi.object({
  id: Joi.objectId().required(),
});
