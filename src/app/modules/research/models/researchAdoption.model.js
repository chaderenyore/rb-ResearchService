const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    research_id: { type: String},
    has_known_partners: { type: Boolean},
    project_name: {type: String},
    partners_info: {type: Array},
    media_links: {type: Array},
    marketing_stage: {type: String},
    is_draft: {type: Boolean},
    is_saved: {type: Boolean},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ResearchAdoption", schema);
