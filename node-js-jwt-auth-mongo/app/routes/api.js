const router = require('express').Router();

const authRouter = require('./auth');
router.use('/auth', authRouter);

const userRouter = require('./user');
router.use('/user', userRouter);

const superherosRouter = require('./superheros');
router.use('/superheros', superherosRouter);

module.exports = router;