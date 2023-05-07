const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    list_id: String,
    research_id: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ResearchListDetail", schema);