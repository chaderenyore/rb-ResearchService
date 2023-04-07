const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.saveComparisonSchema = Joi.object().keys({
  research_id: Joi.objectId().required(),
  is_independent: Joi.string().valid("true", "false").optional(),
  main_coin_name: Joi.string().optional(),
  main_coin_info: Joi.object()
    .keys({
      current_price: Joi.number().positive().required(),
      market_cap: Joi.number().positive().optional(),
      user: Joi.number().positive().optional(),
      volume: Joi.number().positive().optional(),
      average_return: Joi.number().positive().optional(),
    })
    .required(),
  reference_coins_data: Joi.array()
    .items(
      Joi.object().keys({
        coin_name: Joi.string().required(),
        current_price: Joi.number().positive().required(),
        market_cap: Joi.number().positive().optional(),
        user: Joi.number().positive().optional(),
        volume: Joi.number().positive().optional(),
        average_return: Joi.number().positive().optional(),
      })
    )
    .required(),
});

exports.saveComparisonQuerySchema = Joi.object().keys({
  was_draft: Joi.boolean().optional(),
  save_as_draft: Joi.boolean().optional(),
});
