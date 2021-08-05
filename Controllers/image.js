const storeImage = (db) => async (req, res) => {
	const { id, image } = req.body;
	if (!(id || image)) return res.status(400).json('Something went wrong');
	if (db.items.has(id) && !db.items.get(id).images.includes(image)) {
		const images = db.get(id, 'images', []);
		images.push(image);
		await db.set(id, 'images', images);
		await db.set(id, 'entries', images.length);
		return res.status(200).json('Success');
	}
	else if (db.items.has(id)) {return res.status(202).json('Image was discovered.');}
	else {
		res.status(404).json('Didn\'t find any user.');
	}
};

export default storeImage;