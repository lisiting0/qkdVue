<template>
<div class="main jy_all_top jy_state_top jy_state_top">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>修改密码</p>
		</div>
	</div>
	<ul class="m_mdp_list">
		<li><input :type="showPassword?'text':'password'" v-model="oldPassword" placeholder="当前密码"><em class="m_show_password" @click="showPassword=!showPassword" :class="{cur:showPassword}"></em></li>
		<li><input :type="showPassword?'text':'password'" v-model="newPassword" placeholder="新密码"></li>
		<li><input :type="showPassword?'text':'password'" v-model="againPassword" placeholder="确认新密码"></li>
	</ul>
	<!--<p class="m_mdp_tip">密码长度8-32位数，需包含数字、字母、符号至少2种或以上元素</p>-->
	<p class="jy_auth_btn" @click.stop="modify">确认修改</p>
	<router-link :to="{name:'forgetPassword'}" class="m_edit_byPhone" replace>忘记密码</router-link>
	
</div>
</template>
<script>
import md5 from 'js-md5';
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
export default {
	name: 'modifyPassword',
	data () {
		return {
			isloading:false,
			oldPassword:'',
			newPassword:'',
			isFlag:false,
			againPassword:'',
			showPassword:false,//是否显示密码
		}
	},
	mounted () {
		
	},
	components: {
		Loading,
		Back,
		//myScroller
	},
	methods: {
		async modify(){
			const t=this;
			if(t.isFlag){
				t.$vux.toast.show({
					type:"text",
					text: "正在发送,请等待.",
					position:"middle",
					width:"2rem",
				});
				return false;
			}
			if(t.oldPassword==''){
				t.$vux.toast.show({
					type:"cancel",
					text: "请填写当前密码",
					position:"middle",
					width:"2rem",
				});
				return false;
			}
			if(t.newPassword==''){
				t.$vux.toast.show({
					type:"cancel",
					text: "请填写新密码",
					position:"middle",
					width:"2rem",
				});
				return false;
			}
			if(t.againPassword==''){
				t.$vux.toast.show({
					type:"cancel",
					text: "请重复输入新密码",
					position:"middle",
					width:"2rem",
				});
				return false;
			}
			if(t.newPassword!=t.againPassword){
				t.$vux.toast.show({
					type:"cancel",
					text: "两次密码不一致",
					position:"middle",
					width:"2rem",
				});
				return false;
			}
			t.isloading=true;
			t.isFlag=true;
			try{
				let result=await t.$server.changPwd({
					password:md5(t.oldPassword),
					newPassword:md5(t.newPassword),
				});
				t.$vux.toast.show({
					type:"success",
					text: result.data.message,
					position:"middle",
					width:"2rem",
				});
				t.$router.back();
			}catch(e){
				console.log(e);
				t.$vux.toast.show({
					type:"cancel",
					text: e.message,
					position:"middle",
					width:"2rem",
				});
			}
			t.isloading=false;
			t.isFlag=false;
		}
	},
	destroyed () {
		
	}
}
</script>