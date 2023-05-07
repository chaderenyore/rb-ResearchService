const Repository = require("../../../Repository");
const ResearchListDetail  = require("../models/researchListDetails.model");

class ResearchListDetailRepository extends Repository {
    constructor() {
        super(ResearchListDetail);
    };
}

module.exports = new ResearchListDetailRepository();