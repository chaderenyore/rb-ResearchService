const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.computeFinalVerditSchema = Joi.object({
    research_id: Joi.objectId().required(),
  });