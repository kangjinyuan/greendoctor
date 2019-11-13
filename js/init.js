var windowWidth, windowHeight;
$(function() {
	param.timestamp = "";
	param.currentTime = "";
	param.accountName = "管理员";
	param.menuSwitch = true;
	loadVue(".v-dom", param);
	loadData();
	loadTime();
	resetSize();
})

window.onresize = function() {
	resetSize();
}

function resetSize() {
	windowWidth = $(document).width();
	windowHeight = $(document).height();
	var menuSwitch = setData.menuSwitch;
	if(menuSwitch) {
		$(".kjy-left-box").width(200);
		$(".kjy-right-box").width(windowWidth - 200);
	} else {
		$(".kjy-left-box").width(80);
		$(".kjy-right-box").width(windowWidth - 80);
	}
	$(".layui-tab-content").height(windowHeight - 100);
	$(".nav-box").height(windowHeight - 80);
}

function closeAllNav() {
	$(".layui-nav-tree li").removeClass("layui-nav-itemed");
	$("layui-nav-tree .layui-nav-child").hide();
}

function showChildMenu(event) {
	var ev = event.currentTarget;
	closeAllNav();
	$(ev).siblings("a").eq(0).click();
}

//加载菜单数据
function loadData() {
	var timestamp = new Date().getTime();
	getJson(0, function(res) {
		var dataList = res;
		setData.dataList = dataList;
		setData.timestamp = timestamp;
		nextTick(function() {
			setnav();
		})
	});
}

//加载当前时间
function loadTime() {
	var loadTime = setInterval(function() {
//		var checkI = judeToken();
//		if(checkI == true) {
			var date = new Date();
			setData.currentTime = resetTime(date, 0);
//		}
	}, 1000);
}

//关闭展开菜单
function menuSwitch(t) {
	var menuSwitch = setData.menuSwitch;
	setData.menuSwitch = !menuSwitch;
	closeAllNav();
	resetSize();
}