const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user_id: String,
    asset_id: String,
    coin_name: String,
    price: String,
    chg24hrs: String,
    market_cap: String,
    volume: String,
    vol_per_market_cap: String,
    circulating_supply: String,

  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("FavouriteCoin", schema);