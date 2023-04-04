const Repository = require("../../../Repository");
const Research  = require("../../Research/models/research.model");

class ResearchRepository extends Repository {
    constructor() {
        super(Research);
    };
}

module.exports = new ResearchRepository();