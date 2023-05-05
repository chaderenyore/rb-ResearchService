const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.getAllListChildrenQuerySchema = Joi.object({
  research_list_id: Joi.objectId().required(),
});
