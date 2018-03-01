var postcssSync = require('postcss-modules-sync').default;
var postcss = require('postcss');

const css = `
  :global .text {
    color: white;
    background-color: gray;
  }

  .green {
    background-color: green;
  }

  .blue {
    background-color: blue;
  }

  .default {
    composes: green;
    display: flex;
  }
`

var exportedTokens = {}
var styles = postcss([
  postcssSync({
    generateScopedName: '[path][local]-[hash:base64:10]',
    getJSON: function(tokens) {
      return exportedTokens = tokens
    }
  })
]).process(css).css

console.log('styles', styles)
console.log('tokens', exportedTokens)
