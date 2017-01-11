'use strict';

/**
 * Pug (Jade) task. Utilizes useref to replace references to non-optimized scripts or stylesheets
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  let defaultId = 'pug';
  let defaults = {
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
  let wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  let gulp = require('gulp');
  let gutil = require('gulp-util');
  let plumber = require('gulp-plumber');
  let pug = require('gulp-pug');
  let useref = require('gulp-useref');
  let cssnano = require('gulp-cssnano');
  let gulpIf = require('gulp-if');
  let uglify = require('gulp-uglify');

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
