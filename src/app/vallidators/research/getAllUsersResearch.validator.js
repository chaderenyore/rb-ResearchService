const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


exports.getAllUsersResearchSchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    timeline: Joi.string().optional(),
    myresearch: Joi.string().optional(),

  });
