const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.popularResearchQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    sort_by: Joi.string().valid("comments", "likes", "shares").optional()
  });
