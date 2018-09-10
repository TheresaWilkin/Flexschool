const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  terms: [{type: Schema.Types.ObjectId, ref: 'week'}],
  teacher: { type: Schema.Types.ObjectId, ref: 'user' },
  name: String,
});

mongoose.model('course', CourseSchema);
