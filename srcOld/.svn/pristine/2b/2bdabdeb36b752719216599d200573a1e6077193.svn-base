<template>
	<div class="main jy_all_top jy_actInfo jy_state_top">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"><i class="iconfont">&#xe679;</i></a><p>编辑资料</p>
			</div>
		</div>
		<div class="jy_block_t">
			<ul class="jy_aInfo_line">
				<li class="jy_aInfo_img"><em bgImg="@images/p1.jpg"></em>群头像</li>
				<li><i>故事没开始-活动现场群</i>群名称</li>
				<li>群简介<p>你主动点，也许我们的故事就会开始，你说呢？</p></li>
			</ul>
		</div>
		
	</div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	import { InlineXSwitch } from 'vux'
	export default {
	name: 'recharge',
	data () {
		return {
			isloading:false,
			xswitch:false,
		}
	},
    components: {
      Loading,
	  Back,
	  InlineXSwitch,
    },
	destroyed () {
		$("body").removeClass("gray");
	},
    watch:{
		
    },
    mounted () {
		const t=this;
		$("body").addClass("gray");
		t.$nextTick(()=>{
			t.setBgImg();
		})
    },
    methods :{
		setBgImg(){
			$("a,i,em,li,div").each(function(){//加载背景图片
				const bgimg=$(this).attr("bgImg"); 
				if(bgimg){
					$(this).css({"background-image":"url("+bgimg+")"});
					$(this).attr("bgImg","");
				}
			});
		},
    }
  }
</script>

