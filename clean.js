'use strict';

module.exports = function (cb) {
  //Cleans development folder
  $.gulp.task('clean:dev', function () {
    return $.del([
        $.config.destDev
      ], cb);
  });

  //Cleans release folder
  $.gulp.task('clean:release', function (cb) {
    return $.del([
      $.config.destRls
    ], cb);
  });
};