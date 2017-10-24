// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');
//
// // this makes the should syntax available throughout
// // this module
// const should = chai.should();
//
// const {BlogPost} = require('../models');
// const {app, runServer, closeServer} = require('../server');
// const {TEST_DATABASE_URL} = require('../config');
// const {DATABASE_URL} = require('../config');
//
// chai.use(chaiHttp);
//
// // used to put randomish documents in db
// // so we have data to work with and assert about.
// // we use the Faker library to automatically
// // generate placeholder values for author, title, content
// // and then we insert that data into mongo
// function seedBlogPostData() {
//   console.info('seeding blog post data');
//   const seedData = [];
//
//   for (let i=1; i<=10; i++) {
//     seedData.push({
//       author: {
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//       },
//       title: faker.lorem.sentence(),
//       content: faker.lorem.sentence(),
//     });
//   }
//   // this will return a promise
//   return BlogPost.insertMany(seedData);
// }
//
// // this function deletes the entire database.
// // we'll call it in an `afterEach` block below
// // to ensure data from one test does not stick
// // around for next one
// function tearDownDb() {
//     console.warn('Deleting database');
//     return mongoose.connection.dropDatabase();
// }
//
// describe('blog posts API resource', function() {
//
//   // we need each of these hook functions to return a promise
//   // otherwise we'd need to call a `done` callback. `runServer`,
//   // `seedRestaurantData` and `tearDownDb` each return a promise,
//   // so we return the value returned by these function calls.
//   before(function() {
//     return runServer(TEST_DATABASE_URL);
//   });
//
//   beforeEach(function() {
//     return seedBlogPostData();
//   });
//
//   afterEach(function() {
//     return tearDownDb();
//   });
//
//   after(function() {
//     return closeServer();
//   });
//
//   // note the use of nested `describe` blocks.
//   // this allows us to make clearer, more discrete tests that focus
//   // on proving something small
//   describe('GET endpoint', function() {
//
//     it('should return all existing blog posts', function() {
//       // strategy:
//       //    1. get back all blog posts returned by by GET request to `/posts`
//       //    2. prove res has right status, data type
//       //    3. prove the number of blog posts we got back is equal to number
//       //       in db.
//       let res;
//       return chai.request(app)
//         .get('/posts')
//         .then(function(_res) {
//           // so subsequent .then blocks can access resp obj.
//           res = _res;
//           res.should.have.status(200);
//           // otherwise our db seeding didn't work
//           res.body.should.have.length.of.at.least(1);
//           return BlogPost.count();
//         })
//         .then(function(count) {
//           res.body.should.have.lengthOf(count);
//         });
//     });
//
//     it('should return blog posts with right fields', function() {
//       // Strategy: Get back all blog posts, and ensure they have expected keys
//
//       let resPost;
//       return chai.request(app)
//         .get('/posts')
//         .then(function(res) {
//           res.should.have.status(200);
//           res.should.be.json;
//           res.body.should.be.a('array');
//           res.body.should.have.length.of.at.least(1);
//           res.body.forEach(function(post) {
//             post.should.be.a('object');
//             post.should.include.keys(
//               'id', 'title', 'content', 'author', 'created');
//           });
//           resPost = res.body[0];
//           return BlogPost.findById(resPost.id);
//         })
//         .then(function(post) {
//           resPost.id.should.equal(post.id);
//           resPost.title.should.equal(post.title);
//           resPost.content.should.equal(post.content);
//           resPost.author.should.equal(`${post.author.firstName} ${post.author.lastName}`);
//         });
//
//     });
//   });
//
//   describe('POST endpoint', function() {
//     // strategy: make a POST request with data,
//     // then prove that the POST we get back has
//     // right keys, and that `id` is there (which means
//     // the data was inserted into db)
//     it('should add a new blog post', function() {
//
//       const newPost = {
//           title: faker.lorem.sentence(),
//           author: {
//             firstName: faker.name.firstName(),
//             lastName: faker.name.lastName(),
//           },
//           content: faker.lorem.paragraph()
//       };
//       return chai.request(app)
//         .post('/posts')
//         .send(newPost)
//         .then(function(res) {
//           res.should.have.status(201);
//           res.should.be.json;
//           res.body.should.be.a('object');
//           res.body.should.include.keys(
//             'id', 'title', 'content', 'author', 'created');
//           res.body.title.should.equal(newPost.title);
//           // cause Mongo should have created id on insertion
//           res.body.id.should.not.be.null;
//           res.body.content.should.equal(newPost.content);
//           res.body.author.should.equal(`${newPost.author.firstName} ${newPost.author.lastName}`);
//           return BlogPost.findById(res.body.id);
//         })
//         .then(function(post) {
//           post.title.should.equal(newPost.title);
//           post.content.should.equal(newPost.content);
//           post.author.firstName.should.equal(newPost.author.firstName);
//           post.author.lastName.should.equal(newPost.author.lastName);
//         });
//     });
//   });
// 
//   describe('PUT endpoint', function() {
//
//     // strategy:
//     //  1. Get an existing blog post from db
//     //  2. Make a PUT request to update that blog post
//     //  3. Prove the blog post returned by request contains data we sent
//     //  4. Prove the blog post in db is correctly updated
//     it('should update fields you send over', function() {
//       const updateData = {
//         title: 'Updated Blog Post Title',
//         content: 'I am some updated blog post content to test.',
//         author: {
//           firstName: 'Laura',
//           lastName: 'Wallace'
//         }
//       };
//       return BlogPost
//         .findOne()
//         .then(function(post) {
//           updateData.id = post.id;
//           // make request then inspect it to make sure it reflects
//           // data we sent
//           return chai.request(app)
//             .put(`/posts/${post.id}`)
//             .send(updateData);
//         })
//         .then(function(res) {
//           res.should.have.status(204);
//
//           return BlogPost.findById(updateData.id);
//         })
//         .then(function(post) {
//           post.title.should.equal(updateData.title);
//           post.content.should.equal(updateData.content);
//           post.author.firstName.should.equal(updateData.author.firstName);
//           post.author.lastName.should.equal(updateData.author.lastName);
//         });
//       });
//   });
//
//   describe('DELETE endpoint', function() {
//     // strategy:
//     //  1. get a blog post
//     //  2. make a DELETE request for that post's id
//     //  3. assert that response has right status code
//     //  4. prove that blog post with the id doesn't exist in db anymore
//     it('should delete a blog post by id', function() {
//
//       let post;
//
//       return BlogPost
//         .findOne()
//         .then(function(_post) {
//           post = _post;
//           return chai.request(app).delete(`/posts/${post.id}`);
//         })
//         .then(function(res) {
//           res.should.have.status(204);
//           return BlogPost.findById(post.id);
//         })
//         .then(function(_post) {
//           // when a variable's value is null, chaining `should`
//           // doesn't work. so `_post.should.be.null` would raise
//           // an error. `should.be.null(_post)` is how we can
//           // make assertions about a null value.
//           should.not.exist(_post);
//         });
//     });
//   });
// });
