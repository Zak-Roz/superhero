const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  code: { type: String, required: true },
  status_u: { type: Number, ref: 'StatusUser' },
  registeredAt: { type: Date, },
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);