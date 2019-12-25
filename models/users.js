'use strict';
module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define(
		'users',
		{
			fullname: DataTypes.STRING,
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			is_actived: DataTypes.BOOLEAN
		},
		{}
	);
	users.associate = function(models) {
		// associations can be defined here
		// users.belongsToMany(models.categories, {
		// 	through: models.articles,
		// 	as: 'categories',
		// 	foreignKey: 'author_id'
		// });
		// users.hasMany(models.articles, {
		// 	as: 'user',
		// 	foreignKey: 'author_id'
		// });
		users.hasMany(models.articles, {
			foreignKey: 'author_id',
			as: 'users'
		});
		users.belongsToMany(models.users, {
			through: 'follows',
			foreignKey: 'user_id',
			as: 'following'
		});
		users.belongsToMany(models.users, {
			through: 'follows',
			foreignKey: 'following_user_id',
			as: 'follower'
		});
	};
	return users;
};
