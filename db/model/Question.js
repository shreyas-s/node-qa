var { AnswerOptionSchema } = require ('./AnswerOptionSchema');
var { mongoose } = require('../mongoose_connection');
var validator = require('validator');
const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    minlength: 10,
    maxlength: 1000,
  },
  answerOptions: {
    type: [AnswerOptionSchema],
    default: undefined,
    validate: {
      validator: function(value) {
        return value && value.length === 4;
      },
      message: 'Answer options should be 4.'
    }
  },
  company_details: {
      type: String,
      ref: 'Company',
      required: true
  }
}, {
  timestamps: true
});

 const Question = mongoose.model('Question', QuestionSchema);
 module.exports = {Question};