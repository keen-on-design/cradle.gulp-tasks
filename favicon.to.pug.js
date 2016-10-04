'use strict';

//Generates favicon .pug template
module.exports = function() {
    $.gulp.task('favicon.to.pug', function(cb) {
        return $.gulp.src($.config.pug.dummy)
            //Reading html code for favicon
            .pipe(
                $.plugins.realFavicon.injectFaviconMarkups(
                    JSON.parse($.fs.utils.readFileSync($.config.app.favicon.dataFile)).favicon.html_code
                )
            )
            //Html to jade
            .pipe($.plugins.html2jade({
                nspaces     :2,
                bodyless    : true
            }))
            //Renaming .jade to .pug
            .pipe($.plugins.rename($.config.app.favicon.template))
            .pipe($.gulp.dest($.config.pug.externals));
    });
};