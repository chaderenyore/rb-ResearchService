const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    saver_id:{type: String},
    research_id:{type: String},
    community_id:{type: String},
    researcher_id:{type: String},
    is_banned: {type: Boolean, default: false},
    original_is_deleted: {type: Boolean, default: false}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("SavedResearch", schema);
