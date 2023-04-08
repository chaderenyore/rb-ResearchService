const Repository = require("../../../Repository");
const Tokenomics  = require("../../tokenomicsHealth/models/tokenomics.model");

class TokenomicsRepository extends Repository {
    constructor() {
        super(Tokenomics);
    };
}

module.exports = new TokenomicsRepository();