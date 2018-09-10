const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
	title: String,
	terms: [{ type: Schema.Types.ObjectId, ref: 'term' }],
	course: { type: Schema.Types.ObjectId, ref: 'course' },
	parts: Number,
	partsType: String,
	partDuration: Number,
});

mongoose.model('resource', ResourceSchema);
