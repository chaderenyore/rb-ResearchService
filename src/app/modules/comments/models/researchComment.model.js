const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    research_id: String,
    commenter_id: {type: String},
    commenter_image: {type: String},
    commenter_fullname: {type: String},
    commenter_username: {type: String},
    comment_body_text: {type: String},
    total_likes: {type: Number},
    total_replies: {type: Number},
    is_parent:{type: Boolean},
    was_edited: {type: Boolean, default: false},
    imageUrl: {type: String},
    type:{type: String}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ResearchComment", schema);