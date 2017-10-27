const mongoose = require('mongoose');

const campSchema = mongoose.Schema({
  name: {type: String, required: true},
  area: {type: String, required: true},
  age: {type: String, required: true},
  price: {type: String, required: true},
  specialty: {type: String, required: true},
  website: {type: String},
  content: {type: String},
  picture: {type: String, default: "/pool.png"}
});

campSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    area: this.area,
    age: this.age,
    price: this.price,
    specialty: this.specialty,
    website: this.website,
    content: this.content,
    picture: this.picture,
  };
}

const Camp = mongoose.model('Camp', campSchema);

module.exports = {Camp};


// const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  subject: {type: String},
  content: {type: String, required: true},
});

contactSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    subject: this.subject,
    content: this.content,
  };
}

const Contact = mongoose.model('Contact', contactSchema);

module.exports = {Contact};
