var express = require('express');
var app = express();

var ETag = {
  handle304: function(req, res, etag) {
    if (etag) {
      if (req.headers['if-none-match'] === etag) {
        res.statusCode = 304;
      }
      else{
        res.setHeader('ETag', etag);
      }
    }
  }
};

var lastModified = {
  handle304: function(req, res, lastIndexedDate) {
    if (lastIndexedDate) {
      if (req.headers['if-modified-since'] === lastIndexedDate) {
        res.statusCode = 304;
      }
      else{
        res.setHeader('Last-Modified', lastIndexedDate);
      }
    }
  }
};


// module.exports = ETag;

var cacheControl = function (req, res, next) {
  // const lastIndexed = '1468821216';
  // ETag.handle304(req, res, lastIndexed);

  // console.log(new Date().toString());

  const lastIndexedDate = 'Mon Jul 18 2016 16:25:51 GMT+0900 (JST)';
  // const lastIndexedDate = new Date().toString();
  lastModified.handle304(req, res, lastIndexedDate);

  next();
};

app.use(cacheControl);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// turn off etag
// app.set('etag', false);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
