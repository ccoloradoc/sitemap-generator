/*
* Author: Cristian Colorado <cristian@wedevelop.mx> 2017
*/

var SitemapGenerator = require('sitemap-generator');
var fs = require('fs');

var sf  = false;
var of = false;
var hf = false;
var exec = false;

var site = 'http://wedevelop.mx';
var output = 'wedevelop.xml';

var printHelp = function() {
  console.log('Sitemap');
  console.log('Current program helps you build a sitemap xml file based on a url.');
  console.log('');
  console.log('Commands: ');
  console.log('  -s    site to crawl');
  console.log('  -o    xml output file');
  console.log('  -h    help');
  console.log('');
  console.log('Crafted with love by Cristian Colorado <cristian@wedevelop.mx>');
  console.log('');
};

process.argv.forEach(function (val, index, array) {
  if(sf) {
    site = val;
    exec = true;
  }

  if(of) {
    output = val;
  }

  sf = (val == '-s');
  of = (val == '-o');
  hf = (val == '-h');

  if(hf) {
    printHelp();
  }
});

if(exec) {
  console.log('> processing: ' + site)

  var generator = new SitemapGenerator(site);

  generator.on('done', function(sitemaps) {
      console.log('> output: ' + output);
      fs.writeFile(output, sitemaps, function(err) {
    if(err)
        return console.log(err);
      });
  });

  generator.start();
}
