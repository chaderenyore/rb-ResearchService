const ResearchLikesRepository = require ('../repository/researchLikes.repository');

class ResearchLikesService {
  constructor () {
    this.ResearchLikesRepository = ResearchLikesRepository;
  }

  async create (data) {
    return this.ResearchLikesRepository.create (data)
  }

  async findARecord (query) {
    return this.ResearchLikesRepository.findOne (query)
  }

  async update (condition, update) {
    return this.ResearchLikesRepository.update (condition, update)

  }

  async updateMany (condition, update) {
    return this.ResearchLikesRepository.updateMany(condition, update)

  }

  async deleteAll (condition) {
    return this.ResearchLikesRepository.deleteMany (condition)

  }


  async all (limit, page, data) {
    return this.ResearchLikesRepository.all (limit, page, data)
  }

  async findById (id) {
    return this.ResearchLikesRepository.findById (id)
  }
}

module.exports = ResearchLikesService;
