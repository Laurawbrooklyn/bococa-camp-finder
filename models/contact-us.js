const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  subject: {type: String},
  content: {type: String, required: true},
});

contactSchema.methods.apiRepr = function() {
  return {
    name: this.name,
    email: this.email,
    subject: this.subject,
    content: this.content,
  };
}

const Contact = mongoose.model('Contact', contactSchema);

module.exports = {Contact};
