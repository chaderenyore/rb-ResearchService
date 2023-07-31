const FavCoinRepository = require("../repository/favouriteCoin.repository");

class FavCoinService {
  constructor() {
    this.FavCoinRepository = FavCoinRepository;
  }

  async create(data) {
    return this.FavCoinRepository.create(data);
  }

  async findARecord(query) {
    return this.FavCoinRepository.findOne(query);
  }

  async update(condition, update) {
    return this.FavCoinRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.FavCoinRepository.updateMany(condition, update);
  }

  async deleteAll(condition) {
    return this.FavCoinRepository.deleteMany(condition);
  }
  async deletOne(condition) {
    return this.FavCoinRepository.deleteOne(condition);
  }

  async all(limit, page, data) {
    return this.FavCoinRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.FavCoinRepository.findById(id);
  }
}

module.exports = FavCoinService;
