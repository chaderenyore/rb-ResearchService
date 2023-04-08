const Repository = require("../../../Repository");
const PremCheck  = require("../../premcheck/models/premCheck.model");

class  PremCheckRepository extends Repository {
    constructor() {
        super(PremCheck);
    };
}

module.exports = new  PremCheckRepository();