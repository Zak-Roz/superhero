const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.getById = async (req, res) => {
  try {
    let user = null;
    if (req.query.id) {
      user = await User.findById(req.query.id);
      if (user) {
        const authorities = [];
        user.right.forEach((el)=>{
          authorities.push(el.name);
        });
        return res.json({user, authorities});
      }
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.forgotPass = async (req, res) => {
  try{
    const user = await User.findOne({
      login: req.body.login
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    
    const codeIsValid = await bcrypt.compare(
      req.body.code,
      user.code,
    );

    if (!codeIsValid) {
      return res.status(401).send({
        message: 'The code is incorrect',
      });
    }

    const passwordDublicate = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordDublicate) {
      return res.status(401).send({
        message: 'The new password is currently in use!',
      });
    }
    const password = bcrypt.hashSync(req.body.password, 8);
    user.password = password;
    await user.save();
    return res.send({ message: 'Password changed successfully!' });
  }catch(err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.updatePass = async (req, res) => {
  try{
    const user = await User.findOne({
      login: req.body.login
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const passwordDublicate = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (passwordDublicate) {
      return res.status(401).send({
        message: 'The new password is currently in use!',
      });
    }
    let passwordIsValid = bcrypt.compareSync(
      req.body.oldPassword,
      user.password,
    );

    if (!passwordIsValid) {
      passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        user.code,
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          message: 'The password is incorrect',
        });
      }
    }
    const password = bcrypt.hashSync(req.body.password, 8);
    user.password = password;
    await user.save();
    return res.send({ message: 'Password changed successfully!' });
  }catch(err) {
    return res.status(500).send({ message: err.message });
  }
};