var scrapeCoating = { }

// 渲染UI
scrapeCoating.render = function (scrape)
{
	var src = scrape.attr("src")
	var width = scrape.attr("width")
	var height = scrape.attr("height")
	if (!src) return
	// 设置背景图
	var canvas = scrape[0]
	canvas.style.backgroundSize = "100% 100%"
	// 设置涂层
	var ctx = canvas.getContext('2d')
	with (ctx) {
		font = scrape.attr("font") || "Bold 30px Arial"
		textAlign = "center"
	}
	//
	scrapeCoating.init(canvas, src, scrape.attr("text") || "刮一刮")
}
// 初始化
scrapeCoating.init = function (canvas, src, text)
{
	canvas.style.backgroundImage = 'url(' + src + ')'
	// 设置涂层
	var ctx = canvas.getContext('2d')
	with (ctx) {
		globalCompositeOperation = "source-over"
		// 下面是目标图像
		fillStyle = 'gray'
		fillRect(0, 0, canvas.width, canvas.height)
		if (text) {
			fillStyle = "lightgrey"
			fillText(text, canvas.width / 2, canvas.height / 2)
		}
		globalCompositeOperation = 'destination-out'
	}
}
// 注册事件
scrapeCoating.registerEvent = function (scrape)
{
	var canvas = scrape[0]
	var finish = scrape.attr("finish") || 0.5
	var ctx = canvas.getContext('2d')
	// 注册刮刮事件
	function eventDown (e) {
		e.preventDefault()
		//
		with (ctx) {
			lineWidth = scrape.attr("pensize") || 10
			lineCap = "round"
			lineJoin = "round"
			beginPath()
			moveTo(e.offsetX, e.offsetY)
		}
		// 添加移动事件
		canvas.addEventListener('touchmove', eventMove)
		canvas.addEventListener('mousemove', eventMove)
	}
	function eventMove (e) {
		e.preventDefault()
		if (e.changedTouches) {
			e = e.changedTouches[e.changedTouches.length-1]
		}
		with (ctx) {
			lineTo(e.offsetX, e.offsetY)
			stroke()
		}
	}
	function eventUp (e) {
		e.preventDefault()
		canvas.removeEventListener('touchmove', eventMove)
		canvas.removeEventListener('mousemove', eventMove)
		// 查看是否刮开
		var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var finishCount = 0
		for (var i = 3; i < imgData.data.length; i += 4) {
			if (imgData.data[i] === 0) {
				finishCount++
			}
		}
		// 刮开则回调
		if (finishCount >= finish * imgData.data.length / 4) {
			// 全部刮开
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			// 回调
			if (scrapeCoating.scrapeFinished) {
				scrapeCoating.scrapeFinished(scrape.attr("id"))
			}
		}
	}
	canvas.addEventListener('touchstart', eventDown)
	canvas.addEventListener('mousedown', eventDown)
	canvas.addEventListener('touchend', eventUp)
	canvas.addEventListener('mouseup', eventUp)
}
// 重置
scrapeCoating.reset = function (id, src, text)
{
	var scrape = $("#" + id);
	// 初始化
	scrapeCoating.init(scrape[0], src, text);
}


$(function () {
	var listCanvas = $("canvas.scrape")
	while (listCanvas.length > 0) {
		var scrape = listCanvas.first()
		listCanvas = listCanvas.slice(1)
		//
		scrapeCoating.render(scrape)
		scrapeCoating.registerEvent(scrape)
	}
})