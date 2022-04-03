const sharp = require('sharp');
const process = require('process');
const { Superheros } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const superheros = await Superheros.find().sort({ created: -1 });
    if (!superheros.length) {
      throw new Error('The superhero has not been created yet!');
    }
    return res.json(superheros);
  } catch (err) {
    return res.send({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const superhero = await Superheros.findById(req.query.id);
    if (!superhero) {
      throw new Error('No superhero found!');
    }
    return res.json(superhero);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    await Superheros.deleteOne({_id: req.query.id});
    return res.status(200).send({ message: 'Superhero successfully deleted!' });
  } catch (err) {
    return res.send({ error: err.message });
  }
};

exports.create = (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    let imgInput = [];
    let imgOutput = [];
    let img = [];
    req.file ? img.push(req.file.path) 
      : req.files ? req.files.forEach((el) => {
        img.push(url + `/data/${el.filename}`);
        imgInput.push(`\\data\\${el.filename}`);
        imgOutput.push(`\\data\\thumbnail\\${el.filename}`);
      }) 
        : null;
    imgInput = imgInput.map((el) => `${process.cwd()}${el}`);
    imgOutput = imgOutput.map((el) => `${process.cwd()}${el}`);
    for(let i = 0; i < imgInput.length; i ++) {
      sharp(imgInput[i]).resize({ height: 100, width: 100 }).toFile(imgOutput[i]).then((el) => el);
    }
    const superhero = new Superheros({
      nickname: req.body.nickname,
      real_mame: req.body.real_mame,
      origin_description: req.body.origin_description,
      superpowers: req.body.superpowers,
      catch_phrase: req.body.catch_phrase,
      images: img,
    });
    superhero.save();
    return res.status(200).send({ message: 'Superhero successfully created!' });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const superhero = await Superheros.findById(req.body.id);
    if (!superhero) {
      throw new Error('No superhero found!');
    }
    const url = req.protocol + '://' + req.get('host');
    let imgInput = [];
    let imgOutput = [];
    let img = JSON.parse(req.body.images);
    req.file ? img.push(req.file.path) 
      : req.files ? req.files.forEach((el) => {
        img.push(url + `/data/${el.filename}`);
        imgInput.push(`\\data\\${el.filename}`);
        imgOutput.push(`\\data\\thumbnail\\${el.filename}`);
      }) 
        : null;
    imgInput = imgInput.map((el) => `${process.cwd()}${el}`);
    imgOutput = imgOutput.map((el) => `${process.cwd()}${el}`);
    for(let i = 0; i < imgInput.length; i ++) {
      sharp(imgInput[i]).resize({ height: 100, width: 100 }).toFile(imgOutput[i]).then((el) => el);
    }
    superhero.nickname = req.body.nickname;
    superhero.real_mame = req.body.real_mame;
    superhero.origin_description = req.body.origin_description;
    superhero.superpowers = req.body.superpowers;
    superhero.catch_phrase = req.body.catch_phrase;
    superhero.images = img;
    superhero.save();
    return res.status(200).send({ message: 'Superhero successfully updated!' });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};
