const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.addCoinNotesBodySchema = Joi.object({
  note_text: Joi.string().required(),
  coin_id: Joi.string().required(),
});
