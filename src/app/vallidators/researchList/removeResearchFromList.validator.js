const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.deleteResearchFromListQuerySchema = Joi.object({
    research_id: Joi.objectId().required(),
    list_id: Joi.objectId().required(),
  });
