//import express from 'express';
var express = require('express');
//import User from '../db/model/user';
var { User } = require('../db/model/user');

const { ObjectId } = require('mongodb').ObjectID;

const router = express.Router();

router.post('/create', (req, resp) => {
  const { name, email, password } = req.body;

  const usr = new User({
    email,
    password,
    name
  });

  usr
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

router.get('/all-users', (req, resp) => {
  const users = User.find({});
  users.then((res) => {
    resp.status(200).send(res);

    console.log(res);
  });
});

router.get('/:id', (req, resp) => {
  const userId = req.params.id;

  const usrObj = User.find({ _id: new ObjectId(userId) });
  usrObj
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
