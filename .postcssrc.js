// https://github.com/michael-ciniawsky/postcss-load-config

var config = {
  sourceMap: false,
};

module.exports = (ctx) => ({
  from: undefined,
  to: undefined,
  map: config.sourceMap ? { annotation: false } : false,
  // parser: false,
  // map: ctx.env === 'development' ? 'inline' : false,
  "plugins": {
    "autoprefixer": {
      /* http://browserl.ist/?q=last+2+Chrome+versions%2C+last+2+Firefox+versions%2C+last+2+Safari+versions%2C+last+2+Edge+versions%2C+last+4+iOS+versions%2C+last+2+ChromeAndroid+versions */
      browsers: [
        'last 5 Chrome versions',
        'last 5 Firefox versions',
        'last 5 Safari versions',
        'last 2 Edge versions',
        'last 4 iOS versions',
        'last 4 ChromeAndroid versions'
      ],
    },
  },
})
