let myTouch;
;(function($,undefined){
	var formElements = 'input, select, textarea, button';
	myTouch=function(opt){
		var t=this;
		t.hasTouch = "ontouchstart" in window;
		//t.has3d  = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix;//在支持3d的设备上使用
		t.START_EV = t.hasTouch ? "touchstart": "mousedown";
		t.CLICK_EV = t.hasTouch ? "touchstart": "click";
		t.MOVE_EV = t.hasTouch ? "touchmove": "mousemove";
		t.END_EV = t.hasTouch ? "touchend": "mouseup";
		t.obj=$(opt.wrapper);//外容器
		t.preventDefault=opt.preventDefault==undefined?true:opt.preventDefault;
		t.num=t.obj.find(">.page").length;//页数
		t.init=opt.init;//开始移动前调用函数
		t.start=opt.start;//开始移动前调用函数
		t.moveX=opt.moveX;//X移动过程调用函数
		t.moveY=opt.moveY;//Y移动过程调用函数
		t.endX=opt.endX;//X移动结束调用函数
		t.endY=opt.endY;//Y移动结束调用函数
		t.end=opt.end;//没移动结束调用函数(相当于click)
		t.durationTime=opt.durationTime||0.3;
		t.moveing=false;
		var b = navigator;
		var prefix = /webkit/i.test(b.appVersion) ? "Webkit": /firefox/i.test(b.userAgent) ? "Moz": "opera" in window ? "O": /MSIE/i.test(b.userAgent)?"Ms": "";
		t.transform=prefix?(prefix+"Transform"):"transform";
		t.transitionDur=prefix?(prefix+"TransitionDuration"):"transitionDuration";
		t._init();
		t.obj.bind(t.START_EV,function(e){
			t._start(e);
		});
	}
	myTouch.prototype={
		_init:function(){
			var t=this;
			t.init&&t.init.call(this);
		},
		_start:function(e){
			var t=this;
			if(!t.moveing){
				e=window.event||e;
				var d=t.hasTouch?e.touches[0]:e;
				if(!t.hasTouch&&t.preventDefault){
					t.preventDefaultFun(e);
				}
				t.changeX=0,t.changeY=0;//x,y轴改变量归零
				t.px = d.pageX||d.clientX;//初始x坐标
				t.py = d.pageY||d.clientY;//初始y坐标
				t.x=false;//判断当前移动是否x
				t.y=false;//判断当前移动是否y
				t.start&&t.start.call(this,e);
				//绑定事件
				t.obj.bind(t.MOVE_EV,function(e){
					t._move(e)
				});
				t.obj.bind(t.END_EV,function(){
					t._end()
				});
			}
		},
		_move:function(e){
			e=window.event||e;
			var t=this,
			d=t.hasTouch?e.touches[0]:e;
			t.changeX=(d.pageX||d.clientX)-t.px,//x轴改变量
			t.changeY=(d.pageY||d.clientY)-t.py,//y轴改变量
			t.moveing=true;
			if((Math.abs(t.changeX)>Math.abs(t.changeY)||t.x)&&!t.y&&Math.abs(t.changeX)>5){
				//左右事件
				t.x=true;
				if(t.preventDefault){
					t.preventDefaultFun(e);
				}
				t.moveX&&t.moveX.call(this,d);
			}else if((Math.abs(t.changeY)>Math.abs(t.changeX)||t.y)&&!t.x&&Math.abs(t.changeY)>5){
				//上下事件
				t.y=true;
				if(t.preventDefault){
					t.preventDefaultFun(e);
				}
				t.moveY&&t.moveY.call(this,d);
			}else{
				//点击事件
			}
		},
		_end:function(){
			var t=this;
			t.moveing=false;
			if(t.x){
				t.endX&&t.endX.call(this);
			}else if(t.y){
				t.endY&&t.endY.call(this);	
			}else{
				t.end&&t.end.call(this);
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
			return eval(obj.css("transform"));
			function matrix(a, b, c, d, e, f){
				return e;
			}
		},
		_getTransformY:function(obj){//获取矩阵中translateX的值
			return eval(obj.css("transform"));
			function matrix(a, b, c, d, e, f){
				return f;
			}
		},
		preventDefaultFun:function (e){
			e=e?e:event;
			if ( e && e.preventDefault ){
			   e.preventDefault();
			}else{
			   e.returnValue = false;
		   }
		}
	};
})(jQuery);
export default function (options) {
  return new myTouch(options)
}