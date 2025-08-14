'use strict';

var express = require('express');
var app = module.exports = express();

// Use the PORT environment variable or default to 8080
const PORT = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.send('Hello World from Desini Akhil Goud');
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(PORT, function () {
    console.log(Express started on port ${PORT});
  });
}
