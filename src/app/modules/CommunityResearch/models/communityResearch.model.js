const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    researcher_id: { type: String},
    researcher_image_url: { type: String},
    original_research_id: {type: String},
    researcher_username: {type: String},
    researcher_firstname: {type: String},
    researcher_lastame: {type: String},
    is_original: {type: Boolean},
    original_research: {type: Object},
    reposter_id:{type: String},
    reposter_image:{type: String},
    reposter_username:{type: String},
    research_child:{type: Object},
    coin_name: {type: String},
    coin_url: {type: String},
    coin_image: {type: String},
    amount_paid:{type: Number},
    total_likes: {type: Number, default: 0},
    total_comments: {type: Number, default: 0},
    total_views: {type: Number, default: 0},
    total_clicks:{type: Number},
    age: {type: Number},
    tokenomics_rating: {type: String, enum: ['Excellent', 'Good', 'Very Bad', 'Fair', 'Poor']},
    potential_return: {type: String},
    verdit:{type: String},
    is_working_product:{type: Boolean},
    research_price: {type: String},
    current_price: {type: String},
    is_visible: {type :Boolean},
    is_sponsored: {type :Boolean},
    is_shared:{type: Boolean},
    tags: {type: Array},
    number_of_downloads: {type: Number, default: 0},
    type: {type: String}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ResearchCommunity", schema);
