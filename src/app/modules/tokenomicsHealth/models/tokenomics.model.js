const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    research_id: { type: String},
    number_of_tradeable_tokens: { type: Number},
    is_main_token: {type: Boolean},
    has_enough_utility: {type: String, enum:['yes', 'no', 'unsure']},
    token_type: {type: String, enum: ['inflationary', 'deflationary', 'unsure']},
    circulating_supply: {type: Number},
    total_supply:{type: Number},
    max_supply:{type: Number},
    reserve_allocation: {type: Number, min:0},
    utility:{type: String},
    purpose: {type: Object},
    has_dao:{type: Boolean},
    tags: {type: [String]},
    is_saved: {type: Boolean},
    is_dependent:{type: String},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Tokenomics", schema);
