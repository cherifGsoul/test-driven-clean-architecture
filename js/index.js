const express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');
const template = require('./app/template');

const app = express();
const quotationRouter = require('./app/quotation-express');

template(express, app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(session({
	'secret': 'foobarbaz',
	resave: true,
	saveUninitialized: false
}))

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.use('/quotation', quotationRouter);

app.listen(3000, () => {
	console.log('Runnin on port 3000');
});