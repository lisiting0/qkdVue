<template>
  <div class="main jy_all_top">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        <p>普通和合伙人招商</p>
      </div>
    </div>
    <div class="image_div" :style="$store.state.isBrowser?'margin-top: 1.42rem;':''">
      <img src="static/activityDetailStatic/ptzs/ptzs_01.jpg" alt="">
      <img src="static/activityDetailStatic/ptzs/ptzs_02.jpg" alt="">
      <img src="static/activityDetailStatic/ptzs/ptzs_03.jpg" alt="">
      <img src="static/activityDetailStatic/ptzs/ptzs_04.jpg" alt="">
      <img src="static/activityDetailStatic/ptzs/ptzs_05.jpg" alt="">
      <img src="static/activityDetailStatic/ptzs/ptzs_06.jpg" alt="">
      <img src="static/activityDetailStatic/ptzs/ptzs_07.jpg" alt="">
      <img src="static/activityDetailStatic/ptzs/ptzs_08.jpg" alt="">
      <img src="static/activityDetailStatic/ptzs/ptzs_09.jpg" alt="">
    </div>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
import { wxShare } from '@js/wxjssdk'
  export default {
    name: "ordinaryInvestment",//静态详情页面
    components: {
      Loading,
      Back,
    },
    data() {
      return {
        isloading: false,
      }
    },
    watch: {},
    computed: {},
    mounted() {
		 let shareTitle="乾坤岛合伙人政策介绍";
		let shareDesc="快来看看乾坤岛合伙人政策，一起来发家致富吧！";	
		let shareLink =this.$store.state.baseURL+"/api/account/publicAddressLoginUrl?&state=ordinaryInvestment"
		if(this.$store.state.userInfo.id){
		  shareLink = shareLink + "__pid_"+this.$store.state.userInfo.jyNumber+ "_taskId_38";
		}
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
    destroyed() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .image_div {
    font-size: 0;
    overflow: hidden;
    background-color: #FFF;
    img {
      width: 100%;
      display: block;
    }
  }

</style>
