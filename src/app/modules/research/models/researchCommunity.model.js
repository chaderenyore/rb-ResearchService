const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    research_id: { type: String},
    team_identity: { type: String, enum: ['doxxed', 'anonymous']},
    team_spirit: {type: String},
    commnunity_spirit: {type: Object},
    comments_about: {type: String},
    project_expectation: {type: String},
    final_comments: {type: String},
    is_draft: {type: Boolean},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ResearchCommunity", schema);
