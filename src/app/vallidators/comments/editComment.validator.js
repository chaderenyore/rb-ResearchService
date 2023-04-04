const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.editCommentSchema = Joi.object().keys({
  comment_id: Joi.objectId().required(),
  comment_body_text: Joi.string().required()
});
