<template>
  <div class="main jy_all_top jy_state_top">
    <div class="header">
      <div class="top">
		<Back class="left" v-if="from!='showWin'"><i class="iconfont">&#xe613;</i></Back>
        <a v-else class="left" @click="hiddenInfo"><i class="iconfont">&#xe613;</i></a>
		<a v-if="!$store.state.isBrowser" class="right" @click="clickShare"><i class="iconfont">&#xe679;</i></a>
        <p>乾坤岛介绍</p>
      </div>
    </div>
    <div class="content">
		<video id="videoIntro" :poster="fillpath('staticAct/img/introduce/poster1.jpg')" :width="width" :height="height" preload="auto" src="http://qkd.iceinfo.net/userfiles/qkdIntroduce.mp4" controls="controls" >
		  </video>
		<ul class="jy_act_staticContent">
			<li><img :src="fillpath('staticAct/img/introduce/intro1.jpg')" class="jy_act_staticContent_img"></li>
			<li><img :src="fillpath('staticAct/img/introduce/intro2.jpg')" class="jy_act_staticContent_img"></li>
			<li><img :src="fillpath('staticAct/img/introduce/intro3.jpg')" class="jy_act_staticContent_img"></li>
			<li><img :src="fillpath('staticAct/img/introduce/intro4.jpg')" class="jy_act_staticContent_img"></li>
			<li><img :src="fillpath('staticAct/img/introduce/intro5.jpg')" class="jy_act_staticContent_img"></li>
			<li><img :src="fillpath('staticAct/img/introduce/intro6.jpg')" class="jy_act_staticContent_img"></li>
			<li><img :src="fillpath('staticAct/img/introduce/intro7.jpg')" class="jy_act_staticContent_img"></li>
			<li><img :src="fillpath('staticAct/img/introduce/intro8.jpg')" class="jy_act_staticContent_img"></li>
		</ul>
    </div>
	<share :show="showShare" :shareTitle="shareTitle" :shareDesc="shareDesc" :shareImg="shareImg" :shareUrl="shareUrl" @changeShow="changeShow"></share>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import { wxShare } from '@js/wxjssdk'
  import Share from '@/components/home/share.vue'
	import routerBack from '@/plus/routerBack.js';
	routerBack.init("qkdIntroduce",{
		showShare:null
	})
  
  export default {
    name: "qkdIntroduce",//报名活动
	mixins:[routerBack],
    components: {
      Loading,
      Back,
	  Share,
    },
	props:["from"],
    data() {
      return {
        showBack:false,
        width:640,
        height:368,
		showShare: false,
		shareTitle:'',
		shareDesc:'',
		shareImg:'',
		shareUrl:'',
      }
    },
    created() {
      this.width=window.innerWidth||document.documentElement.clientWidth;
      this.height=this.width*368/640
    },
    mounted() {
      const t = this;
      this.showBack = t.$route.query.showBack
      $("body").addClass("gray");

      let shareTitle="介绍大家一个纯粹、高效、安全的单身男女交友平台";
      let shareDesc="乾坤岛架设在区块链和人工智能技术之上，可以为真正有交友需求的异性男女提供一个纯粹、高效、安全的社交网络平台，它由相亲牵线、高效约会及月老宝阁三大模块组成。";
      let shareLink =this.$store.state.baseURL+"/api/account/publicAddressLoginUrl?&state=qkdIntroduce"
      if(t.$store.state.userInfo.id){
        shareLink = shareLink + "__pid_"+this.$store.state.userInfo.jyNumber + "_mytaskId_33"
      }
      t.shareTitle=shareTitle;
		t.shareDesc=shareDesc;
		t.shareUrl=shareLink;
      wxShare&&wxShare({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: t.$store.state.baseFrontEndURL+'static/logo.png', // 分享图标
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
	computed:{

	},
	beforeDestroy(){
		let video=document.getElementById('videoIntro');
		video&&video.stop();
	},
    destroyed() {
      $("body").removeClass("gray");
    },
	watch:{

	},
    methods: {
		fillpath(src){
			const t=this;
			return t.$store.state.baseFrontEndURL+src;
		},
		hiddenInfo(){
			this.$emit("hiddenInfo");
		},
		clickShare() {
			this.showShare = !this.showShare;
		  },
		 changeShow(val) {
        this.showShare = val;
      },
    }
  }
</script>

<style scoped lang="scss">
  .content{
    font-size: 0;
    div{
      width:100%;
      background-position: center;
      background-size: 100% 100%;
      text-align: center;
      img{
        width: 2.58rem;
        height: 2.9rem;
        margin-top: 0.13rem;
      }
    }
  }
</style>
