const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    researcher_id: { type: String},
    researcher_image_url: { type: String},
    coin_name: {type: String},
    coni_url: {type: String},
    amount_paid:{type: Number},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Research", schema);
