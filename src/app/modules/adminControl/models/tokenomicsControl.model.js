const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    admin_id: { type: String},
    admin_username: { type: String},
    tradeable_token:{type: Object}, // 4 :::: 1 for each point
    is_main_token:{type: Object}, // yes = 5, no 0
    has_enough_utils:{type: Object}, // yes =5 , no 0
    token_type: {type: Object}, // deflatioinary = 5, infaltionary = 0
    negative_indicators:{type: Object}, // if sum greater than 50% of max supply , bad token
    positive_indicators: {type:Object} // if sum greater than 50, good token:::: if negative indicators and positive are equal, fair token
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("TokenomicsHealthControl", schema);
