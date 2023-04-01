const Repository = require("../../../Repository");
const CommunityResearch  = require("../models/communityResearch.model");

class CommunityResearchRepository extends Repository {
    constructor() {
        super(CommunityResearch);
    };
}

module.exports = new CommunityResearchRepository();