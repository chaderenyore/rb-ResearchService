const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.addTokenomicsControlSchema = Joi.object().keys({
  tradeable_token_score: Joi.number().optional(),
  is_main_token_score: Joi.number().optional(),
  has_enough_utils_score: Joi.number().optional(),
  has_dao_score: Joi.number().optional(),
  token_type_deflationary_score: Joi.number().optional(),
  negative_indicators: Joi.array()
    .items(
      Joi.object().keys({
        indicator_name: Joi.string().required(),
        indicator_score: Joi.number().required(),
      })
    )
    .optional(),
  positive_indicators: Joi.array()
    .items(
      Joi.object().keys({
        indicator_name: Joi.string().required(),
        indicator_score: Joi.number().required(),
      })
    )
    .optional(),
  upperLimit_for_excellence: Joi.number().optional(),
  upperLimit_for_good: Joi.number().optional(),
  upperlimit_for_fair: Joi.number().optional(),
  upperlimit_for_poor: Joi.number().optional(),
  upperlimit_for_vpoor: Joi.number().optional(),
});
