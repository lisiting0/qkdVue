<template>
<div class="main jy_all_top personal_data jy_state_top">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>换绑手机</p>
		</div>
	</div>

	<template v-if="showOld">
	<ul class="m_bp_list">
		<li><span>验证码</span><input type="number" v-model="code" placeholder="请输入验证码"><i v-if="canCode" @click="getCode($store.state.userInfo.phoneNumber)">获取验证码</i><i v-else>{{time+'s'}}</i></li>
	</ul>
	<p class="m_mdp_tip">验证码将发送到原手机中,请注意查收.</p>
	<p class="jy_auth_btn" @click="checkCode">下一步</p>
	
	</template>
	<template v-else>
	<ul class="m_bp_list">
		<li><span>新手机号</span><input type="number" @blur="blur($event)" @focus="focus($event)" v-model="newPhone" placeholder="请输入新手机号"><i v-if="canNewCode" @click="getCode(newPhone)">获取验证码</i><i v-else>{{newtime+'s'}}</i></li>
		<li><span>验证码</span><input type="number" v-model="newCode" placeholder="请输入验证码"></li>
	</ul>
		<p class="jy_auth_btn" @click="editPhone">修改</p>
	</template>
	
</div>
</template>
<script>
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
import {setStore, getStore,removeStore} from '../../config/mUtils';

export default {
	name: 'bindPhone',
	data () {
		return {
			isloading:false,
			phoneNumber:'',
			showOld:true,
			canCode:true,
			canNewCode:true,
			isFlag:false,
			timeNum:60,
			time:'',
			newtime:'',
			code:'',
			newPhone:'',
			newCode:'',
			show:false,
		}
	},
	mounted() {
		const t=this;
		t.startTime();
		t.startNewTime();
	},
	components: {
		//Routerlink,
		Loading,
		Back,
		//myScroller
	},
	watch:{
		phoneNumber(val){
			/*val=val+"";
			if(val.length==1){
				val=val.replace(/[^1-9]/g,'')
			}else{
				val=val.replace(/\D/g,'')
			}
			this.phoneNumber=parseInt(val)||'';*/
			if(val&&typeof val=='string'){
				this.phoneNumber = val.match(/^\d+/)&&val.match(/^\d+/)[0];
			}
		},
		newPhone(val){
			val=val+"";
			/*if(val.length==1){
				val=val.replace(/[^1-9]/g,'')
			}else{
				val=val.replace(/\D/g,'')
			}
			this.newPhone=parseInt(val)||'';*/
			if(val&&typeof val=='string'){
				this.newPhone = val.match(/^\d+/)&&val.match(/^\d+/)[0];
			}
		},
	},
	methods: {
		focus(e){
			e.target.setAttribute("type","text");
		},
		blur(e){
			e.target.setAttribute("type","number");
		},
		changeShow(val){
			this.show=val;
		},
		startTime(){
			const t=this;
			t.isFlag=false;
			let CodeTime;
			CodeTime=getStore("oldCodeTime");
			t.canCode=false;
			const nowTime=new Date().getTime();
			//t.phone=t.$route.query.tel;
			if(CodeTime){
				const dis=Math.floor((nowTime-CodeTime)/1000);
				if(dis<t.timeNum){
					t.time=t.timeNum-dis;
					let timeout=setInterval(()=>{
						t.time--;
						if(t.time<=0){
							clearInterval(timeout);
							t.time=t.timeNum;
							t.canCode=true;
							removeStore("oldCodeTime");
						}
					},1000);
				}else{
					t.time=t.timeNum;
					t.canCode=true;
				}
			}else{
				t.canCode=true;
			}
		},
		startNewTime(){
			const t=this;
			t.isFlag=false;
			let CodeTime;
			CodeTime=getStore("newCodeTime");
			t.canNewCode=false;
			const nowTime=new Date().getTime();
			//t.phone=t.$route.query.tel;
			if(CodeTime){
				const dis=Math.floor((nowTime-CodeTime)/1000);
				if(dis<t.timeNum){
					t.newtime=t.timeNum-dis;
					let timeout=setInterval(()=>{
						t.newtime--;
						if(t.newtime<=0){
							clearInterval(timeout);
							t.newtime=t.timeNum;
							removeStore("newCodeTime");
							t.canNewCode=true;
						}
					},1000);
				}else{
					t.newtime=t.timeNum;
					t.canNewCode=true;
				}
			}else{
				t.canNewCode=true;	
			}
		},
		async getCode(phone){
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
			if((t.canCode&&t.showOld)||(t.canNewCode&&!t.showOld)){
				if(t.checkPhone(phone)){
					if(phone==t.$store.state.userInfo.phoneNumber&&!t.showOld){
						t.$vux.toast.show({
							type:"cancel",
							text: "手机号不能与原手机号相同",
							position:"middle",
							width:"2rem",
						});
            
						return false;
					}
					t.isFlag=true;
					try{
						const result=await t.$server.get_code({
							phoneNumber:phone
						});
						t.$vux.toast.show({
						  type: "text",
						  text: result.data.message,
						  position: "bottom",
						  width: "2rem",
						});
						if(t.showOld){
							setStore("oldCodeTime",new Date().getTime());
							t.startTime();
						}else{
							setStore("newCodeTime",new Date().getTime());
							t.startNewTime();
						}
					}catch(e){
						console.log(e);
						t.isFlag=false;
						t.$vux.toast.show({
							type:"text",
							text: "获取验证码出错",
							position:"bottom",
							width:"2rem",
						})
					}
				}
			}
		},
		checkCode(){
			const t=this;
			if(!t.code){
				t.$vux.toast.show({
					type:"cancel",
					text: "请输入验证码",
					position:"middle",
					width:"2rem",
				});
				return false;
			}
			t.showOld=false;
		},
		async editPhone(){
			const t=this;
			if(!t.newPhone){
				t.$vux.toast.show({
					type:"cancel",
					text: "手机号不能为空",
					position:"middle",
					width:"2rem",
				});
				return false;
			}
			if(t.newPhone==t.$store.state.userInfo.loginName){
				t.$vux.toast.show({
					type:"cancel",
					text: "手机号不能与原手机号相同",
					position:"middle",
					width:"2rem",
				});
				return false;
			}
			if(!t.newCode){
				t.$vux.toast.show({
					type:"cancel",
					text: "请输入验证码",
					position:"middle",
					width:"2rem",
				});
				return false;
			}
			try{
				const result =await t.$server.updatePhone({
					phoneNumber:t.newPhone,
					code1:t.code,
					code2:t.newCode
				});
				t.$vux.toast.show({
					type:"success",
					text: result.data.message,
					position:"middle",
					width:"2rem",
				});
				t.$store.commit("EDITUSERINFO",{key:"phoneNumber",value:t.newPhone});
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
		},
		checkPhone(phone){//验证手机号
			const t=this;
			//return true;
			//const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			const myreg=/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
			if (!myreg.test(phone)) {
				t.$vux.toast.show({
					type:"cancel",
					text: "请填写正确的手机号",
					position:"middle",
					width:"2rem",
				});
				return false;
			} else {
				return true;
			}
		}
	},
	destroyed () {
		
	}
}
</script>
