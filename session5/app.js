const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');
const methodOverride = require('method-override');


let helpers = require('handlebars-helpers')();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    let questionList = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));
    var question = questionList[Math.floor(Math.random()*questionList.length)];

    res.render('question', {
        question
    });
});

app.get('/asks', function (req, res) {
    res.render('asks');
});

app.get('/list', function (req, res) {
    res.render('list', {
        data: [
            'hoang anh',
            'ngan ha',
            'dau dau'
        ]
    });
});

app.post('/api/questions', function (req, res) {
    let questionList = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));
    let newQuestion = {
        id: questionList.length,
        content: req.body.question,
        yes: 0,
        no: 0
    };
    questionList.push(newQuestion);
    fs.writeFileSync('./questions.json', JSON.stringify(questionList), 'utf8');
    res.redirect(`/question?questionID=${newQuestion.id}`);
});

//cach 1
// app.get('/question/:id', function (req, res) {
//     let questionList = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));
//     let question = questionList.filter(question => _.toInteger(question.id) === _.toInteger(req.params.id))[0];
//
//     res.render('question', {
//         question
//     });
// });

//cach 2
app.get('/question', function (req, res) {
    let questionID = req.query.questionID;
    let questionList = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));
    let question = questionList.filter(question => question.id == questionID)[0];

    res.render('question', {
        question
    });
});

//vote
app.put('/question', function (req, res) {
    let vote = req.body.vote;
    let questionID = req.body.questionID;
    let questionList = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));
    let newQuestionList = questionList.map((question) => {
        if (question.id == questionID) {
            if (vote == 'yes') {
                question.yes++;
            } else {
                question.no++;
            }
        }

        return question;
    });

    fs.writeFileSync('./questions.json', JSON.stringify(newQuestionList), 'utf8');
    res.redirect(`/question?questionID=${questionID}`);
});

app.listen(8888, function (err) {
    if (err) console.log(err);
    console.log('server is ok')
});