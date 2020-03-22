//import express from 'express';
var express = require('express');
//import User from '../db/model/user';
var { Question } = require('../db/model/Question');
var { AnswerSchema } = require('../db/model/AnswerSchema');

const { ObjectId } = require('mongodb').ObjectID;

const router = express.Router();

router.post('/create', (req, resp) => {
  const { question, AnswerOption,company_details } = req.body;
  var answer = [];
  for(i in AnswerOption){
    
  // Data to pass sample given  below:
  /*
  {
"question":"sample interview Q",
"AnswerOption": [
    { "optionNum":1, "content":"Sample A" , "isAnswer": 0},
    { "optionNum":2, "content":"Sample B" , "isAnswer": 1},
    { "optionNum":3, "content":"Sample C" , "isAnswer": 0},
     { "optionNum":4, "content":"Sample E" , "isAnswer": 0}
  ],
  "company_details": "IBM"
}*/
var { optionNum , content , isAnswer } = AnswerOption[i];
  /*answer[i] = {
    "optionNum": AnswerOption[i].optionNum,
    "content": AnswerOption[i].content,
    "isAnswer": AnswerOption[i].isAnswer
};*/
answer[i] = {
    optionNum,
    content,
    isAnswer
};
}
  const qst = new Question({
    question,
    answer,
    company_details
  });

  qst
    .save()
    .then((res) => {
      console.log('saved user ', res);
      resp.status(200).send('Question Created Successfully');
    })
    .catch((e) => {
      console.log('error', e);
      resp.status(500).send('Error Occured while saving Question');
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
