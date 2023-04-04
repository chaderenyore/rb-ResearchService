const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.deleteCommentSchema = Joi.object().keys({
    comment_id: Joi.objectId().required(),
});
