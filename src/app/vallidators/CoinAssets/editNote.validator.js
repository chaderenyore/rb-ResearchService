const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.updateNotesQuerySchema = Joi.object({
    note_id: Joi.objectId().required(),
  });

exports.updateNoteBodySchema = Joi.object({
    note_text: Joi.string().required(),
  });