"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync").create();

// BrowserSync initialization
function browserSyncInit(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browserSync.stream();
  browserSync.reload();
  done();
}

// Watch files
function watchFiles() {
  gulp.watch(["./**/*.html", "./css/*", "./img/*"], browserSyncReload);
}

// Dev task
gulp.task("dev", gulp.parallel(watchFiles, browserSyncInit));
