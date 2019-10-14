const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoesSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	createdBy: {
		type: String,
		required: true
	}, 
	todo: {
		type: String,
		required: true
	},
	created: {
		type: String,
		required: true
	}
});

const Todoes = mongoose.model('Todoes', TodoesSchema);

module.exports = Todoes;