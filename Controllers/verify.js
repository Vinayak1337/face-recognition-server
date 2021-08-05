const verify = (db) => (req, res) => {
	const { username, email } = req.body;
	if (username && db.items.find(user => user.username === username)) return res.status(400).json('Username is not available');
	else if (email && db.items.find(user => user.email === email)) return res.status(400).json('Email is not available');
	else return res.status(200).json('Username & Email are available');
};

export default verify;