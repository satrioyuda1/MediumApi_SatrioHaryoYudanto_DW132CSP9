'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('follows', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'users', //ini merujuk pada tabel id users
					key: 'id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			},
			following_user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'users', //ini merujuk pada tabel id users
					key: 'id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('follows');
	}
};
