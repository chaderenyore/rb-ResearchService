const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.saveDraftPremCheckSchema = Joi.object().keys({
  coin_name: Joi.string().required(),
  twitter_url: Joi.string().uri().required(),
  twitter_createdAt: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required(),
  twitter_account_age: Joi.number().optional(),
  date_of_project_launch: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .optional(),
  project_status: Joi.string()
    .trim()
    .valid(
      "yes",
      "not_yet",
      "on_test_net",
      "only_staking_for_now",
      "fund_raising"
    )
    .optional(),
  last_tweet_date: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .optional(),
  is_social_media_active: Joi.boolean().optional(),
  tags: Joi.array().optional(),
  project_about: Joi.string().optional()
});
