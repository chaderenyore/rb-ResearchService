const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

exports.addCommentSchema = Joi.object().keys({
  research_id: Joi.objectId().required(),
  comment_body_text: Joi.string().required()
});
