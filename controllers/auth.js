const jwt = require('jsonwebtoken');
const Model = require('../models');
const User = Model.users;

exports.index = (req, res) => {
	User.findAll(req.body).then((data) => res.send(data));
};

exports.show = (req, res) => {
	const id = req.params.id;
	User.findOne({
		where: { id: id }
	}).then((data) => res.send(data));
};
exports.login = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({
		where: { email, password }
	})
		.then((user) => {
			if (user) {
				const token = jwt.sign({ userId: user.id }, 'kuncirahasia');
				if (token) {
					res.status(200).json({
						message: 'success login',
						userId: user.id,
						username: user.username,
						token
					});
				}
			} else {
				res.status(401).json({
					error: true,
					message: 'failed sign in'
				});
			}
		})
		.catch((err) => {
			res.status(401).json({
				meesage: err.message
			});
		});
};

exports.register = (req, res) => {
	const { username, email } = req.body;
	User.findOne({
		where: { username, email }
	}).then((user) => {
		if (user) {
			res.status(500).json({
				error: true,
				message: 'user already regsistered'
			});
		} else {
			User.create({
				fullname: req.body.fullname,
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			})
				.then((user) => {
					const token = jwt.sign({ id: user.id }, 'kuncirahasia');
					res.status(201).json({
						message: `Success Sign Up New User`,
						user,
						token
					});
				})
				.catch((err) => {
					rest.status(500).json({
						message: err.message
					});
				});
		}
	});
};

// exports.login = (req, res) => {
// 	const { email, password } = req.body;

// 	User.findOne({
// 		attributes: {
// 			exclude: [ 'createdAt', 'updatedAt', 'password', 'bio' ]
// 		},
// 		where: {
// 			email,
// 			password
// 		}
// 	}).then((user) => {
// 		if (user) {
// 			console.log(user);
// 			if (user.is_actived != 1) {
// 				res.send({
// 					is_success: 0,
// 					status: 200,
// 					message: "Your account isn't activated!",
// 					data: {}
// 				});
// 			} else {
// 				const token = jwt.sign({ userId: user.id }, 'siunix');
// 				res.send({
// 					is_success: 1,
// 					status: 200,
// 					message: 'Success',
// 					data: {
// 						email,
// 						token
// 					}
// 				});
// 			}
// 		} else {
// 			res.send({
// 				is_success: 0,
// 				status: 200,
// 				message: 'Wrong email and password!',
// 				data: {}
// 			});
// 		}
// 	});
// };

// exports.register = (req, res) => {
// 	const { fullname, username, email, password } = req.body;

// 	User.findAll({
// 		where: {
// 			username
// 		}
// 	}).then((user) => {
// 		if (user.length > 0) {
// 			res.send({
// 				is_success: 0,
// 				status: 200,
// 				message: 'Username has been taken!',
// 				data: {}
// 			});
// 		} else {
// 			User.findAll({
// 				where: {
// 					email
// 				}
// 			}).then((user) => {
// 				if (user.length > 0) {
// 					res.send({
// 						is_success: 0,
// 						status: 200,
// 						message: 'Email has been registered!',
// 						data: {}
// 					});
// 				} else {
// 					try {
// 						User.create({
// 							fullname: fullname,
// 							username: username,
// 							email: email,
// 							password: password,
// 							is_active: 1
// 						}).then((user) => {
// 							const token = jwt.sign({ userId: user.id }, 'siunix');
// 							res.send({
// 								is_success: 1,
// 								status: 200,
// 								message: 'Success',
// 								data: {
// 									email,
// 									token
// 								}
// 							});
// 						});
// 					} catch (error) {
// 						res.send({
// 							is_success: 0,
// 							status: 500,
// 							message: 'Failed! : ' + error,
// 							data: {}
// 						});
// 					}
// 				}
// 			});
// 		}
// 	});
// };
