const Repository = require("../../../Repository");
const ResearchList  = require("../models/researchList.model");

class ResearchListRepository extends Repository {
    constructor() {
        super(ResearchList);
    };
}

module.exports = new ResearchListRepository();