const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.addTokenomicsControlSchema = Joi.object().keys({
  tradeable_token_score: Joi.number().positive().optional(),
  is_main_token_score: Joi.number().positive().optional(),
  has_enough_utils_score: Joi.number().positive().optional(),
  has_dao_score: Joi.number().positive().optional(),
  token_type_deflationary_score: Joi.number().positive().optional(),
  positive_indicators: Joi.array().optional(),
  postive_indicators_points:Joi.number().positive().optional(),
  lower_limit_for_excellence: Joi.number().optional(),
  upper_limit_for_good: Joi.number().positive().optional(),
  upper_limit_for_fair: Joi.number().positive().optional(),
  upper_limit_for_poor: Joi.number().positive().optional(),
  upper_limit_for_vpoor: Joi.number().positive().optional(),
  lower_limit_for_good: Joi.number().positive().optional(),
  lower_limit_for_fair: Joi.number().positive().optional(),
  lower_limit_for_poor: Joi.number().positive().optional(),
  lower_limit_for_vpoor: Joi.number().positive().optional(),
});
