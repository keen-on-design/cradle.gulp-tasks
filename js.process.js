'use strict';

//Process js files: browserify and uglify
module.exports = function() {
    $.gulp.task('js.process', function() {
        return $.gulp.src($.config.js.entryPoint)
            .pipe($.plugins.plumber())
            .pipe($.plugins.browserify($.config.js.config.process.browserify))
            .pipe($.plugins.uglify())
            .pipe($.plugins.rename($.config.js.config.process.result))
            .pipe($.gulp.dest($.config.js.destination));
    });
};