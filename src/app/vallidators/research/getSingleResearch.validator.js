const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.singleResearchParamsSchema = Joi.object({
    research_id: Joi.objectId().required()
  });
