const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  // refreshToken: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
