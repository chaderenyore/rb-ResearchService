const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.likeAResearchQuerySchema = Joi.object({
  community_id: Joi.objectId().required(),
  });