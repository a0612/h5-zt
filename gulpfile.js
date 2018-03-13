

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
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var jsonEditor = require("gulp-json-editor");

// https://github.com/MicheleBertoli/css-in-js
// var postcss  = require('postcss-js');
// var prefixer = postcss.sync([ require('autoprefixer') ]);
//
// prefixer({ display: 'flex' });
//=> { display: ['-webkit-box', '-webkit-flex', '-ms-flexbox', 'flex'] }

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
};

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
gulp.task('md5', function(){
  pump([
    gulp.src(paths.src),
    md5(10, paths.quoteSrc),
    gulp.dest(paths.dist)
  ])

  // var content = fs.readFileSync(paths.quoteSrc);
  // console.log(content.toString());
});

var autoprefixerConfig = {
  "browsers": ["> 1%", "last 2 versions", "not ie <= 8"],
};
function postcssPlugin(plugins) {
  var processor = postcss(plugins);

  return function(input) {
    var result = processor.process(input);
    if ( console && console.warn ) {
      result.warnings().forEach(function (warn) {
        var source = warn.plugin || 'PostCSS';
        console.warn(source + ': ' + warn.text);
      });
    }
    return result.css;
  }
}

function cssStringAutoprefixer(input) {
  return postcssPlugin([
    autoprefixer(autoprefixerConfig),
  ])(input);
}

// var styles = cssStringAutoprefixer()(css);

gulp.task('precss', function() {
  pump([
    gulp.src(paths.quoteSrc),
    jsonEditor(function(json) {
      if(json.style) {
        json.style = cssStringAutoprefixer(json.style);
        // console.log(json.style);
      }
      if(Array.isArray(json.data) && json.data.length) {
        json.data.forEach(function(item, index) {
          if (item.style) {
            item.style = cssStringAutoprefixer(item.style);
          }
        })
      }
      return json; // must return JSON object.
    }),
    gulp.dest(paths.dist),
  ])
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
  'gulp copy --path=' + dir,
  'gulp precss --path=' + dir,
  'gulp md5 --path=' + dir,
  'gulp md5json --path=' + dir,
  'gulp qn --path=' + dir,
], {
  cwd: './'
}));

//执行  gulp md5 --path=... 的任务队列
//md5 copy clean

var css = 'body {display: flex;}';
gulp.task('test', function(cb) {
  var result = cssStringAutoprefixer(css);
  console.log(result);
});
