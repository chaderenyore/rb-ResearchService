const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.deleteNotesQuerySchema = Joi.object({
  note_id: Joi.objectId().required(),
});
