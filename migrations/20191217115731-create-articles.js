'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('articles', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING
			},
			content: {
				type: Sequelize.STRING
			},
			image: {
				type: Sequelize.STRING
			},
			category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'categories', //ini merujuk pada tabel id categories
					key: 'id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			},
			is_published: {
				type: Sequelize.BOOLEAN
			},
			is_archived: {
				type: Sequelize.BOOLEAN
			},
			slug: {
				type: Sequelize.STRING
			},
			author_id: {
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
		return queryInterface.dropTable('articles');
	}
};
