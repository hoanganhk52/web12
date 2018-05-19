const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    content: {type: String, required: true},
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0}
});

module.exports = mongoose.model('Question', QuestionSchema);