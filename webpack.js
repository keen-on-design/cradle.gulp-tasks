'use strict';

/**
 * Browserify + uglify task.
 * @param {String} [id=js:scripts] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {

  // Default config
  const defaultId = 'webpack';
  const defaults = {

  };

  // Init task with cradle wizard
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const webpackStream = require('webpack-stream');
  const webpack = require('webpack');
  const _ = require('underscore');
  const gutil = require('gulp-util');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function (callback) {
    webpack(config, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
      }));
      callback();
    });
  });
};