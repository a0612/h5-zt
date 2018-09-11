var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv;
var _ = require('lodash')

var dir = argv.path

// 自动读取dist目录内容
// babel-node ./log.js --path=20180201

// 实现
// 找到指定路径
// 找到指定后缀的文件，取basename
// 读写log文件，插入记录

// http://jsben.ch/ZAaku
function formatNum(n) {
  if (n < 10) return '0' + n;
  return n;
}
function formatDate(date, format = 'Y年M月D日') {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  return format.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function (a) {
    switch (a) {
      case "y": return (date.getFullYear() + "").slice(2);
      case "Y": return date.getFullYear();
      case "m": return date.getMonth() + 1;
      case "M": return formatNum(date.getMonth() + 1);
      case "d": return date.getDate();
      case "D": return formatNum(date.getDate());
      case "h": return date.getHours();
      case "H": return formatNum(date.getHours());
      case "f": return date.getMinutes();
      case "F": return formatNum(date.getMinutes());
      case "s": return date.getSeconds();
      case "S": return formatNum(date.getSeconds());
    }
  });
}

// log 示例
// {
//   '20180201': [{
//     '20180201_50ba13': '2018-06-05 10:23:34',
//   }],
// }

const paths = {
  dist: './dist/' + dir,
  logfile: './log.json',
}

fs.readdir(paths.dist, (err, data) => {
  if (err) return console.error(err);
  // console.log(data);
  data.forEach(function (item, index) {
    if (path.extname(item) === '.json') {
      const filename = path.basename(item, '.json');
      console.log(filename);
      writeLog({
        key: `${dir}`,
        data: {
          key: `${filename}`,
          value: formatDate(Date.now(), 'Y-M-D H:F:S'),
        },
      });
    }
  })
  // [ '20180201_50ba13.json', 'img' ]
});

function writeLog(log) {
  fs.readFile(paths.logfile, function (err, data) {
    if (err) return console.error(err);
    const str = data.toString(); // 将二进制的数据转换为字符串
    const json = JSON.parse(str); // 将字符串转换为json对象
    const current = json[log.key];
    if (current && _.isObject(current)) {
      if (current[log.data.key]) {
        console.log(`日志记录已存在`);
        console.log(`${JSON.stringify(log, null, 2)}`);
        return;
      }
      current[log.data.key] = log.data.value;
    } else {
      json[log.key] = {
        [log.data.key]: log.data.value,
      };
    }
    const result = JSON.stringify(json, null, 2);
    fs.writeFile(paths.logfile, result, function(err) {
      // 因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
      if (err) return console.error(err);
      console.log(`新增日志记录成功：`);
      console.log(`${JSON.stringify(log, null, 2)}`);
    })
  })
}
