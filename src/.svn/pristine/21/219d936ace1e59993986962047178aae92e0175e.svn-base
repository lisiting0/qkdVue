<template>
	<div class="main jy_all_top jy_qb jy_state_top" :class={top_userInfo:!actDatingId}>
		<Loading v-if="isloading"><template v-if="time>-1"><div class="loadtime">{{time}}s</div><p class="loadtext"><em>支付完成,正在跳转</em></p></template></Loading>
		<div class="header">
			<div class="top">

				<Back class="left" v-if="!actDatingId"><i class="iconfont">&#xe613;</i></Back>
				<a v-else class="left" @click.stop="hiddenPayWin()"><i class="iconfont">&#xe613;</i></a>
				<p>支付</p>
			</div>
		</div>
		<div class="jy_qb_block">
			<p class="jy_qb_rc">入场报名费</p>
			<p class="jy_qb_hmon" v-if="orderInfo&&orderInfo.price!=orderInfo.money&&!isUnion&&!$store.state.channel.isUnion"><del>￥{{Fn.toFixed(orderInfo.price||0)}}</del></p>
			<p class="jy_qb_mon" v-if="orderInfo">￥{{Fn.toFixed(orderInfo.money||0)}}</p>
			<!--<p class="jy_qb_sm">说明：由于什么什么原因，举办此次活动要收费微量费用。</p>-->
		</div>
		<div class="jy_qb_block" v-if="orderInfo&&(isUnion||$store.state.channel.isUnion)&&orderInfo.price-orderInfo.money>0">
			<p class="jy_qb_yh"><i>￥{{Fn.toFixed((orderInfo.price-orderInfo.money)||0)}}</i>{{$store.state.channel.name?$store.state.channel.name+($store.state.channel.isNewUserFree?'新人':'')+"优惠":$store.state.channel.isNewUserFree?"新人优惠":"优惠"}}</p>
		</div>
		<div class="jy_qb_block">
			<p class="jy_qb_tit">支付方式</p>
			<ul class="jy_qb_pay_list">
				<li v-for="item,index in payType" v-if="index!='alipay'||(index=='alipay'&&!$store.state.isWeixin)" :class="{cur:index==payIndex,alipay_ico:index=='alipay',wxpay_ico:index=='wxpay'}" @click="payIndex=index">{{item}}</li>
			</ul>
		</div>
		<p v-if="orderInfo" class="jy_qb_pay_all">应付<em>{{Fn.toFixed(orderInfo.money||0)}}</em>元{{orderInfo.price!=orderInfo.money?'(已优惠'+Fn.toFixed(orderInfo.price-orderInfo.money)+'元)':''}}</p>
		
		<p class="jy_qb_btn jy_qb_btn_abs" @click.shop="recharge">立即付款</p>
	</div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	export default {
	name: 'blindDatePay',
	props: ['actDatingId',"enrollFee"],
	data () {
		return {
			isloading:false,
			orderInfo:null,
			payType:{wxpay:"微信支付",alipay:"支付宝支付"},
			payIndex:"wxpay",
			time:-1,
			topay:false,
			isUnion:'',
			unionFrom:'',
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
		t.getRechargePackage();
		//t.$store.dispatch("CHECKMONEY");//查询用户当前的乾坤币
    },
    methods :{
		hiddenPayWin(flag){
			//console.log(flag)
			const t=this;
			if(flag){
				if(t.$store.state.userInfo.dataPerfect==1){
					if(t.actDatingId){
						t.$emit('hiddenPayWin',flag);
					}else{
						t.$router.replace({name:'registrationStaff',query:{id:t.$route.query.id,showMsg:true}});
					}
				}else{
					/*this.$vux.toast.show({
						type: 'cancel',
						text: "请完善资料,以便对方了解您!",
						position: 'middle',
						width: 'auto',
					});*/
					if(t.actDatingId){
						t.$router.push({name:'modifyData',query:{isRequired: true,showMsg:true,datingId:t.actDatingId||t.$route.query.id}});
					}else{
						t.$router.replace({name:'modifyData',query:{isRequired: true,showMsg:true,datingId:t.$route.query.id}});
					}
				}
				t.$store.commit("clearAllCache");
			}else{
				if(t.actDatingId){
					t.$emit('hiddenPayWin',flag);
				}else{
					t.$router.replace({name:'registrationStaff',query:{id:t.$route.query.id}});
				}
			}
		},
		async getRechargePackage(){
			const t=this;
			try{
			    if(sessionStorage){
				  t.isUnion = sessionStorage.getItem('isUnion');
				  t.unionFrom=sessionStorage.getItem('unionFrom');
				}
				
				let  data = {
					id:t.actDatingId||t.$route.query.id,
					isUnion:(t.$store.state.channel.isUnion&&t.$store.state.channel.jyNumber?t.$store.state.channel.jyNumber:t.$store.state.channel.isUnion)||t.isUnion,
				//	jyNumber:t.$store.state.channel.jyNumber
				}
				
				const result=await t.$server.candidateBlindDating(data);
				//console.log(JSON.stringify(result));
				t.orderInfo=result.data.data;
				t.$emit('openPayWin');
			}catch(e){
				t.hiddenPayWin();
				//t.$store.commit("CHANGESTORE",{name:"gotoBlindDatepay",value:false});//是否需要弹出支付
				e.message&&t.$vux.toast.show({
					type: 'cancel',
					text: e.message,
					position: 'middle',
					width: 'auto',
				});
			}
		},
		async recharge(){//支付
			const t=this;
			if(t.topay){
				return false;
			}
			t.topay=true;
			t.isloading=true;
			let api=window.api||"";
			
			let payIndex=t.$store.state.isWeixin?'publicWxPay':t.payIndex;
			const payResult=await t.$server.payOrder({
				oderId:t.orderInfo.id,
				payid:payIndex
			});
			//alert("pay.data:"+JSON.stringify(payResult.data.data));
			if(payResult.data.data.paySuccess){
				t.time=5;
				t.isloading=true;
				let timeout=setInterval(()=>{
					t.time--;
					t.time=t.time<0?-1:t.time;
					if(t.time<0){
						t.isloading=false;
						clearInterval(timeout);
						t.topay=false;
						t.hiddenPayWin(true);
					}
				},1000);
				return false;
			}
			if(api||t.$store.state.isWeixin){
				if(payResult.data.status==1){
					if(payIndex=='publicWxPay'){
						let onBridgeReady=()=>{
							WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
								...payResult.data.data
							},
							function(res){
								//alert("支付信息:"+JSON.stringify(res));
								if(res.err_msg == "get_brand_wcpay_request:ok" ){
								  // 使用以上方式判断前端返回,微信团队郑重提示：
										//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
									t.time=5;
									t.isloading=true;
									let timeout=setInterval(()=>{
										t.time--;
										t.time=t.time<0?-1:t.time;
										if(t.time<0){
											t.isloading=false;
											clearInterval(timeout);
											t.topay=false;
											t.hiddenPayWin(true);
										}
									},1000);
								}else{
									 t.isloading=false;
									 t.topay=false;
								}
							});
						}
						if (typeof WeixinJSBridge == "undefined"){
						   if( document.addEventListener ){
							   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						   }else if (document.attachEvent){
							   document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
							   document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						   }
						}else{
						   onBridgeReady();
						}
					}else if(payIndex=="wxpay"){
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
							if (ret.status){
								t.time=5;
								t.isloading=true;
								let timeout=setInterval(()=>{
									t.time--;
									t.time=t.time<0?-1:t.time;
									if(t.time<0){
										t.isloading=false;
										clearInterval(timeout);
										t.topay=false;
										t.hiddenPayWin(true);
									}
								},1000);
							}else {
								t.isloading=false;
								t.$vux.toast.show({
									type:"text",
									text: "支付失败:"+err.code,
									position:"bottom",
									width:"2rem",
									onHide(){
										t.topay=false;
										//t.$router.replace({name:"order"});
									}
								});
							}
						});
					}else if(payIndex=="alipay"){
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
										t.hiddenPayWin(true);
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

