'use strict';
module.exports = (sequelize, DataTypes) => {
	const comments = sequelize.define(
		'comments',
		{
			is_published: DataTypes.BOOLEAN,
			is_archived: DataTypes.BOOLEAN,
			article_id: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
			comment: DataTypes.STRING
		},
		{}
	);
	comments.associate = function(models) {
		// associations can be defined here
		comments.belongsTo(models.articles, {
			foreignKey: 'article_id',
			as: 'articles',
			sourceKey: 'id'
		});
	};
	return comments;
};
