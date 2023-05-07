const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.getAllListChildrenQuerySchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
  list_id: Joi.objectId().required(),
});
