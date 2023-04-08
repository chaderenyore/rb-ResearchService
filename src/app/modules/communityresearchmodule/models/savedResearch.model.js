const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    saver_id:{type: String},
    research_id:{type: String},
    researcher_id:{type: String},
    research_info:{type: Object}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("SavedResearch", schema);
