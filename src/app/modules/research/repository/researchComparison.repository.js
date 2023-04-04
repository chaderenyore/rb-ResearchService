const Repository = require("../../../Repository");
const ResearchComparison  = require("../../Research/models/researchComparison.model");

class ResearchComparisonRepository extends Repository {
    constructor() {
        super(ResearchComparison);
    };
}

module.exports = new ResearchComparisonRepository();