const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.likeAResearchQuerySchema = Joi.object({
  original_research_id: Joi.objectId().required(),
  });