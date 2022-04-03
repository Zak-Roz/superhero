const controller = require('../controllers/user.controller');
const userRouter = require('express').Router();

userRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .get('/getById', controller.getById)
  .put('/updatePass',controller.updatePass)
  .put('/forgotPass',controller.forgotPass);

module.exports = userRouter;