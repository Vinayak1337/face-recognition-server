const userModel = require('../Models/userModel.js');

exports.GetAvatar = async (images, req, res) => {
	try {
		const file = await images.storage.files.findOne({ filename: req.params.filename });
		const readStream = images.storage.createReadStream(file.filename);
		readStream.pipe(res);
	}
	catch (error) {
		res.status(404).send('Avatar not found');
	}
};

exports.StoreAvatar = (req, res) => {
	const { userid } = req.body;
	const avatar = `https://image-recognition-server.herokuapp.com/avatar/${req.file.filename}`;

	const user = userModel.findOne({ _id: userid });
	user.avatar = avatar;

	if (!req.file) return res.status(400).json('Incomplete details');
	res.status(200).json(avatar);
};