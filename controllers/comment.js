const jwt = require('jsonwebtoken');
const Articles = require('../models').articles;
const Categories = require('../models').categories;
const Users = require('../models').users;
const Comments = require('../models').comments;

exports.addComment = (req, res) => {
	const { id } = req.params;
	Articles.findOne({
		where: { id: id }
	})
		.then((response) => {
			if (!response) {
				res.status(404).json({
					error: true,
					message: 'Article not found'
				});
			} else {
				let request = {
					is_published: req.body.is_published,
					is_archived: req.body.is_archived,
					article_id: req.params.id,
					user_id: req.userId,
					comment: req.body.comment,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				Comments.create(request).then((data) => {
					Comments.findAll({
						attributes: [ 'id', 'comment' ],
						include: [
							{
								model: Articles,
								as: 'articles',
								attributes: [ 'id', 'title' ]
							}
						],
						where: { id: data.id }
					}).then((response) => {
						res.status(200).json({
							message: 'Add Comment Success',
							response
						});
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

exports.editComment = (req, res) => {
	const idComment = req.params.id;
	Comments.findOne({
		where: {
			article_id: req.params.idArticle,
			user_id: req.userId,
			id: idComment
		}
	})
		.then((response) => {
			if (!response) {
				res.status(404).json({
					error: true,
					message: 'Comment not found'
				});
			} else {
				let request = {
					id: idComment,
					is_published: req.body.is_published,
					is_archived: req.body.is_archived,
					article_id: req.params.idArticle,
					user_id: req.userId,
					comment: req.body.comment,
					updatedAt: new Date()
				};
				Comments.update(request, {
					where: {
						id: response.id
					}
				}).then((data) => {
					Comments.findOne({
						attributes: [ 'id', 'comment' ],
						include: [
							{
								model: Articles,
								as: 'articles',
								attributes: [ 'id', 'title' ]
							}
						],
						where: { id: response.id }
					}).then((response) => {
						res.status(200).json({
							message: 'Edit Comment Success',
							response
						});
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

exports.deleteComment = (req, res) => {
	const idComment = req.params.id;
	Comments.findOne({
		where: {
			article_id: req.params.idArticle,
			user_id: req.userId,
			id: idComment
		}
	})
		.then((response) => {
			if (!response) {
				res.status(404).json({
					error: true,
					message: 'Comment not found'
				});
			} else {
				Comments.destroy({
					where: {
						id: idComment
					}
				}).then((response) => {
					res.status(200).json({
						message: 'Delete Comment Success',
						response
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

exports.showComments = (req, res) => {
	const { id } = req.params;
	Comments.findAll({
		attributes: [ 'id', 'comment', 'createdAt', 'updatedAt' ],
		include: [
			{
				model: Articles,
				as: 'articles',
				attributes: [ 'id', 'title' ]
			}
		],

		where: { article_id: req.params.idArticle }
	}).then((data) => res.send(data));
};

exports.index = (req, res) => {
	Comments.findAll(req.body).then((data) => res.send(data));
};
