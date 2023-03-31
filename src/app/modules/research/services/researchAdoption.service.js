const ResearchAdoptionRepository = require ('../repository/researchAdoption.repository');

class ResearchAdoptionService {
  constructor () {
    this.ResearchAdoptionRepository = ResearchAdoptionRepository;
  }

  async create (data) {
    return this.ResearchAdoptionRepository.create (data)
  }

  async findOne (query) {
    return this.ResearchAdoptionRepository.findOne (query)
  }

  async update (condition, update) {
    return this.ResearchAdoptionRepository.update (condition, update)

  }

  async updateMany (condition, update) {
    return this.ResearchAdoptionRepository.updateMany(condition, update)

  }

  async deleteAll (condition) {
    return this.ResearchAdoptionRepository.deleteMany (condition)

  }


  async all (limit, page, data) {
    return this.ResearchAdoptionRepository.all (limit, page, data)
  }

  async findById (id) {
    return this.ResearchAdoptionRepository.findById (id)
  }
}

module.exports = ResearchAdoptionService;
