const ResearchComparisonRepository = require ('../repository/researchComparison.repository');

class ResearchComparisonService {
  constructor () {
    this.ResearchComparisonRepository = ResearchComparisonRepository;
  }

  async create (data) {
    return this.ResearchComparisonRepository.create (data)
  }

  async findOne (query) {
    return this.ResearchComparisonRepository.findOne (query)
  }

  async update (condition, update) {
    return this.ResearchComparisonRepository.update (condition, update)

  }

  async updateMany (condition, update) {
    return this.ResearchComparisonRepository.updateMany(condition, update)

  }

  async deleteAll (condition) {
    return this.ResearchComparisonRepository.deleteMany (condition)

  }


  async all (limit, page, data) {
    return this.ResearchComparisonRepository.all (limit, page, data)
  }

  async findById (id) {
    return this.ResearchComparisonRepository.findById (id)
  }
}

module.exports = ResearchComparisonService;
