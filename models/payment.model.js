const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new mongoose.Schema({
  title: {
      type: String,
  },
  description: {
      type: String,
  },
  amount: {
      type: Number,
      required: true,
  },
  debtor: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    }
  ]
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

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
