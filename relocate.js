'use strict';
var gulp = require('gulp'),
  wizard = require('./utils/c.wizard'),

  // Default config
  defaults     = {
    location : './src/dummy/**/*.',
    destination : {
      production  : './build/dummy',
      development : './build/dummy'
    }
  };

/**
 * Creates a relocate task. Moves files from one location to another
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 * @return {Function}
 */
module.exports = function (id, config) {
  var wizard = require('./utils/c.wizard')(id, 'relocate', config, defaults);

  id     = wizard.getId();
  config = wizard.getConfig();

  gulp.task(id, function () {
    return gulp.src(config.location)
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development));
  });
};