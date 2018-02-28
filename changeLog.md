- 错误信息

Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.

解决方法

在postcssOptions参数中添加“from: undefined”。添加后效果如下：

```js
var postcssOptions = {
  from: undefined,
  to: path_1.basename(sassConfig.outFile),
  map: autoPrefixerMapOptions
};
```
