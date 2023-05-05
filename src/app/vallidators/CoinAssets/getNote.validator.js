const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.coinNotesQuerySchema = Joi.object({
  research_community_id: Joi.objectId().required(),
});
