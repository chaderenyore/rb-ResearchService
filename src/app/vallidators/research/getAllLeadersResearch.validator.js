const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.getAllLeadersResearchSchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
  });
