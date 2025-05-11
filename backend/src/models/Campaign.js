import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  segmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Segment', required: true },
  steps: [{ type: Object, required: true }], // array of message/delay steps
  suggestions: { type: Object }, // e.g., { tag, sendTime, ctas,summary }
  createdAt: { type: Date, default: Date.now },
  stats: {
    sent: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    audienceSize: { type: Number, default: 0 }
  }
});

export default mongoose.model('Campaign', campaignSchema);
