const ResearchListRepository = require("../repository/researchList.repository");

class ResearchListService {
  constructor() {
    this.ResearchListRepository = ResearchListRepository;
  }

  async create(data) {
    return this.ResearchListRepository.create(data);
  }

  async findARecord(query) {
    return this.ResearchListRepository.findOne(query);
  }

  async update(condition, update) {
    return this.ResearchListRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.ResearchListRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.ResearchListRepository.delete(condition);
  }
  async deletOne(condition) {
    return this.ResearchListRepository.deleteOne(condition);
  }

  async all(limit, page, data) {
    return this.ResearchListRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.ResearchListRepository.findById(id);
  }
}

module.exports = ResearchListService;
