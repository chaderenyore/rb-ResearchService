const Repository = require("../../../Repository");
const ResearchAdoption  = require("../models/researchAdoption.model");

class ResearchAdoptionRepository extends Repository {
    constructor() {
        super(ResearchAdoption);
    };
}

module.exports = new ResearchAdoptionRepository();