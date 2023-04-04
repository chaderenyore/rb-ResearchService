const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.updateResearchInfoSchema = Joi.object().keys({
  has_known_partners: Joi.boolean().required(),
  is_working_product: Joi.boolean().required(),
  project_name: Joi.string().required(),
});
