function getDiffJs (jsname) {
	// 根据不同的设备加载不同的js文件
	var script = document.createElement("script");
	//script.setAttribute("src","PC.js");
	script.src = jsname;
	document.getElementsByTagName("head")[0].appendChild(script);
}
function judgeDevice (device,jsname) {
	// 判断设备的类型,如果匹配设置对应的js，不匹配当什么事没发生
	var reg = new RegExp(device,"i");
	//var reg = /device/i;
	var deviceInfo = window.navigator.userAgent;
	var match = reg.test(deviceInfo);
	if(match){
		getDiffJs(jsname);
	}
    return console.log("产品的属性:"+deviceInfo+" 是否匹配:"+match);
}