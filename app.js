const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');

const UserRouter = require('./src/Routes/User.js');
const ImageRouter = require('./src/Routes/image.js');
const VerifyRouter = require('./src/Routes/Verify.js');
const ClarifaiRouter = require('./src/Routes/fetchImage.js');
const AvatarRouter = require('./src/Routes/Avatar.js');
const SECRETS = require('./src/utils.js');



const app = express();
// const origins = ['http://192.168.43.31:3000', 'http://localhost:3000', 'https://face-recognition.netlify.app'];
app.use(
	cors({
		origin: (origin, cb) => {
			return cb(null, origin);
			// if (origins.includes(origin)) return cb(null, origin);
			// return cb(new Error('Not allowed to access'));
		}
	})
);
app.use(bodyParser.json());

app.use('/user', UserRouter);
app.use('/verify', VerifyRouter);
app.use('/image', ImageRouter);
app.use('/fetchimage', ClarifaiRouter);
app.use('/avatar', AvatarRouter);

app.get('/', (_req, res) => {
	const html = fs.readFileSync('./dist/index.html', 'utf8');
	res.send(html);
});

mongoose
	.connect(SECRETS.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => {
		console.log('✅ Connected to database.');

		app.listen(SECRETS.PORT, () => {
			console.log(`✅ Connected to port ${SECRETS.PORT}.`);
		});
	})
	.catch(console.error);
