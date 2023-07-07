const Repository = require("../../../Repository");
const TokenomicsAllocation  = require("../../tokenomicsHealth/models/tokenomicsAllocation.model");

class TokenomicsAllocationRepository extends Repository {
    constructor() {
        super(TokenomicsAllocation);
    };
}

module.exports = new TokenomicsAllocationRepository();