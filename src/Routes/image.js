const { Router } = require('express');
const userModel = require('../Models/userModel.js');

const users = userModel;
const StoreImageRouter = Router();

StoreImageRouter.get('/', async (req, res) => {
	const { id, image } = req.body;
	if (!(id || image)) return res.status(400).json('Incorrect arguments');

	const user = await users.findOne({ id: id });

	if (!user) return res.status(404).json('User not found');

	if (user.images.includes(image)) return res.status(202).json('Image already exists');

	user.images.push(image);
	user.entries += 1;
	await user.save('images');

	return res.status(200).json('Success');
});

module.export = StoreImageRouter;