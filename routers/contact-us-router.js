const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {Contact} = require('../models/contact-us');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/', (req, res) => {
  const requiredFields = ['name', 'email', 'content'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Contact
    .create({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      content: req.body.content,
    })
    .then(contact => res.status(201).json(contact.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });
});

module.exports = {contactRouter:router};
