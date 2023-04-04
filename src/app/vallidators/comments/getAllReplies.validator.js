const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

exports.getAllRepliesQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    comment_id: Joi.objectId().required()
  });
