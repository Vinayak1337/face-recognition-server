import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';

import UserRouter from './src/Routes/user.js';
// import ImagesRouter from './src/Routes/images.js';
// import PostRouter from './src/Routes/posts.js';
import VerifyRouter from './src/Routes/verify.js';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors({
	origin: ['http://192.168.43.31:3000', 'https://face-recognition.netlify.app'],
}));

app.get('/', (_req, res) => {
	const html = fs.readFileSync('./dist/index.html', 'utf8');
	res.send(html);
});

app.use('/user', UserRouter);
app.use('/verify', VerifyRouter);
// app.use('/posts', PostRouter);
// app.use('/images', ImagesRouter);

mongoose.connect(process.env.URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})
	.then(() => {
		console.log('✅ Connected to database.');

		app.listen(process.env.PORT || 8080, () => {
			console.log(`✅ Connected to port ${process.env.PORT || 8080}.`);
		});
	})
	.catch(console.error);
