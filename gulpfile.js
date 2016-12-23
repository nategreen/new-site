var gulp = require('gulp');

// var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
  var reload = browserSync.reload;
var clean = require('gulp-clean');
var data = require('gulp-data');
var environment = require('gulp-environments');
  var dev = environment.development;
  var prod = environment.production;
var fm = require('front-matter');
// var git = require('gulp-git');
var hb = require('gulp-hb');
  var hbHelpers = require('handlebars-helpers');
var plumber = require('gulp-plumber');
// var push = require('gulp-git-push');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
// var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
// var utils = require('gulp-util');

var src = {
  'root': './src',
  'sass': './src/scss/**/*.scss',
  'html': './src/**/*.html.hbs',
  'drafts': ['./src/**/drafts/*.html.hbs'],
  'htmlNoDrafts': ['./src/**/*.html.hbs', '!./src/**/drafts/*.html.hbs'],
  'partials': './src/partials/*.hbs'
};

var dist = {
  'root': './dist',
  'css': './dist/css',
  'html': './dist/**/*.html'
};

// Set the environment to development or production
gulp.task('env:dev', dev.task);
gulp.task('env:prod', prod.task);

// Clean all HTML files
gulp.task('clean:html', function() {
  return gulp.src(dist.html)
  .pipe(plumber())
  .pipe(clean());
});

// Compile Sass files
gulp.task('sass', function(){
  return gulp.src(src.sass)
  .pipe(dev(sourcemaps.init()))
  .pipe(sass().on('error', sass.logError))
  .pipe(dev(sourcemaps.write()))
  .pipe(gulp.dest(dist.css));
});

// Watch sass files for changes
gulp.task('watch:sass', ['sass'], function(){
  gulp.watch(src.sass, ['sass']);
})

// Render Handlebars templates
gulp.task('handlebars', ['clean:html'], function() {
  var hbSource = prod() ? src.htmlNoDrafts : src.html;
  var hbStream = hb()
    .helpers(hbHelpers)
    .partials(src.partials);

  return gulp.src(hbSource)
    .pipe(plumber())

    // Pass data from front-matter
    .pipe(data(function(file) {
      var content = fm(String(file.contents));
      file.contents = new Buffer(content.body);
      return content.attributes;
    }))

    // Render with Handlebars
    .pipe(hbStream)

    // Change the extensions from .html.hbs to .html
    .pipe(rename({
      extname: ''
    }))
    .pipe(gulp.dest(dist.root));
  });

// Watch Handlebars files for changes
gulp.task('watch:html', ['handlebars'], function(){
  gulp.watch([src.html, src.partials], ['handlebars']);
});

// Compiles everything (development)
gulp.task('default', ['handlebars', 'sass']);

// Task that watches everything and runs a Browserlink server for development
gulp.task('serve', ['default'], function(){
  browserSync({
    server: {
      baseDir: dist.root
    }
  });

  gulp.task('reload:html', ['handlebars'], reload);
  gulp.task('reload:css', ['sass'], reload);

  gulp.watch(src.sass, ['reload:css']);
  gulp.watch([src.html, src.partials], ['reload:html']);
});

// Task that builds the site for staging
gulp.task('build', ['env:prod'], function(){
  runSequence(['handlebars', 'sass'])
});

// Task that builds the site in production mode and pushes to GH pages
