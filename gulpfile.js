var gulp = require('gulp'),
    compass = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    path = require('path'),
    watch = require('gulp-watch');

gulp.task('compass', function() {
    gulp.src('./static/sass/*.scss')
        .pipe(compass({
            project: path.join(__dirname, 'static'),
            css: 'css',
            sass: 'sass'
        }))
        .on('error', function(err) {
            console.log("Error");
        });
});

dest = '';

gulp.task('staticsvr', function(next) {
  var staticS = require('node-static'),
      server = new staticS.Server('./' + dest),
      port = 8020;
  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      server.serve(request, response);
    }).resume();
  }).listen(port, function() {
    console.log('Server listening on port: ' + port);
    next();
  });
});


gulp.task('watch', ['staticsvr','compass'], function() {
  var server = livereload();
  gulp.watch('./**').on('change', function(file) {
      gulp.run('compass');
      server.changed(file.path);
  });
});