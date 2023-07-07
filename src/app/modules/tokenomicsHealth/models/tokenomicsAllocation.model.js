const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    research_id: { type: String},
    indicator_name: {type: String},
    indicator_percentage:{type: Number, min:0},
    indicator_total_allocation:{type: Number, min:0}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("TokenomicsAllocation", schema);
