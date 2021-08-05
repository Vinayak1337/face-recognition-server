import mongoose from 'mongoose';
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
}, { minimize: false });

export default mongoose.model('users', userSchema);