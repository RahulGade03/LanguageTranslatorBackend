import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    searched: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

export default mongoose.model('History', historySchema);