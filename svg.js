'use strict';

/**
 * Svg sprite task.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  const defaultId = 'svg:sprite';
  const defaults = {
    location: './src/svg/**/*.svg',
    destination: {
      production: './build/svg',
      development: './build/svg',
    },

    svgSprite: {
      mode: {symbol: {example: false}}
    },

    svgmin: {
      js2svg: {pretty: true}
    },

    cheerio: {
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }
  };

  // Init task with cradle wizard
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const gutil = require('gulp-util');
  const svgmin = require('gulp-svgmin');
  const cheerio = require('gulp-cheerio');
  const svgSprite = require('gulp-svg-sprite');
  const replace = require('gulp-replace');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function () {
    return gulp.src(config.location)
      // minify svg
      .pipe($.env.production ? svgmin(config.svgmin) : gutil.noop())
      // remove all fill and style declarations in out shapes
      .pipe(cheerio(config.cheerio))
      // cheerio plugin create unnecessary string '>', so replace it.
      .pipe(replace('&gt;', '>'))
      // build svg sprite
      .pipe(svgSprite(config.svgSprite))
      .pipe($.env.production ? gulp.dest(config.destination.production) : gulp.dest(config.destination.development));
  });
};
