const PremCheckControlRepository = require("../repository/premCheckControl.repository");

class PremCheckControlService {
  constructor() {
    this.PremCheckControlRepository = PremCheckControlRepository;
  }

  async create(data) {
    return this.PremCheckControlRepository.create(data);
  }

  async findOne(query) {
    return this.PremCheckControlRepository.findOne(query);
  }

  async update(condition, update) {
    return this.PremCheckControlRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.PremCheckControlRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.PremCheckControlRepository.deleteMany(condition);
  }

  async all(limit, page, data) {
    return this.PremCheckControlRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.PremCheckControlRepository.findById(id);
  }
}

module.exports = PremCheckControlService;
