<template>
<div class="main jy_all_top jy_bond jy_state_top">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>保证金</p>
		</div>
	</div>
	<ul class="jy_bond_top" v-if="bondList">
		<li v-for="item,index in bondList" :class="item.level==$store.state.userInfo.cashDepositLevel?'cur':''"><p>{{item.amount}}</p><i>{{item.levelName}}</i></li>
	</ul>
	<dl class="jy_bond_list">
		<dt><i v-for="item,index in dataType" :class="dataIndex==index?'cur':''" @click="dataIndex=index">{{item}}</i></dt>
		<dd>
			<ul class="jy_bond_sm" v-if="dataIndex==0">
				<li v-for="item,index in bondList">{{item.levelName}}<p>{{item.levelDescript}}</p></li>
			</ul>
			<ul class="jy_bill_list"  v-else-if="dataIndex==1">
				<template v-if="bondReList&&bondReList.length>0">
					<li v-for="item,index in bondReList">
						<h4><em>{{item.money}}</em>{{item.remarks}}</h4>
						<p><em>支付成功</em>{{item.createDate}}</p>
					</li>
				</template>
				<li v-else><h4>暂无记录</h4></li>
			</ul>
		</dd>
	</dl>
	<div v-transfer-dom>
		<popup v-model="showSel" position="top" :popup-style="{zIndex:596,paddingTop:$store.state.isBrowser?'1.39rem':'2.14rem'}" :should-scroll-top-on-show="true">
		<div class="jy_bond_block">
			<p class="jy_qb_tit">保证金等级</p>
			<ul class="jy_qb_pay_list">
				<li v-for="item,index in bondList" v-if="item.level>$store.state.userInfo.cashDepositLevel||!$store.state.userInfo.cashDepositLevel" :class="index==typeIndex?'cur':''" @click="typeIndex=index">{{item.levelName}}</li>
			</ul>
			<p class="jy_qb_tit">支付方式</p>
			<ul class="jy_qb_pay_list">
				<li v-for="item,index in payType" :class="{cur:index==payIndex,alipay_ico:index=='alipay',wxpay_ico:index=='wxpay'}" @click="payIndex=index">{{item}}</li>
			</ul>
			<p class="jy_auth_btn" @click="recharge">提交</p>
		</div>
		</popup>
	</div>
	<p class="jy_auth_btn" @click="showSel=true" v-if="(!$store.state.userInfo.cashDepositLevel||$store.state.userInfo.cashDepositLevel<3)">缴纳/续费/升级保证金</p>
