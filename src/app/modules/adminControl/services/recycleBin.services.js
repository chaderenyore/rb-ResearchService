const BinRepository = require("../repository/recyclebin.repository");

class TokenomicsControlService {
  constructor() {
    this.BinRepository = BinRepository;
  }

  async create(data) {
    return this.BinRepository.create(data);
  }

  async findOne(query) {
    return this.BinRepository.findOne(query);
  }

  async update(condition, update) {
    return this.BinRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.BinRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.BinRepository.deleteMany(condition);
  }

  async all(limit, page, data) {
    return this.BinRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.BinRepository.findById(id);
  }
}

module.exports = TokenomicsControlService;
