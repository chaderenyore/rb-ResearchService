const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.viewUsersPublicResearchQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    user_id: Joi.string().required()
  });
