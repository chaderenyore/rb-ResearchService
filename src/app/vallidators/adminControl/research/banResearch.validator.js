const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.banResearchSchema = Joi.object({
    research_id: Joi.objectId().optional(),
  });
