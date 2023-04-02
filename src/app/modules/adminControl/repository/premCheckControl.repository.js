const Repository = require("../../../Repository");
const PremCheckControl  = require("../models/premCheckControl.model");

class PremCheckControlRepository extends Repository {
    constructor() {
        super(PremCheckControl);
    };
}

module.exports = new PremCheckControlRepository();