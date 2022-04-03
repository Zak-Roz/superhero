require('dotenv').config();

const genPass = require('generate-password');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const config = require('../config/auth.config');

exports.signup = async (req, res) => {
  try {
    const password = genPass.generate({
      length: 20,
      numbers: true,
      symbols: '!#@*&^'
    });
    console.log('🚀 ~ file: auth.controller.js ~ line 20 ~ password', req.body.password || password);
    await new User({
      fullname: req.body.fullname,
      login: req.body.login,
      code: bcrypt.hashSync(req.body.code, 5),
      registeredAt: new Date(),
      password: bcrypt.hashSync(req.body.password || password, 8),
      status_u: 1,
    }).save();
    return res.send({ message: 'User successfully registered!' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try{
    const user = await User.findOne({
      login: req.body.login
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid password!'
      });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 5400 // 24 hours -> 86400
    });

    if(user.status_u === 1) {
      user.status_u = 2;
      await user.save();
    }
    if(user.status_id === 3) {
      res.status(403).send({
        id: user._id,
        fullname: user.fullname,
        login: user.login,
        message: 'You have been blocked! Contact support!',
      });
    }
    return res.status(200).send({
      id: user._id,
      fullname: user.fullname,
      login: user.login,
      accessToken: token
    });
  }catch(err) {
    res.status(500).send({ message: err.message });
  }
};
