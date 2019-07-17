<template>
	<div class="main jy_all_top jy_state_top">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>隐私</p>
			</div>
		</div>
		<div class="jy_block_t">
			<ul class="jy_aInfo_line">
				<li>距离隐私</li>
			</ul>
		</div>
		<p class="jy_p_tit">*选择对哪部分人显示自己的距离</p>
		<div class="jy_block_t">
			<ul class="jy_aInfo_line">
				<li class="jy_aInfo_member_switch">屏蔽手机联系人<inline-x-switch v-model="xswitch"></inline-x-switch></li>
			</ul>
		</div>
		<p class="jy_p_tit">*选择对哪部分人显示自己的距离</p>
		<div class="jy_block_t">
			<ul class="jy_aInfo_line">
				<li>评论隐私</li>
			</ul>
		</div>
		<div class="jy_block_t">
			<ul class="jy_aInfo_line">
				<li>不看谁的动态</li>
			</ul>
		</div>
		
	</div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	import { InlineXSwitch } from 'vux'
	export default {
	name: 'acountSecurity',
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
    },
    methods :{
		logout(){
			const t=this;
			t.$store.commit("LOGINOUT");
			t.$router.replace({name:'login'});
		}
    }
  }
</script>

