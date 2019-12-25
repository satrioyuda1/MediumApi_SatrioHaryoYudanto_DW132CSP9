'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'comments',
			[
				{
					is_published: true,
					is_archived: false,
					article_id: 1,
					user_id: 1,
					comment: 'mantap - mantap gan'
				},
				{
					is_published: true,
					is_archived: false,
					article_id: 1,
					user_id: 1,
					comment: 'hancurkan gan'
				},
				{
					is_published: true,
					is_archived: false,
					article_id: 1,
					user_id: 1,
					comment: 'merdekaaaaa!!!!!!!!!!!!!!!!!!!!!!!!!'
				},
				{
					is_published: true,
					is_archived: false,
					article_id: 1,
					user_id: 1,
					comment: 'kamu siapa, aku siapa, mereka siapa????'
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('People', null, {});
	}
};
