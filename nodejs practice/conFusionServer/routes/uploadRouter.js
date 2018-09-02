const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');

// So multer provides this diskStorage function 
// which enables us to define the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 'public/images' - destination folder
    cb(null, 'public/images');
  },
  // the file is saved on the server side 
  // the file will be given exactly the same name
  // as the original name of the file that has been uploaded
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const imageFileFilter = (req, file, cb) => {
  // So that is how I specify the regular expression 
  // there to say that okay, if the file's extension 
  // contains jpg, or jpeg, or png, or gif, then I will 
  // treat that as an image file, and I will be willing 
  // to accept those files
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('You can upload only image files!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
  // OPTIONS method for preflight request
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
  })
  // method .single() - Takes as the parameter the name of the form field which specifies that file
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // This req.file object will also contain the path 
    // to the file in there and what parts can be 
    // used by the client to configure any place 
    // where it needs to know the location of this image file
    res.json(req.file);
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
  });

module.exports = uploadRouter;