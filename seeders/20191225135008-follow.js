'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'follows',
			[
				{
					user_id: 1,
					following_user_id: 3
				},
				{
					user_id: 1,
					following_user_id: 5
				},
				{
					user_id: 3,
					following_user_id: 5
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('follows', null, {});
	}
};
