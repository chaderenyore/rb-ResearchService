const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.addCoinNotesQuerySchema = Joi.object({
  research_community_id: Joi.objectId().required(),
});

exports.addCoinNotesBodySchema = Joi.object({
  note_text: Joi.string().required(),
});
