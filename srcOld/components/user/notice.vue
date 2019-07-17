<template>
	<div class="main jy_all_top jy_notice jy_state_top">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>通知</p>
			</div>
		</div>
		<div class="jy_block_t">
			<ul class="jy_aInfo_line">
				<li class="jy_aInfo_member_switch">消息免打扰<inline-x-switch v-model="xswitch.all"></inline-x-switch>
        <p v-show="xswitch.all">开启消息免打扰之后，所有的消息将不再提示</p></li>
			</ul>
		</div>
    <p class="jy_p_tit">活动通知</p>
    <div class="jy_block_t">
      <ul class="jy_aInfo_line">
        <li class="jy_aInfo_member_switch">活动即将开始<inline-x-switch :disabled="disabled" v-model="xswitch.activity"></inline-x-switch></li>
        <li class="jy_aInfo_member_switch">约会即将开始<inline-x-switch :disabled="disabled" v-model="xswitch.engagement"></inline-x-switch></li>
        <li class="jy_aInfo_member_switch">活动审核成功<inline-x-switch :disabled="disabled" v-model="xswitch.auditing"></inline-x-switch></li>
      </ul>
    </div>
		<p class="jy_p_tit">消息通知</p>
		<div class="jy_block_t">
			<ul class="jy_aInfo_line">
				<li class="jy_aInfo_member_switch">聊天消息通知<inline-x-switch :disabled="disabled" v-model="xswitch.message"></inline-x-switch></li>
			</ul>
		</div>
		<p class="jy_p_tit">关注通知</p>
		<div class="jy_block_t">
			<ul class="jy_aInfo_line">
        <li class="jy_aInfo_member_switch">新粉丝通知<inline-x-switch :disabled="disabled" v-model="xswitch.fans"></inline-x-switch></li>
        <li class="jy_aInfo_member_switch">关注活动通知<inline-x-switch :disabled="disabled" v-model="xswitch.follow"></inline-x-switch></li>
			</ul>
		</div>
		
	</div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	import { InlineXSwitch } from 'vux'
	export default {
	name: 'notice',
	data () {
		return {
			isloading:false,
      disabled:false,
			xswitch:{all:false,activity:true,engagement:true,auditing:true,message:true,fans:true,follow:true},
		}
	},
    computed:{
	    noall(){
	      return this.xswitch.all
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
      noall(newV){
          this.disabled = newV;
      }
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

