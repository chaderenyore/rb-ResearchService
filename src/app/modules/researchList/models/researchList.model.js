const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user_id: String,
    list_title: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ResearchList", schema);