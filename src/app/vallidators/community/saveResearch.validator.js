const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.saveResearchQuerySchema = Joi.object({
  original_research_id: Joi.objectId().required(),
});
