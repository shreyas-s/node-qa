//import mongoose from 'mongoose';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qa-app', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

 module.exports = { mongoose };
//export default mongoose;