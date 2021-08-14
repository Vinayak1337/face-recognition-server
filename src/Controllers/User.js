const argon2 = require('argon2');
const userModel = require('../Models/userModel.js');

const users = userModel;

exports.Register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) return res.status(400).json('Incomplete details');

		const userExist = await Promise.all([
			users.findOne({ email }),
			users.findOne({ username }),
		]);

		if (userExist[0] || userExist[1]) return res.status(406).json('Either username or email isn\'t available');
		const hash = await argon2.hash(password);

		const obj = {
			username, email, password: hash, entries: 0, images: [], createdOn: Date.now(),
		};

		(await new users(obj)).save((_, UserDoc) => {
			const user = {
				id: UserDoc._id,
				username: UserDoc.username,
				email: UserDoc.email,
				entries: UserDoc.entries,
				createdOn: UserDoc.createdOn,
				avatar: UserDoc.avatar,
			};

			res.status(200).json(user);
		});
	}
	catch (error) {
		console.log(error);
		res.status(500).json(`Something went wrong. ${error.message}`);
	}
};

exports.SignIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await users.findOne({ email });

		if (!user) return res.status(404).json('User was not found.');

		const userData = user._doc;

		const passVerified = await argon2.verify(userData.password, password);

		if (!passVerified) return res.status(400).json('Either email or password is incorrect.');

		userData.id = userData._id;
		delete userData._id;
		delete userData.password;
		delete userData.images;
		res.status(200).json({
			...userData,
		});
	}
	catch (error) {
		return res.status(500).json('Something went wrong');
	}
};


exports.UpdateUser = async (_req, res) => {
	res.status(501).json('Under construction');
};

exports.DeleteUser = async (req, res) => {
	const { userid } = req.body;

	if (!userid) return res.status(400).json({ message: 'userid is required' });

	const user = await users.findOne({ _id: userid });

	if (!user) return res.status(404).json({ message: 'user not found' });

	await user.remove();

	return res.status(200).json({ message: 'Successfully deleted the user' });
};