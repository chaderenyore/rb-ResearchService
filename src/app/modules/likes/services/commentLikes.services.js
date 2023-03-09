const CommentLikesRepository = require ('../repository/commentLikes.repository');

class CommentLikesService {
  constructor () {
    this.CommentLikesRepository = CommentLikesRepository;
  }

  async create (data) {
    return this.CommentLikesRepository.create (data)
  }

  async findARecord (query) {
    return this.CommentLikesRepository.findOne (query)
  }

  async update (condition, update) {
    return this.CommentLikesRepository.update (condition, update)

  }

  async updateMany (condition, update) {
    return this.CommentLikesRepository.updateMany(condition, update)

  }

  async deleteAll (condition) {
    return this.CommentLikesRepository.deleteMany (condition)

  }


  async all (limit, page, data) {
    return this.CommentLikesRepository.all (limit, page, data)
  }

  async findById (id) {
    return this.CommentLikesRepository.findById (id)
  }
}

module.exports = CommentLikesService;
