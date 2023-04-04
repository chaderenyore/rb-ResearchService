const Repository = require("../../../Repository");
const Reply = require("../../Comments/models/commentReplies.model");

class ReplyRepository extends Repository {
    constructor() {
        super(Reply);
    };
}

module.exports = new ReplyRepository();