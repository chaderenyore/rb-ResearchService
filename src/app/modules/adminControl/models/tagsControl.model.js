const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    added_by: { type: String },
    tag_name: { type: String }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('Tags', schema);
