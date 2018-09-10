const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
  day: Date,
  week: { type: Schema.Types.ObjectId, ref: 'week' },
});

mongoose.model('day', DaySchema);
