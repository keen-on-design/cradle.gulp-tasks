'use strict';

module.exports = function() {
  var conn = $.ftp.create($.config.app.deploy.ftp.connect);

  $.gulp.task('ftp:deploy', function() {
    return $.gulp.src($.config.app.deploy.ftp.files, $.config.app.deploy.ftp.config)
      .pipe(conn.newerOrDifferentSize($.config.app.deploy.ftp.dest))
      .pipe(conn.dest($.config.app.deploy.ftp.dest));
  });
};