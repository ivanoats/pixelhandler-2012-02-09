'use strict';
/*global casper*/

casper.test.begin('testing our REST API', 1, function suite(test) {

  casper.start('http://localhost:3000/api/products', function() {
    test.assertHttpStatus(200);
  });

  casper.then(function(){
    this.log('and then?');
    this.echo(this.getHTML('pre'));
  });

  casper.run(function(){
    test.done();
  });

});
