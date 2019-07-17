<template>
	<div class="main jy_all_top jy_state_top">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>账号安全</p>
			</div>
		</div>
		<div class="jy_block_t">
			<ul class="jy_aInfo_line">
				<router-link tag="li" :to="{name:'modifyPassword'}">密码修改</router-link>
				<router-link tag="li" :to="{name:'bindPhone'}"><i>更换手机</i>手机绑定</router-link>
			</ul>
		</div>
		<p class="jy_p_tit"  v-if="!$store.state.isWeixin">账号绑定</p>
		<div class="jy_block_t"  v-if="!$store.state.isWeixin">
			<ul class="jy_aInfo_line">
				<router-link replace tag="li" :to="{name:'bindLogin',query:{type:'wechat'}}"><i>{{$store.state.userInfo.wechatId?'已绑定':'未绑定'}}</i>微信绑定</router-link>
				<router-link replace tag="li" :to="{name:'bindLogin',query:{type:'qq'}}"><i>{{$store.state.userInfo.qqId?'已绑定':'未绑定'}}</i>QQ绑定</router-link>
			</ul>
		</div>
	</div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	export default {
	name: 'acountSecurity',
	data () {
		return {
			isloading:false,
		}
	},
    components: {
      Loading,
	  Back,
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

