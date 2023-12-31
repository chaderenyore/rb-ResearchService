const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.validateLikeQuerySchema = Joi.object({
    community_id: Joi.objectId().optional(),
    comment_id: Joi.objectId().optional()
  });