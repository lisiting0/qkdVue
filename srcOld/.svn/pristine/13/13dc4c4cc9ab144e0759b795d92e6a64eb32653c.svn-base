<template>
	<div class="login_list" v-if="!$store.state.isiOSApp">
    <i class="iconfont" @click="wxLogin">&#xe681;</i>
    <i class="iconfont" @click="qqLogin">&#xe6a0;</i>
    <!--<a class="icon_sina"></a>--></div>
</template>
<script>
	export default {
		name: "accountLogin",
		data(){
            return {
				isloading:false,
            }
        },
		mounted(){
			
		},
		components: {

		},
		watch:{
			isloading(val){
				this.$emit("changeLoading",val);
			}
		},
		methods: {
			qqLogin(){
				const t=this;
				let api=window.api||"";
				if(api){
					let qq = api.require('QQPlus');
					t.isloading=true;
					let loadTimeout=setTimeout(()=>{
						t.isloading=false;
					},6000);
					qq.installed(function(ret, err) {
						if (ret.status) {
							qq.login(async function(loginRet, loginErr) {
								clearTimeout(loadTimeout);
								if(loginRet.status) {
									try{
										t.isloading=true;
										const result=await t.$server.qqLogin({
											accessToken:loginRet.accessToken,
										});
										t.$store.commit("CHANGEACCESSTOKEN",result.data.data);
										let userInfo = await t.$server.getUserInfo({userId:result.data.data.userId});
										t.$store.commit("LOGIN",userInfo.data.data);
										t.$router.replace({name:'home'});
										//setTimeout(()=>{
										//	console.log(JSON.stringify(result));
										//},2000)
									}catch(e){
										if(e.status==140017){//没有绑定账号请绑定
											t.$store.commit("CHANGEOTHERLOGIN",{
												accessToken:loginRet.accessToken,
												isBind:true,
												type:'qq',
											});
											t.isloading=false;
											t.$vux.toast.show({
												type:"cancel",
												text: "请绑定您的手机号",
												position:"middle",
												width:"2rem",
											});
											//t.$router.replace({name:'login'});
										}
										//setTimeout(()=>{
										//	console.log("微信登录异常:"+JSON.stringify(e));
										//},2000)
									}
									t.isloading=false;
								 } else {
									t.isloading=false;
								   t.$vux.toast.show({
									 type:"cancel",
									 text: "登录失败",
									 position:"middle",
									 width:"2rem",
								   });
								 }
							});
						} else {
							t.isloading=false;
							t.$vux.toast.show({
								type:"text",
								text: "当前设备未安装QQ客户端",
								position:"bottom",
								width:"2rem",
							});
						}
					});
				}else{
					t.$vux.toast.show({
						type:"text",
						text: "当前环境不支持该登录方式",
						position:"bottom",
						width:"2rem",
					});
				}
			},
			wxLogin(){
				const t=this;
				let api=window.api||"";
				if(api){
					let wx = api.require('wx');
					t.isloading=true;
					let loadTimeout=setTimeout(()=>{
						t.isloading=false;
					},6000);
					wx.isInstalled(function(ret, err) {
						if (ret.installed) {
							wx.auth({
								//apiKey: ''
							}, function(authRet, authErr) {
								clearTimeout(loadTimeout);
								if (authRet.status) {
									wx.getToken({
										code: authRet.code
									}, async function(loginRet, loginErr) {
										t.isloading=false;
										//console.log("weChatLogin-loginRet:"+JSON.stringify(loginRet));
										if (loginRet.status) {
											try{
												t.isloading=true;
												const result=await t.$server.wxLogin({
													accessToken:loginRet.accessToken,
													openId:loginRet.openId
												});
												t.$store.commit("CHANGEACCESSTOKEN",result.data.data);
												let userInfo = await t.$server.getUserInfo({userId:result.data.data.userId});
												t.$store.commit("LOGIN",userInfo.data.data);
												setTimeout(()=>{
													console.log(JSON.stringify(result));
												},2000)
												t.$router.replace({name:'home'});
											}catch(e){
												if(e.status==140017){//没有绑定账号请绑定
													t.$store.commit("CHANGEOTHERLOGIN",{
														accessToken:loginRet.accessToken,
														openId:loginRet.openId,
														isBind:true,
														type:'wx',
													});
													t.$vux.toast.show({
														type:"cancel",
														text: "请登录/注册绑定账号",
														position:"middle",
														width:"2rem",
													});
													t.isloading=false;
													//t.$router.replace({name:'login'});
												}
												//setTimeout(()=>{
												//	console.log("微信登录异常:"+JSON.stringify(e));
												//},2000)
											}
											t.isloading=false;
										} else {
											t.$vux.toast.show({
												type:"cancel",
												text: "授权失败:"+loginErr.code,
												position:"middle",
												width:"2rem",
											});
										}
									});
								} else {
									t.isloading=false;
									t.$vux.toast.show({
										type:"cancel",
										text: "授权失败:"+authErr.code,
										position:"middle",
										width:"2rem",
									});
								}
							});
						} else {
							t.isloading=false;
							t.$vux.toast.show({
								type:"text",
								text: "当前设备未安装微信客户端",
								position:"bottom",
								width:"2rem",
							});
						}
					});
				}else{
					t.$vux.toast.show({
						type:"text",
						text: "当前环境不支持该登录方式",
						position:"bottom",
						width:"2rem",
					});
				}
			},
		}
	}
</script>

