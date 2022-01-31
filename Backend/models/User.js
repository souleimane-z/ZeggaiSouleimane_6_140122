/*
    Imports
*/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/*
    Schema for the auth
*/
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

  
userSchema.plugin(uniqueValidator);  // Only one user by email
  

/*
    export
*/
  module.exports = mongoose.model('User', userSchema);