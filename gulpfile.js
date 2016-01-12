var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var notifier = require('node-notifier');
var source = require('vinyl-source-stream');

var notify = function(error) {
  console.error(error.stack);
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

gulp.task('browserify', function() {
  browserify('./src/main.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./extension/dist/js'));
});

gulp.task('default',['browserify'], function() {
  return gulp.watch('src/**/*.*', ['browserify']);
});
