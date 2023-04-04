const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.likeACommentQuerySchema = Joi.object({
    comment_id: Joi.objectId().required(),
  });