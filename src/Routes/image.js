const { Router } = require('express');
const userModel = require('../Models/userModel.js');

const users = userModel;
const StoreImageRouter = Router();

StoreImageRouter.post('/', async (req, res) => {
	const { id, image } = req.body;
	if (!(id || image)) return res.status(400).json('Incorrect arguments');

	const user = await users.findOne({ _id: id });

	if (!user) return res.status(404).json('User not found');

	if (user.images.includes(image)) return res.status(204).json('Image already exists');

	user.images.push(image);
	user.entries += 1;
	user.markModified('images');
	await user.save();

	return res.status(200).json('Success');
});

module.exports = StoreImageRouter;