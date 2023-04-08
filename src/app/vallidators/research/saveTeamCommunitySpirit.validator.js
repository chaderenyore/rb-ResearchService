const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.saveCommunityAndTeamInfoSchema = Joi.object().keys({
  research_id: Joi.objectId().required(),
  team_identity: Joi.string().valid('doxxed', 'anonymous').optional(),
  team_spirit: Joi.string().valid('active', 'tired').optional(),
  community_spirit: Joi.string().valid('active', 'tired').optional(),
  comments_about: Joi.string().optional(),
  project_expectation: Joi.string().optional(),
  final_comments: Joi.string().optional(),
});


exports.saveTeamAndCommunitySpiritQuerySchema = Joi.object().keys({
    was_draft: Joi.boolean().optional(),
    save_as_draft: Joi.boolean().optional()
  });
