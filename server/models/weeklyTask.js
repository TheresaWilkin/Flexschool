const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeeklyTaskSchema = new Schema({
	title: String,
	terms: [{ type: Schema.Types.ObjectId, ref: 'term' }],
	partDuration: Number,
	days: [String],
	course: { type: Schema.Types.ObjectId, ref: 'course' },
});

mongoose.model('weeklyTask', WeeklyTaskSchema);
