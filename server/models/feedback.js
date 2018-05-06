const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  feedback: String,
  createdDate: Date,
  response: String,
  responseDate: Date,
});

mongoose.model('feedback', FeedbackSchema);
