const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},

});
/* utilisation du middleware mongoose-unique-validator pour permettre un seul email en controle */
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Signup', userSchema);
