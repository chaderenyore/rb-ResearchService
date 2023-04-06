const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.addTagsSchema = Joi.object({
  added_by: Joi.string().required(),
  tag_name: Joi.string().required(),
});

exports.getTagSchema = Joi.object({
  limit: Joi.number().positive().optional(),
  page: Joi.number().positive().optional(),
});
