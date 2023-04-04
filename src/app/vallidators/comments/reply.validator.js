const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

exports.replyCommentSchema = Joi.object().keys({
  comment_id: Joi.objectId().required(),
  reply_body_text: Joi.string().required()
});
