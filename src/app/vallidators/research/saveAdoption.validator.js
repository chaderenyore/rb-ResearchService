const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.saveAdoptionAndRecognitionSchema = Joi.object().keys({
  research_id: Joi.objectId().required(),
  has_known_partners: Joi.boolean().required(),
  partners_info: Joi.array()
    .items(
      Joi.object().keys({
        project_name: Joi.string().required(),
        link_to_partnership_anouncement: Joi.string().uri().optional(),
      })
    )
    .optional(),
  media_links: Joi.array()
    .items(
      Joi.object().keys({
        media_name: Joi.string().required(),
        link: Joi.string().uri().optional(),
      })
    )
    .optional(),
  marketing_stage: Joi.string().valid('on_going', 'just_started', 'starting_soon', 'paused', 'not_yet').required(),
});

exports.saveAdoptionAndRecQuerySchema = Joi.object().keys({
  was_draft: Joi.string().optional(),
  save_as_draft: Joi.string().optional(),
});
