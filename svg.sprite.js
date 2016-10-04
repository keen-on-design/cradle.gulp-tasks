'use strict';

module.exports = function() {
    $.gulp.task('svg.sprite', function() {
        return $.gulp.src($.config.svg.location)
            // minify svg
            .pipe($.plugins.svgmin($.config.svg.config.sprite.svgmin))
            // remove all fill and style declarations in out shapes
            .pipe($.plugins.cheerio($.config.svg.config.sprite.cheerio))
            // cheerio plugin create unnecessary string '>', so replace it.
            .pipe($.plugins.replace('&gt;', '>'))
            // build svg sprite
            .pipe($.plugins.svgSprite($.config.svg.config.sprite.svgSprite))
            .pipe($.gulp.dest($.config.svg.destination));
    });
};