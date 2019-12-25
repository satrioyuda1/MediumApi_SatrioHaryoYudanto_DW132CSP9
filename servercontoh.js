//require mesti diatas
const express = require('express');
require('express-group-routes');
const TodosController = require('./controllers/todos');

const app = express();
const bodyParser = require('body-parser');
const port = 5000;

app.use(bodyParser.json());

// app.get('/', (req, res) => {
// 	res.send('horeee');
// });

// app.get('/todos/:id', (req, res) => {
// 	const id = req.params.id;
// 	const index = id - 1;
// 	res.send(todos[index]);
// });

// app.post('/todos/', (req, res) => {
// 	const data = req.body;
// 	todos.push(data);
// 	res.send(data);
// });

// app.patch('/todos/:id', (req, res) => {
// 	const id = req.params.id;
// 	const index = id - 1;
// 	const data = req.body;
// 	todos[index] = { ...todos[index], ...data };
// 	res.send(todos[index]);
// });

// app.delete('/todos/:id', (req, res) => {
// 	const id = req.params.id;
// 	const index = id - 1;
// 	//splice (start, remove, add) Pertama mulai dari mana yakni kita mau posisi keberapa untuk menambahkannya. Kedua ada berapa elemen yang akan dihapus. Bila teman teman tidak ingin menghapus elemennya kita tulis 0. Ketiga adalah nilai yang akan ditambahkan kedalam arraynya yaitu Jeruk.
// 	todos.splice(index, 1);
// 	res.send(todos);
// });

// app.group('/api/v1', (router) => {
// 	router.get('/todos', (req, res) => {
// 		res.send(todos);
// 	});
// 	router.get('/todos/:id', (req, res) => {
// 		const id = req.params.id;
// 		const index = id - 1;
// 		res.send(todos[index]);
// 	});

// 	router.post('/todos/', (req, res) => {
// 		const data = req.body;
// 		todos.push(data);
// 		res.send(data);
// 	});

// 	router.patch('/todos/:id', (req, res) => {
// 		const id = req.params.id;
// 		const index = id - 1;
// 		const data = req.body;
// 		todos[index] = { ...todos[index], ...data };
// 		res.send(todos[index]);
// 	});

// 	router.delete('/todos/:id', (req, res) => {
// 		const id = req.params.id;
// 		const index = id - 1;
// 		//splice (start, remove, add) Pertama mulai dari mana yakni kita mau posisi keberapa untuk menambahkannya. Kedua ada berapa elemen yang akan dihapus. Bila teman teman tidak ingin menghapus elemennya kita tulis 0. Ketiga adalah nilai yang akan ditambahkan kedalam arraynya yaitu Jeruk.
// 		todos.splice(index, 1);
// 		res.send(todos);
// 	});
// });

//group routes penjelasan ada disini https://degananda.com/express-routing-route-method/

app.group('/api/v1', (router) => {
	router.get('/todos', TodosController.index);
	router.get('/todo/:id', TodosController.show);
	router.patch('/todo/:id', TodosController.update);
	router.post('/todos/', TodosController.post);
	router.delete('/todo/:id', TodosController.delete);
});

app.listen(port, () => {
	console.log(`server wes adfasdf`);
});
