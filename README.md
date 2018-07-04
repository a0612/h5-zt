# 简单的专题系统

实现一个简版专题发布系统

## 使用

通过src下建立对应的json数据，生成专题数据，然后通过请求，实现加载数据

## 发布

- 配置好 config.json
- 执行脚本 `gulp md5 --path=dirname` 指定为src下的专题活动文件夹

### 其他说明

v1.0.1  (2018/1/10)

json格式要求：
  数据除了右边是数字的情况，都需要用双引号把两边数据引起来。

自己配的模板需要以下两个字段
template: ...,//模板
data: ...,//模板数据
自定义模板用到的class用单引号引起来，不要用双引号。
用到data里面的字段时直接用字段名字就可以了

例如：
  {
    "template": "<div class='zt-banner'><%=sss%></div>",
    "data":{
      "sss":"何家胜"
    }
  },


  跳转传的type主要有以下的情况:
  基本字段
  {
    "path": "./img/banner-01.jpg",  //图片路径
    "id": 1208,                     //Id/专题的code/领券的码(支付宝暂时不支持领券)
    "type": ""                      //动作
    .
    .
    .
  }

  type的值包含
  {
    ali_detail: 跳转到支付宝详情页,
    zt_template: 在好食期和支付宝的会分别跳转到对应的专题页面,
    couple_detail: 跳转好食期拼团商品详情页,
    detail: 跳转好食期普通商品详情页,
    coupon: 页面上的领券活动
  }


layout_type字段用来区分用什么模板渲染数据，在好食期项目里面写好的有
  {
    banner: 用来渲染banner，一列有一张图，支持跳转或者领券
    coupon: 用来渲染领券，有几列是根据list里面值的个数来判断的，有几个就是几列
    column_list: 用来渲染商品布局，默认是两列，可以根据class来控制
    tabs: 用来渲染tab切换的模板，暂时只支持一个tab切换，每一项切换的图片可以多张。tab_list是指tab切换的日期（用‘/’隔开会在展示的时候自动替换成 “12月12日”这种样式） img_list指的是tab切换底部的图片，可以多张。

  }

shareInfo  字段用来处理分享信息
  "shareInfo": {
    "title": "新年好食光，1分钱抢零食！",
    "desc": "8元无门槛礼券等你拿，快来剁手！",
    "imgUrl": "./img/share.jpg",
    "link": ""
  }

  link可以省略不写，不写的话默认分享出去的链接是当前页面的链接


# 快捷专题发布系统

## 更新日志

### v2版本 2018-01-10

优化并增强功能

- 模板抽离：独立、可选
- 实现数据与模板一一对应
- 顺序可调
- 可实现单独的布局样式调整
- 模板可以动态添加

### v1版本 2017-12-26

实现一个简版专题发布系统

- 宽度支持 100%宽度
- banner 支持跳转
- 支持领券
- 支持 tab 切换

