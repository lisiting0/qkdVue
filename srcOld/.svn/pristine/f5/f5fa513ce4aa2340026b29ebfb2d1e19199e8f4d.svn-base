<template>
	<div class="jy_act_zy_newPrize">
		<div class="jy_act_zy_newPrize_cj">
			<ul class="jy_act_zy_gift" :class="{jy_act_zy_gift_three:num%2==1}">
				<li v-for="n in num" :style="'transform:rotate('+((n-1)*evalNum*-1)+'deg);-webkit-transform:rotate('+((n-1)*evalNum*-1)+'deg);width:'+(width*2)+'px;margin-left:'+(width*-1)+'px'">{{prizeList[n-1]}}</li>
			</ul>
			<i class="jy_act_zy_newPrize_btn" @click.shop="startAnimate"></i>
		</div>
	</div>
</template>
<script>
  export default {
    name: 'myPrize',
	props:["startPrize","prizeIndex"],
    data () {
		return {
			/** 中缘抽奖设置**/
			rotate:0,//转盘角度
			num:4,//奖品个数(>=3个)
			evalNum:360/4,//每份奖品对应的度数 360/num
			prize:-1,//抽中的奖品下标
			round:15,//转盘转动的圈数
			duration:6000,//转盘转动时间ms
			running:false,//转盘是否正在转
			tranEnd:this.transitionEnd("transition"),
			width:0,
			height:0,
			prizeList:["谢谢参与","一等奖","二等奖","三等奖","四等奖","五等奖","六等奖","七等奖","八等奖","九等奖","十等奖","十一等奖"],
		}
    },
    computed: {
		
    },
    components: {
		
    },
    mounted () {
		const t=this;
		t.obj=$(".jy_act_zy_gift");
		t.height=t.obj.height()/2;
		t.width=Math.tan(t.evalNum/2*Math.PI/180)*t.height;
		t.$nextTick(()=>{
			t.obj.css({transform:'rotate(0deg)',WebkitTransform:'rotate(0deg)',transitionDuration:'0ms',WebkitTransitionDuration:'0ms'});
			t.obj.bind(t.tranEnd,function(){
				if(t.running){
					t.obj.css({transform:'rotate('+(t.rotate)+'deg)',WebkitTransform:'rotate('+(t.rotate)+'deg)',transitionDuration:'0ms',WebkitTransitionDuration:'0ms'});
					t.running=false;//转盘是否正在转
					t.$vux.toast.show({
						type:"text",
						text: t.prizeList[t.prize],
						position:"bottom",
						width:"2rem",
					})
				}
			});
		});
    },
	watch:{
		
    },
	destroyed(){
		const t=this;

	},
    methods :{

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
			
			t.prize=Math.round(Math.random()*(t.num-1));//0-5 模拟抽奖
			console.log("中奖下标:"+t.prize);
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