const Repository = require("../../../Repository");
const Tags  = require("../models/tags.model");

class TagsRepository extends Repository {
    constructor() {
        super(Tags);
    };
}

module.exports = new TagsRepository();