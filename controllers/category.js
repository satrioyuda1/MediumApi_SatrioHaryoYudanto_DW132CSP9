const Categories = require('../models').categories;
const Users = require('../models').users;
const Articles = require('../models').articles;
// const Categories = models.category;
// const Users = models.user;
// const Articles = models.article;
const jwt = require('jsonwebtoken');
exports.index = (req, res) => {
	Categories.findAll(req.body).then((data) => res.send(data));
};

exports.show = (req, res) => {
	const { id } = req.params;
	Categories.findOne({
		where: {
			id: [ id ]
		}
	}).then((data) => res.send(data));
};

// exports.addCategory = (req, res) => {
// 	Categories.create(req.body).then((data) =>
// 	res.send({ message: 'berhasil ditambahkan',
// 	data }));
// };
exports.addCategory = (req, res) => {
	Categories.create(req.body).then((data) =>
		res.send({
			message: 'success add category',
			data
		})
	);
};

exports.deleteCategory = (req, res) => {
	const { id } = req.params;
	Categories.destroy({
		where: {
			id
		}
	}).then((data) => {
		res.send({
			message: 'delete success',
			data
		});
	});
};
