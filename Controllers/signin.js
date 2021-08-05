const signin = (db, argon2) => async (req, res) => {
	const { email, password } = req.body;
	const response = await verify();

	if (response.id) res.status(200).json(response);
	else if (response === 400) res.status(400).json('Either username, email or password is incorrect.');
	else if (response === 404) res.status(404).json('Not found');
	else if (response === 401) res.status(400).json('Something went wrong');


	async function verify() {
		try {
			const item = db.items.find(u => (u.email === email || u.username === email));
			if (!item) return 404;

			const passVerified = await argon2.verify(item.password, password);
			if (passVerified) {
				const user = {
					id: item.id,
					username: item.username,
					createdOn: item.createdOn,
					entries: item.entries,
					images: item.images,
				};
				return user;
			}
			else { return 400; }
		}
		catch (error) {
			console.log(error);
			return 401;
		}
	}
};

export default signin;