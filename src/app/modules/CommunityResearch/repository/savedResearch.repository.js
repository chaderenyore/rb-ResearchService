const Repository = require("../../../Repository");
const SavedResearch  = require("../../communityresearch/models/savedResearch.model");

class SavedResearchRepository extends Repository {
    constructor() {
        super(SavedResearch);
    };
}

module.exports = new SavedResearchRepository();