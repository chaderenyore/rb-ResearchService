const ReplyRepository = require("../repository/reply.repository");

class ReplyService {
  constructor() {
    this.ReplyRepository = ReplyRepository;
  }
  
  async create(data) {
    return this.ReplyRepository.create(data)
  }

  async findOne(query) {
    return this.ReplyRepository.findOne(query);
  }

  async updateARecord(condition, update) {
    return this.ReplyRepository.update(condition, update)
  }

  async GetAllRecords(limit, page, data, selectedFields) {
   return this.ReplyRepository.all(limit, page, data, selectedFields)

  }

  async findRecordById(id) {
    return this.ReplyRepository.findById(id)
  }

  async deletAll() {
    return this.ReplyRepository.delete({})
  }

  async deletOne (condition) {
    return this.ReplyRepository.delete(condition)
  }
}

module.exports = ReplyService;
