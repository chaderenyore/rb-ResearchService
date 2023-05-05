const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createResearchListSchema = Joi.object({
    list_title: Joi.string().required(),
});
