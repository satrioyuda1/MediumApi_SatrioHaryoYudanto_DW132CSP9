const jwt = require('jsonwebtoken');
const Articles = require('../models').articles;
const Categories = require('../models').categories;
const Users = require('../models').users;
const Comments = require('../models').comments;

exports.articlePopular = (req, res) => {
	Articles.findAll({
		attributes: {
			exclude: [ 'category_id' ]
		},
		include: [
			{
				model: Categories,
				as: 'categories',
				attributes: {
					exclude: [ 'is_published' ]
				}
			}
		],
		order: [ [ 'createdAt', 'DESC' ] ],
		limit: 10
	}).then((data) => res.send(data));
};

exports.articleDetails = (req, res) => {
	const { id } = req.params;
	Articles.findAll({
		attributes: [ 'id', 'title', 'content', 'image' ],

		include: [
			{
				model: Categories,
				as: 'categories',
				attributes: [ 'id', 'name' ]
			},
			{
				model: Comments,
				as: 'comments',
				attributes: [ 'user_id', 'comment' ]
			}
		],

		where: {
			id: id
		}
	}).then((data) => res.send(data));
};

exports.addArticle = (req, res) => {
	let request = {
		title: req.body.title,
		content: req.body.content,
		image: req.body.image,
		category_id: req.body.category_id,
		slug: req.body.slug,
		createdAt: new Date(),
		updatedAt: new Date(),
		author_id: req.userId
	};
	Articles.create(request)
		.then((response) => {
			Articles.findOne({
				attributes: [ 'id', 'title', 'content', 'image', 'createdAt', 'updatedAt' ],
				include: [
					{
						model: Categories,
						as: 'categories',
						attributes: [ 'id', 'name' ]
					},
					{
						model: Users,
						as: 'users',
						attributes: [ 'id', 'username' ]
					}
				],
				where: { id: response.id }
			}).then((response) => {
				res.send(response);
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message
			});
		});
};
exports.updateArticle = (req, res) => {
	const id = req.params.id;
	Articles.findOne({
		where: { id: id, author_id: req.userId }
	}).then((response) => {
		if (!response) {
			res.status(404).json({
				error: true,
				message: 'Article not found'
			});
		} else {
			let request = {
				title: req.body.title,
				category: req.body.category,
				content: req.body.content,
				image: req.body.image
			};
			Articles.update(request, {
				where: {
					id,
					author_id: req.userId
				}
			})
				.then((response) => {
					Articles.findOne({
						attributes: [ 'id', 'title', 'content', 'image', 'createdAt', 'updatedAt' ],
						include: [
							{
								model: Categories,
								as: 'categories',
								attributes: [ 'id', 'name' ]
							},
							{
								model: Users,
								as: 'users',
								attributes: [ 'id', 'username' ]
							}
						]
					}).then((response) => {
						res.status(200).json({
							message: 'Updated Article Success',
							response
						});
					});
				})
				.catch((err) => {
					res.status(500).json({
						message: err.message
					});
				});
		}
	});
};

// exports.cobaArticles = (req, res) => {
// 	const { id } = req.params;
// 	Articles.findOne({
// 		attributes: [ 'id', 'title', 'content', 'image', 'createdAt', 'updatedAt' ],
// 		include: [
// 			{
// 				model: Categories,
// 				as: 'categories',
// 				attributes: [ 'id', 'name' ]
// 			},
// 			{
// 				model: Users,
// 				as: 'users',
// 				attributes: [ 'id', 'username' ]
// 			}
// 		],
// 		where: { id: id }
// 	}).then((data) => res.send(data));
// };

exports.deleteArticle = (req, res) => {
	const id = req.params.id;
	Articles.findOne({
		where: { id: id, author_id: req.userId }
	})
		.then((response) => {
			if (!response) {
				res.status(404).json({
					error: true,
					message: 'Article not found'
				});
			} else {
				Articles.destroy({
					where: {
						id,
						author_id: req.userId
					}
				}).then((response) => {
					res.status(200).json({
						message: 'Delete Article Success'
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

exports.index = (req, res) => {
	Articles.findAll(req.body).then((data) => res.send(data));
};
