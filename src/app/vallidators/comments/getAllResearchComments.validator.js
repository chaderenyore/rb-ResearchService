const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

exports.getAllResearchCommentQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    research_id: Joi.objectId().required()
  });
