const TagsRepository = require("../repository/tags.repository");

class TagsService {
  constructor() {
    this.TagsRepository = TagsRepository;
  }

  async create(data) {
    return this.TagsRepository.create(data);
  }

  async findOne(query) {
    return this.TagsRepository.findOne(query);
  }

  async update(condition, update) {
    return this.TagsRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.TagsRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.TagsRepository.deleteMany(condition);
  }

  async all(limit, page, data) {
    return this.TagsRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.TagsRepository.findById(id);
  }
}

module.exports = TagsService;
