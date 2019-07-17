<template>
	<div class="main jy_all_top jy_qb jy_state_top">
		<Loading v-if="isloading"><template v-if="time>-1"><div class="loadtime">{{time}}s</div><p class="loadtext"><em>支付完成,正在跳转</em></p></template></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><!--<a class="right"><i class="iconfont">&#xe679;</i></a>--><p>乾坤币充值</p>
			</div>
		</div>
		<div class="jy_qb_block">
			<div class="jy_qb_t">
				<p class="jy_qb_p">账号：{{$store.state.userInfo.aliasName}}</p>
				<p class="jy_qb_p">余额：<em class="jy_qb_coin">{{$store.state.userInfo.userMoney}}</em></p>
			</div>
			<p class="jy_qb_tit">乾坤币数量</p>
			<ul class="jy_qb_list">
				<li v-for="item,index in jbList" :class="jbIndex==index?'cur':''" @click="jbIndex=index"><a>{{$store.state.isiOSApp?Math.round(item.amount*0.7):item.amount}}<i v-if="item.giveAmount&&item.giveAmount>0">(送{{item.giveAmount}})</i><em>{{item.price}}元</em></a></li>
			</ul>
		</div>
		<p v-if="jbList.length>0" class="jy_qb_pay_all">应付<em>{{jbList[jbIndex].price}}</em>元</p>
		<div class="jy_qb_xy"><!--已阅读并同意<a>《充值服务协议》</a><br>--><p v-if="$store.state.isiOSApp">乾坤币可用来送礼、打赏、报名约会活动与约会活动置顶.</p><p>充值成功后，到账可能有一定延迟，请耐心等待。若长时间未到账，您可以在 我的-帮助与反馈 中联系我们。</p></div>
		<p class="jy_qb_btn" @click.shop="recharge">立即充值</p>
	</div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	export default {
	name: 'recharge',
	data () {
		return {
			isloading:false,
			jbList:[],
			jbIndex:0,
			time:-1,
			topay:false,
			isloadingTimeout:null,//定时,预防isloading一直存在
		}
	},
    computed:{
	      
      changeTransaction:function(){
	        return this.$store.state.changeTransaction;
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
      async changeTransaction(){
        this.topay=false;
        this.isloading=false;
      },
	  isloading(val){//防止isloading不隐藏
			const t=this;
			if(val){
				t.isloadingTimeout=setTimeout(()=>{
					t.isloading=false;
				},5000);
			}else{
				clearTimeout(t.isloadingTimeout);
			}
		},
    },
    mounted () {
		const t=this;
		$("body").addClass("gray");
		t.getRechargePackage();
		t.$store.dispatch("CHECKMONEY");//查询用户当前的乾坤币
    },
    methods :{
		async getRechargePackage(){
			const t=this;
			const result =await t.$server.rechargePackage();
			if (result.data.status==1) {
				t.jbList=result.data.data;
			}
		},
		async recharge(){//充值
			const t=this;
			if(t.topay){
				return false;
			}
			t.topay=true;
			if(this.$store.state.isiOSApp){
			  //苹果IAP支付
				let iap = window.api.require('iap');
				t.isloading=true;
				iap.getProducts({
				  productIds: [
					t.jbList[t.jbIndex].id
				  ]
				}, function(ret, err) {
				  if (ret&&ret.products) {
					iap.purchase({
					  productId: t.jbList[t.jbIndex].id
					}, function(ret, err) {

					});
					setTimeout(function(){
					  t.isloading=false;
					  t.topay=false;
					},10000)
				  } else {
					t.topay=false;
					 t.isloading=false;
					t.$vux.toast.show({
					  type:"text",
					  text: "支付异常，请稍后再试",
					  position:"bottom",
					});
				  }
				});
			  }
		},
    }
  }
</script>

