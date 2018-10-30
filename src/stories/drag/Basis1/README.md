# 拖曳行為

## 宣告

一開始我們必須先宣告拖曳行為

```
const drag = d3.drag()
```

drag()物件上有 on 屬性,可以用來新增監聽器

```
drag.on('xxx', function(){
  // ...
})
```

drag 有 3 種監聽事件

- start
- drag
- end
  以下是原始碼的註解
- start (after a new pointer becomes active [on mousedown or touchstart])
- drag (after an active pointer moves [on mousemove or touchmove]
- end (after an active pointer becomes inactive [on mouseup, touchend or touchcancel].)

在callback function中, 可以調用d3.event來進行一系列的操作