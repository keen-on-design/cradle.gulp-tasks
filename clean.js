'use strict';

module.exports = function () {

  //Cleans development folder
  $.gulp.task('clean:dev', function (cb) {
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