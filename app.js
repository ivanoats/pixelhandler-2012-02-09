'use strict';

var application_root = __dirname,
            express  = require('express'),
            path     = require('path'),
            mongoose = require('mongoose');

var app = express();

// Database

mongoose.connect('mongodb://localhost/my_db');

// config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, 'public')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (request, response) {
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

// READ INDEX
app.get('/api/products', function (request, response){
  return ProductModel.find(function(err, products) {
    if(!err) {
      return response.send(products);
    } else {
      return console.log(err);
    }
  });
});

// CREATE
app.post('/api/products', function (request, response){
  var product;
  console.log('POST: ');
  console.log(request.body);
  product = new ProductModel({
    title: request.body.title,
    description: request.body.description,
    style: request.body.style
  });
  product.save(function (err) {
    if (!err) {
      return console.log('created');
    } else {
      return console.log(err);
    }
  });
  return response.send(product);
});

// READ by ID
app.get('/api/products/:id', function (request, response) {
  return ProductModel.findById(request.params.id, function (err, product) {
    if (!err) {
      return response.send(product);
    } else {
      return console.log(err);
    }
  });
});

// UPDATE by ID
app.put('/api/products/:id', function (request, response){
  return ProductModel.findById(request.params.id, function (err, product) {
    product.title       = request.body.title;
    product.description = request.body.description;
    product.style       = request.body.style;
    return product.save(function (err) {
      if (!err) {
        console.log('updated');
      } else {
        console.log(err);
      }
      return response.send(product);
    });
  });
});

app.delete('/api/products/:id', function (request, response){
  return ProductModel.findById(request.params.id, function(err, product) {
    return product.remove(function (err) {
      if (!err) {
        console.log('removed');
        return response.send('');
      } else {
        console.log(err);
      }
    });
  });
});

// Launch createServer

var port = 3000;
app.listen(port);
console.log('app is running on port ' + port);
