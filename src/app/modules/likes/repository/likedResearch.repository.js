const Repository = require("../../../Repository");
const LikedResearch  = require("../../likes/models/userLikedResearch.model");

class LikedResearchRepository extends Repository {
    constructor() {
        super(LikedResearch);
    };
}

module.exports = new LikedResearchRepository();