const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.updateResearchInfoSchema = Joi.object().keys({
  has_known_partners: Joi.boolean().optional(),
  is_working_product: Joi.boolean().optional(),
  project_name: Joi.string().optional(),
});
exports.updateResearchInfoParamsSchema = Joi.object().keys({
  research_id: Joi.objectId().required()
});
