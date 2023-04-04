const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.saveCommunityAndTeamInfoSchema = Joi.object().keys({
  was_draft: Joi.boolean().required(),
  research_id: Joi.objectId().required(),
  has_known_partners: Joi.boolean().required(),
  project_name: Joi.string().required(),
  partners_info: Joi.array().required(),
  media_links: Joi.array().required(),
  marketing_stage: Joi.string().optional(),
});


exports.saveTeamAndCommunitySpiritQuerySchema = Joi.object().keys({
    was_draft: Joi.boolean().required(),
    save_as_draft: Joi.boolean().required()
  });
