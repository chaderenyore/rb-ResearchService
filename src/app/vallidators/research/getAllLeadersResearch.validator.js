const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.getAllLeadersResearchSchema = Joi.object({
    page: Joi.number().positive().required(),
    limit: Joi.number().positive().required(),
  });
