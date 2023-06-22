const Repository = require("../../../Repository");
const RecycleBin  = require("../models/recycleBin.model");

class RecycleBinRepository extends Repository {
    constructor() {
        super(RecycleBin);
    };
}

module.exports = new RecycleBinRepository();