const Repository = require("../../../Repository");
const FavCoin = require("../models/favCoin.model");

class FavCoinRepository extends Repository {
    constructor() {
        super(FavCoin);
    };
}

module.exports = new FavCoinRepository();