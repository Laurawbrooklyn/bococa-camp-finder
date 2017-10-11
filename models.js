const mongoose = require('mongoose');

const campSchema = mongoose.Schema({
  name: {type: String, required: true},
  area: {type: String, required: true},
  age: {type: String, required: true},
  price: {type: String, required: true},
  specialty: {type: String, required: true},
  website: {type: String},
  content: {type: String},
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
  };
}

const Camp = mongoose.model('Camp', campSchema);

module.exports = {Camp};
