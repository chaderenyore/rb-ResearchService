const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.shareResearchQuerySchema = Joi.object({
    original_research_id: Joi.objectId().optional(),
  });
