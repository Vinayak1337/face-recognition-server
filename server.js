import express from 'express';
import bodyParser from 'body-parser';
import argon2 from 'argon2';
import mongoose from 'mongoose';
import userProvider from './provider/userProvider.js';
import userSchema from './provider/userModel.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import clarifai from './Controllers/clarify.js';
import signin from './Controllers/signin.js';
import verify from './Controllers/verify.js';
import register from './Controllers/register.js';
import storeImage from './Controllers/image.js';

(async () => {

	try {
		console.log(mongoose.connect);
		const db = new userProvider(userSchema);
		db.init();

		const app = express();
		app.use(cors());
		app.use(bodyParser.json());

		app.get('/', (_req, res) => {res.send('Server is running');});
		app.post('/signin', signin(db, argon2));
		app.post('/verify', verify(db));
		app.post('/register', register(db, argon2));
		app.put('/image', storeImage(db));
		app.post('/fetchimage', clarifai);

		mongoose
			.connect(process.env.URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log('✅ Connected to database');

				app.listen(process.env.PORT || 5000, () => {
					console.log('App is running on port' + process.env.PORT ? process.env.PORT : 5000);
				});
			})
			.catch((err) => console.log(err));
	}
	catch (error) {
		console.log(error);
	}

})();