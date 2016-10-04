'use strict';

//Generates favicon using real favicon generator
module.exports = function() {
    $.gulp.task('favicon.create', function(cb) {
        if ($.fs.exists($.config.app.favicon.location)) {
            return $.plugins.realFavicon.generateFavicon({
                masterPicture   : $.config.app.favicon.location,
                dest            : $.config.app.favicon.destination,
                iconsPath       : $.config.app.favicon.basedir,
                design          : $.config.app.favicon.config.design,
                settings        : $.config.app.favicon.config.settings,
                markupFile      : $.config.app.favicon.dataFile
            }, function() {
                cb();
            });
        } else {
            console.log('favicon: master picture does not exist');
            cb();
        }
    });
};