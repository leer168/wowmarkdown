var gulp = require('gulp');
var browserSync = require('browser-sync');
var marked_app = require('./index');
var reload = browserSync.reload;

gulp.task('server', function() {
  browserSync.init({
      server: {
          baseDir: "./out/"
      }
  });
  marked_app({watch:'watch'});
  gulp.watch("./out/*.html").on('change', reload);
});

gulp.task('default', ['server']);
