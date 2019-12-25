'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'articles',
			[
				{
					title: 'Fundamental React',
					content: 'text content',
					image: 'http://url_img.com',
					category_id: 1,
					is_published: false,
					is_archived: false,
					slug: '/react',
					author_id: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'How to Learn React — A roadmap from beginner to advanced',
					content:
						'Hey folks!! This guide is for people who are starting with React. I have carefully curated the best videos and articles in each section to make it easier for learning. Note: I’m not associated with any of the websites mentioned below. It’s purely my view.',
					image: 'https://miro.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png',
					category_id: 1,
					is_published: false,
					is_archived: false,
					slug: '/react',
					author_id: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Latih Arsenal, Mikel Arteta Ditunggu Situasi Pahit',
					content:
						'Sebuah realita pahit bakal dihadapi Mikel Arteta jika ia resmi menjadi manajer Arsenal. Pelatih 37 tahun itu diberitakan tidak bisa belanja pemain di bulan Januari nanti.',
					image: 'https://cdns.klimg.com/bola.net/library/upload/21/2018/09/arteta-l_991687b.jpg',
					category_id: 2,
					is_published: false,
					is_archived: false,
					slug: '/react',
					author_id: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('articles', null, {});
	}
};
