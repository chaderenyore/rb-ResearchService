const ResearchRepository = require ('../repository/research.repository');

class ResearchService {
  constructor () {
    this.ResearchRepository = ResearchRepository;
  }

  async createResearch (data) {
    return this.ResearchRepository.create (data)
  }

  async findOneAndSortBy(query, sortCodition) {
    return this.ResearchRepository.findOneAndSortBy(query, sortCodition)
  }

  async findAResearch (query) {
    return this.ResearchRepository.findOne (query)
  }

  async update (condition, update) {
    return this.ResearchRepository.update (condition, update)

  }

  async updateMany (condition, update) {
    return this.ResearchRepository.updateMany(condition, update)

  }

  async deleteAll (condition) {
    return this.ResearchRepository.deleteMany (condition)

  }

  async deleteOne (condition) {
    return this.ResearchRepository.deleteOne (condition)

  }


  async all (limit, page, data) {
    return this.ResearchRepository.all (limit, page, data)
  }

  async findById (id) {
    return this.ResearchRepository.findById (id)
  }

  async countDocuments (filter = {}) {
    return this.ResearchRepository.count(filter)
  }
}

module.exports = ResearchService;
