const TokenomicsControlRepository = require("../repository/tokenomicsControl.repository");

class TokenomicsControlService {
  constructor() {
    this.TokenomicsControlRepository = TokenomicsControlRepository;
  }

  async create(data) {
    return this.TokenomicsControlRepository.create(data);
  }

  async findOne(query) {
    return this.TokenomicsControlRepository.findOne(query);
  }

  async update(condition, update) {
    return this.TokenomicsControlRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.TokenomicsControlRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.TokenomicsControlRepository.delete(condition);
  }

  async deleteOne(condition) {
    return this.TokenomicsControlRepository.deleteOne(condition);
  }

  async all(limit, page, data) {
    return this.TokenomicsControlRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.TokenomicsControlRepository.findById(id);
  }
}

module.exports = TokenomicsControlService;
