const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user_id: String,
    research_id: String,
    community_id: String,
    note_text: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("CoinNote", schema);