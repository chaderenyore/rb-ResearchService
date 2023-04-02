const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.calculateTokenomicsAllocationSchema = Joi.object().keys({
  purpose: Joi.array().required(),
  circulating_supply: Joi.number().positive().optional(),
  total_supply: Joi.number().positive().optional(),
  max_supply: Joi.number().positive().optional(),
});
