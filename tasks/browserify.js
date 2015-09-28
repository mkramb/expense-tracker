module.exports = {
  app: {
    src: '<%= paths.root %>/app/js/app.js',
    dest: '<%= paths.root %>/build/static/app.js',
    options: {
      transform: ['stringify']
    }
  }
};
