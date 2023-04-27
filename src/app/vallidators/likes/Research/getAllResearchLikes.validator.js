const Joi = require("joi");

exports.getAllResearchLikesQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    community_id: Joi.string().required()
  });
