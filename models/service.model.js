const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title is required']
  },
  description: {
    type: String,
    required: [true, 'The description is required']
  },
  phone: {
    type: String,
    required: [true, 'The phone number is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  location: {
    type: { type: String },
    coordinates: [Number]
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

serviceSchema.index({ location: '2dsphere' });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;