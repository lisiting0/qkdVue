<template>
  <div class="main jy_user_new">
    <Loading v-if="isloading"></Loading>
    <div class="jy_user_new_top">
		<template v-if="$store.state.isLogin">
		<p class="jy_user_new_qcode"><i @click="showQRCode=true">&#xe68a;</i></p>
		<div class="jy_user_new_info">
			<router-link tag="i" :to="{name:'userInfo',query:{id:$store.state.userInfo.id}}" class="jy_user_new_img" :style="'background-image:url('+$utils.getFullPath($store.state.userInfo.headimgAttachmentId)+');'"></router-link>
			<div class="jy_user_new_num">
				<router-link tag="p" :to="{name:'recentVisit'}">最近来访<em><i :class="{cur:news.vistorCount>0}">{{(visitorCount?news.vistorCount>0?visitorCount-news.vistorCount<0?0:visitorCount-news.vistorCount:visitorCount:0)+(news.vistorCount>0?'+'+news.vistorCount:'')}}</i></em></router-link>
				<router-link tag="p" :to="{name:'myFocus',query:{active:2}}">关注<em><i>{{$store.state.userInfo.followCount||0}}</i></em></router-link>
				<router-link tag="p" :to="{name:'myFocus',query:{active:3}}">粉丝<em><i :class="{cur:news.newFanCount>0}">{{($store.state.userInfo.fanCount?news.newFanCount>0?$store.state.userInfo.fanCount-news.newFanCount<0?0:$store.state.userInfo.fanCount-news.newFanCount:$store.state.userInfo.fanCount:0)+(news.newFanCount>0?'+'+news.newFanCount:'')}}</i></em></router-link>
			</div>
		</div>
		<div class="jy_user_new_tb">
			<h3>{{$store.state.userInfo.aliasName}}</h3>
			<p class="jy_user_new_desc"><i v-if="city">{{city}}</i>{{$store.state.userInfo.selfLabel||'愿得一人心,白首不相离'}}</p>
			<router-link tag="ul" :to="{name:'certificationCenter'}" class="jy_user_new_auth">
				<li :class="{cur:$store.state.userInfo.idStatus==1}">&#xe69c;</li>
				<li class="cur">&#xe6ba;</li>
				<li :class="{cur:$store.state.userInfo.videoStatus==1}">&#xe697;</li>
				<li :class="{cur:$store.state.userInfo.carStatus==1}">&#xe69f;</li>
				<li :class="{cur:$store.state.userInfo.houseStatus==1}">&#xe69e;</li>
			</router-link>
		</div>
		</template>
		<router-link tag="p" v-else class="jy_user_new_tologin" :to="{name:'login'}"><i :style="'background-image:url('+ imgs.headImage+');'"></i>立即登录</router-link>
	</div>
	<ul class="jy_user_new_menu">
		<router-link tag="li" :to="{name:'safeHouse'}">
			<i class="jy_user_new_c1">&#xe6b5;</i>
			<h4>乾坤金屋</h4>
			<p>{{$store.state.userInfo.userMoney}}乾坤币</p>
		</router-link>
		<router-link tag="li" :to="{name:'prizeDraw',params:{pagerouter:'main'}}">
			<i class="jy_user_new_c2">&#xe6d3;</i>
			<h4>乾坤轮</h4>
			<p></p>
		</router-link>
		<shop @changeLoading="changeLoading" :tag="'li'">
			<i class="jy_user_new_c3">&#xe6d1;</i>
			<h4>乾坤商城</h4>
			<p></p>
		</shop>
		<li @click.stop="toShareLink">
			<i class="jy_user_new_c4 on" data-on="邀请有礼">&#xe6d2;</i>
			<h4>邀请好友</h4>
			<p></p>
		</li>
	</ul>
	<ul class="jy_user_new_menu jy_user_new_menu2">
		<router-link tag="li" :to="{name:'myOffer'}">
			<i class="jy_user_new_c5" :class="{cur:closeAct}">&#xe66b;</i>
			<h4>我的约会</h4>
		</router-link>
		<router-link tag="li" :to="{name:'myBlindDate'}">
			<i class="jy_user_new_c6">&#xe6d5;</i>
			<h4>我的相亲</h4>
		</router-link>
		<router-link tag="li" :to="{name:'certificationCenter'}">
			<i class="jy_user_new_c7 on" data-on="认证有礼">&#xe62b;</i>
			<h4>认证中心</h4>
		</router-link>
		<router-link tag="li" :to="{name:'gift'}">
			<i class="jy_user_new_c8">&#xe632;</i>
			<h4>我的礼物</h4>
		</router-link>
		<router-link tag="li" :to="{name:'earnCoin'}">
			<i class="jy_user_new_c9">&#xe6c7;</i>
			<h4>任务中心</h4>
		</router-link>
		<router-link tag="li" :to="{name:'agent'}">
			<i class="jy_user_new_c10">&#xe6de;</i>
			<h4>我的代理</h4>
		</router-link>
		<router-link tag="li" :to="{name:'myComments'}">
			<i class="jy_user_new_c11">&#xe6d2;</i>
			<h4>我的动态</h4>
		</router-link>
		<router-link tag="li" :to="{name:'energyRanking'}">
			<i class="jy_user_new_c12">&#xe6e2;</i>
			<h4>能量排行</h4>
		</router-link>
	</ul>
	<ul class="jy_user_new_nav">
		<router-link tag="li" :to="{name:'apply'}">
		<i class="jy_user_nav_c1">&#xe745;</i><p>
		<span v-if="applyList && applyList.length>0"><em v-for="item in applyList" :style="{'background-image':'url('+$utils.getFullPath(item.user.headimgAttachmentId)+')'}"></em></span>私密资料请求通知</p>
		</router-link>
	</ul>
	<ul class="jy_user_new_nav">
		<router-link tag="li" :to="{name:'setting'}"><i class="jy_user_nav_c2">&#xe6e3;</i><p>设置</p></router-link>
		<router-link tag="li" :to="{name:'help'}"><i class="jy_user_nav_c3">&#xe6e4;</i><p>帮助及反馈</p></router-link>
	</ul>
	<div v-transfer-dom>
      <x-dialog v-model="showQRCode" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
        <div class="qrcode_con_user">
          <div class="close-icon" @click.stop="showQRCode=false"><i class="iconfont">&#xe7de;</i></div>
          <div class="qrcode_panel" id="qrcode">
            <p>告诉小伙伴,你在乾坤岛等Ta</p>
            <vue-qr :logoSrc="imageUrl" :text="qrcodeValue" :size="150" :margin="0" :logoMargin="5" :logoCornerRadius="4"></vue-qr>
            <p>扫一扫</p>
            <p>登陆乾坤岛</p>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import Loading from '@other/loading.vue';
