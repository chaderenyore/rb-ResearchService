const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user_id: String,
    coin_id: String,
    note_text: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("CoinNote", schema);