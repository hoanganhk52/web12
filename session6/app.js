const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');
const methodOverride = require('method-override');
const questionRouter = require('./router/questionRouter.js');
const helpers = require('handlebars-helpers')();
const {mongoose} = require('./db/mongoose');
const QuestionModel = require('./model/question.model.js');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/question', questionRouter);
app.use(methodOverride('_method'));

app.get('/', (req, res, next) => {
	QuestionModel.find({}, (err, question) => {
		if (err) res.send(err);
		else if (question.length <= 0) res.render('home', {question: {content: 'khong co cau hoi nao'}});
		else req.questionList = question; next();
	});
}, function (req, res) {
	res.render('home', {
		question: req.questionList[Math.floor(Math.random() * req.questionList.length)]
	});
});

app.get('/asks', function (req, res) {
	res.render('asks');
});

app.post('/api/questions', function (req, res) {

	let newQuestion = new QuestionModel({
		content: req.body.question,
		yes: 0,
		no: 0
	});

	newQuestion.save().then(() => {
		res.redirect(`/question/${newQuestion.id}`);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.listen(3000, function (err) {
	if (err) console.log(err);
	console.log('server is ok');
});