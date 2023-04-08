const Repository = require("../../../Repository");
const ResearchLikes  = require("../../likes/models/researchLikes.models");

class ResearchRepository extends Repository {
    constructor() {
        super(ResearchLikes);
    };
}

module.exports = new ResearchRepository();