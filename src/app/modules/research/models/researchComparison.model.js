const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    research_id: { type: String},
    main_coin_info:{type: Object},
    reference_coins_data:{type: Array},
    is_draft: {type: Boolean},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ResearchComparison", schema);
