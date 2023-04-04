const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.launchResearchQuerySchema = Joi.object().keys({
  research_id: Joi.objectId().required()
});

