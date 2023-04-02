const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    admin_id: { type: String},
    admin_username: { type: String},
    twitter_age:{type: Object}, // less than 5 months -40 , 5months or greater +40
    launch_age:{type: Object}, // a fall back for twiiter age
    active_on_social_medai:{type: Object}, // yes = 20, no = 0
    age_of_last_post: {type: Object}, // within a month 10, greater than a month -10
    product_readiness:{type: Object} // yes = 30 , no = 0
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("PremCheckControl", schema);
