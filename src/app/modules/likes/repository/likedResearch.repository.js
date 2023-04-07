const Repository = require("../../../Repository");
const LikedResearch  = require("../../Likes/models/userLikedResearch.model");

class LikedResearchRepository extends Repository {
    constructor() {
        super(LikedResearch);
    };
}

module.exports = new LikedResearchRepository();