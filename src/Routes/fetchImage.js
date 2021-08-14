const Clarifai = require('clarifai');
const { Router } = require('express');

const ClarifaiRouter = Router();

ClarifaiRouter.post('/', async (req, res) => {
	try {
		const { imageUrl } = req.body;
		if (!imageUrl) return res.status(400).json('Didn\'t provide any image.');

		const app = new Clarifai.App({ apiKey: process.env.TOKEN });
		const response = await app.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl);

		if (response) return res.status(200).json(response);
		else return res.status(500).json('something went wrong, try again.');
	}
	catch (error) {
		console.log(error);
		return res.status(500).json(`something went wrong, try again. ${error.message}`);
	}
});

module.exports = ClarifaiRouter;