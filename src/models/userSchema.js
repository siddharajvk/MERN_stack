const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true // Ensures uniqueness of loginIDs
  },
  password: {
    type: String,
    required: true
  },
  projectIds:{
    type: [Number], 
    default: null,
  }
});

// Create a model using the user schema
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
