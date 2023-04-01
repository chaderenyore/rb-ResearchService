const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.getSingleResearchPremCheckSchema = Joi.object({
    research_id: Joi.objectId().required()
  });
