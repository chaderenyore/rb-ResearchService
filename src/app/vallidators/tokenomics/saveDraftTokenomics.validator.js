const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.saveDraftTokenomicsSchema = Joi.object().keys({
  research_id: Joi.objectId().required(),
  number_of_tradeable_tokens: Joi.number().positive().optional(),
  is_main_token: Joi.boolean().optional(),
  has_enough_utility: Joi.string().optional(),
  token_type: Joi.string().valid('inflationary', 'deflationary', 'unsure').optional(),
  circulating_supply: Joi.number().positive().optional(),
  total_supply: Joi.number().positive().optional(),
  max_supply: Joi.number().positive().optional(),
  purpose: Joi.object().optional(),
  has_dao: Joi.boolean().optional(),
  tags: Joi.array().optional()
});
