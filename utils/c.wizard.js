'use strict';

var gutil      = require('gulp-util'),
  log          = require('./c.log'),
  _            = require('underscore');

module.exports = function (id, defaultId, config, defaultConfig) {

  function TaskWizard() {
    log([
      {trace : 'Setting up task'},
      {type  : 'id', trace : (id !== undefined) ? id : defaultId}
    ]);

    if (typeof id === 'undefined') {
      log([
        {type  : 'warning', trace : 'No task ID provided.'},
        {trace : 'Default ID is:'},
        {type  : 'id', trace : defaultId}
      ]);

      this.id = defaultId;
    } else {
      this.id = id;
    }

    if (typeof config === 'undefined' || typeof config !== 'object') {
      log([
        {type  : 'warning', trace : 'No task config provided.'},
        {trace : 'Task will execute with default configs'}
      ]);
      this.config = {};
    } else {
      this.config = config;
    }

    this.config = _.extend(defaultConfig, config);

    log([
      {type  : 'success', trace : 'Setup complete.'},
      {trace : 'Using config:'},
      {type  : 'object', trace : this.config}
    ]);
  }

  /**
   * Gets task config object
   *
   * @method getConfig
   * @return {Object} Config object combined.
   */
  TaskWizard.prototype.getConfig = function () {
    return this.config;
  };

  /**
   * Gets task Id
   *
   * @method getId
   * @return {String} ID.
   */
  TaskWizard.prototype.getId = function () {
    return this.id;
  };

  return new TaskWizard();
};