const Repository = require("../../../Repository");
const Tokenomics  = require("../models/tokenomics.model");

class TokenomicsRepository extends Repository {
    constructor() {
        super(Tokenomics);
    };
}

module.exports = new TokenomicsRepository();