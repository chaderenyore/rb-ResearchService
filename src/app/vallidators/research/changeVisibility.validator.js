const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.changeResearchVisibilitySchema = Joi.object({
    research_id: Joi.objectId().required(),
    visible: Joi.string().valid('true', 'false').required()
  });