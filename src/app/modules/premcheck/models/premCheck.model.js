const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    coin_name:{type: String},
    research_id: { type: String},
    researcher_id:{type: String},
    project_about:{type: String},
    twitter_url: {type: String},
    twitter_createdAt: { type: Date},
    twitter_account_age: {type: String},
    date_of_project_launch: {type: String},
    project_status: {type: String, enum: ['yes', 'not_yet', 'on_test_net', 'only_staking_for_now','fund_raising']},
    last_tweet_date: {type: Date},
    is_visible: {type: Boolean},
    is_social_media_active:{type: Boolean},
    is_draft: {type: Boolean},
    is_dependent:{type: String},
    is_saved: {type: Boolean},
    tags: {type: [String]}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("PremCheck", schema);
