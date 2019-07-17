<template>
  <div class="main jy_all_top">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <a class="left" @click="goback"><i class="iconfont">&#xe613;</i></a><a v-if="!$store.state.isBrowser" class="right" @click="clickShare"><i class="iconfont">&#xe679;</i></a>
      </div>
    </div>
    <div class="content">
      <img class="c1" src="../../images/spread/logo.png">
      <img class="c2" src="../../images/spread/or.png">
      <div class="c3">
		<p>· 您是否一直在期待一份自己的事业，却苦无合适的机会？</p>
		<p>· 您是否看到了一些可能得机会，却困于资金、资源等问题，而未能实施？！</p>
		<p>· 您是否从事着实体经营，却因行业大环境的原因，而愁容满面？！</p>
		<p>· 您是否加入过微商直销团队，却被压货搞得人脉钱脉两脉具伤？！</p>
		<p>　...</p>
		<p>· 来吧！爬起来 擦干泪，加入乾坤岛，乾坤岛将与您携手同行，共创辉煌！</p>
		<p>· 乾坤岛是一个基于区块链和人工智能技术的高效约会、婚恋交友的互联网平台，致力于打造一个纯粹、高效、安全的社交网络空间。</p>
		<p>· 乾坤岛以“合作共赢、共创事业”为设计理念，设计了一套轻资产的共享利润的合伙人创业机制。</p>
        <!--<div>
          <p style="color:#e05d01;font-size: 0.4rem">现状</p>
          <p>· 您是否一直在期待一份自己的事业，却苦无合适的机会？</p>
          <p>· 您是否看到了一些可能得机会，却困于资金、资源等问题，而未能实施？！</p>
          <p>· 您是否从事着实体经营，却因行业大环境的原因，而愁容满面？！</p>
          <p>· 您是否加入过微商直销团队，却被压货搞得人脉钱脉两脉具伤？！</p>
        </div>
        <div>
          <img src="../../images/spread/jiantou.png"/>
          <img src="../../images/spread/jiantou.png"/>
          <img src="../../images/spread/jiantou.png"/>
          <img src="../../images/spread/jiantou.png"/>
          <img src="../../images/spread/jiantou.png"/>
          <img src="../../images/spread/jiantou.png"/>
        </div>
        <div>
          <p style="font-size: 0.4rem">未来</p>
          <p>· 来吧！爬起来 擦干泪，加入乾坤岛，乾坤岛将与您携手同行，共创辉煌！</p>
          <p>· 乾坤岛是一个基于区块链和人工智能技术的高效约会、婚恋交友的互联网平台，致力于打造一个纯粹、高效、安全的社交网络空间。</p>
          <p>· 乾坤岛以“合作共赢、共创事业”为设计理念，设计了一套轻资产的共享利润的合伙人创业机制。</p>
        </div>-->
      </div>
      <img class="c4" src="../../images/spread/line.png">
      <div class="c5">
        <p>一、加盟条件 <img src="../../images/spread/jiantou.png"/></p>
        <p>1．认同乾坤岛价值观，有事业心，有强烈的成功欲望；</p>
        <p>2．乐于助人，为人正直，无犯罪记录，无不良嗜好；</p>
        <p>3．选购合伙人大礼包。</p>
      </div>
      <div class="c6">
        <p>二、支持政策 <img src="../../images/spread/jiantou.png"/></p>
        <p>1．普通合伙人永不掉级、享受终身分成；</p>
        <p>2．用户缴纳会员费分成；</p>
        <p>3．用户虚拟道具消费分成；</p>
        <p>4．用户商城购物消费分成；</p>
        <p>5．用户活动报名费分成；</p>
        <p>6．用户升级成合伙人的收益分成；</p>
        <p>7．享受乾坤岛给予普通合伙人的各项培训、业绩奖励等福利政策；</p>
        <p>8．升级区域运营合伙人绿色通道。</p>
      </div>
    </div>
    <div class="button" @click="toLink"></div>
	<share :show="showShare" :shareTitle="shareTitle" :shareDesc="shareDesc" :shareImg="shareImg" :shareUrl="shareUrl" @changeShow="changeShow"></share>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
