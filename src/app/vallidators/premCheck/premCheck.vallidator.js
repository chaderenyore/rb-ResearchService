const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.premCheckSchema = Joi.object().keys({
  was_draft: Joi.boolean().required(),
  research_id: Joi.objectId().optional(),
  coin_name: Joi.string().required(),
  twitter_url: Joi.string().uri().required(),
  twitter_createdAt: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required(),
  twitter_account_age: Joi.number().required(),
  date_of_project_launch: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required(),
  project_status: Joi.string()
    .trim()
    .valid("active", "inactive", "not_sure")
    .required(),
  last_tweet_date: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required(),
  is_social_media_active: Joi.bolean().required(),
  tags: Joi.array().required()
});
