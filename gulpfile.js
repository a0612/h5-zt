

var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var $ = require('gulp-load-plugins')();
var del = require('del');
var md5 = require('gulp-md5plus');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var qnConfig = require('./qnConfig');
var argv = require('yargs').argv;
var pump = require('pump')

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
gulp.task('clean', function(cb) {
  return del('dist');
});

// copy
gulp.task('copy', ['clean'], function(cb){
  return pump([
    gulp.src(paths.copySrc),
    gulp.dest(paths.dist)
  ],cb)
});

// vat content = {};
// JSON.parse(JSON.stringify(content));

// 资源 md5
gulp.task('md5', ['copy'], function(){
  pump([
    gulp.src(paths.src),
    md5(10, paths.quoteSrc),
    gulp.dest(paths.dist)
  ])

  // var content = fs.readFileSync(paths.quoteSrc);
  // console.log(content.toString());
});

gulp.task('md5json', function(){
  pump([
    gulp.src(paths.quoteSrc),
    $.replace(/.\/img\//g, qnOptions.origin + 'zt/' + dir + '/img/'),
    $.rename(dir+'.json'),
    md5(6, null),
    gulp.dest(paths.dist),
  ])
  return del(paths.quoteSrc);
});

// 上传七牛
gulp.task('qn', function(){
  pump([
    gulp.src([
      paths.dist + '/**/*',
      '!' + paths.dist + '/*.json',
    ]),
    $.qndn.upload({
      prefix: 'zt/' + dir + '/',
      qn: qnOptions,
    }),
  ]);
  pump([
    gulp.src([
      paths.dist + '/*.json',
    ]),
    $.qndn.upload({
      prefix: 'zt/',
      qn: qnOptions,
    })
  ])
});


// 指定一个新的 cwd (当前工作目录)
gulp.task('default', $.shell.task([
  'gulp md5 --path=' + dir,
  'gulp md5json --path=' + dir,
  'gulp qn --path=' + dir,
], {
  cwd: './'
}));

//执行  gulp md5 --path=... 的任务队列
//md5 copy clean