import headImage from '@/images/default_head.gif'
import shop from '@other/shop.vue';
import { TransferDom,XDialog } from 'vux';
import VueQr from 'vue-qr'
import imageUrl from '@/images/logo_240.png'
export default {
	name: 'user',
	components: {
		Loading,
		shop,
		XDialog,
		VueQr,
	},
	data() {
		return {
			userNickName: '',
			isloading:false,
			imgs:{headImage},
			applyList:[],
			news: {},
			visitorCount:0,
			closeAct:false,//最近是否有约会
			showQRCode:false,
			imageUrl,
			qrcodeValue: this.$store.state.baseURL+'/api/account/publicAddressLoginUrl?&state=shareEnter'+ (this.$store.state.isLogin?'__pid_'+this.$store.state.userInfo.jyNumber+"_uid_"+ this.$store.state.userInfo.id:''),
			city:'',
		}
	},
	directives: {
		TransferDom
    },
	computed: {
		
	},
	watch: {
		
	},
	destroyed() {
		clearTimeout(this.getTimeout);
	},
	created() {
		
	},
	deactivated(){
		clearTimeout(this.getTimeout);
	},
	async activated(){
		const t=this;
		await t.routerInit();
	},
	async mounted() {
		const t=this;
		await t.routerInit();
		t.getLocation();
	},
	methods: {
		async routerInit(){
			const t=this;
			if(t.$store.state.isLogin){
				t.getVisitor();
				t.getApplyList();
				t.unreadNews();
				t.$store.dispatch("CHECKMONEY");//查询用户当前的乾坤币
				try{
					let userInfo = await t.$server.getUserInfo({userId: t.$store.state.userId});
					t.$store.commit("LOGIN", userInfo.data.data);
				}catch(e){
					console.log(JSON.stringify(e));
				}
				t.closestActivityTime();
			}
			if(!t.$store.state.qrcode.pid){
				let qrcodeData={
					pid: t.$route.query.pid,
					uid: t.$route.query.uid
				}
				t.$store.commit("QRCODE", qrcodeData);
			}
			return t;
		},
		async getLocation(){
			const t=this;
			try{
				await t.$store.dispatch("getMylocation",{getCache:true,callback:function(res){
					if(res){
						t.city=res.city;
					}
				 }}).then(async (res)=>{
					if(res){
						t.city=res.city;
					}
				 }).catch(e=>{
					console.log(JSON.stringify(e));
				 });
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		async closestActivityTime(){
			const t = this;
			try{
				const result = await t.$server.closestActivityTime();
				if(result.data.data){
					;(function getTime(time){
						let disDate = new Date(time.replace(/\-/g, "/")).getTime() - new Date().getTime();   //时间差的毫秒数
						if(disDate<60*60*1000){//1小时内
							t.closeAct=true;
						}else{
							t.getTimeout=setTimeout(()=>{//计时
								getTime(time);
								console.log("user 定时器")
							},1000);
						}
					})(result.data.data);
				}		
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		async unreadNews() {
			const t = this;
			try{
				const result = await t.$server.userUnreadVisitNumer();
				t.news = result.data.data || {newFanCount: 0, newFriendCount: 0, vistorCount: 0};
			}catch(e){
				console.log(JSON.stringify(e));
			}	
		},
		async getVisitor(){
			const t=this;
			let visitor=0;
			try{
				const result = await t.$server.visitor({
					page:1,
					rows:1,
				});
				t.visitorCount=result.data.count||0;
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		async getApplyList(){
			const t=this;
			try{
				const applyList = await t.$server.findApply({status:1,page:1,rows:3});
				if(applyList.data.list){
				  t.applyList=applyList.data.list;
				}
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		changeLoading(val) {
			this.isloading = val;
		},
		toShareLink(){
			//this.$store.state.isApp || (this.$store.state.isBrowser)
			if(this.$store.state.isApp){
				this.$router.push({
					path: "/share",
				})
			}else{
				if(this.$store.state.userInfo.jyNumber&&this.$store.state.userInfo.id){
					this.$router.push({
						path: "/shareEnter",
					})
				}else{
					this.$store.commit('REDIRECT',"/shareEnter");
					this.$router.push({
						name: 'login',
						query: this.$store.state.otherLogin.params&&this.$store.state.otherLogin.params.query
					})
				}
			}
		},
	}
}
</script>
