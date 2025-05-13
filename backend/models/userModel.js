const mongoose = require('mongoose');

// Schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true, 
    trim: true, 
  },
  password: {
    type: String,
    required: true, 
  },
  username: {
    type: String,
    unique: true, 
    trim: true, 
  },
  refreshToken: {
    type: String,
    default: null, 
  },

  createdAt: {
    type: Date,
    default: Date.now, 
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
