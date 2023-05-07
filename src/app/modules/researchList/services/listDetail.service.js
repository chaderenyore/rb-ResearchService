const ResearchListDetailRepository = require("../repository/listDetail.repository");

class ResearchListService {
  constructor() {
    this.ResearchListDetailRepository = ResearchListDetailRepository;
  }

  async create(data) {
    return this.ResearchListDetailRepository.create(data);
  }

  async findARecord(query) {
    return this.ResearchListDetailRepository.findOne(query);
  }

  async update(condition, update) {
    return this.ResearchListDetailRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.ResearchListDetailRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.ResearchListDetailRepository.delete(condition);
  }
  async deletOne(condition) {
    return this.ResearchListDetailRepository.deleteOne(condition);
  }

  async all(limit, page, data) {
    return this.ResearchListDetailRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.ResearchListDetailRepository.findById(id);
  }
}

module.exports = ResearchListService;
