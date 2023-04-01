const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.saveDraftPremCheckSchema = Joi.object().keys({
  was_draft: Joi.boolean().required(),
  coin_name: Joi.string().optional(),
  twitter_url: Joi.string().uri().optional(),
  twitter_createdAt: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .optional(),
  twitter_account_age: Joi.number().optional(),
  date_of_project_launch: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .optional(),
  project_status: Joi.string()
    .trim()
    .valid("active", "inactive", "not_sure")
    .optional(),
  last_tweet_date: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .optional(),
  is_social_media_active: Joi.bolean().optional(),
  tags: Joi.array().optional()
});
