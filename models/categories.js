'use strict';
module.exports = (sequelize, DataTypes) => {
	const categories = sequelize.define(
		'categories',
		{
			name: DataTypes.STRING,
			is_published: DataTypes.BOOLEAN,
			is_archived: DataTypes.BOOLEAN
		},
		{}
	);
	categories.associate = function(models) {
		// associations can be defined here
		// categories.belongsToMany(models.users, {
		// 	through: models.articles,
		// 	as: 'users',
		// 	foreignKey: 'category_id'
		// });
		// categories.hasMany(models.articles, {
		// 	as: 'categories',
		// 	foreignKey: 'category_id',
		// 	targetKey: 'name'
		// });
		categories.hasMany(models.articles, {
			foreignKey: 'category_id',
			as: 'articles'
		});
	};
	return categories;
};
