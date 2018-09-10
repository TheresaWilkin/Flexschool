const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeekResourceSchema = new Schema({
  resource: { type: Schema.Types.ObjectId, ref: 'resource' },
  week: { type: Schema.Types.ObjectId, ref: 'week' },
});

mongoose.model('week_resource', WeekResourceSchema);
