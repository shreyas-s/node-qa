var { mongoose } = require('../mongoose_connection');

 const AnswerSchema = new mongoose.Schema({
  optionNum: {
    type: Number
  },
  content: {
    type: String,
    minlength: 1,
    maxlength: 200,
  },
  isAnswer: {
    type: Boolean,
    default: false
  }
}, {
  _id: false
});

module.exports = { AnswerSchema };