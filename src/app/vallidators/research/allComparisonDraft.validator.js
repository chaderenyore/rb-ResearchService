const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.getAllComparisonQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    researcher_id: Joi.objectId().required()
  });
