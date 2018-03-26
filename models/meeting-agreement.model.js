const mongoose = require('mongoose');

const agreementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title is required']
  },
  description: {
    type: String,
    required: [true, 'The description is required']
  },
  agree: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }
  ],
  disagree: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }
  ],
  meeting: {
    type: Schema.Types.ObjectId,
    ref: 'Meeting'
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

const Agreement = mongoose.model('Agreement', agreementSchema);
module.exports = Agreement;