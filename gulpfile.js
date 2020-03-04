//resources
    //https://css-tricks.com/gulp-for-beginners/
    //https://youtu.be/hnCmSXCZEpU
    //https://stackoverflow.com/questions/38404862/what-exactly-does-pipe-mean-in-gulp
        //which led me to https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options

//The require statement tells Node to look into the node_modules folder for the package that follows (gulp, browser-sync, gulp-sass).
//Then saves as a variable.
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

//syntax
//gulp.task('task-name', function() {
    // Stuff here
//});

//task-name refers to the name of the task - this is what you call to run the funtion

//https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
//The readable.pipe() method attaches a Writable stream to the readable, causing it to switch automatically into flowing mode and push all of 
//its data to the attached Writable. The flow of data will be automatically managed so that the destination Writable stream is not overwhelmed
//by a faster Readable stream. -- Can not really put into my own words because I barely understand the pipe method

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss']) //where it's looking for the files (INPUT)
        .pipe(sass())//compiles
        .pipe(gulp.dest("src/css")) //where it puts the compiled css (OUTPUT)
        .pipe(browserSync.stream());//reloads browser
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    //where it's looking for the files (INPUT)
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js")) //where it puts the compiled css (OUTPUT)
        .pipe(browserSync.stream()); //reloads browser
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {//passes in sass

    //initiates server in src folder
    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series('sass'));//watches for changes in any scss files
    gulp.watch("src/*.html").on('change', browserSync.reload);// watches for changes in any html files
}));

//default means you can just type "gulp" without quotes into terminal to run
//This calls the js and serve functions / tasks
gulp.task('default', gulp.parallel('js','serve'));
