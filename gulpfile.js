

var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var $ = require('gulp-load-plugins')();
var del = require('del');
var md5 = require('gulp-md5plus');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var qnConfig = require('./qnConfig');
var argv = require('yargs').argv

var dir = argv.path

var qnConfig = qnConfig.hsq;
var qnOptions = {
  accessKey: qnConfig.qnAK,
  secretKey: qnConfig.qnSK,
  bucket: qnConfig.qnBucketUIS,
  origin: qnConfig.qnDomainUIS,
}

// --path=xxx
// copy src/xxx/json  -> dist/xxx
// md5 src/xxx/**/* (json) -> dist/xxx
// md5 json
// qn

var paths = {
  src: [
    'src/' + dir + '/**/*',
    '!src/' + dir + '/config.json',
  ],
  dist: 'dist/' + dir,
  copySrc: 'src/' + dir + '/config.json',
  quoteSrc: 'dist/' + dir + '/config.json',
  md5json: 'dist/' + dir + '/*.json',
}

// del
gulp.task('clean', function() {
  return del('dist');
});

// copy
gulp.task('copy', ['clean'], function(){
  return gulp.src(paths.copySrc)
    .pipe(gulp.dest(paths.dist))
});

// 资源 md5
gulp.task('md5', ['copy'], function(){
  gulp.src(paths.src)
  .pipe(md5(10, paths.quoteSrc))
  .pipe(gulp.dest(paths.dist))

  // var content = fs.readFileSync(paths.quoteSrc);
  // console.log(content.toString());
});

gulp.task('md5json', function(){
  gulp.src(paths.quoteSrc)
  .pipe($.replace(/.\/img\//g, qnOptions.origin + 'zt/' + dir + '/img/'))
  .pipe($.rename(dir+'.json'))
  .pipe(md5(6, null))
  .pipe(gulp.dest(paths.dist))
  return del(paths.quoteSrc);
});

// 上传七牛
gulp.task('qn', function(){
  gulp.src([
    paths.dist + '/**/*',
    '!' + paths.dist + '/*.json',
  ])
  .pipe($.qndn.upload({
    prefix: 'zt/' + dir + '/',
    qn: qnOptions,
  }));
  gulp.src([
    paths.dist + '/*.json',
  ])
  .pipe($.qndn.upload({
    prefix: 'zt/',
    qn: qnOptions,
  }));
});


// 指定一个新的 cwd (当前工作目录)
gulp.task('default', $.shell.task([
  'gulp md5 --path=' + dir,
  'gulp md5json --path=' + dir,
  'gulp qn --path=' + dir,
], {
  cwd: './'
}));
