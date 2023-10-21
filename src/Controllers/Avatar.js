const userModel = require('../Models/userModel.js');
const SECRETS = require('../utils.js');

exports.GetAvatar = async (images, req, res) => {
	try {
		const file = await images.storage.files.findOne({
			filename: req.params.filename
		});
		if (!file) return res.status(404).json('Not found');
		const readStream = images.storage.createReadStream(file.filename);
		readStream.pipe(res);
	} catch (error) {
		console.log(error);
		res.status(404).send(`Avatar not found ${error.message}`);
	}
};

exports.StoreAvatar = async (req, res) => {
	const { userid } = req.body;
	const avatar = `${SECRETS.BASE_URL}/avatar/${req.file.filename}`;

	const user = await userModel.findOne({ _id: userid });
	user.avatar = avatar;
	user.save();

	if (!req.file) return res.status(400).json('Incomplete details');
	res.status(200).json(avatar);
};
