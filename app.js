var application_root = __dirname,
            express  = require('express'),
            path     = require('path'),
            mongoose = require('mongoose');

var app = express();

// Database

mongoose.connect('mongodb://localhost/my_db');

// config

app.configure(function () {
  'use strict';
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, 'public')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (request, response) {
  'use strict';
  response.send('my API is running');
});

// schema and product model
var Schema = mongoose.Schema;

var Product = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  style: {type: String, unique: true },
  modified: { type: Date, default: Date.now }
});

var ProductModel = mongoose.model('Product', Product);

app.get('/api/products', function (request, response){
  'use strict';
  return ProductModel.find(function(err, products) {
    if(!err) {
      return response.send(products);
    } else {
      return console.log(err);
    }
  });
});

// Launch createServer

var port = 3000;
app.listen(port);
console.log('app is running on port ' + port);
