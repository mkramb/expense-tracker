var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {
  var configs = {};

  fs.readdirSync(__dirname).forEach(function(filename) {
    if (filename === 'index.js' && !/^\..*/.test(filename)) {
      return;
    }

    var name = path.basename(filename, '.js');
    var conf = require('./' + name);

    configs[name] = typeof conf === 'function' ? conf(grunt) : conf;
  });

  return configs;
};
