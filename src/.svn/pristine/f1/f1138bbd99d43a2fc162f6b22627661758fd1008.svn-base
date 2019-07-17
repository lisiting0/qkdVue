<template>
<div class="main jy_all_top jy_state_top jy_putforward">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>提现</p>
		</div>
	</div>
	<div class="jy_pf_top">
		<p class="jy_pf_tit"><template v-if="!$store.state.userInfo.aliUserName"><a v-if="hasAli" :href="link">添加提现账号</a><a v-else @click.stop="installAli" class="bindAli">添加提现账号</a></template><span v-else>{{$store.state.userInfo.aliUserName}}</span></p>
		<p class="jy_pf_m">提现金额（元）</p>
		<input class="jy_pf_money" type="number" @blur="blur($event)" placeholder="0" @focus="focus($event)" v-model="money">
		<p class="jy_pf_tb">当前金额 {{money||0}} 元，可提现 {{userIncome}} 元</p>
	</div>
	<p class="jy_pf_tips">提现注意事项：</p>
	<ul class="jy_pf_tipList">
		<li>1.目前只提供支付宝提现</li>
		<li>2.第一次提现请先授权后点击"返回应用"</li>
		<li>3.如有疑问,请联系客服</li>
	</ul>
	<p class="jy_auth_btn" @click.stop="extract">提现</p>
</div>
</template>

<!--<style>
	body{background:#fff;}
	mybtn.{font-size:16px;text-decoration:none;display:block;width:50%;padding:10px 0;text-align:center;margin:50px auto 0;color:#fff;background:#00a3ee;border-radius:8px;}
	.mymessage{font-size:18px;color:#000;text-align:center;margin:50px 0 20px;}
</style>
<p class="mymessage">错误信息</p>
<a class="mybtn" href="jiaoyouurls://putforward?from=alipays">返回应用</a>-->


<script>
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
import {Popup,TransferDom} from 'vux';
export default {
	name: 'bond',
	data () {
		return {
			isloading:false,
			link:"#",
			hasAli:true,
			money:"",
			userIncome:0,
		}
	},
	components: {
		Loading,
		Back,
		Popup,
	},
	directives: {
		TransferDom,
	},
	watch:{
		money(val) {
			const t=this;
			if(val&&typeof val=='string'){
				let money=val;
				if(val.charAt(val.length-1)!='.'&&val.charAt(val.length-1)!='0'){
					money = val.match(/^\d+\.?\d{0,2}/)&&parseFloat(val.match(/^\d+\.?\d{0,2}/)[0]);
				}else{
					money = val.match(/^\d+\.?\d{0,2}/)&&val.match(/^\d+\.?\d{0,2}/)[0];
				}
				money=money>t.userIncome?t.userIncome:money;
				t.money=money;
			}
		},
	},
	mounted () {
		const t=this;
		$("body").addClass("gray");
		t.getUserIncome();
		if(window.api){
			let appBundle='com.eg.android.AlipayGphone';
			if(api.systemType=='ios'){
				appBundle='alipays';
			}
			window.api.appInstalled({
				appBundle: appBundle
			}, function(ret, err) {
				if (ret.installed) {
					t.getBind();
				} else {
					t.hasAli=false;
				}
			});
		}else{
			t.hasAli=false;
			//t.getBind();
		}
	},
	destroyed () {
		$("body").removeClass("gray");
	},
	methods:{
		focus(e) {
			e.target.setAttribute("type", "text");
		},
		blur(e) {
			e.target.setAttribute("type", "number");
		},
		installAli(){
			this.$vux.toast.show({
				type:"cancel",
				text: "此环境不支持提现/没有检测到支付宝",
				position:"middle",
				width:"2rem",
			});
		},
		async getBind(){
			const t=this;
			try{
				const result= await t.$server.aliBinding({});
				t.link=result.data;
			}catch(e){
				t.link=e;
			}
		},
		async extract(){
			const t=this;
			if(!t.money){
				t.$vux.toast.show({
					type:"cancel",
					text: "请输入正确的金额",
					position:"middle",
					width:"2rem",
				});
				return false;
			}
			t.isloading=true;
			try{
				const result= await t.$server.extract({
					amount:t.money,
				});
				t.$vux.toast.show({
					type:"success",
					text: result.data.message,
					position:"middle",
					width:"2rem",
				});
				t.isloading=false;
				t.$router.back();
			}catch(e){
				t.isloading=false;
				t.$vux.toast.show({
					type:"cancel",
					text: e.message,
					position:"middle",
					width:"2rem",
				});
			}
		},
		async getUserIncome(){
			const t=this;
			try{
				const result= await t.$server.getUserIncome();
				//console.log(result.data.data)
				t.userIncome=result.data.data;
			}catch(e){
				console.log(e);
			}
		},
	}
}
</script>