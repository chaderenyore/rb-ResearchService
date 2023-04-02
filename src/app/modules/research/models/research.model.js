const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    researcher_id: { type: String},
    poster_id:{type: String},
    original_research_id:{type: String},
    research_child:{type: Object},
    researcher_image_url: { type: String},
    coin_name: {type: String},
    coin_url: {type: String},
    coin_image: {type: String},
    amount_paid:{type: Number},
    total_likes: {type: Number, default: 0},
    total_comments: {type: Number, default: 0},
    total_views: {type: Number, default: 0},
    total_times_shared: {type: Number, default: 0},
    age: {type: Number},
    tokenomics_rating: {type: String, enum: ['excellent', 'good', 'very bad', 'fair', 'poor']},
    potential_return: {type: String},
    verdit:{type: String},
    is_visible: {type :Boolean},
    is_sponsored: {type :Boolean},
    is_draft: {type: Boolean},
    tags: {type: Array},
    number_of_downloads: {type: Number, default: 0}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Research", schema);
