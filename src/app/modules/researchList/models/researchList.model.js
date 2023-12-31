const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user_id: String,
    list_name: String,
    no_in_list:{type: Number, default: 0}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ResearchList", schema);