const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  pointsEarned: Number,
  pointsAvailable: Number,
  student: { type: Schema.Types.ObjectId, ref: 'user' },
  name: String,
});

mongoose.model('subject', SubjectSchema);
