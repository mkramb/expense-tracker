module.exports = function(grunt) {
  'use strict';

  var config = require('./tasks')(grunt);

  config.pkg = grunt.file.readJSON('./package.json');
  config.paths = { root: __dirname };

  grunt.initConfig(config);

  Object.keys(config.pkg.devDependencies).forEach(function(item) {
    if (item.lastIndexOf('grunt-', 0) === 0) {
      grunt.loadNpmTasks(item);
    }
  });

  grunt.registerTask('default', [ 'availabletasks' ]);
  grunt.registerTask('run', [ 'build', 'connect:server:keepalive' ]);
  grunt.registerTask('build', [
    'clean',
    'copy:app',
    'copy:fonts',
    'concat:js',
    'concat:css',
    'browserify:app',
    'less:app'
  ]);
};
