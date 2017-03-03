'use strict';

/**
 * Ftp deployment task.
 * @param {String} [id=clean] Id of a task
 * @param {Object} [config={}] Task config
 */
module.exports = function (id, config) {
  // Default config
  const defaultId = 'ftp-clean';
  const defaults = {
    destination: '/public_html/',

    connect: {
      host: 'HOMESTEAD',
      user: 'USERNAME',
      password: 'SECRET',
      parallel: 10,
      log: require('gulp-util').log
    },

    ftp: {
      base: './build',
      buffer: false
    }
  };

  // Init task with cradle wizard
  const wizard = require('./utils/c.wizard')(id, defaultId, config, defaults);

  // Task dependencies
  const gulp = require('gulp');
  const ftp = require('vinyl-ftp');

  // Final task config
  config = wizard.getConfig();

  gulp.task(wizard.getId(), function (cb) {
    const conn = ftp.create(config.connect);
    return conn.rmdir(config.destination, cb)
  });
};
