const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

exports.getCommentSchema = Joi.object().keys({
  research_id_id: Joi.string().required(),
  page: Joi.number().positive().required(),
  limit: Joi.number().positive().required(),
});
