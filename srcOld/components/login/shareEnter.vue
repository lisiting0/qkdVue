<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="title">
      <img src="../../images/home/share/hi.jpg"/>
      <p>
        {{userInfo.aliasName}} 邀请您加入 乾坤岛-婚恋交友平台， 认识更多单身朋友，找一个优质对象！
      </p>
    </div>
    <div class="user">
      <img :src="$utils.getFullPath(userInfo.headimgAttachmentId)">
      <div>
        <p>{{userInfo.aliasName}}</p>
        <p>来自:{{userInfo.userExt.cityName+userInfo.userExt.areaName}}</p>
        <p>职业:{{userInfo.userExt.profession}}</p>
      </div>
    </div>
    <div class="button_div" @click="linkTo('login')">
      接受邀请，我要加入
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
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';

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
      }
    },
    watch: {

    },
    async mounted () {
      $(".menu .icon_jy").addClass("cur")
      if(!this.$store.state.qrcode.pid){
        let qrcodeData={
          pid: this.$route.query.pid,
          id: this.$route.query.id
        }
        this.$store.commit("QRCODE", qrcodeData);
      }
      let result = await this.$server.getUserInfo({userId: this.$store.state.qrcode.id});
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
    components: {
      Loading,
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
      img{
        width: 2.77rem;
        height: 2.77rem;
        border-radius: 50%;
      }
      div{
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
</style>
