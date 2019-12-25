require('express-group-routes');
const auth = require('./middleware');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const port = 5000;

app.use(bodyParser.json());

const categoriesController = require('./controllers/category');
const articlesController = require('./controllers/article');
const authController = require('./controllers/auth');
const commentsController = require('./controllers/comment');
const followController = require('./controllers/follow');

app.group('/api/v1', (router) => {
	//crud user
	router.post('/login', authController.login);
	router.post('/register', authController.register);
	router.get('/users', authController.index);
	router.get('/user/:id', authController.show);
	//crud article
	router.get('/article_popular', articlesController.articlePopular);
	router.post('/article', auth.auth, articlesController.addArticle);
	router.get('/articles', articlesController.index);
	router.get('/article/:id', articlesController.articleDetails);
	router.put('/article/:id', auth.auth, articlesController.updateArticle);
	router.delete('/article/:id', auth.auth, articlesController.deleteArticle);
	//crud category
	router.get('/categories/', categoriesController.index);
	router.get('/category/:id', categoriesController.show);
	router.post('/categories', categoriesController.addCategory);
	router.delete('/delete_category/:id', categoriesController.deleteCategory);
	router.get('/category/:id/article', articlesController.articleDetails);
	//crud comments
	router.post('/article/:id/comment', auth.auth, commentsController.addComment);
	router.put('/article/:idArticle/comment/:id', auth.auth, commentsController.editComment);
	router.delete('/article/:idArticle/comment/:id', auth.auth, commentsController.deleteComment);
	router.get('/article/:idArticle/comments', auth.auth, commentsController.showComments);
	router.get('/comments', commentsController.index);
	//crud follow
	router.get('/follow/:id', auth.auth, followController.follower);
	router.post('/follow/:id', auth.auth, followController.storefollowing);
	router.delete('/follow/:id', auth.auth, followController.deleteFollowing);
	// router.post('/login', authController.login);
	// router.patch('/todo/:id', TodosController.update);
	// router.post('/todos/', TodosController.post);
	// router.delete('/todo/:id', TodosController.delete);
	// app.get("/api/category/:idCat/allArticles", article.articlesByCategory);
});

app.listen(port, () => {
	console.log(`server wes adfasdf`);
});
