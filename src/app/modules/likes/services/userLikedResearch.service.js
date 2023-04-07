const LikedResearchRepository = require ('../repository/likedResearch.repository');

class UserLikedResearchService {
  constructor () {
    this.LikedResearchRepository = LikedResearchRepository;
  }

  async create (data) {
    return this.LikedResearchRepository.create (data)
  }

  async findARecord (query) {
    return this.LikedResearchRepository.findOne (query)
  }

  async update (condition, update) {
    return this.LikedResearchRepository.update (condition, update)

  }

  async updateMany (condition, update) {
    return this.LikedResearchRepository.updateMany(condition, update)

  }

  async deleteAll (condition) {
    return this.LikedResearchRepository.deleteMany (condition)

  }


  async all (limit, page, data) {
    return this.LikedResearchRepository.all (limit, page, data)
  }

  async findById (id) {
    return this.LikedResearchRepository.findById (id)
  }
  async deletOne (condition) {
    return this.LikedResearchRepository.delete(condition)
  }
}

module.exports = UserLikedResearchService;
