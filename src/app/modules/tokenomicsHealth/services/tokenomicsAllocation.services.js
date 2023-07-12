const TokenomicsAllocationRepository = require("../repository/tokenomicsAllocation.repository");

class TokenomicsAllocationService {
  constructor() {
    this.TokenomicsAllocationRepository = TokenomicsAllocationRepository;
  }

  async create(data) {
    return this.TokenomicsAllocationRepository.create(data);
  }

  async findOne(query) {
    return this.TokenomicsAllocationRepository.findOne(query);
  }

  async update(condition, update) {
    return this.TokenomicsAllocationRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.TokenomicsAllocationRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.TokenomicsAllocationRepository.deleteMany(condition);
  }
  async deleteOne (condition) {
    return this.TokenomicsAllocationRepository.deleteOne (condition)

  }
  async all(query) {
    return this.TokenomicsAllocationRepository.findAll(query);
  }

  async findById(id) {
    return this.TokenomicsAllocationRepository.findById(id);
  }
}

module.exports = TokenomicsAllocationService;
