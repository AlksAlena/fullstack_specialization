const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  console.log(req.header('Origin'));
  if(whitelist.indexOf(req.header('Origin')) !== -1) {
    // client is in the white list - access is allowed
    corsOptions = { origin: true };
  } else {
    // client is not in the white list - access is denied
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

// cors() without options equal allow-origin: *
exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);