</div>
</template>
<script>
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
import {Popup,TransferDom} from 'vux';
export default {
	name: 'bond',
	data () {
		return {
			isloading:false,
			dataType:["特权说明","缴纳记录"],
			dataIndex:0,
			bondList:null,//保证金等级
			bondReList:null,//保证金充值记录
			payType:{wxpay:"微信支付",alipay:"支付宝支付"},
			payIndex:"wxpay",
			typeIndex:0,
			time:-1,
			topay:false,
			showSel:false,
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
	mounted () {
		const t=this;
		$("body").addClass("gray");
		t.getBondList();//获取保证金等级
		t.getMyRechargeList();//获取保证金记录
	},
	destroyed () {
		$("body").removeClass("gray");
	},
	methods:{
		async getBondList(){
			const t=this;
			try{
				t.isloading=true;
				const result=await t.$server.bondList();
				t.bondList=result.data.data;
			}catch(e){
				
			}
			t.isloading=false;
		},
		async getMyRechargeList(){
			const t=this;
			try{
				const result=await t.$server.myRechargeList({
					page:1,
					rows:t.$store.state.pageSize,
					payType:1,
				});
				t.bondReList=result.data.list;
			}catch(e){
				
			}
		},
		async recharge(){//充值
			const t=this;
			if(t.topay){
				return false;
			}
			t.topay=true;
			t.isloading=true;
			let api=window.api||"";
			if(api){
				const result=await t.$server.rechargeBond({
					bondId:t.bondList[t.typeIndex].id
				});
				if (result.data.status==1) {
					const payResult=await t.$server.payOrder({
						oderId:result.data.data.id,
						payid:t.payIndex
					}); 
					if(payResult.data.status==1){
						if(t.payIndex=="wxpay"){
							let wxPay = api.require('wxPay');
							let wxSetting={};
							wxSetting["apiKey"]=payResult.data.data.appid;
							wxSetting["orderId"]=payResult.data.data.prepayid;
							wxSetting["mchId"]=payResult.data.data.partnerid;
							wxSetting["nonceStr"]=payResult.data.data.noncestr;
							wxSetting["timeStamp"]=payResult.data.data.timestamp;
							wxSetting["package"]=payResult.data.data.package;
							wxSetting["sign"]=payResult.data.data.sign;
							//alert("weixin.data:"+JSON.stringify(wxSetting));
							//console.log("weixin.data:"+JSON.stringify(wxSetting));
							wxPay.payOrder(wxSetting, function(ret, err) {
								//alert("weixin.ret:"+JSON.stringify(err));
								if (ret.status) {
									t.time=5;
									t.isloading=true;
									let timeout=setInterval(()=>{
										t.time--;
										t.time=t.time<0?-1:t.time;
										if(t.time<0){
											t.isloading=false;
											clearInterval(timeout);
											t.topay=false;
											t.$router.replace({name:"safeHouse"});
										}
									},1000);
								} else {
									t.isloading=false;
									t.$vux.toast.show({
										type:"text",
										text: "支付失败:"+err.code,
										position:"bottom",
										width:"2rem",
										onHide(){
											t.topay=false;
											t.isloading=false;
											//t.$router.replace({name:"order"});
										}
									});
								}
							});
						}else if(t.payIndex=="alipay"){
							//alert("alipay.data:"+JSON.stringify(payResult.data.data));
							let aliPayPlus = api.require('aliPayPlus');
							aliPayPlus.payOrder({
								orderInfo: payResult.data.data
							}, function(ret, err) {
							//alert("alipay.code:"+JSON.stringify(ret));
							//9000：支付成功
							 //8000：正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
							 //4000：订单支付失败
							 //5000：重复请求
							 //6001：用户中途取消支付操作
							 //6002：网络连接出错
							 //6004：支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
							 //0001：缺少商户配置信息（商户id，支付公钥，支付密钥）
							 //0002：缺少参数（subject、body、amount、tradeNO）
							 //0003：签名错误（公钥私钥错误）
								if(ret.code==9000){//成功
									t.time=5;
									t.isloading=true;
									let timeout=setInterval(()=>{
										t.time--;
										t.time=t.time<0?-1:t.time;
										if(t.time<0){
											t.isloading=false;
											clearInterval(timeout);
											t.topay=false;
											t.$router.replace({name:"safeHouse"});
										}
									},1000);
								}else{
									t.isloading=false;
									t.$vux.toast.show({
										type:"text",
										text: "支付失败",
										position:"bottom",
										width:"2rem",
										onHide(){
											t.topay=false;
										}
									});
								}
							});
						}
					}else{
						t.isloading=false;
						t.$vux.toast.show({
							type:"text",
							text: payResult.data.message,
							position:"bottom",
							width:"2rem",
							onHide(){
								t.topay=false;
								//t.$router.replace({name:"order"});
							}
						});
					}
				}else{
					t.isloading=false;
					t.$vux.toast.show({
						type:"text",
						text: result.data.message,
						position:"bottom",
						width:"2rem",
						onHide(){
							t.topay=false;
							//t.$router.replace({name:"order"});
						}
					});
				}
			}else{
				t.isloading=false;
				t.$vux.toast.show({
					type:"text",
					text: "当前环境不支持该支付方式",
					position:"bottom",
					width:"2rem",
					onHide(){
						t.topay=false;
						//t.$router.replace({name:"order"});
					}
				});
			}
		}
	}
}
</script>
<style lang="scss" scoped>
	.jy_all_top .header{
		z-index:600;
	}
</style>
