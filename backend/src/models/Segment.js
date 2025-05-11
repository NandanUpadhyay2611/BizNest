import mongoose from 'mongoose';

const segmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rules: { type: Object, required: true }, // stores the logical rule tree
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Segment', segmentSchema);
