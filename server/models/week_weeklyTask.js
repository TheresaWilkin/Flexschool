const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeekWeeklyTaskSchema = new Schema({
  task: { type: Schema.Types.ObjectId, ref: 'weeklyTask' },
  date: Date,
  week: { type: Schema.Types.ObjectId, ref: 'week' },
});

mongoose.model('week_weeklyTask', WeekWeeklyTaskSchema);
