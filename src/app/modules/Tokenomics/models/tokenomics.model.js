const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    research_id: { type: String},
    number_of_tradeable_tokens: { type: Number},
    is_main_token: {type: Boolean},
    has_enough_token: {type: Number},
    token_type: {type: String, enum: ['inflationary', 'deflationary', 'not sure']},
    purpose: {type: Object},
    has_dao:{type: Boolean},
    tags: {type: Array},
    is_saved: {type: Boolean}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Tokenomics", schema);
