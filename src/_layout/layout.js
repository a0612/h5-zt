

(function(window){
  var datas = [
    {
      "name": "column", // ztn-column-xxx,name不能重复
      "desc": "多列优惠券，data.desc的length表示列数",
      "style": ".ztn-column-box{width:100%;overflow:hidden;position:relative;}.zt-column-img{width:100%;display:block;}.column-item-box{position:absolute;left:0;top:0;width:100%;height:100%;}.column-item-2{width:50%;float:left;height:100%;}.column-item-3{width:33.33%;float:left;height:100%;}",
      "data": {
        "path": "../20180117/img/details-1.jpg",
        "desc": [
          {
            "type": "ali_detail",
            "id": "1578"
          },
          {
            "type": "ali_detail",
            "id": "1578"
          },
          {
            "type": "ali_detail",
            "id": "1578"
          }
        ]
      },
      "template":"<div class='ztn-column-box'><img src='<%=path%>' class='zt-column-img'><div class='column-item-box'><%desc.forEach(function(item){%><div class='column-item-<%=desc.length%>' data-type='<%=item.type%>' data-id='<%=item.id%>'></div><%})%></div></div>"
    },
    {
      "name": "column-1n",
      "desc": "两列布局，左边(右边)一个链接，右边n个平分一列高度，flex_deirection表示列的排列方向，奇数为左边一行右边n行，偶数则相反",
      "style": ".ztn-column-1n{position:relative;overflow:hidden;width:100%;}.ztn-column-1n .ztn-column1n-imgbox img{display:block;width:100%;}.ztn-column-1n .ztn-column1n-btnbox{position:absolute;left:0;top:0;width:100%;height:100%;display:flex;}.ztn-column1n-btnbox .ztn-column1n-1,.ztn-column1n-btnbox .ztn-column1n-n{flex:1;height:100%;display:flex;flex-direction:column;}.ztn-column1n-n .item{flex:1;}",
      "data": {
        "path": [
          "../20180117/img/details-1.jpg",
          "../20180117/img/details-1.jpg",
          "../20180117/img/details-1.jpg",
          "../20180117/img/details-1.jpg",
        ],
        "flex_direction":1,
        "p_left": {
          "type": "couple_detail",
          "id": "470",
        },
        "p_right": [
          {
            "type": "couple_detail",
            "id": "470",
          },
          {
            "type": "couple_detail",
            "id": "470",
          },
          {
            "type": "couple_detail",
            "id": "470",
          },
          {
            "type": "couple_detail",
            "id": "470",
          }
        ]
      },
      "template":
      "<div class='ztn-column-1n'><div class='ztn-column1n-imgbox'><%path.forEach(function(item){%><img src='<%=item%>'><%})%></div><div class='ztn-column1n-btnbox' <%if(flex_direction%2==0){%>style='flex-direction:row-reverse'<%}%>><div class='ztn-column1n-1' data-type='<%=p_left.type%>' data-id='<%=p_left.id%>' style='background-color: rgba(136,183,283,.7)'></div><div class='ztn-column1n-n'><%p_right.forEach(function(item,index){%><div class='item' data-type='<%=item.type%>' data-id='<%=item.id%>' style='background-color:<%if(index%2==0){%>rgba(0,0,0,.5)<%}else{%>rgba(212,0,89,.5)<%}%>'></div><%})%></div></div></div>"
    },
    {
      "name": "banner",
      "desc": "banner布局",
      "style": ".ztn-banner .banner-img-box img{width:100%;display:block;}",
      "data": {
        "list": [
          {
            "path": "../20180122/img/banner-1.jpg"
          },
          {
            "path": "../20180122/img/banner-2.jpg"
          },
          {
            "path": "../20180122/img/banner-3.jpg"
          },
          {
            "path": "../20180122/img/banner-4.jpg"
          }
        ]
      },
      "template": "<div class='ztn-banner'><%list.forEach(function(item,index){%><div class='banner-img-box pr' data-name='banner' data-id='<%=item.id%>' data-type='<%=item.type%>' data-index='<%=index%>'><img src='<%=item.path%>' alt=' class='ztn-banner-item'></div><%})%></div>"
    },
    {
      "name": "column-122",
      "desc": "两行三列布局，上边(下边)一个链接，第二行(第一行)左边(右边)一个链接，右边两列n个平分一列高度，flex_deirection表示列的排列方向，奇数为下边行分为三列，并且左边一行，右边n行，偶数则相反",
      "style": ".ztn-coloumn-box{position:relative;width:100%;overflow:hidden;}.ztn-coloumn-box .ztn-coloumnbox-imgbox img{display:block;width:100%;}.ztn-coloumn-box .ztn-row-btnbox{position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;display: flex;flex-direction: row;}.ztn-coloumn-box .ztn-row-btnbox .ztn-column{position: relative;display: flex;flex-direction: column;flex: 1;}.ztn-coloumn-box .ztn-row-btnbox .ztn-column .ztn-column-rows{position: relative;flex: 1;}",
      "data": {
        "path": [
          "../20180117/img/details-1.jpg",
          "../20180117/img/details-1.jpg",
          "../20180117/img/details-1.jpg",
        ],
        "flex_direction":2,
        // "upper": {
        //   "type": "couple_detail",
        //   "id": "470",
        // },
        "btns":[
          {
            "list":[
              {
                "type": "couple_detail",
                "id": "470",
              },
            ]
          },
          {
            "list":[
              {
                "type": "couple_detail",
                "id": "470",
              },
              {
                "type": "couple_detail",
                "id": "470",
              },
              {
                "type": "couple_detail",
                "id": "470",
              },
            ]
          },
          {
            "list":[
              {
                "type": "couple_detail",
                "id": "470",
              },
              {
                "type": "couple_detail",
                "id": "470",
              },
            ]
          },
          {
            "list":[
              {
                "type": "couple_detail",
                "id": "470",
              },
              {
                "type": "couple_detail",
                "id": "470",
              },
              {
                "type": "couple_detail",
                "id": "470",
              },
              {
                "type": "couple_detail",
                "id": "470",
              },
            ]
          },
        ],
      },
      "template":"<div class='ztn-coloumn-box'><div class='ztn-coloumnbox-imgbox'><%path.forEach(function(item){%><img src='<%=item%>'><%})%></div><div class='ztn-row-btnbox' <%if(flex_direction %2==0){%>style='flex-direction: row-reverse'<%}%>><%btns.forEach(function(item, index){%><div class='ztn-column' style='background:<%if(index%2==0){%>red<%}else{%>blue<%}%>'><%item.list.forEach(function(item, index){%><div class='ztn-column-rows' data-type='<%=item.type%>' data-id='<%=item.id%>' style='background:<%if(index%2==0){%>yellow<%}else{%>black<%}%>'></div><%})%></div><%})%></div></div>"
    },
    {
      "name": "ztn-tabs",
      "desc": "tab切换",
      "data": {
        "switchTitBg": "../20180116-1/img/tab-bg.jpg",
        "curIndex": 0,
        "list":{
          "tab_list": [
            {
              "date":"1.17"
            },
            {
              "date":"1.18"
            },
            {
              "date":"1.19"
            },
            {
              "date":"1.20"
            },
            {
              "date":"1.21"
            },
            {
              "date":"1.22"
            }
          ],
          "img_list": [
            {
              "p_img_list": [
                {"path": "../20180116-1/img/tab-1.jpg",
                  "id": "7c067a73123615a96955180a3f888e83",
                  "type": "zt_template"
                },
                {"path": "../20180116-1/img/tab-1.jpg",
                  "id": "7c067a73123615a96955180a3f888e83",
                  "type": "zt_template"
                }
              ]
            },
            {
              "p_img_list": [
                {"path": "../20180116-1/img/tab-2.jpg",
                  "id": "00b1c93197afc6e582291902ef376095",
                  "type": "zt_template"
                }
              ]
            },
            {
              "p_img_list": [
                {"path": "../20180116-1/img/tab-3.jpg",
                  "id": "105c241a1628b108792d83299ba74cbb",
                  "type": "zt_template"
                }
              ]
            },
            {
              "p_img_list": [
                {"path": "../20180116-1/img/tab-4.jpg",
                  "id": "181e0e22bea007008f94fec879360e96",
                  "type": "zt_template"
                }
              ]
            },
            {
              "p_img_list": [
                {"path": "../20180116-1/img/tab-5.jpg",
                  "id": "90d3fb7a731a852a20214f8c6387a674",
                  "type": "zt_template"
                }
              ]
            },
            {
              "p_img_list": [
                {"path": "../20180116-1/img/tab-6.jpg",
                  "id": "0b31602e5db2525bfc66bb90dce2324a",
                  "type": "zt_template"
                }
              ]
            }
          ]
        }
      },
      "style": ".ztn-tabs{position:relative;}.ztn-tabs img{display:block;width:100%;}.ztn-tab-box{position: relative;font-size: 14px;width: 100%;color: #cdb196;}.ztn-tab-box .tab-btn-box{color: #ed0000;font-weight: bold;font-size: 14px;position: absolute;height: 100%;width: 100%;left: 0%;top: 0;}.tab-btn-box .current{background-color: rgba(0,0,0,.5);}.ztn-tab-item{    display: inline-block;overflow: hidden;text-align: center;float: left;height: 100%;display: flex;align-items: center;justify-content: center;white-space: nowrap;}.ztn-tabs .switch-item-box{display:none;}.ztn-tabs .switch-item .current{display:block;}",
      "template": "<div class='ztn-tabs'><div class='ztn-tab-box'><div class='tab-btn-box'><%var len = list.tab_list && list.tab_list.length || 1;%><%list.tab_list.forEach(function(item,index){%><div class='ztn-tab-item<%if(index == curIndex){%> current<%}%>' data-type='tab' data-index='<%=index%>' data-name='tab' style='width: <%=(100/len-0.01)%>%;'><%=item.date%></div><%})%></div><img src='<%=switchTitBg%>' alt='' class='ztn-tab-tit'></div><div class='switch-item'><%list.img_list.forEach(function(item,index){%><div class='switch-item-box <%if(index == curIndex){%>current<%}%>' data-index='<%=index%>'><%item.p_img_list.forEach(function(item1){%><img src='<%=item1.path%>' alt='' class='switch-img-item' data-id='<%=item1.id%>' data-type='<%=item1.type%>' data-name='switchimg'><%})%></div><%})%></div></div>"
    },
  ];
  window.layouts = datas;
})(window);
