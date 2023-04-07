const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.calculateTokenomicsAllocationSchema = Joi.object().keys({
  allocation_data: Joi.array().items(Joi.object().keys({
    name: Joi.string().required(),
    percentage:Joi.number().positive().optional(),
    total_allocation : Joi.number()
    .positive()
    .when("percentage", {
      not: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .label("percentage or allocation required"),
  })).required(),
  total_supply: Joi.number().positive().optional(),
  circulating_supply: Joi.number().positive().optional(),
  total_supply: Joi.number().positive().optional(),
  max_supply: Joi.number().positive().optional()
});
