//import express from 'express';
var express = require('express');
//import User from '../db/model/user';
var { Question } = require('../db/model/Question');
var { AnswerOptionSchema } = require('../db/model/AnswerOptionSchema');

const { ObjectId } = require('mongodb').ObjectID;

const router = express.Router();

router.post('/create', (req, resp) => {
  const { question, AnswerOption,company_details } = req.body;
  var ans = [];
  for(i in AnswerOption){
    
  // Data to pass sample given  below:
  /*
  {
"question":"sample interview Q",
"AnswerOption": [
    { "optionNumber":1, "answerBody":"Sample A" , "isCorrectAnswer": 0},
    { "optionNumber":2, "answerBody":"Sample B" , "isCorrectAnswer": 1},
    { "optionNumber":3, "answerBody":"Sample C" , "isCorrectAnswer": 0},
     { "optionNumber":4, "answerBody":"Sample E" , "isCorrectAnswer": 0}
  ],
  "company_details": "IBM"
}*/
  ans[i] = {
    "optionNumber": AnswerOption[i].optionNumber,
    "answerBody": AnswerOption[i].answerBody,
    "isCorrectAnswer": AnswerOption[i].isCorrectAnswer
};
}
  const qst = new Question({
    question,
    answerOptions: ans,
    company_details
  });

  qst
    .save()
    .then((res) => {
      console.log('saved user ', res);
      resp.status(200).send('User Created Successfully');
    })
    .catch((e) => {
      console.log('error', e);
      resp.status(500).send('Error Occured while saving User');
    });
});

router.get('/all-questions', (req, resp) => {
  const qst = Question.find({});
  qst.then((res) => {
    resp.status(200).send(res);

    console.log(res);
  });
});

router.get('/all-questions-for/:cmp', (req, resp) => {
    const cmpName = req.params.cmp;
    const qst = Question.find({ "company_details": cmpName });
    qst.then((res) => {
      resp.status(200).send(res);
  
      console.log(res);
    });
  });

router.get('/:id', (req, resp) => {
  const qstId = req.params.id;

  const qstObj = Question.find({ _id: new ObjectId(qstId) });
  qstObj
    .then((res) => {
      resp.status(200).send(res);
    })
    .catch((e) => {
      console.log(e);
      resp.status(200).send('Error Occured');
    });
});

 module.exports = router;
//export default router;
