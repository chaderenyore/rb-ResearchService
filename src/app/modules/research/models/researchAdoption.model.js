const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    research_id: { type: String},
    has_known_partners: { type: Boolean},
    project_name: {type: String},
    partners_info: {type: Object},
    marketing_stage: {type: String},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ResearchAdoption", schema);
