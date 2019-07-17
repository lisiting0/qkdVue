<template>
	<div class="jy_act_zy_cj">
		<i class="jy_act_zy_bj"></i>
		<i class="jy_act_zy_btn" @click.shop="toStartPrize"></i>
	</div>
</template>
<script>
  export default {
    name: 'prize',
	props:["startPrize","prizeIndex"],
    data () {
		return {
			/** 中缘抽奖设置**/
			rotate:0,//转盘角度
			evalNum:360/10,//每份奖品对应的度数
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
		},
		startPrize(val){
			const t=this;
			if(val){
				t.startAnimate();
			}
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
		toStartPrize(){
			if(!this.startPrize){
				this.$emit("toStartPrize")
			}	
		},
		async startAnimate(){
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
			if(t.prizeIndex==-1){
				t.$vux.toast.show({
					type:"text",
					text: "奖品出错!",
					position:"bottom",
					width:"2rem",
				});
				return false;
			}
			t.running=true;
			console.log("抽奖");
			t.prize=t.prizeIndex;//Math.round(Math.random()*5);//0-5 模拟抽奖
			t.rotate=t.evalNum*t.prize;	
			t.obj.css({transform:'rotate('+(t.round*360+t.rotate)+'deg)',WebkitTransform:'rotate('+(t.round*360+t.rotate)+'deg)',transitionDuration:t.duration+'ms',WebkitTransitionDuration:t.duration+'ms',transitionTimingFunction:'ease',WebkitTransitionTimingFunction:'ease'});

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