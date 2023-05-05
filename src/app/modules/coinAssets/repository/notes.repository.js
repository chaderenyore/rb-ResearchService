const Repository = require("../../../Repository");
const CoinNotes  = require("../models/notes.models");

class CoinNotesRepository extends Repository {
    constructor() {
        super(CoinNotes);
    };
}

module.exports = new CoinNotesRepository();