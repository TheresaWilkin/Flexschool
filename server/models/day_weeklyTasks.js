const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DayWeeklyTaskSchema = new Schema({
  task: { type: Schema.Types.ObjectId, ref: 'weeklyTask' },
  day: { type: Schema.Types.ObjectId, ref: 'day' },
  number: String,
});

mongoose.model('day_weeklyTask', DayWeeklyTaskSchema);
