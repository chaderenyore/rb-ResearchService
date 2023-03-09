const Repository = require("../../../Repository");
const ResearchLikes  = require("../models/researchLikes.models");

class ResearchRepository extends Repository {
    constructor() {
        super(ResearchLikes);
    };
}

module.exports = new ResearchRepository();