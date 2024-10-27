const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongodb = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
	extname: '.hbs',
	defaultLayout: 'main',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));

const url = 'mongodb://localhost:27017';
const client = new mongodb.MongoClient(url);

const getData = async () => {
	try {
		await client.connect();

		const db = client.db('test');
		const coll = db.collection('blogs');
		return await coll.find().toArray();
	} catch (error) {
		console.log('Error', error);
	}
};

const postData = async (title, desc, article) => {
	try {
		await client.connect();
		const db = client.db('test');
		const coll = db.collection('blogs');
		await coll.insertOne({ title, desc, article });
	} catch (error) {
		console.log('Error', error);
	}
};

const getBlog = async (title) => {
	try {
		await client.connect();
		const db = client.db('test');
		const coll = db.collection('blogs');
		return await coll.findOne({ title: title });
	} catch (error) {
		console.log('Error', error);
	}
};

const deleteBlog = async (title) => {
	try {
		client.connect();
		const db = client.db('test');
		const coll = db.collection('blogs');
		return await coll.findOneAndDelete({ title });
	} catch (error) {
		console.log('Error', error);
	}
};

app.get('/', async (req, res) => {
	const blogs = await getData();
	res.render('home', { blogs: blogs });
});

app.get('/posts', (req, res) => {
	res.redirect('/');
});

app.get('/post', async (req, res) => {
	res.render('create');
});

app.get('/about', (req, res) => res.render('about'));

app.post('/', async (req, res) => {
	let { title, desc, article } = req.body;

	let isError = false;

	if (!title || !desc || !article) {
		isError = true;
		return res.render('create', { isError });
	}

	await postData(title, desc, article);
	res.redirect('/');
});

app.get('/posts/:title', async (req, res) => {
	let title = req.params.title;
	let blog = await getBlog(title);
	res.render('info', { blog });
});

app.get('/posts/delete/:title', async (req, res) => {
	let title = req.params.title;
	await deleteBlog(title);
	res.render('delete', { title });
});

app.listen(PORT, () => console.log(`Server work at port ${PORT}`));
