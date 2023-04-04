const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.saveComparisonSchema = Joi.object().keys({
  research_id: Joi.objectId().required(),
  research_price: Joi.string().required(),
  main_coin_info: Joi.array().required(),
  reference_coins_data: Joi.array().required(),
});

exports.saveComparisonQuerySchema = Joi.object().keys({
    was_draft: Joi.boolean().required(),
    save_as_draft: Joi.boolean().required()
  });

