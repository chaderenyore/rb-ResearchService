const Repository = require("../../../Repository");
const ResearchComparison  = require("../models/researchComparison.model");

class ResearchComparisonRepository extends Repository {
    constructor() {
        super(ResearchComparison);
    };
}

module.exports = new ResearchComparisonRepository();