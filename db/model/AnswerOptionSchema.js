var { mongoose } = require('../mongoose_connection');

 const AnswerOptionSchema = new mongoose.Schema({
  optionNumber: {
    type: Number
  },
  answerBody: {
    type: String,
    minlength: 1,
    maxlength: 200,
  },
  isCorrectAnswer: { // you can store the correct answer with question id in another model.
    type: Boolean,
    default: false
  }
}, {
  _id: false
});

module.exports = { AnswerOptionSchema };