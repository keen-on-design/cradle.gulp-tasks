'use strict';

//Compile sass files to css with auto prefix
module.exports = function() {
    var conn = $.ftp.create($.config.app.deploy.ftp.connect);

    $.gulp.task('ftp.deploy', function() {
        return $.gulp.src($.config.app.deploy.ftp.files, $.config.app.deploy.ftp.config)
            .pipe( conn.newer($.config.app.deploy.ftp.dest) )
            .pipe( conn.dest($.config.app.deploy.ftp.dest) );
    });
};