const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'course' },
  name: String,
  order: Number,
	start: Date,
  end: Date,
  vacations: [Date],
  schooldays: [String],
});

mongoose.model('term', TermSchema);
