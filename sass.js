'use strict';

//Compile sass files to css with auto prefix
module.exports = function() {
    $.gulp.task('sass', function(cb) {
        return $.gulp.src($.config.sass.entryPoint)
            .pipe($.plugins.sourcemaps.init())
            .pipe($.plugins.sass($.config.sass.config)).on('error', $.plugins.sass.logError)
            .pipe($.plugins.autoprefixer($.config.sass.config.autoprefixer.config))
            .pipe($.plugins.sourcemaps.write())
            .pipe($.gulp.dest($.config.sass.destination))
            .pipe($.browserSync.stream())
        ;
    });
};