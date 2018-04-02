const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  pointsEarned: Number,
  pointsAvailable: Number,
  subject: { type: Schema.Types.ObjectId, ref: 'subject' },
  name: String,
  description: String,
  dueDate: Date,
  submitted: Boolean,
  graded: Boolean,
});

mongoose.model('assignment', AssignmentSchema);
