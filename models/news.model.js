const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title is required']
  },
  description: {
    type: String,
    required: [true, 'The description is required']
  },
  deadline: {
    type: Date,
  },
  type: {
    type: String,
    default: 'neutral',
    enum: ['good', 'info', 'alert', 'danger', 'neutral']
  },
  orderTypeNumber: {
    type: Number,
    default: 0
  },
  stored: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }
  ],
  checkedByAdmin: {
    type: Boolean,
    default: false
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

const News = mongoose.model('News', newsSchema);
module.exports = News;