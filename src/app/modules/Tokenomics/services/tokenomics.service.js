const TokenomicsRepository = require("../repository/tokenomics.repository");

class TokenomicsService {
  constructor() {
    this.TokenomicsRepository = TokenomicsRepository;
  }

  async create(data) {
    return this.TokenomicsRepository.create(data);
  }

  async findOne(query) {
    return this.TokenomicsRepository.findOne(query);
  }

  async update(condition, update) {
    return this.TokenomicsRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.TokenomicsRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.TokenomicsRepository.deleteMany(condition);
  }

  async all(limit, page, data) {
    return this.TokenomicsRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.TokenomicsRepository.findById(id);
  }
}

module.exports = TokenomicsService;
