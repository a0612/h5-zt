

(function(window){
  var datas = [
    {
      "name": "column", // ztn-column-xxx
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
      "name": "column-14",
      "desc": "两列布局，左边(右边)一个链接，右边n个平分一列高度，flex_deirection表示列的排列方向，奇数为左边一行右边n行，偶数则相反",
      "style": ".ztn-column-1n{position:relative;overflow:hidden;width:100%;}.ztn-column-1n .ztn-column1n-imgbox img{display:block;width:100%;}.ztn-column-1n .ztn-column1n-btnbox{position:absolute;left:0;top:0;width:100%;height:100%;display:flex;}.ztn-column1n-btnbox .ztn-column1n-1,.ztn-column1n-btnbox .ztn-column1n-n{flex:1;height:100%;display:flex;flex-direction:column;}.ztn-column1n-n .item{flex:1;}",
      "data": {
        "path": [
          "../20180117/img/details-1.jpg",
          "../20180117/img/details-1.jpg",
          "../20180117/img/details-1.jpg",
          "../20180117/img/details-1.jpg",
        ],
        "flex_direction":2,
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
    }
  ];
  window.layouts = datas;
})(window);