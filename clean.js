'use strict';
var gulp = require('gulp'),
  del    = require('del'),
  wizard = require('./utils/c.wizard'),

  // Default config
  defaults     = {
    destination : './build/js'
  };

/**
 * Creates a directory cleaner task
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 * @return {Function}
 */
module.exports = function (id, config) {
  var wizard = require('./utils/c.wizard')(id, 'clean', config, defaults);

  id     = wizard.getId();
  config = wizard.getConfig();

  gulp.task(id, function (cb) {
    return del([
        config.destination
      ], cb);
  });
};