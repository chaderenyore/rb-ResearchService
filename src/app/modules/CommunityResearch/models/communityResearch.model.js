const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    researcher_id: { type: String},
    researcher_image_url: { type: String},
    original_research_id: {type: String},
    is_original: {type: Boolean},
    original_research: {type: Object},
    coin_name: {type: String},
    coin_url: {type: String},
    coin_image: {type: String},
    amount_paid:{type: Number},
    total_likes: {type: Number, default: 0},
    total_comments: {type: Number, default: 0},
    total_views: {type: Number, default: 0},
    total_clicks:{type: Number},
    is_visible: {type :Boolean},
    is_sponsored: {type :Boolean},
    is_shared:{type: Boolean},
    tags: {type: Array},
    number_of_downloads: {type: Number, default: 0}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Research", schema);
