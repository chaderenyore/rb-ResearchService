const SavedResearchRepository = require ('../repository/savedResearch.repository');

class SavedResearchService {
  constructor () {
    this.SavedResearchRepository = SavedResearchRepository;
  }

  async create (data) {
    return this.SavedResearchRepository.create (data)
  }

  async findOne (query) {
    return this.SavedResearchRepository.findOne (query)
  }

  async update (condition, update) {
    return this.SavedResearchRepository.update (condition, update)

  }

  async updateMany (condition, update) {
    return this.SavedResearchRepository.updateMany(condition, update)

  }

  async deleteAll (condition) {
    return this.SavedResearchRepository.deleteMany (condition)

  }


  async all (limit, page, data) {
    return this.SavedResearchRepository.all (limit, page, data)
  }

  async findById (id) {
    return this.SavedResearchRepository.findById (id)
  }
}

module.exports = SavedResearchService;
