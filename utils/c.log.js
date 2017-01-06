'use strict';

var gutil      = require('gulp-util'),
  _            = require('underscore');

module.exports = function (message) {
  var messagePrefix = gutil.colors.blue('CRADLE >');
  if (_.isArray(message)) {
    var output = [];

    // Building message
    _.each(message, function (entry) {
      if (_.isObject(entry) && entry.trace !== undefined) {
        switch (entry.type) {
          case 'id' :
            output.push("'" + gutil.colors.cyan(entry.trace) + "'");
            break;

          case 'warning' :
            output.push(gutil.colors.yellow('WARNING: ' + entry.trace));
            break;

          case 'success' :
            output.push(gutil.colors.green(entry.trace));
            break;

          case 'object' :
            output.push(gutil.colors.grey(JSON.stringify(entry.trace)));
            break;

          default:
            output.push(entry.trace);
            break;
        }
      } else {
        output.push(entry);
      }
    });
    output.unshift(messagePrefix);

    // Output log message
    gutil.log.apply(this, output);
  } else {
    gutil.log(messagePrefix, message);
  }
};