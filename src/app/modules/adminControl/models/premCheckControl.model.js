const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    admin_id: { type: String},
    admin_username: { type: String},
    name:{type: String, enum:['premCheck']},
    twitter_age_limit:{type: Number, min: 0},
    launch_age_limit:{type: Number, min:0}, 
    lastTweetTimeInDays_limit:{type: Number, min:0},
    lastTweetTimeInDays_point:{type: Number, min:0},
    launch_age_point:{type: Number, min:0}, 
    twitter_age_point:{type: Number, min:0}, 
    active_on_social_media_point:{type: Number, min:0}, 
    project_satus_point: {type: Number, min:0},
    total_pass_mark:{type: Number, min:0, max:100}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("PremCheckControl", schema);
