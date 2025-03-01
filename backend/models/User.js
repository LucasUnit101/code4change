// MONGOOSE DATA MODEL FOR USERS
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: [true, "Username is already taken!"],
    maxLength: [100, "Username must be less than 100 characters!"],
    validate: {
      validator: (v) => {
        return /^[a-zA-Z0-9]+$/.test(v);
      },
      message: () => "Username must be alphanumeric!"
    }
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email is already in use!"],
    validate: {
      validator: (v) => {
        return /^[a-z0-9.-]+@ufl\.edu$/i.test(v);
      },
      message: () => "Email must be from @ufl.edu!"
    }
  },
  password: { 
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, "Name is required!"]
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
