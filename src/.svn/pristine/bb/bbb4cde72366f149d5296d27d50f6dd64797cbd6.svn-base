<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div v-if="!this.$route.query.pid" class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>邀请好友
      </div>
    </div>
    <div class="title">
      <img src="../../images/home/share/hi.jpg"/>
      <p v-if="this.$route.query.pid">
        {{userInfo.aliasName}} 邀请您加入 乾坤岛-婚恋交友平台， 认识更多单身朋友，找一个优质对象！
      </p>
      <p v-else>
        {{userInfo.aliasName}} 点击右上角邀请好友加入乾坤岛-婚恋交友平台
      </p>
    </div>
    <div class="user">
      <img :src="$utils.getFullPath(userInfo.headimgAttachmentId)">
      <div>
        <p>{{userInfo.aliasName}}</p>
        <p>来自:{{userInfo.userExt.cityName+userInfo.userExt.areaName}}</p>
        <p>职业:{{userInfo.userExt.profession}}</p>
      </div>
      <div v-if="!this.$route.query.pid" @click="showQRCode=true">
        <vue-qr :logoSrc="imageUrl" :text="qrcodeValue" :size="80" :margin="0" :logoMargin="3" :logoCornerRadius="8"></vue-qr>
        <p>扫一扫登岛</p>
      </div>
    </div>
    <div v-if="this.$route.query.pid" class="button_div" @click="linkTo('login')">
      接受邀请，我要加入
    </div>
    <div v-else class="button_div">
      已邀请了{{$store.state.userInfo.agentNumber}}个好友，赚了{{$store.state.userInfo.agentNumber*30}}个乾坤币
    </div>
    <div class="content">
      <p>加入乾坤岛，即可拥有：</p>
      <div>
        <img src="../../images/home/share/p1.png">
        <p>可以一起参加各种精彩好玩的线下联谊活动， 快速找到心仪的Ta，同时还可以认识很我志同道合的朋友，扩大自己的圈子，丰富生活..</p>
      </div>
      <div>
        <img src="../../images/home/share/p2.png">
        <p>可以浏览来自各大城市的优质单身青年资料， 查看Ta的照片，关注心仪的Ta的动态，与心仪的Ta互动，一不小心就脱单哦...</p>
      </div>
      <div>
        <img src="../../images/home/share/p3.png">
        <p>还在纠结么？赶快加入乾坤岛这个优质婚恋交友平台！开启人生幸福之旅...</p>
      </div>
    </div>
    <div class="friend_div">
      <p>{{userInfo.aliasName}}的单身好友们</p>
      <div v-for="v in friendList">
        <img :src="$utils.getFullPath(v.headimgAttachmentId)">
        <div>
          <p>{{v.aliasName}}</p>
          <p><i v-if="v.sex==1" style="color: #FE84AB;" class="iconfont">&#xe64a;</i><i v-if="v.sex==2" style="color: #00b4ff;" class="iconfont">&#xe605;</i><span>{{v.age}}岁</span><span>{{v.constellation}}</span>{{v.cityName+v.areaName}}</p>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showQRCode" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
        <div class="qrcode_con">
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
  import Back from '@other/back.vue';
  import { wxShare,hideOptionMenu,showOptionMenu } from '@js/wxjssdk';
  import { TransferDom,XDialog } from 'vux';
  import imageUrl from '../../images/logo_240.png'
  import VueQr from 'vue-qr'

  export default {
    name: 'shareEnter',
    data () {
      return {
        userInfo:{
          userExt: {
          },
        },
        friendList:[],
        isloading:false,
        hyNumber:0,
        qkbNumber:0,
        showQRCode:false,
        imageUrl:imageUrl,
        qrcodeValue: this.$store.state.baseURL+'/api/account/publicAddressLoginUrl?&state=shareEnter'+ (this.$store.state.isLogin?'__pid_'+this.$store.state.userInfo.jyNumber+"_uid_"+ this.$store.state.userInfo.id:''),
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Loading,
      Back,
      XDialog,
      VueQr,
    },
    watch: {

    },
    async mounted () {
      $(".menu .icon_jy").addClass("cur")
      let qrcodeData={};
      if(!this.$store.state.qrcode.pid){
        if(this.$route.query.pid){
          qrcodeData={
            pid: this.$route.query.pid,
            uid: this.$route.query.uid
          }
          this.$store.commit("QRCODE", qrcodeData);
        }else{
          showOptionMenu&&showOptionMenu();//微信显示菜单功能
          let shareTitle="介绍大家一个纯粹、高效、安全的单身男女交友平台";
          let shareDesc="乾坤岛架设在区块链和人工智能技术之上，可以为真正有交友需求的异性男女提供一个纯粹、高效、安全的社交网络平台，它由相亲牵线、高效约会及月老宝阁三大模块组成。";
          wxShare&&wxShare({
            title: shareTitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: this.$store.state.baseURL+"/api/account/publicAddressLoginUrl?&state=shareEnter__pid_"+this.$store.state.userInfo.jyNumber+"_uid_"+this.$store.state.userInfo.id, // 分享链接
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
        }
      }
	  if(!qrcodeData.uid){
		qrcodeData={
            pid: this.$store.state.userInfo.jyNumber,
            uid: this.$store.state.userInfo.id
          }
	  }
      let result = await this.$server.getUserInfo({userId: qrcodeData.uid});
      this.userInfo = result.data.data

      let arr=this.$utils.lastMonth(new Date())
      let result1 = await this.$server.monthlyTaskRewardRanking({
        year: arr[0],
        month: arr[1]+1,
      });
      let friendList=result1.data.data;
      if(friendList.length>10){
        friendList.length=10;
      }
      this.friendList = friendList;
    },
    destroyed () {

    },
    methods: {
      linkTo(link, active) {
        let query = null
        if (active) {
          query = {
            active: active
          }
        }
        this.$router.push({
          path: link,
          query: query
        })
      },
      toUserInfo(item){
        this.$router.push({
          path: "/userInfo",
          query:{id:item.rid}
        })
      },
      intoChat(item){
        let query={
          id:item.rid,
          name:item.jiaoyouUser.aliasName,
        }
        if(window.api){
          this.$router.push({
            path: "/chatWindow",
            query:query
          })
        }else{
          this.$router.push({
            path: "/chatWindowWeb",
            query:query
          })
        }
      },
    }
  }
</script>
<style scoped lang="scss">
  .main{
    padding: 0 0.3rem;
    background-color: #FFF;
    .header{
      .top{
        background-color:#3a3845 ;
        color:#FFF;
        font-size: 0.6rem;
        position: relative;
        i{
          font-size: 0.52rem;
        }
        a{
          position:absolute;
          padding:3px;
        }
        .left{
          left:0.325rem;
        }
        .right{
          right:0.325rem;
          i{
            font-size: 0.42rem;
          }
        }
      }
    }
    .title{
      padding-top: 0.8rem;
      img{
        width: 1rem;
        height: 0.6rem;
      }
      p{
        font-size: 0.48rem;
        font-weight: 600;
      }
    }
    .user{
      margin-top: 1.27rem;
      display: flex;
      position: relative;
      img{
        width: 2.77rem;
        height: 2.77rem;
        border-radius: 50%;
      }
      &>div:nth-of-type(1){
        margin-left: 0.48rem;
        display: inline-flex;
        flex-direction:column;
        justify-content:center;
        p{
          font-size: 0.42rem;
          color:#a7a7a7;
        }
        p:first-child{
          font-size: 0.48rem;
          font-weight: 600;
          color:#000;
        }
      }
      &>div:nth-of-type(2){
        position: absolute;
        right: 0.2rem;
        top:0.1rem;
        div{
          width: 80px;
          height: 80px;
        }
        p{
          font-size: 0.42rem;
          font-weight: 500;
          text-align: center;
        }
      }
    }
    .button_div{
      margin-top: 0.6rem;
      background-color: #ff2448;
      font-size: 0.5rem;
      color: #fff;
      font-weight: 600;
      height: 1.40rem;
      line-height: 1.4rem;
      text-align: center;
      border-radius: 5px;
    }
    .content{
      margin-top: 1.28rem;
      p:first-child{
        font-size: 0.5rem;
        font-weight: 500;
        padding-left: 0.3rem;
        border-left: 4px #ff2448 solid;
        line-height: 1;
        margin-bottom: 1.12rem;
      }
      div{
        margin-bottom: 0.9rem;
        img{
          width: 0.85rem;
          height: 0.85rem;
          vertical-align: top;
          padding-top: 0.1rem;
        }
        p{
          font-size: 0.42rem;
          display: inline-block;
          margin-left: 0.35rem;
          width: 8.7rem;
          color:#6d6d6d;
          font-weight: 400;
        }
      }
    }
    .friend_div{
      margin-top: 1.14rem;
      &>p:first-child{
        font-size: 0.5rem;
        font-weight: 500;
        padding-left: 0.3rem;
        border-left: 4px #ff2448 solid;
        line-height: 1;
        margin-bottom: 1.06rem;
      }
      &>div{
        display: flex;
        padding-bottom: 0.58rem;
        img{
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
        }
        div{
          margin-left: 0.48rem;
          display: inline-flex;
          flex-direction:column;
          justify-content:center;
          p{
            font-size: 0.36rem;
            color:#a7a7a7;
            i.iconfont{
              font-size: 0.36rem;
              margin-right: 0.15rem;
            }
            span{
              margin-right: 0.15rem;
            }
          }
          p:first-child{
            font-size: 0.4rem;
            color:#000;
          }
        }
      }
    }
  }
  .qrcode_con{
    position: relative;
    .close-icon{
      position: absolute;
      right: 0.8rem;
      top: 0;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: linear-gradient(to right, #ff9a63 , #ff5b02); /* 标准的语法 */
      border: 1px solid #ffffff;
      i{
        color: #ffffff;
        font-size: 0.6rem;
      }
    }
    .qrcode_panel{
      width: 9.16rem;
      height: 10.86rem;
      background: url("../../images/code_border.png") no-repeat;
      background-size: cover;
      margin: 0 auto 1rem;

      p{
        &:nth-of-type(1){
          font-size: 0.48rem;
          color: #3f3c3f;
          line-height: 3rem;
        }
        &:nth-of-type(2),&:nth-of-type(3){
          font-size: 0.56rem;
          color: #3f3c3f;
          line-height: 1rem;
        }
      }
    }
  }
</style>
