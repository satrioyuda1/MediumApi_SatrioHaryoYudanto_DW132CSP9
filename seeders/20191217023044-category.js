'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'categories',
			[
				{
					name: 'programming',
					is_published: false,
					is_archived: false
				},
				{
					name: 'sport',
					is_published: false,
					is_archived: false
				},
				{
					name: 'cooking',
					is_published: false,
					is_archived: false
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('categories', null, {});
	}
};
