const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title is required']
  },
  description: {
    type: String
  },
  startDate: {
    type: Date,
    required: [true, 'The start date of the meeting is required']
  },
  deadLine: {
    type: Date,
    required: [true, 'A deadline for the meeting is required']
  },
  agreements:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Agreement'
    }
  ],
  active: {
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

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;