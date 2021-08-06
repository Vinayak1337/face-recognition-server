const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { GetAvatar, StoreAvatar } = require('../Controllers/avatar.js');
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
	file: async (req, file) => {
		const match = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
		const { userid } = req.body;

		if (!userid) return file.originalname;
		if (match.indexOf(file.mimetype) === -1) {
			return file.originalname;
		}

		try {
			const fileExist = await images.storage.files.findOne({ filename: userid });
			if (fileExist) await images.storage.files.deleteOne({ filename: userid });
		}
		catch (error) {
			console.log(error);
		}

		const filename = file.originalname.split('.').reverse()[0];

		return {
			bucketName: 'avatar',
			filename: `${userid}.${filename}`,
		};
	},
});

const Storage = multer({ storage });

AvatarRouter.post('/', Storage.single('avatar'), StoreAvatar);

// Static / Stream images

AvatarRouter.get('/:filename', GetAvatar.bind(null, images));

module.export = AvatarRouter;