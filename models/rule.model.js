const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title is required']
  },
  description: {
    type: String,
    required: [true, 'The description is required']
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Rule = mongoose.model('Rule', ruleSchema);
module.exports = Rule;