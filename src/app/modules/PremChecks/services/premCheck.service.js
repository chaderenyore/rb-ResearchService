const PremCheckRepository = require("../repository/premCheck.repository");

class PremCheckService {
  constructor() {
    this.PremCheckRepository = PremCheckRepository;
  }

  async create(data) {
    return this.PremCheckRepository.create(data);
  }

  async findOne(query) {
    return this.PremCheckRepository.findOne(query);
  }

  async update(condition, update) {
    return this.PremCheckRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.PremCheckRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.PremCheckRepository.deleteMany(condition);
  }
  async deleteOne(condition) {
    return this.PremCheckRepository.deleteOne(condition);
  }
  async all(limit, page, data) {
    return this.PremCheckRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.PremCheckRepository.findById(id);
  }
}

module.exports = PremCheckService;
