const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.computeTokenomicsSchema = Joi.object().keys({
  is_independent: Joi.string().valid('true', 'false').optional(),
  was_draft: Joi.boolean().required(),
  research_id: Joi.objectId().required(),
  number_of_tradeable_tokens: Joi.number().positive().required(),
  is_main_token: Joi.boolean().required(),
  has_enough_utility: Joi.string().valid('yes', 'no', 'unsure').required(),
  token_type: Joi.string().valid('inflationary', 'deflationary', 'unsure').required(),
  circulating_supply: Joi.number().positive().optional(),
  total_supply: Joi.number().positive().optional(),
  max_supply: Joi.number().positive().optional(),
  has_dao: Joi.boolean().required(),
  allocation_data: Joi.array().items(Joi.object().keys({
    name: Joi.string().required(),
    percentage:Joi.number().positive().required(),
  })).required(),
});
