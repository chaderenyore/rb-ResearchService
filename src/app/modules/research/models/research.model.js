const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    community_id:{type: String},
    project_about:{type:String},
    researcher_id: { type: String},
    poster_id:{type: String},
    research_label:{type: String},
    original_research_id:{type: String},
    research_child:{type: Object},
    researcher_image_url: { type: String},
    researcher_username: {type: String},
    researcher_firstname: {type: String},
    researcher_lastame: {type: String},
    coin_name: {type: String},
    coin_url: {type: String},
    coin_image: {type: String},
    amount_paid:{type: Number},
    total_likes: {type: Number, default: 0},
    total_comments: {type: Number, default: 0},
    total_views: {type: Number, default: 0},
    total_times_shared: {type: Number, default: 0},
    total_times_saved: {type: Number, default: 0},
    age: {type: String},
    tokenomics_rating: {type: String, enum: ['excellent', 'good', 'Very Poor', 'fair', 'Poor']},
    potential_return: {type: Number},
    verdit:{type: String},
    verdit_score: {type: Number, default: 0},
    is_working_product:{type: String},
    research_price: {type: String},
    current_price: {type: String},
    is_visible: {type :Boolean},
    is_sponsored: {type :Boolean},
    is_draft: {type: Boolean},
    tags: {type: [String]},
    type: {type: String},
    number_of_downloads: {type: Number, default: 0},
    is_saved: {type: Boolean},
    is_launched: {type: Boolean, default: false}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Research", schema);