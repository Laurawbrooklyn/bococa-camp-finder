const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();

const {Camp} = require('../models/camps');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedCampData() {
  console.info('seeding camp data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push({
      name: faker.lorem.words(),
      area: faker.lorem.words(),
      price: faker.commerce.price(),
      specialty: faker.lorem.words(),
      website: faker.internet.url(),
      content: faker.lorem.paragraph(),
      picture: faker.image.abstract(),
      age: faker.random.number(2),
    });
  }
  return Camp.insertMany(seedData);
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('camp API resource', function() {

  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedCampData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedCampData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  // note the use of nested `describe` blocks.
  // this allows us to make clearer, more discrete tests that focus
  // on proving something small
  describe('GET endpoint', function() {

    it('should return all existing camps', function() {
      // strategy:
      //    1. get back all camps returned by by GET request to `/posts`
      //    2. prove res has right status, data type
      //    3. prove the number of camps we got back is equal to number
      //       in db.
      let res;
      return chai.request(app)
        .get('/api/camps')
        .then(function(_res) {
          // so subsequent .then blocks can access resp obj.
          res = _res;
          res.should.have.status(200);
          // otherwise our db seeding didn't work
          res.body.should.have.length.of.at.least(1);
          return Camp.count();
        })
        .then(function(count) {
          res.body.should.have.lengthOf(count);
        });
    });



    it('should return camps with correct fields', function() {
      // Strategy: Get back all blog posts, and ensure they have expected keys

      let resCamp;
      return chai.request(app)
        .get('/api/camps')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length.of.at.least(1);
          res.body.forEach(function(post) {
            post.should.be.a('object');
            post.should.include.keys(
              'id', 'name', 'area', 'age', 'price', 'specialty', 'website', 'content', 'picture');
          });
          resCamp = res.body[0];
          return Camp.findById(resCamp.id);
        })
        .then(function(post) {
          resCamp.id.should.equal(post.id);
          resCamp.name.should.equal(post.name);
          resCamp.area.should.equal(post.area);
          resCamp.price.should.equal(post.price);
          resCamp.specialty.should.equal(post.specialty);
          resCamp.website.should.equal(post.website);
          resCamp.content.should.equal(post.content);
          resCamp.picture.should.equal(post.picture);
        });

    });
  });

  describe('Camp endpoint', function() {
    // strategy: make a POST request with data,
    // then prove that the POST we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should add a new camp', function() {

      const newCamp = {
        name: faker.lorem.words(),
        area: faker.lorem.words(),
        age: faker.random.number(2),
        price: faker.commerce.price(),
        specialty: faker.lorem.words(),
        website: faker.internet.url(),
        content: faker.lorem.paragraph(),
        picture: faker.image.abstract(),
      };
      return chai.request(app)
        .post('/api/camps')
        .send(newCamp)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'name', 'area', 'age', 'price', 'specialty', 'website', 'content', 'picture');
          res.body.name.should.equal(newCamp.name);
          res.body.id.should.not.be.null;
          res.body.area.should.equal(newCamp.area);
          res.body.age.should.equal(newCamp.age);
          res.body.price.should.equal(newCamp.price);
          res.body.specialty.should.equal(newCamp.specialty);
          res.body.website.should.equal(newCamp.website);
          res.body.content.should.equal(newCamp.content);
          res.body.picture.should.equal(newCamp.picture);
          return Camp.findById(res.body.id);
        })
        .then(function(post) {
          post.name.should.equal(newCamp.name);
          post.area.should.equal(newCamp.area);
          post.age.should.equal(newCamp.age);
          post.price.should.equal(newCamp.price);
          post.specialty.should.equal(newCamp.specialty);
          post.website.should.equal(newCamp.website);
          post.content.should.equal(newCamp.content);
          post.picture.should.equal(newCamp.picture);
        });
    });
  });

  describe('PUT endpoint', function() {

    // strategy:
    //  1. Get an existing camps from db
    //  2. Make a PUT request to update that camp info
    //  3. Prove the camp returned by request contains data we sent
    //  4. Prove the camp in db is correctly updated
    it('should update fields you send over', function() {
      const updateData = {
        name: 'Updated Camp Name',
        area: 'Updated Camp Area',
        age: 'Updated Camper Age',
        price: 'Updated Camp Price',
        specialty: 'Updated Camp Specialty',
        website: 'Updated Camp Website',
        content: 'Updated Camp Info Paragraph',
        picture: 'Updated Camp Url'
      };
      return Camp
        .findOne()
        .then(function(post) {
          updateData.id = post.id;
          // make request then inspect it to make sure it reflects
          // data we sent
          return chai.request(app)
            .put(`/api/camps/${camp.id}`)
            .send(updateData);
        })
        .then(function(res) {
          res.should.have.status(204);

          return Camp.findById(updateData.id);
        })
        .then(function(post) {
          post.name.should.equal(newCamp.name);
          post.area.should.equal(newCamp.area);
          post.age.should.equal(newCamp.age);
          post.price.should.equal(newCamp.price);
          post.specialty.should.equal(newCamp.specialty);
          post.website.should.equal(newCamp.website);
          post.content.should.equal(newCamp.content);
          post.picture.should.equal(newCamp.picture);
        });
      });
  });

  describe('DELETE endpoint', function() {
    // strategy:
    //  1. get a camp
    //  2. make a DELETE request for that camp's id
    //  3. assert that response has right status code
    //  4. prove that the camp with the id doesn't exist in db anymore
    it('should delete a camp by id', function() {

      let post;

      return Camp
        .findOne()
        .then(function(_post) {
          post = _post;
          return chai.request(app).delete(`/posts/${post.id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return BlogPost.findById(post.id);
        })
        .then(function(_post) {
          // when a variable's value is null, chaining `should`
          // doesn't work. so `_post.should.be.null` would raise
          // an error. `should.be.null(_post)` is how we can
          // make assertions about a null value.
          should.not.exist(_post);
        });
    });
  });
});