import { wxShare } from '@js/wxjssdk'
import Share from '@/components/home/share.vue'
import routerBack from '@/plus/routerBack.js';
	routerBack.init("spread",{
		showShare:null
	})
  export default {
    name: 'spread',
	mixins:[routerBack],
    components: {
      Loading,
	  Share,
    },
    data() {
      return {
        isloading: false,
		showShare: false,
		shareTitle:'',
		shareDesc:'',
		shareImg:'',
		shareUrl:'',
      }
    },
    watch:{

    },
    computed: {
		
    },
    mounted() {
		const t=this;
		let shareTitle="乾坤岛普通合伙人介绍";
		let shareDesc="加入乾坤岛合伙人，一起来赚钱做事业吧!";	
		let shareLink =this.$store.state.baseURL+"/api/account/publicAddressLoginUrl?&state=spread"
		if(this.$store.state.userInfo.id){
		  shareLink = shareLink + "__pid_"+this.$store.state.userInfo.jyNumber+ "_mytaskId_47";
		}
		t.shareTitle=shareTitle;
		t.shareDesc=shareDesc;
		t.shareUrl=shareLink;
		  wxShare&&wxShare({
			  title: shareTitle, // 分享标题
			  desc: shareDesc, // 分享描述
			  link: shareLink, // 分享链接
			  imgUrl: this.$store.state.baseFrontEndURL+'static/logo.png', // 分享图标
			  debug:false
		  },{
			success(){
			//	alert("分享成功");
			},
			cancel(){
				//alert("分享失败");
			}
		  });
    },
    methods: {
		clickShare() {
			this.showShare = !this.showShare;
		  },
		  changeShow(val) {
        this.showShare = val;
      },
      goback() {
        this.$router.go(-1);
      },
      toLink() {
        this.$router.push({
          path: '/spreadPayList',
        })
      },
    }
  }
</script>
<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    background:url("../../images/spread/bg.jpg");
    background-size: cover;
    background-position: center;
    padding-bottom: 0;
    box-sizing: border-box;
    overflow-y: auto;
	overflow-x:hidden;
    position: relative;
    &:before{
      display: none !important;
    }
    .header {
      border-bottom: 0 solid #f2f2f2;
      position: fixed;
      width: 100%;
    }
    .header .top .left{
      left: 0.325rem;
    }
    .header .top a{
      position: absolute;
      padding: 3px;
      i{
        color:#FFF !important;
      }
    }
    .top{
      background-color: rgba(0,0,0,0) !important;
    }
    .content{
      .c1{
        margin:0.64rem 7.44rem 0;
        width: 2.7rem;
        height: 0.7rem;
      }
      .c2{
        margin: 0.17rem auto 0;
        display: block;
        width: 100%;
        height: 8.83rem;
      }
      .c3{
        color:#fcf2aa;
        font-size: 0.3rem;
        margin: -1.64rem 0 0;
       padding:1.2rem 0.5rem 0;
      }
      .c4{
        margin: 0.72rem auto 0;
        width: 9.68rem;
        display: block;
      }
      .c5{
        margin-left: 0.65rem;
        margin-top: 0.7rem;
        color:#fcf2aa;
        font-size: 0.32rem;
        img{
          margin-left: 0.32rem;
          width: 0.3rem;
        }
      }
      .c6{
        margin-left: 0.65rem;
        margin-top: 1rem;
        color:#fcf2aa;
        font-size: 0.32rem;
        padding-bottom: 1.8rem;
        img{
          margin-left: 0.32rem;
          width: 0.3rem;
        }
      }
    }
    .button{
      background: url("../../images/spread/button.png");
      background-size: cover;
      background-position: center;
      width: 9.25rem;
      height: 1.21rem;
      position: fixed;
      bottom: 0.46rem;
      left:0.8rem;
    }
  }
</style>
