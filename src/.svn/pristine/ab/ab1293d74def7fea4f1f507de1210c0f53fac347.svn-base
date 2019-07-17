<template>
	<div class="jy_act_zy_cj">
		<i class="jy_act_zy_bj"></i>
		<i class="jy_act_zy_btn" @click.shop="startPrize"></i>
	</div>
</template>
<script>
  export default {
    name: 'prize',
	props:["datingId","isActEnd"],
    data () {
		return {
			/** 中缘抽奖设置**/
			rotate:0,//转盘角度
			evalNum:360/6,//每份奖品对应的度数
			prize:-1,//抽中的奖品下标
			round:10,//转盘转动的圈数
			duration:6000,//转盘转动时间ms
			running:false,//转盘是否正在转
			tranEnd:this.transitionEnd("transition"),
		}
    },
    computed: {
      
    },
    components: {
      
    },
    watch:{
		running(val){
			const t=this;
			t.$emit("prizeRunning",val);
		}
    },
    mounted () {
		const t=this;
		t.$nextTick(()=>{
			t.obj=$(".jy_act_zy_bj");
			t.obj.css({transform:'rotate(0deg)',WebkitTransform:'rotate(0deg)',transitionDuration:'0ms',WebkitTransitionDuration:'0ms'});
			t.obj.bind(t.tranEnd,function(){
				if(t.running){
					t.obj.css({transform:'rotate('+(t.rotate)+'deg)',WebkitTransform:'rotate('+(t.rotate)+'deg)',transitionDuration:'0ms',WebkitTransitionDuration:'0ms'});
					t.running=false;//转盘是否正在转
					t.$emit("endPrize",t.prize);
				}
			});
		});
    },
	destroyed(){
		const t=this;
		t.$emit("endPrize",t.prize);
		t.$vux.toast.hide()
	},
    methods :{
		async startPrize(){
			const t=this;
			if(t.running){
				/*t.$vux.toast.show({
					type:"text",
					text: "正在抽奖,请稍等",
					position:"bottom",
					width:"2rem",
				});*/
				return false;
			}
			if(t.isActEnd){
				t.$vux.toast.show({
					type:"text",
					text: "活动已结束",
					position:"bottom",
					width:"2rem",
				});
				return false;
			}
			t.running=true;
			console.log("抽奖");
			t.prize=4;//Math.round(Math.random()*5);//0-5 模拟抽奖
			t.rotate=t.evalNum*t.prize;	
			t.obj.css({transform:'rotate('+(t.round*10*360+t.rotate)+'deg)',WebkitTransform:'rotate('+(t.round*10*360+t.rotate)+'deg)',transitionDuration:t.duration*10+'ms',WebkitTransitionDuration:t.duration*10+'ms',transitionTimingFunction:'ease-in',WebkitTransitionTimingFunction:'ease-in'});
			//return false;
			try{
				const result =await t.$server.prize({
					datingActivityId:t.datingId
				})
				console.log("中奖数据:"+JSON.stringify(result.data));
				t.prize=result.data.message;
				t.rotate=t.evalNum*t.prize;	
				t.obj.css({transform:'rotate('+(t.round*360+t.rotate)+'deg)',WebkitTransform:'rotate('+(t.round*360+t.rotate)+'deg)',transitionDuration:t.duration+'ms',WebkitTransitionDuration:t.duration+'ms',transitionTimingFunction:'ease-out',WebkitTransitionTimingFunction:'ease-out'});
				
				//t.prize=Math.round(Math.random()*5);//0-5 模拟抽奖
				
			}catch(e){
				t.obj.css({transform:'rotate(60deg)',WebkitTransform:'rotate(60deg)',transitionDuration:'0ms',WebkitTtransitionDuration:'0ms'});//转到不中奖
				console.log(e);
				t.running=false;
			}
			//t.running=false;
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
		},
    }
  }
</script>