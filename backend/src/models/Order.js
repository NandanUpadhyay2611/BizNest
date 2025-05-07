
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer' },  //customer will have orders One to many relation Kindoff
  amount: { type: Number, required: true },
  date: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
