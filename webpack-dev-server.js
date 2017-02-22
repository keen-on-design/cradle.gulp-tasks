'use strict';

/**
 * Webpack dev server task.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  const defaultId = 'webpack-dev-server';
  const defaults = {
  };

  // Init task with cradle wizard
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const gutil = require('gulp-util');
  const webpack = require("webpack");
  const WebpackDevServer = require("webpack-dev-server");

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function(callback) {
    // modify some webpack config options
    config.devtool = "eval";

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(config), config.devServer).listen(8080, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
  });
};
