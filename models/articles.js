'use strict';
module.exports = (sequelize, DataTypes) => {
	const articles = sequelize.define(
		'articles',
		{
			title: DataTypes.STRING,
			content: DataTypes.STRING,
			image: DataTypes.STRING,
			category_id: DataTypes.INTEGER,
			is_published: DataTypes.BOOLEAN,
			is_archived: DataTypes.BOOLEAN,
			slug: DataTypes.STRING,
			author_id: DataTypes.INTEGER
		},
		{}
	);
	articles.associate = function(models) {
		// associations can be defined here
		articles.belongsTo(models.categories, {
			foreignKey: 'category_id',
			as: 'categories',
			sourceKey: 'id'
		});
		articles.belongsTo(models.users, {
			foreignKey: 'author_id',
			as: 'users',
			sourceKey: 'id'
		});
		articles.hasMany(models.comments, {
			foreignKey: 'article_id',
			as: 'comments'
		});
		// articles.belongsTo(models.Categories, {
		// 	foreignKey: 'category_id',
		// 	as: 'categories',
		// 	sourceKey: 'id'
		// });
		// articles.belongsTo(models.Users, {
		// 	foreignKey: 'author_id',
		// 	as: 'users',
		// 	sourceKey: 'id'
		// });
	};
	return articles;
};
