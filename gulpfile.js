

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
var pump = require('pump');

// var low = require('lowdb');
// var db = low("mydb.json");
// var table = db("mytable");
// table.push({
//   userName:"sss",
//   id:"1"
// });
// table.push({
//   userName:"abc",
//   id:"2",
// });
// console.log(table.find({"id":"1"}));
// table.chain().find({id:"1"}).assign({userName:"hshshs"});
// console.log(table.find({"id":"1"}));
// table.remove({id:"1"});
// console.log(table.size())
// console.log(db.object);

var dir = argv.path

var qnConfig = qnConfig.hsq;
var qnOptions = {
  accessKey: qnConfig.qnAK,
  secretKey: qnConfig.qnSK,
  bucket: qnConfig.qnBucketUIS,
  origin: qnConfig.qnDomainUIS,
}

var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 2.3',
  'bb >= 10',
];

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

gulp.task('test', function(cb) {
  var css = '.ztn-show-tip-box{height: 100%;overflow: hidden;}.ztn-show-tip-box img{width:100%;height:100%;}.ztn-tip-box{height:100%;position:relative;}.ztn-show-tip-box img{height:100%;}.ztn-tip-box .cancel{position: absolute;right: 0;top: 5%;width: 12%;height: 7%;}.ztn-tip-content{position:absolute;top: 57.5%;left: 11%;width: 79%;height: 20%;}.ztn-order-mask{z-index:2000;content: '';position: absolute;bottom: -25px;left: 0;width: 100%;height: 20px;box-shadow: 0px -15px 15px 5px #fff;}.ztn-lottery-scroll{height: 100%;width: 100%;overflow-y: scroll;padding-bottom: 21px;}.ztn-tip-content .ztn-input-tel{border: none;width: 100%;text-align: center;height: 30%;border-radius: 5px;margin-bottom: 2%;}.ztn-get-codebox{margin-bottom: 2%;overflow: hidden;height: 28%;width: 100%;}.ztn-tip-content .ztn-input-code{border: none;width: 65%;text-align: center;height: 100%;border-radius: 5px;margin-right: 5%;float: left;}.ztn-get-code{float: left;width: 30%;height: 100%;background-color: #fee53c;border-radius: 6px;text-align: center;font-size: 12px;display: flex;flex-direction: column;justify-content: center;}.ztn-receive-btn{width: 100%;height: 30%;text-align: center;display: flex;flex-direction: column;justify-content: center;background-color: #fee53c;border-radius: 5px;color: #ed0000;font-weight: bold;font-size: 16px;}.ztn-coupon-desc{margin-bottom: 5%;height: 50%;display: flex;justify-content: center;color: #6d1398;}.ztn-coupon-desc .ztn-coupon-price{float: left;font-size: 77px;font-weight: 500;}.ztn-coupon-desc .ztn-coupon-box{float: left;display: flex;flex-direction: column-reverse;}.ztn-coupon-box .ztn-coupon-text{    font-size: 16px;font-weight: bold;margin-bottom: -6px;}.ztn-coupon-box .ztn-coupon-condition{font-size: 15px;}.ztn-go-use,.ztn-add-package{width: 60%;height: 20%;margin-left: 20%;background-color: #fff;border-radius: 1000px;text-align: center;color: #6d1398;font-weight: bold;font-size: 15px;display: flex;justify-content: center;flex-direction: column;margin-bottom: 3%;}.ztn-tip-content .ztn-none-order{width: 100%;height: auto;margin-top: 5%;}.ztn-get-codebox .disabled{background-color:#d2d2d2;}.ztn-tip-sure-box{position:relative;display:none;}.ztn-tip-sure-box .ztn-sure-btn{position: absolute;left: 28%;bottom: 33%;height: 5%;width: 44%;}.ztn-lottery-order{overflow:hidden;margin-bottom: 1%;}.ztn-lottery-order .ztn-order-tit{float:left;font-weight: 600;}.ztn-lottery-order .ztn-order-creatat{float:right;margin-right: 4%;}.ztn-mask{display:none;position:fixed;left:0;top:0;height:100%;width:100%;z-index:1001;}';
  var cleaner = postcss([
    autoprefixer({
      add: false,
      browsers: AUTOPREFIXER_BROWSERS,
    }),
  ]);
  var prefixer = postcss([ autoprefixer ]);

  cleaner.process(css).then(function (cleaned) {
      return prefixer.process(cleaned.css);
  }).then(function (result) {
      console.log(result.css);
  });
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

gulp.task('md5json', ['copy'], function(){
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
