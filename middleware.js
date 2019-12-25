const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
	// kita get dahulu headernya
	const authHeader = req.headers['authorization'];

	// lalu kita ambil tokenya dengan cara melakukan split bearer dan token, lalu kita ambil tokennya di index ke 1,
	// lalu kita perlu pengkondisian, jika headernya tidak ada kita akan mengembalikan null dan  menginformasikan bahwa permintaan Unauthorized
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) {
		res.status(401).send({ message: 'Unauthorized' });
	}

	// Lalu jika terdapat header kita juga perlu memastikan apakah token yang kita dapatkan valid
	jwt.verify(token, 'kuncirahasia', (err, user) => {
		if (err) {
			return res.status(403).send({ message: 'Your Token No Longer Valid' });
		}

		req.userId = user.userId;
		next();
	});
};
