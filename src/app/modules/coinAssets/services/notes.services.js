const CoinNotesRepository = require("../repository/notes.repository");

class CoinNotesService {
  constructor() {
    this.CoinNotesRepository = CoinNotesRepository;
  }

  async create(data) {
    return this.CoinNotesRepository.create(data);
  }

  async findARecord(query) {
    return this.CoinNotesRepository.findOne(query);
  }

  async update(condition, update) {
    return this.CoinNotesRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.CoinNotesRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.CoinNotesRepository.deleteMany(condition);
  }
  async deletOne(condition) {
    return this.CoinNotesRepository.delete(condition);
  }

  async all(limit, page, data) {
    return this.CoinNotesRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.CoinNotesRepository.findById(id);
  }
}

module.exports = CoinNotesService;
