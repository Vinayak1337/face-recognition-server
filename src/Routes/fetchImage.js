const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');
const { Router } = require('express');
const SECRETS = require('../utils');

const ClarifaiRouter = Router();

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
// set clarifai api key
metadata.set('authorization', `Key ${SECRETS.CLARIFAI_TOKEN}`);

ClarifaiRouter.post('/', async (req, res) => {
	try {
		const { imageUrl } = req.body;
		if (!imageUrl) return res.status(400).json("Didn't provide any image.");

		stub.PostModelOutputs(
			{
				model_id: 'face-detection',
				inputs: [{ data: { image: { url: imageUrl } } }]
			},
			metadata,
			(_, response) => {
				if (response) return res.status(200).json(response);
				else return res.status(500).json('something went wrong, try again.');
			}
		);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(`something went wrong, try again. ${error.message}`);
	}
});

module.exports = ClarifaiRouter;
