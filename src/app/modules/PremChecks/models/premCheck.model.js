const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    research_id: { type: String},
    twitter_url: {type: String},
    twitter_createdAt: { type: Date},
    twitter_account_age: {type: String},
    date_of_project_launch: {type: String},
    project_status: {type: String, enum: ['active', 'in_active', 'not sure']},
    last_tweet_date: {type: Date},
    is_social_media_active:{type: Boolean},
    is_saved: {type: Boolean}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("PremCheck", schema);
