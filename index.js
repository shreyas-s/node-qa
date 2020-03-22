/*import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import userController from '../controller/user';
*/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var userController = require('./controller/user');
var QuestionController = require('./controller/question');

const app = express();
const port = process.env.PORT || 3000;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/user', userController);
app.use('/qa',QuestionController);


app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
