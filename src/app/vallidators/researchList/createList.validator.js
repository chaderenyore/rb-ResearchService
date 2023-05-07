const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createResearchListSchema = Joi.object({
    list_name: Joi.string().required(),
});
