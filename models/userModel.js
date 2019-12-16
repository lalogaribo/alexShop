const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: { type: String, default: 'default.jpg' },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords don't match"
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

// After saving the user we need to encrypt the user password
userSchema.pre('save', async function(next) {
  // We only run this pre query if the password is modified
  if (!this.isModified('password')) return next();

  // Hash password using cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // We delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Instance methods

// Method that compares if passwords are correct
userSchema.methods.isPasswordCorrect = async function(
  candidatePsw,
  userPassword
) {
  return await bcrypt.compare(candidatePsw, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
