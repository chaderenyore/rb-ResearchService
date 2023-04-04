const Joi = require("joi");

exports.getCommentsLikesQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    comment_id: Joi.string().required()
  });
