//音乐
let Media=function (opt){
	var t=this;
	t.init(opt);
}
Media.prototype={
	constructor:Media,
	init:function(opt){
		var t=this;
		t.loop=opt.loop;
		t.loading=false;//是否已初始化加载
		t.autoplay=opt.autoplay;
		t.src=opt.src;
		if(t.src&&window.Audio){
			if(!t.media){
				t.media=new Audio();
				t.media.src=t.src;
				t.media.loop = t.loop===false?false:true;
				t.media.autoplay = true;
				t.media.isLoadedmetadata = false;
				t.media.touchstart = true;
				t.media.audio = true;
				t.media.volume = 0.0;//先静音
				t.media.elems = {};
				t.media.addEventListener("timeupdate", initVideo, false);
				function initVideo(){
					if (t.media&&t.media.currentTime&&!t.loading){
						t.loading=true;
						if(!t.autoplay){
							t.media.pause();
							t.media.volume = 1.0;
							t.media.currentTime=0;
						}else{
							t.media.volume = 1.0;
						}
						t.media.removeEventListener("timeupdate", initVideo, false);
					}
				}
				t.onload();
			}
		}
	},
	onload:function(){
		var t=this,
			num=0,
			timeout;
		t.media.play();
		//t.media.currentTime=0.01;
		timeout=setInterval(function(){
			num++
			if(t.loading){
				clearInterval(timeout);
			}else{
				t.media.play();
				//t.media.currentTime=0.01;
			}
		},500);
	},
	play:function(){
		var t=this;
		if(t.media&&window.Audio){
			t.media.play();	
		}
	},
	pause:function(){
		var t=this;
		if(t.media&&window.Audio){
			t.media.pause();
		}
	}
}
export default Media;