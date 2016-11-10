'use strict';

module.exports = function() {

  //Generates favicon using real favicon generator
  $.gulp.task('favicon:create', function(cb) {
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

  //Moves generated favicon to destination folder
  $.gulp.task('favicon:process', function () {
    return $.gulp.src([$.config.app.favicon.destination + '**/*.*', '!' + $.config.app.favicon.location])
      .pipe($.plugins.if($.argv.release,
        $.plugins.cache($.plugins.imagemin($.config.images.config.imagemin))
      ))
      .pipe($.plugins.if($.argv.release === undefined,
        $.gulp.dest($.config.destDev)
      ))
      .pipe($.plugins.if($.argv.release,
        $.gulp.dest($.config.destRls)
      ));
  });

  //Checks for Real Favicon Generator updates
  $.gulp.task('favicon:update', function(cb) {
    var currentVersion = JSON.parse($.fs.utils.readFileSync($.config.app.favicon.dataFile)).version;
    $.plugins.realFavicon.checkForUpdates(currentVersion, function(err) {
      if (err) {
        throw err;
      }
    });
    cb();
  });

  //Generates favicon .pug template
  $.gulp.task('favicon:toPug', function(cb) {
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