<template>
	<div class="main jy_all_top jy_actInfo">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"><i class="iconfont">&#xe679;</i></a><p>群信息</p>
			</div>
		</div>
		<div class="jy_block_t">
			<ul class="jy_aInfo_t">
				<li>
					<i bgImg="@images/p1.jpg"></i>
					<h4>故事没开始-竞缘活动现场</h4>
					<p>你主动点，也许我们的故事就会开始，你说呢？</p>
				</li>
			</ul>
			<ul class="jy_aInfo_line">
				<li><i><img src="@images/ainfo_p1.jpg"></i>群名片</li>
				<li><i>萝岗区 0.6km</i>群地点</li>
 
			</ul>
		</div>
		<div class="jy_block_t">
			<p class="jy_aInfo_tit">群成员(1/100)</p>
			<ul class="jy_aInfo_member">
				<li><i bgImg="@images/s1.jpg"></i><p>没有故事</p></li>
				<li><i bgImg="@images/s2.jpg"></i><p>Baby</p></li>
				<li><i bgImg="@images/s3.jpg"></i><p>小小兔</p></li>
				<li><i bgImg="@images/s4.jpg"></i><p>蜡蝉</p></li>
				<li><i bgImg="@images/s5.jpg"></i><p>妍妍群</p></li>
				<li class="jy_aInfo_member_add"><i></i><p>邀请好友</p></li>
			</ul>
			<ul class="jy_aInfo_line">
				<li>群公告<p>对大家说点什么吧</p></li>
				<router-link tag="li" :to="{name:'actInfoEdit'}">群管理</router-link>
				<li>分享群</li>
			</ul>
		</div>
		<div class="jy_block_t">
			<ul class="jy_aInfo_line">
				<li class="jy_aInfo_member_switch">群消息免打扰<inline-x-switch v-model="xswitch"></inline-x-switch></li>	
			</ul>
		</div>
		<p class="jy_auth_btn">退出活动现场群</p>
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

