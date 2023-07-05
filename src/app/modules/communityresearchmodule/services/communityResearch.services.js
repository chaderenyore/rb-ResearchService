const CommunityResearchRepository = require ('../repository/communityResearch,repository');

class ResearchAdoptionService {
  constructor () {
    this.CommunityResearchRepository = CommunityResearchRepository;
  }

  async create (data) {
    return this.CommunityResearchRepository.create (data)
  }

  async findOne (query) {
    return this.CommunityResearchRepository.findOne (query)
  }

  async update (condition, update) {
    return this.CommunityResearchRepository.update (condition, update)

  }

  async updateMany (condition, update) {
    return this.CommunityResearchRepository.updateMany(condition, update)

  }

  async deleteAll (condition) {
    return this.CommunityResearchRepository.deleteMany (condition)

  }
  async deleteOne (condition) {
    return this.CommunityResearchRepository.deleteOne (condition)

  }

  async all (limit, page, data) {
    return this.CommunityResearchRepository.all (limit, page, data)
  }

  async fetchAllOrderBy(limit, page, data, selectedFields, sortFilter) {
    return this.CommunityResearchRepository.fetchAllOrderBy(limit, page, data, selectedFields, sortFilter);
  }

  async findById (id) {
    return this.CommunityResearchRepository.findById (id)
  }
}

module.exports = ResearchAdoptionService;
