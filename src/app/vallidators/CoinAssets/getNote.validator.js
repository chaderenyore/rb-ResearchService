const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.coinNotesQuerySchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
  research_community_id: Joi.objectId().required(),
});

