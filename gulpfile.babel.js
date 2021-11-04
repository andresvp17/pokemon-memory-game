//JavaScript
import gulp from 'gulp'
import babel from 'gulp-babel'
import terser from 'gulp-terser'

//SASS
var sass = require('gulp-sass')(require('sass'));

gulp.task('babel', () =>{
    return gulp
    .src('./src/js/*.js')
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('./public/js'))
})

gulp.task('sass', () =>{
    return gulp
    .src('./src/scss/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('default', () =>{
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('./src/js/*.js', gulp.series('babel'))
})