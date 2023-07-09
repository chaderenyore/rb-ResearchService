const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.addPremCheckControlSchema = Joi.object().keys({
  twitter_age_limit: Joi.number().positive().optional(),
  launch_age_limit: Joi.number().positive().optional(),
  lastTweetTimeInDays_limit: Joi.number().positive().optional(),
  lastTweetTimeInDays_point: Joi.number().positive().optional(),
  launch_age_point: Joi.number().positive().optional(),
  twitter_age_point:  Joi.number().positive().optional(),
  active_on_social_media_point: Joi.number().positive().optional(),
  project_satus_point: Joi.number().positive().optional(),
  total_pass_mark: Joi.number().integer().min(0).max(100).optional(),
});
