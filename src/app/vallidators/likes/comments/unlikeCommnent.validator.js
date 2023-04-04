const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.UnlikeACommentQuerySchema = Joi.object({
    comment_id: Joi.string().required(),
  });