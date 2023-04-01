const ResearchCommunityRepository = require ('../repository/researchCommunity.repository');

class ResearchCommunityService {
  constructor () {
    this.ResearchCommunityRepository = ResearchCommunityRepository;
  }

  async create (data) {
    return this.ResearchCommunityRepository.create (data)
  }

  async findOne (query) {
    return this.ResearchCommunityRepository.findOne (query)
  }

  async update (condition, update) {
    return this.ResearchCommunityRepository.update (condition, update)

  }

  async updateMany (condition, update) {
    return this.ResearchCommunityRepository.updateMany(condition, update)

  }

  async deleteAll (condition) {
    return this.ResearchCommunityRepository.deleteMany (condition)

  }


  async all (limit, page, data) {
    return this.ResearchCommunityRepository.all (limit, page, data)
  }

  async findById (id) {
    return this.ResearchCommunityRepository.findById (id)
  }
}

module.exports = ResearchCommunityService;
