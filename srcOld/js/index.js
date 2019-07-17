$(function(){
	var CLICK_EV =('createTouch' in document)|| ("ontouchstart" in window) ? "touchend": "click",
		moveing=false;//翻屏
	setRem();
	$(window).resize(function(){
		setRem();
	});
});
function setRem(){
	var win_width=document.documentElement.clientWidth||window.innerWidth,
		psSize=win_width/1080;
	window.FS=(psSize>1?1:psSize) * 100;
	document.documentElement.style.fontSize=window.FS + 'px';
}