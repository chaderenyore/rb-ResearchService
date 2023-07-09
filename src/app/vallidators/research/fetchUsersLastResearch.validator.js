const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.UserLastResearchQuerySchema = Joi.object({
    user_id: Joi.objectId().required()
  });
