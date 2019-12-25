const jwt = require('jsonwebtoken');
const Articles = require('../models').articles;
const Categories = require('../models').categories;
const Users = require('../models').users;
const Comments = require('../models').comments;
const Follows = require('../models').follows;

exports.index = (req, res) => {
	Follow.findAll(req.body).then((data) => res.send(data));
};

exports.follower = (req, res) => {
	const id = req.params.id;
	Users.findAll({
		attributes: [ 'id', 'username' ],
		include: [
			{
				model: Users,
				as: 'follower',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt' ]
				}
			}
			// through:{model:Follows}
		],
		// order: [ [ 'createdAt', 'DESC' ] ],
		// limit: 10
		where: {
			id: id
		}
	}).then((data) => res.send(data));
};

exports.storefollowing = (req, res) => {
	let request = {
		user_id: req.userId,
		following_user_id: req.body.following_user_id,
		createdAt: new Date(),
		updatedAt: new Date()
	};
	if (request.user_id === request.following_user_id) {
		res.status(404).json({
			error: true,
			message: 'Cannot follow your self'
		});
	} else {
		Follows.findOne({
			where: { user_id: request.user_id, following_user_id: request.following_user_id }
		})
			.then((follow) => {
				if (follow === null) {
					Follows.create(request).then((response) => {
						res.status(200).json({
							message: 'Following success',
							response
						});
					});
				} else {
					res.status(404).json({
						error: true,
						message: 'You have follow this user'
					});
				}
			})
			.catch((err) => {
				res.status(500).json({
					message: err.message
				});
			});
	}
};

exports.deleteFollowing = (req, res) => {
	const id = req.params.id;
	const userId = req.userId;
	Follows.findOne({
		where: { id: id }
	})
		.then((follows) => {
			// console.log(follows.user_id);
			if (follows.user_id !== userId) {
				return res.status(403).json({
					error: true,
					message: 'forbidden you dont have permission to access'
				});
			} else {
				Follows.destroy({
					where: {
						id,
						user_id: userId
					}
				}).then((follows) => {
					res.status(200).json({
						message: `Unfollowing ${follows.following_user_id} succesfull`
					});
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message
			});
		});
};
