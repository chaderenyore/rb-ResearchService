const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    admin_id: { type: String},
    admin_username: { type: String},
    name:{type: String, enum:['tokenomics']},
    tradeable_token_score:{type: Number, min:0, max:100},
    is_main_token_score:{type: Number, min:0, max:100},
    has_enough_utils_score:{type: Number, min:0, max: 100},
    has_dao_score:{type: Number, min:0, max: 100}, 
    token_type_deflationary_score: {type: Number, min: 0, max: 100},
    negative_indicators:{type: [Object]},
    positive_indicators: {type:[Object]},
    upperLimit_for_excellence: {type: Number, min: 70, max:100},
    upperLimit_for_good: {type: Number, min: 50, max:100},
    upperlimit_for_fair: {type: Number, min: 0, max:100},
    upperlimit_for_poor: {type: Number, min: 0, max:100},
    upperlimit_for_vpoor: {type: Number, min: 0, max:100},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("TokenomicsHealthControl", schema);
