const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user_id: String,
    community_id: String,
    research_tags: {type: [String]},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("UserLikedResearch", schema);