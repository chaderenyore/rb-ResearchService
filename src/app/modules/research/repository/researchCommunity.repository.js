const Repository = require("../../../Repository");
const ResearchCommunity  = require("../../research/models/researchCommunity.model");

class ResearchCommunityRepository extends Repository {
    constructor() {
        super(ResearchCommunity);
    };
}

module.exports = new ResearchCommunityRepository();