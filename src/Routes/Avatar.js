const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { GetAvatar, StoreAvatar } = require('../Controllers/Avatar.js');
const { Router } = express;
const AvatarRouter = Router();
dotenv.config();

const images = {
	storage: null,
};

const conn = mongoose.connection;
conn.once('open', () => {
	images.storage = Grid(conn.db, mongoose.mongo);
	images.storage.collection('avatar');
	console.log('Connected to Avatar collection');
});

const storage = new GridFsStorage({
	url: process.env.URI,
	options: {
		useNewUrlParser: true, useUnifiedTopology: true,
	},
	file: async (_req, file) => {
		try {
			const fileExist = await images.storage.files.findOne({ filename: file.originalname });
			if (fileExist) await images.storage.files.deleteOne({ filename: file.originalname });
		}
		catch (error) {
			console.log(error);
		}

		return {
			bucketName: 'avatar',
			filename: `${file.originalname}.${file.mimetype.replace('image/', '')}`,
		};
	},
});

const Storage = multer({ storage });

AvatarRouter.post('/', Storage.single('avatar'), StoreAvatar);

// Static / Stream images

AvatarRouter.get('/:filename', GetAvatar.bind(null, images));

module.exports = AvatarRouter;