const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.premCheckSchema = Joi.object().keys({
  is_independent: Joi.string().valid('true', 'false').optional(),
  was_draft: Joi.string().required(),
  coin_name: Joi.string().optional(),
  asset_id: Joi.string().required(),
  coin_image: Joi.string().required(),
  research_label: Joi.string().optional(),
  research_id: Joi.string()
  .when("was_draft", {
    not: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  twitter_url: Joi.string().uri().required(),
  twitter_createdAt: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required(),
  twitter_account_age: Joi.number().optional(),
  date_of_project_launch: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required(),
  project_status: Joi.string()
    .trim()
    .valid('yes', 'not_yet', 'on_test_net', 'only_staking_for_now','fund_raising')
    .required(),
  last_tweet_date: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required(),
  is_social_media_active: Joi.boolean().required(),
  tags: Joi.array().required(),
  is_visible: Joi.boolean().required(),
  project_about: Joi.string().optional()
});
