const Repository = require("../../../Repository");
const ResearchAdoptionModel  = require("../../Research/models/researchAdoption.model");

class ResearchAdoptionRepository extends Repository {
    constructor() {
        super(ResearchAdoptionModel);
    };
}

module.exports = new ResearchAdoptionRepository();