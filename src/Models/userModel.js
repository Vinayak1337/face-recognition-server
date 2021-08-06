const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		unique: true,
	},
	createdOn: {
		type: Date,
		default: Date.now(),
	},
	entries: {
		type: Number,
		default: 0,
	},
	images: {
		type: Array,
		default: [],
	},
	avatar: {
		type: String,
		default: `https://robohash.org/${Math.floor(Math.round(Math.random() * 10))}?380x380`,
	},
}, { minimize: false });

module.export = mongoose.model('users', userSchema);