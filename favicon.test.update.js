'use strict';

//Checks for realFavicon global update
module.exports = function() {
    $.gulp.task('favicon.test.update', function(cb) {

        var currentVersion = JSON.parse($.fs.utils.readFileSync($.config.app.favicon.dataFile)).version;

        $.plugins.realFavicon.checkForUpdates(currentVersion, function(err) {
            if (err) {
                throw err;
            }
        });

        cb();
    });
};