const Repository = require("../../../Repository");
const TokenomicsControl  = require("../models/tokenomicsControl.model");

class TokenomicsControlRepository extends Repository {
    constructor() {
        super(TokenomicsControl);
    };
}

module.exports = new TokenomicsControlRepository();