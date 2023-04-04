const Joi = require("joi");

exports.getAllResearchLikesQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    original_research_id: Joi.string().required()
  });
