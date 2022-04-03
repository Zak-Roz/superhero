const controller = require('../controllers/superheros.controller');
const superherosRouter = require('express').Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './data');
  },
  filename: function(req, file, cb) {
    cb(null, (new Date().toISOString()).split(':').join('-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

superherosRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .get('/getAll', controller.getAll)
  .get('/getById', controller.getById)
  .delete('/deleteById', controller.deleteById)
  .post('/new', 
    upload.array('files', 100),
    controller.create
  )
  .put('/update', 
    upload.array('files', 100),
    controller.update
  );

module.exports = superherosRouter;