const register = (db, argon2) => async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!(username || email || password)) return res.status(400).json('Incomplete details');
		if (db.items.find(u => u.username === username || u.email === email)) return res.status(404).json('Either username or email isn\'t available');
		const hash = await argon2.hash(password);

		const obj = {
			id: db.items.size + 1,
			username, email, password: hash, entries: 0, images: [], createdOn: Date.now(),
		};

		db.items.set(obj.id, obj);
		await new db.model(obj).save();
		return res.status(200).json(db.items.get(obj.id));
	}
	catch (error) {
		console.log(error);
		res.status(400).json('Something went wrong.');
	}
};

export default register;