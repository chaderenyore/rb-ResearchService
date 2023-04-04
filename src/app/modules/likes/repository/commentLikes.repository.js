const Repository = require("../../../Repository");
const CommentLikes  = require("../../Likes/models/commentLike.model");

class CommentLikesRepository extends Repository {
    constructor() {
        super(CommentLikes);
    };
}

module.exports = new CommentLikesRepository();