const dotenv = require('dotenv');
dotenv.config();

const SECRETS = {
	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    CLARIFAI_TOKEN: process.env.CLARIFAI_TOKEN,
};

module.exports = SECRETS;