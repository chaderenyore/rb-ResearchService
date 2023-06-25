const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.deleteResearchSchema = Joi.object({
    research_ids: Joi.array().required(),
  });