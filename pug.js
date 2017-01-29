'use strict';

/**
 * Pug (Jade) task. Utilizes useref to replace references to non-optimized scripts or stylesheets
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  const defaultId = 'pug';
  const defaults = {
    entryPoint: './src/template/_pages/*.pug',
    destination: {
      development: './build',
      production: './build'
    },
    pug: {
      pretty: '\t',
      basedir: './'
    },
    useref: {}
  };

  // Init task with cradle wizard
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const gutil = require('gulp-util');
  const plumber = require('gulp-plumber');
  const pug = require('gulp-pug');
  const useref = require('gulp-useref');
  const cssnano = require('gulp-cssnano');
  const gulpIf = require('gulp-if');
  const uglify = require('gulp-uglify');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    return gulp.src(config.entryPoint)
      .pipe(plumber())
      .pipe(pug(config.pug))
      .pipe(useref(config.useref))
      .pipe(gulpIf('*.js',
        $.env.production ? uglify() : gutil.noop()
      ))
      .pipe(gulpIf('*.css',
        $.env.production ? cssnano() : gutil.noop()
      ))
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development));
  });
};
