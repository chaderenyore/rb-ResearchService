const Repository = require("../../../Repository");
const Comment  = require("../../Comments/models/researchComment.model");

class CommentRepository extends Repository {
    constructor() {
        super(Comment);
    };
}

module.exports = new CommentRepository();