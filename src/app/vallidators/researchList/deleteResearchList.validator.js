const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.deleteResearchListQuerySchema = Joi.object({
  list_id: Joi.objectId().required(),
});
