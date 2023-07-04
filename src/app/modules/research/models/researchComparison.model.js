const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    research_id: { type: String},
    main_coin_name:{type: String},
    main_coin_info:{type: Object},
    main_coin_AVR:{type: Number},
    reference_coins_data:{type: [Object]},
    average_potential_return_info: {type: Object},
    is_draft: {type: Boolean},
    is_saved: {type: Boolean},
    slug:{type: String}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ResearchComparison", schema);
