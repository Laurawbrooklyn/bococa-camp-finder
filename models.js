const mongoose = require('mongoose');

const campPostSchema = mongoose.Schema({
  camp: {type: String, required: true},
  area: {type: String, required: true},
  age: {type: Number, required: true},
  specialty: {type: String, required: true},
  website: {type: String}
  content: {type: String},
});

campPostSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    camp: this.name,
    area: this.area,
    age: this.age,
    specialty: this.specialty,
    website: this.website,
    content: this.content,
  };
}

const CampPost = mongoose.model('CampPost', campPostSchema);

module.exports = {CampPost};
