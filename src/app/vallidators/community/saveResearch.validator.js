const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.saveResearchSchema = Joi.object({
    research_info: Joi.object().required(),
  });
