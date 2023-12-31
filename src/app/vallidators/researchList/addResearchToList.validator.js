const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.addResearchToListSchema = Joi.object({
    list_id: Joi.objectId().required(),
    research_id: Joi.objectId().required(),
});
