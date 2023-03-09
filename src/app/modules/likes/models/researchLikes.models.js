const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    research_id: String,
    user_id: String,
    fullname: String,
    username: String,
    user_image: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ResearchLike", schema);