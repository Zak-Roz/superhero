const mongoose = require('mongoose');

const superheroSchema = new mongoose.Schema({
  nickname: { type: String, },
  real_mame: { type: String, },
  origin_description: { type: String, },
  superpowers: { type: String, },
  catch_phrase: { type: String, },
  images: [{ type: String, }],
}, { collection: 'superheros' });

module.exports = mongoose.model('Superhero', superheroSchema);