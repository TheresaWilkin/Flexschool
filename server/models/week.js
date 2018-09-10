const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeekSchema = new Schema({
  start: Date,
  end: Date,
  term: { type: Schema.Types.ObjectId, ref: 'term' },
});

mongoose.model('week', WeekSchema);
