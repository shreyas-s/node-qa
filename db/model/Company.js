var { mongoose } = require('../mongoose_connection');
var validator = require('validator');
const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 10,
    maxlength: 1000,
    required: true
  },
  email: {
    type: String,
    required: false,
    minlength: 8,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email {VALUE}  should be of proper valid format'
    }
  },
  contact: {
      type: String,
      required: false
  }
}, {
  timestamps: true
});

 const Company = mongoose.model('Company', CompanySchema);
 module.exports = {Company};