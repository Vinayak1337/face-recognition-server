import userModel from '../Models/userModel';

export const GetAvatar = async (images, req, res) => {
	try {
		const file = await images.storage.files.findOne({ filename: req.params.filename });
		const readStream = images.storage.createReadStream(file.filename);
		readStream.pipe(res);
	}
	catch (error) {
		res.status(404).send('Avatar not found');
	}
};

export const StoreAvatar = (req, res) => {
	const { userid } = req.body;
	const avatar = `https://image-recognition-server.herokuapp.com/avatar/${req.file.filename}`;

	const user = userModel.findOne({ _id: userid });
	user.avatar = avatar;

	if (!req.file) return res.status(402).json({ message: 'Incomplete details' });
	res.status(200).json(avatar);
};