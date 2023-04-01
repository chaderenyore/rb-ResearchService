const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.computeTokenomicsSchema = Joi.object().keys({
  was_draft: Joi.boolean().required(),
  research_id: Joi.objectId().required(),
  number_of_tradeable_tokens: Joi.number().positive().required(),
  is_main_token: Joi.boolean().required(),
  has_enough_utility: Joi.string().required(),
  token_type: Joi.string().valid('nflationary', 'deflationary', 'unsure').required(),
  circulating_supply: Joi.number().positive().optional(),
  total_supply: Joi.number().positive().optional(),
  max_supply: Joi.number().positive().optional(),
  purpose: Joi.object().required(),
  has_dao: Joi.boolean().required(),
  tags: Joi.array().optional()
});
