const CommentRepository = require("../repository/comments.repository");

class CommentService {
  constructor() {
    this.CommentRepository = CommentRepository;
  }

  async create(data) {
    return this.CommentRepository.create(data);
  }

  async findARecord(query) {
    return this.CommentRepository.findOne(query);
  }

  async update(condition, update) {
    return this.CommentRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.CommentRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.CommentRepository.deleteMany(condition);
  }
  async deletOne(condition) {
    return this.CommentRepository.delete(condition);
  }

  async all(limit, page, data) {
    return this.CommentRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.CommentRepository.findById(id);
  }
}

module.exports = CommentService;
