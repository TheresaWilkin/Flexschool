const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DayResourceSchema = new Schema({
  resource: { type: Schema.Types.ObjectId, ref: 'resource' },
  date: Date,
  day: { type: Schema.Types.ObjectId, ref: 'day' },
  number: String,
});

mongoose.model('week_weeklyTask', DayResourceSchema);
