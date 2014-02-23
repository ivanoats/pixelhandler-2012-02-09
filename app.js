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

// Launch createServer

var port = 3000;
app.listen(port);
console.log('app is running on port ' + port);
