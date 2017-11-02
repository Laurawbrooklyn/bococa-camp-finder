const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {Camp} = require('../models/camps');
const router = express.Router();
const jsonParser = bodyParser.json();


router.get('/', (req, res) => {
  Camp
    .find()
    .then(camps => {
      res.json(camps.map(camp => camp.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

router.post('/filters', (req, res) => {
  console.log(req.body)
  Camp
    .find(req.body)
    .then(camps => {
      res.json(camps.map(camp => camp.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});


router.get('/:id', (req, res) => {
  Camp
    .findById(req.params.id)
    .then(camp => res.json(camp.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly awry'});
    });
});


router.post('/', (req, res) => {
  const requiredFields = ['name', 'area', 'age', 'price', 'specialty'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
 if (!req.body.picture) {
   req.body.picture = "/pool.png"
 }
  Camp
    .create({
      name: req.body.name,
      area: req.body.area,
      age: req.body.age,
      price: req.body.price,
      specialty: req.body.specialty,
      website: req.body.website,
      picture: req.body.picture,
      content: req.body.content,
    })
    .then(camp => res.status(201).json(camp.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});


router.delete('/:id', (req, res) => {
  Camp
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});


router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['name', 'area', 'specialty', 'age', 'price', 'website', 'picture', 'content'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Camp
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .then(updatedCamp => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});


module.exports = {campsRouter:router};
