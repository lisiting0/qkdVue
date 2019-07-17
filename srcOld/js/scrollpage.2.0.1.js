/**
	2019.2.26 修改横屏滚动后不能竖屏滚动
**/

let myTouch;
;(function($,window,undefined){
	var formElements = 'input, select, textarea, button';
	myTouch=function(opt){
		var t=this;
		t.options={
			wrapper:".main",//顶级容器
			durationTime:0.3,
			preventDefault:true,
			loop:true,//横屏是否循环滚动
			lock:false,//可以连续滚动
			mouse:true,//竖屏是否支持鼠标滚轮滚动
			horizontalToVertical:false,//横屏滚动后能否垂直滚动
			disRadio:0.1,//触发翻屏所需要的最小拖动距离比例
			horizontalClassName:".horizontalScroll",//水平页面顶级容器 (必须是 verticalPageName 的一代子元素)
			contentClassName:".contentScroll",//滚动内容的容器(必须是 verticalPageName 的一代子元素)
			verticalPageName:".page",//垂直页面容器 (必须是 wrapper 的一代子元素)
			horizontalPageName:".page",//水平页面容器(必须是 horizontalClassName 的一代子元素)
			curClassName:"cur",//当前页面
			start:null,//开始移动前调用函数
			moveY:null,//Y移动过程调用函数
			endY:null,//Y移动结束调用函数
			moveX:null,//X移动过程调用函数
			endX:null,//X移动结束调用函数
			beforeEndX:null,//X移动结束前调用函数
			beforeEndY:null,//Y移动结束前调用函数
			move:null,//触发屏幕move回调
			end:null,
			moveTopOrBottom:null,//到顶或到底
		}
		$.fn.extend(t.options,opt);//重置参数
		
		t.hasTouch = "ontouchstart" in window;
		//t.has3d  = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix;//在支持3d的设备上使用
		t.START_EV = t.hasTouch ? "touchstart": "mousedown";
		t.CLICK_EV = t.hasTouch ? "touchstart": "click";
		t.MOVE_EV = t.hasTouch ? "touchmove": "mousemove";
		t.END_EV = t.hasTouch ? "touchend": "mouseup";
		
		t.obj=$(t.options.wrapper);
		t.num=t.obj.find(">"+t.options.verticalPageName).length;//页数
		t.moveing=false;
		t.tranEnd=t.transitionEnd("transition");
		t.aniEnd=t.transitionEnd("animation");
		t._init();
		t.obj.bind(t.START_EV,function(e){
			t._start(e);
		});
		t.obj.bind(t.tranEnd,function(e){
			var target=e.target || e.srcElement;
			if($(target).hasClass(t.options.wrapper.replace(".",""))){
				t.moveing=false;
				//if(t.x){
					//t.options.endX&&t.options.endX.call(t);
				//}else if(t.y){
					t.options.endY&&t.options.endY.call(t);
				//}
			}
		});
		if(t.options.mouse){
			t.obj.bind("mousewheel",function(event, delta, deltaX, deltaY){//-1 down 1 up
				if(!t.moveing){
					if(delta==-1){
						t.gotoNext();
					}else if(delta==1){
						t.gotoPrev();
					}
				}
			});
		}
	}
	myTouch.prototype={
		_init:function(){
			var t=this;
			t.pageWidth=t.obj.parent().width();//单页宽度
			t.obj.find(t.options.horizontalClassName+">"+t.options.horizontalPageName).css({width:t.pageWidth+"px"});
			t.pageHeight=t.obj.parent().height();//单页高度
			t.obj.find(">"+t.options.verticalPageName).css({height:t.pageHeight+"px"});
			t.maxMoveY=t.pageHeight*(t.num-1);//最大的移动距离
			t.index=0;
			t.index_x=0;
			t.distanceX=t.pageWidth*t.options.disRadio;
			t.distanceY=t.pageHeight*t.options.disRadio;
			t.stopInertiaMove = false; // 是否停止缓动
			t.horizontalScrollObj=t.obj.find(t.options.horizontalClassName);
			if(t.options.loop){
				t.horizontalScrollObj.each(function(){
					var _t=$(this);
					var firstClone=_t.find(">"+t.options.horizontalPageName).first().clone().addClass("clone");
					var lastClone=_t.find(">"+t.options.horizontalPageName).last().clone().addClass("clone");
					firstClone.appendTo(_t);
					_t.prepend(lastClone);
					t._setCssText.call(_t,t,'transform:translate3d('+(-t.pageWidth)+'px,0px,0px);-webkit-transform:translate3d('+(-t.pageWidth)+'px,0px,0px);transition-duration:0ms;-webkit-transition-duration:0ms');
				});
			}
			t._setCssText.call(t.obj,t,'transform:translate3d(0px,0px,0px);-webkit-transform:translate3d(0px,0px,0px);transition-duration:0ms;-webkit-transition-duration:0ms;transition-property:transform;-webkit-transition-property:transform;');
		},
		refresh:function(){
			var t=this;
			t.pageWidth=t.obj.parent().width();//单页宽度
			t.obj.find(t.options.horizontalClassName+">"+t.options.horizontalPageName).css({width:t.pageWidth+"px"});
			t.horizontalScrollObj.each(function(){
				var _t=$(this);
				var cur=_t.find(">."+t.options.curClassName);
				if(cur.length<1){
					cur=_t.find(">"+t.options.horizontalPageName).eq(0);
				}
				var index=cur.index();
				var scrollX=-index*t.pageWidth;
				t._setCssText.call(_t,t,'transform:translate3d('+scrollX+'px,0px,0px);-webkit-transform:translate3d('+scrollX+'px,0px,0px);transition-duration:0ms;-webkit-transition-duration:0ms');
			});
			t.num=t.obj.find(">"+t.options.verticalPageName).length;//页数
			t.pageHeight=t.obj.parent().height();//单页高度
			t.distanceX=t.pageWidth*t.options.disRadio;
			t.distanceY=t.pageHeight*t.options.disRadio;
			t.obj.find(">"+t.options.verticalPageName).css({height:t.pageHeight+"px"});
			t.maxMoveY=t.pageHeight*(t.num-1);//最大的移动距离
			var scrollY=-t.index*t.pageHeight;
			t._setCssText.call(t.obj,t,'transform:translate3d(0px,'+scrollY+'px,0px);-webkit-transform:translate3d(0px,'+scrollY+'px,0px);transition-duration:0ms;-webkit-transition-duration:0ms');	
		},
		_start:function(e){
			var t=this;
			if(!t.moveing||!t.options.lock){
				e=window.event||e;
				var d=t.hasTouch?e.touches[0]:e;
				if(!t.hasTouch&&t.options.preventDefault&&(!t.options.horizontalToVertical||t.options.horizontalToVertical&&t.index_x==0)){
					t.setPreventDefault(e);
				}
				t.changeX=0,t.changeY=0;
				t.px = d.pageX;
				t.py = d.pageY;
				t.x=false;
				t.y=false;
				t._pageY=0;
				t._pageX=0;
				t.canscroll=true;//是否翻屏
				t.isBottom=true;//页面内容是否到底了
				t.isEndBottom=true;
				t.parentMove=false;//是不是顶层页面在拖动中
				t.flag=false;
				t.options.start&&t.options.start.call(this);
				t.cur=t.obj.find(">."+t.options.curClassName);//当前页
				if(t.cur.length<1){
					t.cur=t.obj.find(">"+t.options.verticalPageName).eq(0);
				}
				t.index=t.cur.index();//下标从0开始
				t.curY=t._getTransformY(t.obj);
				
				t.scrollContent=t.cur.find(">"+t.options.contentClassName); //滚动内容
				t.horizontalScroll=t.cur.find(">"+t.options.horizontalClassName);//横向移动
				if(t.horizontalScroll.length>0){
					t.num_x=t.horizontalScroll.find(">"+t.options.horizontalPageName).length;
					t.maxMoveX=t.pageWidth*(t.num_x-1);//最大的移动距离
					t.cur_x=t.horizontalScroll.find(">."+t.options.curClassName);//当前页
					if(t.cur_x.length<1){
						if(t.options.loop){
							t.cur_x=t.horizontalScroll.find(">"+t.options.horizontalPageName).eq(1);
						}else{
							t.cur_x=t.horizontalScroll.find(">"+t.options.horizontalPageName).eq(0);
						}
					}
					t.scrollContent=t.cur_x.find(">"+t.options.contentClassName); //重选滚动内容
					t.curX=t._getTransformX(t.horizontalScroll);
					t.index_x=t.cur_x.index();//下标从0开始
					if(t.options.loop){
						t.num_x=t.num_x-2;
						var changeCur=true;
						if(t.index_x==0){
							t.index_x=t.num_x;
						}else if(t.index_x==t.num_x+1){
							t.index_x=1;
						}else{
							changeCur=false;
						}
						if(changeCur){
							t.cur_x=t.horizontalScroll.find(">"+t.options.horizontalPageName).eq(t.index_x);//当前页
							t.cur_x.addClass(t.options.curClassName).siblings("."+t.options.curClassName).removeClass(t.options.curClassName);
							var scrollX=-t.index_x*t.pageWidth;
							t._setCssText.call(t.horizontalScroll,t,'transform:translate3d('+scrollX+'px,0px,0px);-webkit-transform:translate3d('+scrollX+'px,0px,0px);transition-duration:0ms;-webkit-transition-duration:0ms');
							t.curX=t._getTransformX(t.horizontalScroll);
						}
						
					}
					t.horizontalScroll.unbind(t.tranEnd).bind(t.tranEnd,function(e){
						var target=e.target || e.srcElement;
						if($(target).hasClass(t.options.horizontalClassName.replace(".",""))){
							t.moveing=false;
							//if(t.x){
								t.options.endX&&t.options.endX.call(t);
							//}else if(t.y){
								//t.options.endY&&t.options.endY.call(t);
							//}
						}
					});
				}
				if(t.scrollContent.length>0){
					t.scrollHeight=t.pageHeight-t.scrollContent.outerHeight(true);
					t.curScrollY=t._getTransformY(t.scrollContent);
					/**
					* 缓动代码
					*/
					t.lastMoveStart = d.pageY;
					t.lastMoveTime = e.timeStamp || Date.now();
					t.stopInertiaMove = true;
				}
				//绑定事件
				t.obj.bind(t.MOVE_EV,function(e){
					t._move(e)
				});
				t.obj.bind(t.END_EV,function(){
					t._end()
				});			
			}else{
				t.setPreventDefault(e);
			}
		},
		_move:function(e){
			e=window.event||e;
			var t=this,
			d=t.hasTouch?e.touches[0]:e;
			t.changeX=d.pageX-t.px,
			t.changeY=d.pageY-t.py,
			t.moveing=true;
			
			if((Math.abs(t.changeX)>Math.abs(t.changeY)&&!t.y&&Math.abs(t.changeX)>5)||t.x){//左右事件
				t.x=true;
				if(t.horizontalScroll.length>0&&t.num_x>1){
					if(t.options.preventDefault){
						t.setPreventDefault(e);
					}
					t.mX=(t._pageX||d.pageX)-d.pageX,//判断移动方向(左>0,右<0)
					t._pageX=d.pageX;
					t.scrollX=t.curX+t.changeX;
					if(!t.options.loop){
						t.scrollX=t.scrollX>0?0:t.scrollX<-t.maxMoveX?-t.maxMoveX:t.scrollX;//防止超出边界
						if((t.scrollX==0&&t.mX>0)||(t.scrollX==-t.maxMoveX&&t.mX<0)){//第一页或最后一页
							t.px=d.pageX;
							t.changeX=d.pageX-t.px;
						}
					}
					t.animate("move",t.horizontalScroll);
					t.options.moveX&&t.options.moveX.call(t,d);
				}else{
					t.moveing=false;
				}
			}else if(((Math.abs(t.changeY)>Math.abs(t.changeX)&&!t.x&&Math.abs(t.changeY)>5)||t.y)&&(!t.options.horizontalToVertical||(t.options.horizontalToVertical&&t.index_x==0))){//上下事件	
				t.y=true;
				if(t.options.preventDefault){
					//t.setPreventDefault(e);
				}
				t.mY=(t._pageY||d.pageY)-d.pageY,//判断移动方向(上>0,下<0)
				t._pageY=d.pageY;
				if(t.scrollContent.length>0){
					t.canscroll=false;
					t.scrollY=t.changeY+t.curScrollY;
					t.scrollY=t.scrollY>0?0:t.scrollY<t.scrollHeight?t.scrollHeight:t.scrollY;//防止超出边界
					/**
					* 缓动代码
					*/
					var nowTime = e.timeStamp || Date.now();
					t.stopInertiaMove = true;
					if(nowTime - t.lastMoveTime > 300) {
						t.lastMoveTime = nowTime;
						t.lastMoveStart = d.pageY;
					}
					
					if((t.scrollY==0&&t.mY<0)||(t.scrollY==t.scrollHeight&&t.mY>0)){//到底或到顶
						if(t.isBottom){
							if((t.index!=0&&t.mY<0)||(t.mY>0&&t.index!=(t.num-1))){
								t.canscroll=true;
								//console.log("到底或到顶,屏幕能动");	
							}else{
								t.py=d.pageY;//重置页面的滚动距离起始点
								t.changeY=d.pageY-t.py;
								//console.log("到底或到顶,第一或最后一页屏幕不能动");	
							}
						}else{
							if(!t.parentMove){
								t.canscroll=false;
								t.flag=true;
								//console.log("到底或到顶,锁屏,屏幕不能动");
								t.animate("move",t.scrollContent);//滚动内容重置 防止没 置底 或 置顶
							}else{
								//console.log("到底或到顶,屏幕移动换方向");
							}
						}
					}else{
						if(t.mY==0){
							//console.log("开始");
						}else{
							if(!t.isEndBottom){
								t.isBottom=true;	
							}else{
								t.isBottom=false;
							}
							if(!t.parentMove){
								//console.log("内容滚动");
								t.animate("move",t.scrollContent);//滚动内容
							}else{
								//console.log("内容滚动,屏幕移动换方向");
							}
						}
					}
				}
				if(t.canscroll||t.parentMove){
					t.parentMove=true;
					t.scrollY=t.curY+t.changeY;
					t.scrollY=t.scrollY>0?0:t.scrollY<-t.maxMoveY?-t.maxMoveY:t.scrollY;//防止超出边界
					if((t.scrollY==0&&t.mY>0)||(t.scrollY==-t.maxMoveY&&t.mY<0)){//第一页或最后一页
						t.py=d.pageY; //重置页面的滚动距离起始点
						t.changeY=d.pageY-t.py;
					}
					if((t.scrollY==0&&t.mY<=0)||(t.scrollY==-t.maxMoveY&&t.mY>=0)){//第一页或最后一页不能移动
						t.options.moveTopOrBottom&&t.options.moveTopOrBottom.call(t,t.changeY);
						return false;
					}
					t.animate("move",t.obj);
					t.options.moveY&&t.options.moveY.call(t,d);
				}
			}else{
				//点击事件
			}
			t.options.move&&t.options.move.call(t);
		},
		_end:function(e){
			e=window.event||e;
			var t=this;
			t._cur=false;
			//console.log("end,"+t.moveing+"t.x:"+t.x+",t.y:"+t.y);
			if(t.x){
				if(t.scrollX!=0&&t.scrollX!=-t.maxMoveX&&t.horizontalScroll.length>0&&t.num_x>1){
					if(t.changeX<0&&t.mX>=0&&Math.abs(t.changeX)>=t.distanceX){
						t.index_x++;	
					}else if(t.changeX>0&&t.mX<=0&&Math.abs(t.changeX)>=t.distanceX){
						t.index_x--;
					}else{
						t._cur=true;
					}
					if(t.index_x<t.horizontalScroll.find(">"+t.options.horizontalPageName).length&&t.index_x>=0){
						t.options.beforeEndX&&t.options.beforeEndX.call(t);
						t.animate("end",t.horizontalScroll);
					}
					if(t._cur){
						t.moveing=false;
					}
				}else{
					t.moveing=false;
				}
			}else if(t.y){
				if(t.scrollY!=0&&t.scrollY!=-t.maxMoveY&&(t.canscroll||t.parentMove)){//限制第一页或最后一页
					if(t.changeY<0&&t.mY>=0&&Math.abs(t.changeY)>=t.distanceY){
						t.index++;	
					}else if(t.changeY>0&&t.mY<=0&&Math.abs(t.changeY)>=t.distanceY){
						t.index--;
					}else{
						t._cur=true;
					}
					t.options.beforeEndY&&t.options.beforeEndY.call(t);
					t.animate("end",t.obj);
				}else{
					t.moveing=false;
					if(t.parentMove){
						t.options.end&&t.options.end.call(t);
					}
					if(t.scrollContent.length>0){//内容滚动
						/**
						* 缓动代码
						*/
						var nowTime = Date.now();
						var v = (t.changeY+t.py - t.lastMoveStart) / (nowTime - t.lastMoveTime); //最后一段时间手指划动速度
						//console.log(v)
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
								
								if(dir*nowV > 0||t.scrollY<t.scrollHeight||t.scrollY>=0) {
									return;
								}
								var moveY = (v + nowV)/2 * time;
								t.scrollY=moveY+contentY;
								t.scrollY=t.scrollY>0?0:t.scrollY<t.scrollHeight?t.scrollHeight:t.scrollY;//防止超出边界
								t.animate("move",t.scrollContent);
								setTimeout(inertiaMove, 10);
							}
							inertiaMove();
						})(v, nowTime,t._getTransformY(t.scrollContent));
					}
				}
			}else{
				t.moveing=false;
				t.options.end&&t.options.end.call(t);
			}
			t.obj.unbind(t.MOVE_EV);
			t.obj.unbind(t.END_EV);
		},
		_setCssText:function(t,css){
			if(this.length>0){
				for(var i=0;i<this.length;i++){
					this[i].style.cssText=css;
				}
			}
		},
		_getTransformX:function(obj){//获取矩阵中translateX的值
			var t=this;
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
			/*return eval(obj.css("transform"));
			function matrix(a, b, c, d, e, f){
				return e;
			}*/
		},
		_getTransformY:function(obj){//获取矩阵中translateX的值
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
			/*return eval(obj.css("transform"));
			function matrix(a, b, c, d, e, f){
				return f;
			}*/
		},
		getStyles: function(elem, style) {
			var t=this,
				elem=elem[0];
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
		camelize:function(attr) {
			// /\-(\w)/g 正则内的 (\w) 是一个捕获，对应后面 function 的 letter
			// 意思是将 匹配到的 -x 结构的 x 转换为大写的 X (x 这里代表任意字母)
			return attr.replace(/\-(\w)/g, function(all, letter) {
				return letter.toUpperCase();
			});
		},
		getIEOpacity:function (elem) {
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
		/**
		 * @description 取消默认动作
		 */
		setPreventDefault:function (e){
			e=e?e:event;
			if(!e.cancelable){
				return;
			}
			if ( e && e.preventDefault ){
			   e.preventDefault();
			}else{
			   e.returnValue = false;
		   }
		},
		animate:function(step,obj){
			var t=this;
			if(step=="move"){//移动中
				if(t.x){
					if(t.horizontalScroll.length>0){
						t._setCssText.call(obj,t,'transform:translate3d('+t.scrollX+'px,0px,0px);-webkit-transform:translate3d('+t.scrollX+'px,0px,0px);transition-duration:0ms;-webkit-transition-duration:0ms');
					}
				}else if(t.y){
					t._setCssText.call(obj,t,'transform:translate3d(0px,'+t.scrollY+'px,0px);-webkit-transform:translate3d(0px,'+t.scrollY+'px,0px);transition-duration:0ms;-webkit-transition-duration:0ms');
				}
				//t.moveing=false;
			}else if(step=="end"){//移动结束
				if(t.x){
					if((t.index_x>=0&&t.index_x<t.num_x)||(t.options.loop&&t.index_x>=0&&t.index_x<t.num_x+2)){
						var scrollX=-t.index_x*t.pageWidth;
						t._setCssText.call(obj,t,'transform:translate3d('+scrollX+'px,0px,0px);-webkit-transform:translate3d('+scrollX+'px,0px,0px);transition-duration:'+t.options.durationTime*1000+'ms;-webkit-transition-duration:'+t.options.durationTime*1000+'ms');
						obj.find(">"+t.options.horizontalPageName).eq(t.index_x).addClass(t.options.curClassName).siblings("."+t.options.curClassName).removeClass(t.options.curClassName);
					}else{
						t.index_x=t.index_x<0?0:t.index_x>=t.num_x?t.num_x-1:t.index_x;
						t.moveing=false;
					}
				}else if(t.y){
					if(t.index>=0&&t.index<t.num){
						var scrollY=-t.index*t.pageHeight;
						t._setCssText.call(obj,t,'transform:translate3d(0px,'+scrollY+'px,0px);-webkit-transform:translate3d(0px,'+scrollY+'px,0px);transition-duration:'+t.options.durationTime*1000+'ms;-webkit-transition-duration:'+t.options.durationTime*1000+'ms');
						obj.find(">"+t.options.verticalPageName).eq(t.index).addClass(t.options.curClassName).siblings("."+t.options.curClassName).removeClass(t.options.curClassName);
					}else{
						t.index=t.index<0?0:t.index>=t.num?t.num-1:t.index;
						t.moveing=false;
					}
				}
			}
		},
		goToPage:function(index){//横向移动时滚动到指定页
			var t=this;
			t.index_x=index;
			t.x=true;
			t.scrollX=1;
			t.changeX=1;
			t.mX=0;
			//t.animate("move",t.horizontalScroll);
		},
		gotoPageX:function(index,time){
			var t=this;
			//if(index>t.num_x-1||index==t.index_x)return false;
			t.y=false;
			t.x=true;
			if(time){t.moveing=true};
			t.index_x=index;
			var durationTime=t.options.durationTime;
			t.options.durationTime=time||0;
			t.animate("end",t.horizontalScroll);
		},
		gotoPageY:function(index,time){
			var t=this;
			if(index>t.num-1||index==t.index)return false;
			t.x=false;
			t.y=true;
			if(time){t.moveing=true};
			t.index=index;
			var durationTime=t.options.durationTime;
			t.options.durationTime=time||0;
			t.animate("end",t.obj);
			t.options.durationTime=durationTime;
		},
		gotoNext:function(){
			var t=this;
			if(t.index>=t.num-1)return false;
			t.x=false;
			t.y=true;
			t.moveing=true;
			t.index++;
			t.animate("end",t.obj);
		},
		gotoPrev:function(){
			var t=this;
			if(t.index<1)return false;
			t.x=false;
			t.y=true;
			t.moveing=true;
			t.index--;
			t.animate("end",t.obj);
		},
		transitionEnd:function(type){
			var style=document.createElement("DIV").style, 
			transitionEnd=(function(){
				var transEndEventNames
				if(type=="transition"){
					transEndEventNames = {
					  WebkitTransition : 'webkitTransitionEnd',
					  MozTransition    : 'transitionend',
					  OTransition      : 'oTransitionEnd oTransitionend',
					  transition       : 'transitionend'
					}
				}else if(type=="animation"){
					transEndEventNames = {
					  WebkitTransition : 'webkitAnimationEnd',
					  MozTransition    : 'animationend',
					  OTransition      : 'oAnimationEnd oAnimationend',
					  transition       : 'animationend'
					}
				}
				for(var name in transEndEventNames){
					if(typeof style[name] === "string"){
						return transEndEventNames[name]
					}
				}
			})();
			return transitionEnd;
		}
	};
})(jQuery,window);
export default function (options) {
  return new myTouch(options)
}