const express = require('express');
const Router = express.Router();
const path = require('path');
const QuestionModel = require('./../model/question.model');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

Router.get('/:id', function (req, res) {
	let questionID = req.params.id;

	if (!ObjectID.isValid(questionID)) {
		res.status(404).send('Page not found');
	} else {
		QuestionModel.findById(questionID).then((question) => {
			if (!question) {
				res.status(404).send('Page not found');
			} else {
				res.render('question', {
					question
				});
			}
		}).catch((e) => {
			res.status(400).send(e);
		});
	}
});

//vote
Router.put('/', function (req, res) {
	let vote = req.body.vote;
	let questionID = req.body.questionID;

	if (!ObjectID.isValid(questionID)) {
		res.status(404).send('Page not found');
	} else {
		QuestionModel.findById(questionID).then((question) => {
			if (!question) {
				res.status(404).send('Page not found');
			} else {
				let updateObj = {};
				if (vote == 'yes') updateObj = {yes: question.yes +1};
				else updateObj = {no: question.no +1};

				QuestionModel.findByIdAndUpdate(questionID, {$set: updateObj}, {new: true}).then((question) => {
					if (!question) {
						res.status(404).send('Page not found');
					} else {
						res.redirect(`/question/${questionID}`);
					}
				});
			}
		}).catch((e) => {
			res.status(400).send(e);
		});
	}
});

module.exports = Router;