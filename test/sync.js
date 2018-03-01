
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');

const css = `
  .default {
    composes: green;
    display: flex;
  }
`

// https://github.com/sindresorhus/gulp-autoprefixer/blob/master/index.js
// https://github.com/postcss/postcss
// https://github.com/postcss/postcss-js/blob/master/sync.js
var autoprefixerConfig = {
  "browsers": ["> 1%", "last 2 versions", "not ie <= 8"],
};
function cssStringAutoprefixer(plugins) {
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

  // var cleaner = postcss([
  //   autoprefixer({
  //     "browsers": ["> 1%", "last 2 versions", "not ie <= 8"],
  //   }),
  // ]);
  // console.log(cleaner)
  // // var prefixer = postcss([ autoprefixer ]);
  // var css2 = cleaner.process(css)
  // console.log(css2)
  // cleaner.process(css).then(function (cleaned) {
  //   console.log(css)
  //   return cleaned.css;
  //   // return prefixer.process(cleaned.css);
  // })

  // .then(function (result) {
  //   console.log(result.css);
  // });
}


var styles = cssStringAutoprefixer([
  autoprefixer(autoprefixerConfig),
])(css);

console.log(typeof styles)
console.log('styles', styles)
