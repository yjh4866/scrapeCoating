# scrapeCoating
刮刮乐功能的封装

# 用法
引用js

```
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>

<script src="./js/scrapeCoating.js"></script>
```

# 页面代码

```
<canvas id="sc" class="scrape" pensize="50" font="30px Arial" finish=0.1 src="./img/pic2.jpg" width="300" height="145"></canvas>
```

必要属性：

*  tag为“canvas”
*  class为“scrape”
*  谜底图片src
*  尺寸width和height


可选属性：

* id，用于区分多个刮刮乐
* pensize，橡皮擦大小
* font，涂层上的文字字体
* text，涂层上的文字
* finish，刮开指定大小则完全刮开（1表示全刮开，0.5表示刮开一半）

# 方法

### 1、刮开
```
scrapeCoating.scrapeFinished = function (id) {
	console.log(id)
}
```
### 2、重置

```
scrapeCoating.reset(id, src, text)
```
方法reset用于重置指定id的刮刮对象，可以重新指定底图，如：

```
scrapeCoating.reset("sc", "https://www.baidu.com/img/bd_logo1.png", "再刮一次")
```

