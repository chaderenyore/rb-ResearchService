const Repository = require("../../../Repository");
const ResearchAdoptionModel  = require("../../research/models/researchAdoption.model");

class ResearchAdoptionRepository extends Repository {
    constructor() {
        super(ResearchAdoptionModel);
    };
}

module.exports = new ResearchAdoptionRepository();