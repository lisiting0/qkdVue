<template>
	<div class="myNewScroll" 
		@touchstart="touchStart($event)" 
		@touchmove="touchMove($event)" 
		@touchend="touchEnd($event)" 
		:style="styles"
	>
		<div id="_myContainer" class="_myContainer">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import myTouch from '@js/mytouch.1.0.2.js';

export default {
	name: 'myNewScroller',
	data () {
		return {
			moveing:false,//是否正在移动
			hasTouch:"ontouchstart" in window,
			curY:0,
		}
	},
	props: {
		maxY:40,//最大移动垂直距离，下拉超过这个距离认为触发刷新或加载行为
		styles:{
			type:String,
			default:''
		},
		preventDefault:{
			type:Boolean,
			default:true
		},
		noDataText: {
			type: String,
			default: '没有更多数据'
		},
		start:Function,
		moveX:Function,
		moveY:Function,
		endX:Function,
		endY:Function,
		end:Function,
		timeStamp:new Date().getTime(),
		
	},
	mounted (){
		const t=this;
		t.container=document.getElementById("_myContainer");
	},
	watch:{
		
	},
	methods:{
		touchStart(e){
			const t=this;
			if(!t.moveing){
				const d=t.hasTouch?e.touches[0]:e;
				if(!t.hasTouch&&t.preventDefault){
					t.preventDefaultFun(e);
				}
				t.changeX=0;
				t.changeY=0;//x,y轴改变量归零
				t.px = d.pageX||d.clientX;//初始x坐标
				t.py = d.pageY||d.clientY;//初始y坐标
				t.x=false;//判断当前移动是否x
				t.y=false;//判断当前移动是否y
				/**
				* 缓动代码
				*/
				t.lastMoveStart = d.pageY;
				t.lastMoveTime = e.timeStamp || Date.now();
				t.stopInertiaMove = true;
				
				t.maxHeight=parseFloat(t.getStyles(t.container,"height"));
				t.start&&t.start(e);
			}
		},
		touchMove(e){
			const t=this;
			const d=t.hasTouch?e.touches[0]:e;
			t.changeX=(d.pageX||d.clientX)-t.px,//x轴改变量
			t.changeY=(d.pageY||d.clientY)-t.py,//y轴改变量
			t.moveing=true;
			//if((Math.abs(t.changeX)>Math.abs(t.changeY)||t.x)&&!t.y&&Math.abs(t.changeX)>5){
			if((Math.abs(t.changeX)>Math.abs(t.changeY)&&!t.y&&Math.abs(t.changeX)>5)||t.x){//左右事件
				//左右事件
				t.x=true;
				if(t.preventDefault){
					t.preventDefaultFun(e);
				}
				t.moveX&&t.moveX(d);
			//}else if((Math.abs(t.changeY)>Math.abs(t.changeX)||t.y)&&!t.x&&Math.abs(t.changeY)>5){
			}else if((Math.abs(t.changeY)>Math.abs(t.changeX)&&!t.x&&Math.abs(t.changeY)>5)||t.y){//上下事件	
				//上下事件
				t.y=true;
				t.scrollY=t.curY+t.changeY;
				/**
				* 缓动代码
				*/
				var nowTime = e.timeStamp || Date.now();
				t.stopInertiaMove = true;
				if(nowTime - t.lastMoveTime > 300) {
					t.lastMoveTime = nowTime;
					t.lastMoveStart = d.pageY;
				}
				if(t.preventDefault){
					t.preventDefaultFun(e);
				}
				t._setCssText('transform:translate3d(0px,'+t.scrollY+'px,0px);-webkit-transform:translate3d(0px,'+t.scrollY+'px,0px);transition-duration:0ms;-webkit-transition-duration:0ms');
				t.moveY&&t.moveY(d);
			}else{
				//点击事件
			}
		},
		touchEnd(e){
			const t=this;
			t.moveing=false;
			if(t.x){
				t.endX&&t.endX();
			}else if(t.y){
				t.curY=t.scrollY;
				/**
				* 缓动代码
				*/
				var nowTime = Date.now();
				var v = -(t.changeY+t.py - t.lastMoveStart) / (nowTime - t.lastMoveTime); //最后一段时间手指划动速度
				
				t.stopInertiaMove = false;
				;(function(v, startTime, contentY) {
					var dir = v > 0 ? -1 : 1; //加速度方向
					var deceleration = dir*0.0006;
					//var duration = v / deceleration; // 速度消减至0所需时间
					//var dist = v * duration / 2; //最终移动多少
					function inertiaMove() {
						if(t.stopInertiaMove) return;
						var nowTime = Date.now();
						var time = nowTime-startTime;
						var nowV = v + time*deceleration;
						// 速度方向变化表示速度达到0了
						//console.log(t.scrollY);
						
						console.log(nowV)
						if(dir*nowV > 0) {
							//t.curY=t.scrollY;
							
							return;
						}
						var moveY = (v + nowV)/2 * time;
						console.log(moveY)
						t.scrollY=moveY+contentY;
						
						//t.scrollY=t.scrollY>0?0:t.scrollY<t.maxHeight?t.maxHeight:t.scrollY;//防止超出边界
						t._setCssText('transform:translate3d(0px,'+t.scrollY+'px,0px);-webkit-transform:translate3d(0px,'+t.scrollY+'px,0px);transition-duration:0ms;-webkit-transition-duration:0ms');
						setTimeout(inertiaMove, 10);
					}
					inertiaMove();
				})(v, nowTime,t.curY);
				t.endY&&t.endY();	
			}else{
				t.end&&t.end();
			}
		},
		preventDefaultFun (e){
			e=e?e:event;
			if ( e && e.preventDefault ){
			   e.preventDefault();
			}else{
			   e.returnValue = false;
		   }
		},
		_setCssText(css){
			this.container.style.cssText=css;
		},
		_getTransformX(obj){//获取矩阵中translateX的值
			const t=this;
			//return eval(t.getStyles(obj,"transform").replace(/((px)|(rem)|(em)|%)\)/g,")"));
			return eval((t.getStyles(obj,"transform")||t.getStyles(obj,"-webkit-transform")).replace(/translateX\((.*?)\)/g,"translateX('$1')"));
			function matrix(a, b, c, d, e, f){
				return e;
			}
			function matrix3d(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p){//3d 火狐
				return m;
			}
			function translateX(e){//针对IE8
				return e;
			}
		},
		_getTransformY(obj){//获取矩阵中translateX的值
			var t=this;
			//return eval(t.getStyles(obj,"transform").replace(/((px)|(rem)|(em)|%)\)/g,")"));
			return eval((t.getStyles(obj,"transform")||t.getStyles(obj,"-webkit-transform")).replace(/translateY\((.*?)\)/g,"translateY('$1')"));
			function matrix(a, b, c, d, e, f){
				return f;
			}
			function matrix3d(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p){//3d 火狐
				return n;
			}
			function translateX(f){//针对IE8
				return f;
			}
		},
		getStyles(elem, style) {
			var t=this,
				elem=elem;
			// 主流浏览器
			var win=window;
			if (win.getComputedStyle) {
				// 获取 float 属性使用 cssFloat
				// 测试最新版的浏览器，使用 cssFloat 已经获取不到 float 了，直接使用下面的通用语法
				// if(style === "float"){
				// 	return win.getComputedStyle(elem, null).getPropertyValue("cssFloat");
				// }
				return win.getComputedStyle(elem, null).getPropertyValue(style);

			// 不支持 getComputedStyle 
			} else {
				// IE 下获取透明度
				if (style == "opacity") {
					t.getIEOpacity(elem);

				// IE687 下获取浮动使用 styleFloat
				} else if (style == "float") {
					return elem.currentStyle.getAttribute("styleFloat");

				// 未设置元素的高宽，获取的值是 auto
				// 这里要获取精确的 px 值，使用 elem.getBoundingClientRect 进行 hack
				// 跨浏览器的方法 getBoundingClientRect 可以获得元素四个点相对于文档视图左上角的值 top、left、bottom、right ，通过计算就可以容易地获得准确的元素大小
				} else if ((style == "width" || style == "height") && (elem.currentStyle[style] == "auto")) {
					var clientRect = elem.getBoundingClientRect();

					// 加上 px ，转化为标准输出
					return (style == "width" ? clientRect.right - clientRect.left : clientRect.bottom - clientRect.top) + "px";
				}else if(style=="left"||style=="top"||style=="right"||style=="bottom"){
					var clientRect = elem.getBoundingClientRect();
					var parent=elem.parentNode;
					(function getParent(p){
						if(p.currentStyle["position"]=="absolute"||p.currentStyle["position"]=="relative"){
							parent=p;
						}else if(p.tagName!="body"){
							getParent(p.parentNode);
						}else{
							parent=document.body;
						}
					})(parent);
					var clientParent=parent.getBoundingClientRect();
					//console.log(clientRect.left-clientParent.left);
					return clientRect[style]-clientParent[style];
				}

				// 其他样式，无需特殊处理
				return elem.currentStyle.getAttribute(t.camelize(style));
			}
		},
		camelize(attr) {
			// /\-(\w)/g 正则内的 (\w) 是一个捕获，对应后面 function 的 letter
			// 意思是将 匹配到的 -x 结构的 x 转换为大写的 X (x 这里代表任意字母)
			return attr.replace(/\-(\w)/g, function(all, letter) {
				return letter.toUpperCase();
			});
		},
		getIEOpacity (elem) {
			var filter = null;

			// 早期的 IE 中要设置透明度有两个方法：
			// 1、alpha(opacity=0)
			// 2、filter:progid:DXImageTransform.Microsoft.gradient( GradientType= 0 , startColorstr = ‘#ccccc’, endColorstr = ‘#ddddd’ );
			// 利用正则匹配，注意 ?: 的用法
			filter = elem.style.filter.match(/(?:progid:[\w.]+.)?alpha\((?:[^,]+,)?\s*opacity=(\d+)\s*\)/i) || elem.style.filter.match(/alpha\(opacity=(.*)\)/i);

			if (filter) {
				var value = parseFloat(filter);
				if (!isNaN(value)) {
					// 转化为标准结果
					return value ? value / 100 : 0;
				}
			}
			// 默认返回 1
			return 1;
		},
		damping(value) {//设置阻尼计算
			var step = [20, 40, 60, 80, 100];
			var rate = [0.5, 0.4, 0.3, 0.2, 0.1];

			var scaleedValue = value;
			var valueStepIndex = step.length;

			while (valueStepIndex--) {
				if (value > step[valueStepIndex]) {
					scaleedValue = (value - step[valueStepIndex]) * rate[valueStepIndex];
					for (var i = valueStepIndex; i > 0; i--) {
						scaleedValue += (step[i] - step[i - 1]) * rate[i - 1];
					}
					scaleedValue += step[0] * 1;
					break;
				}
			}

			return scaleedValue;
		},
	}
}
</script>
<style lang="scss" type="text/css" scoped>
	@import '../../sass/base.scss';
	.myNewScroll{
		position:absolute;left:0;top:0;width:100%;overflow:hidden;height:100%;@include box-sizing;
	}
	._myContainer{
		position:relative;overflow:hidden;-webkit-overflow-scrolling: touch;@include translate3d(0,0,0);
	}
</style>
