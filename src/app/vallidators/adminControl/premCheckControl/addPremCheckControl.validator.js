const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.addPremCheckControlSchema = Joi.object().keys({
  twitter_age_limit: Joi.number().optional(),
  launch_age_limit: Joi.number().optional(),
  LastTweetTimeInDays_limit: Joi.number().optional(),
  LastTweetTimeInDays_point: Joi.number().optional(),
  launch_age_point: Joi.number().optional(),
  active_on_social_media_point: Joi.number().optional(),
  project_satus_point: Joi.number().optional(),
  total_pass_mark: Joi.number().optional(),
});
