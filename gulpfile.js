const gulp = require('gulp');


// server
const browserSync = require('browser-sync')

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'site',
        },
        notify: false
    })
});

// templates
const htmlmin = require('gulp-htmlmin');

gulp.task('templates', () => {
	return gulp.src('./dev/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./site'))
		.pipe(browserSync.reload({stream: true}))
});


// styles
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');

gulp.task('styles', () => {
	return gulp.src('./dev/less/style.less')
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
		.pipe(csso())
		.pipe(gulp.dest('./site'))
		.pipe(browserSync.reload({stream: true}))
});


// scripts
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('scripts', () => {
	return gulp.src('./dev/js/*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./site'))
		.pipe(browserSync.reload({stream: true}))
});


// images
const imagemin = require('gulp-imagemin');

gulp.task('images', () => {
    return gulp.src('./dev/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./site/images'))
		.pipe(browserSync.reload({stream: true}))
});


// watcher
gulp.task('watch', () => {
	gulp.watch('./dev/*.html', ['templates']);
	gulp.watch('./dev/scss/*.scss', ['styles']);
	gulp.watch('./dev/js/*.js', ['scripts']);
	gulp.watch('images/*.{png,jpg,jpeg,gif,svg}', {cwd:'./dev/'}, ['images']);
});


// default
gulp.task('default', ['templates', 'styles', 'scripts', 'images']);
gulp.task('dev', ['default', 'browser-sync', 'watch']);