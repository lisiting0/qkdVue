let myApi=function(callback){
	var t=this;
	t.flowerPObj=$(".ds_flower")//送花的容器
	t.flowerObj=t.flowerPObj.find("ul");//送花的对象
	t.tranEnd=t.transitionEnd("transition");
	t.flowerList=[];
	t.flowerWaitList=[];//送花等待列表
	t.flowerTimeOut=null;//自动送花计时
	t.flowerNum=0;//花朵出现的次数(连击算一次);
	t.flowerTotal=0;//出现过的花朵总数
	t.waitTime=2000;//花朵连点停留等待时间
	t.callback=callback||null;
}
myApi.prototype={
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
	},
	putFlower:function(name,num,pic,uid,giftImg,sendobj,flag){	
		var t=this,has=false;
		var child=t.flowerObj.find("li"),
			html='<li data-uid='+uid+'><div><i style="background-image:url('+pic+');"></i><p><span class="hname">'+name+'</span> 送出</p><div class="flower" style="background-image:url('+giftImg+');background-size:100%;"><em>'+num+'</em></div></div></li>',
			obj=$(html),
			length=child.length;
		if(!t.flowerPObj.hasClass("cur")){
			t.flowerPObj.addClass("cur");//大花容器出现
			console.log("出现花");
			//t.flowerPObj.find(">.flower").startAnimate();
		}
		
		child.each(function(){//先检查送花是否已经存在
			var obj=$(this);
			var hname=obj.find(".hname").text();
			var huid=obj.data("uid");
			//console.log(huid)
			if(uid==huid&&name==hname){//存在
				var numObj=obj.find("em"),fid=obj.attr("fid");
				num=parseInt(numObj.text());
				numObj.html(++num).removeClass("cur");//增加花朵
				t.flowerTotal++;
				setTimeout(function(){
					numObj.addClass("cur");//数字动画
				},100);
				if(length==1&&t.flowerObj.find(".cur2").length==1){
					obj.removeClass("cur2");//第二个网上移动
				}
				t.flowerList[fid].num=num;
				has=true;//已出现
				console.log("存在："+name+",fid："+fid);
				clearTimeout(t.flowerList[fid].timeout);
				t.flowerList[fid].timeout=setTimeout(function(){
					obj.addClass("cur3");//渐渐消失
					console.log("消失"+name+",fid："+fid);
					//t.flowerList[flowerNum].hidden=true;
					t.callback&&t.callback(t.flowerList[fid]);
					obj.bind(t.tranEnd,function(){
						//if(t.flowerList[flowerNum].hidden){
							obj.remove();
							console.log("移除"+name+",fid："+fid);
							
							//for(var i=2-length;i--;){
								if(t.flowerWaitList.length>0){
									console.log("送花列表不为空");
									;(function(name,num,pic,uid,fImg,sObj){
										t.flowerWaitList.splice(0,1);
										console.log("输出送花列表"+name,num);
										t.putFlower(name,num,pic,uid,fImg,sObj,true);
									})(t.flowerWaitList[0].name,t.flowerWaitList[0].num,t.flowerWaitList[0].pic,t.flowerWaitList[0].uid,t.flowerWaitList[0].giftImg,t.flowerWaitList[0].sendobj);
									//console.log("1输出等待列表,"+i+","+t.flowerWaitList)	
								}									
						//	}
							if(t.flowerObj.find("li").length==0){//输出完毕 ，隐藏容器
								t.flowerPObj.removeClass("cur");
								t.flowerPObj.find(">.flower").stopAnimate();
							}
						//}
					});
				},t.waitTime);
						
				//console.log("重复");
				var isHas=false;
				if(length==1&&t.flowerWaitList.length>0){//如果已经出现一条，并且送花列表不为空
					for(var i=0;i<t.flowerWaitList.length;i++){
						if(t.flowerWaitList[i].name!=name){//输出不同名字的
							;(function(name,num,pic,uid,fImg,sObj){
								t.flowerWaitList.splice(i,1);
								t.putFlower(name,num,pic,uid,fImg,sObj,true);
							})(t.flowerWaitList[i].name,t.flowerWaitList[i].num,t.flowerWaitList[i].pic,t.flowerWaitList[i].uid,t.flowerWaitList[i].giftImg,t.flowerWaitList[i].sendobj);
							console.log("输出其他名字的："+name);
							isHas=true;
							break;
						}								
					}
					if(!isHas&&flag){//正在输出等待列表,持续输出
						console.log("没找到其他名字的，输出剩下的同名");
						clearInterval(t.flowerTimeOut);
						t.flowerTimeOut=setInterval(function(){
							//for(var i=1;i--;){
								if(t.flowerWaitList.length>0){
									;(function(name,num,pic,uid,fImg,sObj){
										t.flowerWaitList.splice(0,1);
										t.putFlower(name,num,pic,uid,fImg,sObj,true);
									})(t.flowerWaitList[0].name,t.flowerWaitList[0].num,t.flowerWaitList[0].pic,t.flowerWaitList[0].uid,t.flowerWaitList[0].giftImg,t.flowerWaitList[0].sendobj);
									//console.log("2持续输出等待列表,"+i+","+t.flowerWaitList)	
								}else{
									clearInterval(t.flowerTimeOut);
									//break;
								}						
							//}
						},500);	
					}
				}
				return false;//跳出$each
			}
		});
		if(!has){
			;(function(flowerNum){
				if(length<=1){//0 或1个 
					if(t.flowerWaitList.length==0||flag){//等待列表为空(直接输出)
						t.flowerPObj.find(">.flower").css({//容器背景
							backgroundImage:"url("+giftImg+")",
							backgroundSize:"100%"
						});
						t.flowerNum++;
						obj.appendTo(t.flowerObj).attr("fid",flowerNum);//容器添加花朵，添加fid
						obj.find("em").html(num).removeClass("cur");//添加花朵，直接输出数量
						console.log("添加："+name+",fid："+flowerNum);
						t.flowerTotal++;
						setTimeout(function(){
							obj.find("em").addClass("cur");//数字动画
						},100);
						if(length==1&&t.flowerObj.find(".cur2").length==0){
							obj.addClass("cur2");//第二个
						}
						t.flowerList[flowerNum]={name:name,obj:obj,timeout:null,hidden:false,num:num,sendobj:sendobj}
						var offset=obj.offset().left;
						obj.addClass("cur");//从左到右出现
						t.flowerList[flowerNum].timeout=setTimeout(function(){//3秒隐藏
							obj.addClass("cur3");//渐渐消失
							//t.flowerList[flowerNum].hidden=true;
							t.callback&&t.callback(t.flowerList[flowerNum]);
							obj.bind(t.tranEnd,function(){
								//if(t.flowerList[flowerNum].hidden){
									obj.remove();
									//for(var i=2-length;i--;){//隐藏后检查等待列表是否为空
										if(t.flowerWaitList.length>0){
											;(function(name,num,pic,uid,fImg,sObj){
												t.flowerWaitList.splice(0,1);
												t.putFlower(name,num,pic,uid,fImg,sObj,true);
											})(t.flowerWaitList[0].name,t.flowerWaitList[0].num,t.flowerWaitList[0].pic,t.flowerWaitList[0].uid,t.flowerWaitList[0].giftImg,t.flowerWaitList[0].sendobj);
											//console.log("1输出等待列表,"+i+","+t.flowerWaitList)	
										}									
									//}
									if(t.flowerObj.find("li").length==0){//输出完毕 ，隐藏容器
										t.flowerPObj.removeClass("cur");
										t.flowerPObj.find(">.flower").stopAnimate();
									}
								//}
							});
							
						},t.waitTime);
						if(flag){//正在输出等待列表,持续输出
							clearInterval(t.flowerTimeOut);
							t.flowerTimeOut=setInterval(function(){
								//for(var i=2-length;i--;){
									if(t.flowerWaitList.length>0){
										;(function(name,num,pic,uid,fImg,sObj){
											t.flowerWaitList.splice(0,1);
											t.putFlower(name,num,pic,uid,fImg,sObj,true);
										})(t.flowerWaitList[0].name,t.flowerWaitList[0].num,t.flowerWaitList[0].pic,t.flowerWaitList[0].uid,t.flowerWaitList[0].giftImg,t.flowerWaitList[0].sendobj);
										//console.log("1持续输出等待列表,"+i+","+t.flowerWaitList)	
									}else{
										clearInterval(t.flowerTimeOut);
									}						
								//}
							},500);	
						}
					}else{//等待列表不为空(优先输出等待列表)
						t.flowerWaitList.push({name:name,num:num,pic:pic,uid:uid,giftImg:giftImg,sendobj:sendobj});
						console.log("优先输出等待列表");
						//for(var i=2-length;i--;){//输出等待列表
							if(t.flowerWaitList.length>0){
								;(function(name,num,pic,uid,fImg,sObj){
									t.flowerWaitList.splice(0,1);
									t.putFlower(name,num,pic,uid,fImg,sObj,true);
								})(t.flowerWaitList[0].name,t.flowerWaitList[0].num,t.flowerWaitList[0].pic,t.flowerWaitList[0].uid,t.flowerWaitList[0].giftImg,t.flowerWaitList[0].sendobj);
								//console.log("2输出等待列表,"+i+","+t.flowerWaitList)	
							}									
						//}
					}
				}else if(length>1){//已经出现2个，进入等待
					//console.log("放入等待列表1");
					console.log("放入等待列表:",name);
					t.flowerWaitList.push({name:name,num:num,pic:pic,uid:uid,giftImg:giftImg,sendobj:sendobj});
				}
			})(t.flowerNum);
		}
	},
}
;(function(){
	$.fn.extend({
		reAnimate:function(){
			return this.each(function(){
				$(this).css({display:"none",animationPlayState:"paused"});
			});
		},
		startAnimate:function(){
			return this.each(function(){
				$(this).attr("style","");
				var display=$(this).css("display");
				var visibility=$(this).css("visibility");
				if(display=="none"){
					display="block";
				}
				if(visibility=="hidden"){
					visibility="visible";
				}
				$(this).css({display:display,visibility:visibility,animationPlayState:"running"});
			});
		},
		pauseAnimate:function(){
			return this.each(function(){
				$(this).css({animationPlayState:"paused"});
			});
		},
		playAnimate:function(){
			return this.each(function(){
				$(this).css({animationPlayState:"running"});
			});
		},
		stopAnimate:function(){
			return this.each(function(){
				$(this).css({display:"none"});
				var top=$(this).offset().top;
				$(this).attr("style","");
			});
		}
	});
})(jQuery);
export default myApi;