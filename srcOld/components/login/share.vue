<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>邀请好友
      </div>
    </div>
    <div class="share_div" ref="scroll" :style="{'height':scrollHeight+'px'}">
      <div @click.stop>
        <ul>
          <li class="wxFriends-icon">
            <i style="color: #06d314" class="iconfont">&#xe681;</i> <a @click.stop="shareWebpage('session')">邀请微信好友</a>
            <i class="iconfont">&#xe702;</i>
          </li>
          <li class="qq-icon">
            <i style="color:#12B4F5;" class="iconfont">&#xe6a0;</i><a @click.stop="shareNews('QFriend')">邀请QQ好友</a>
            <i class="iconfont">&#xe702;</i>
          </li>
          <li class="circle-icon">
            <i style="color: #06d314" class="iconfont">&#xe6b1;</i><a @click.stop="shareWebpage('timeline')">邀请朋友圈好友</a>
            <i class="iconfont">&#xe702;</i>
          </li>
          <li class="qqSpace-icon">
            <i style="color:#F5C01C;" class="iconfont">&#xe6b4;</i><a @click.stop="shareNews('QZone')">邀请QQ空间好友</a>
            <i class="iconfont">&#xe702;</i>
          </li>
        </ul>
      </div>
      <div class="friend_user">
        <p>我邀请的好友</p>
        <div v-for="userInfo in friendList" :key="userInfo.id">
          <img :src="$utils.getFullPath(userInfo.headimgAttachmentId)">
          <div>
            <p>{{userInfo.aliasName}}</p>
            <p><i v-if="userInfo.sex==1" style="color: #FE84AB;" class="iconfont">&#xe64a;</i><i v-if="userInfo.sex==2" style="color: #00b4ff;" class="iconfont">&#xe605;</i><span>{{userInfo.age}}岁</span>{{userInfo.userExt.liveCityName+userInfo.userExt.liveAreaName}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';

  export default {
    name: 'share',
    data () {
      return {
        scroll:null,
        scrollHeight:0,
        scrollY: 0,
        currentIndex: null,
        isloading:false,
        loadRefresh:true,//下拉刷新
        loadInfinite:false, //上拉加载
        scrollitems:[],
        friendList:[],
        friendListOld:[],
        searchText:'',
      }
    },
    watch: {
      scrollY(newVal) {
        // 向下滑动的时候 newVal 是一个负数，所以当 newVal > 0 时，currentIndex 直接为 0
        if (newVal > 0) {
          this.currentIndex = null;
          return;
        }
        if(this.scrollitems.length===0){
          this.currentIndex = null;
          return;
        }
        // 计算 currentIndex 的值
        let scrollHeight = this.$refs.ul.scrollHeight;
        let scolly = -newVal-$(".search").height()-$(".friend_list").height();
        if(scolly<0){
          this.currentIndex = null;
          return;
        }
        let arr = this.scrollitems.slice(0);
        while(scolly>0){
          scolly = scolly-$("ul[data-zimu='"+arr.shift()+"']").height();
        }
        this.currentIndex = this.scrollitems.length-arr.length-1;
      },
      searchText(newVal){
        if(true){
          this.friendList = this.$utils.deepCopy(this.friendListOld)
          let list={}
          this.friendList.map(item=>{
            if(item.jiaoyouUser.aliasName.indexOf(newVal)!=-1){
              item.zimu = (pinyinUtil.getFirstLetter(item.jiaoyouUser.aliasName.substr(0,1))).toUpperCase();
              if(list[item.zimu]){
                list[item.zimu].push(item)
              }else{
                list[item.zimu]=[item]
              }
            }
          })
          this.scrollitems=[]
          this.friendList=[]
          for (let i in list){
            this.scrollitems.push(i);
            this.friendList.push(list[i])
          }
          this.scrollitems.sort((v1,v2)=>{
            if(v1=="#"){
              v1="~"
            }
            if(v2=="#"){
              v1="~"
            }
            return v1.charCodeAt(0)-v2.charCodeAt(0)
          });
          this.friendList.sort((v1,v2)=>{
            let n1 = v1[0].zimu;
            let n2 = v2[0].zimu;
            if(n1=="#"){
              n1="~"
            }
            if(n2=="#"){
              n2="~"
            }
            return n1.charCodeAt(0)-n2.charCodeAt(0)
          })
        }
      }
    },
    async mounted () {
      $(".menu .icon_jy").addClass("cur")
      this.scrollHeight = document.body.clientHeight-$(".header").height()-$(".menu").height()-0.75*parseInt(document.documentElement.style.fontSize)-3;
      let data = {
        page:1,
        rows:10000
      }
      let result = await this.$server.userFromMe();
      let list={}
      console.log(result)
      if(result.data.list){
        this.friendList = result.data.list;
      }

    },
    destroyed () {

    },
    components: {
      Loading,
      Back,
    },
    methods: {
      shareWebpage(Vscene){//分享到微信
        const t=this;
        if(!t.wx){
          t.wx=window.api.require('wx');
        }
        let obj={
          title : '介绍大家一个纯粹、高效、安全的单身男女交友平台',
          description : '乾坤岛架设在区块链和人工智能技术之上，可以为真正有交友需求的异性男女提供一个纯粹、高效、安全的社交网络平台，它由相亲牵线、高效约会及月老宝阁三大模块组成。',
          contentUrl:t.$store.state.baseURL+"/api/account/publicAddressLoginUrl?&state=shareEnter__pid_"+this.$store.state.userInfo.jyNumber+"_id_"+this.$store.state.userInfo.id,
          thumb : 'widget://image/logo_240.png',
        }
        t.wx&&t.wx.shareWebpage({
          scene : Vscene,
          ...obj,
        }, function(ret, err) {
          if (ret.status) {
            //alert(JSON.stringify(ret))
          } else {
            //alert(JSON.stringify(err))
          }
        });
      },
      shareNews(type){//分享到QQ
        const t=this;
        if(!t.qq){
          t.qq=window.api.require('QQPlus');
        }
        let obj={
          title : '介绍大家一个纯粹、高效、安全的单身男女交友平台',
          description : '乾坤岛架设在区块链和人工智能技术之上，可以为真正有交友需求的异性男女提供一个纯粹、高效、安全的社交网络平台，它由相亲牵线、高效约会及月老宝阁三大模块组成。',
          url:t.$store.state.baseURL+"/api/account/publicAddressLoginUrl?&state=shareEnter__pid_"+this.$store.state.userInfo.jyNumber+"_id_"+this.$store.state.userInfo.id,
          imgUrl: t.$store.state.baseFrontEndURL+'static/logo.png?'+new Date().getTime(),
        }
        t.qq&&t.qq.shareNews({
          ...obj,
          type:type
        },function(ret,err){
          if (ret.status){
            //alert("分享成功！");
          } else {
            //api.alert({msg: JSON.stringify(err)});
          }
        });
      }
    }
  }
</script>
<style scoped lang="scss">
  .main{
    padding-bottom: 0;
    &:before{
      background-color:#3a3845 ;
    }
    .header{
      .top{
        background-color:#3a3845 ;
        color:#FFF;
        font-size: 0.52rem;
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
    .share_div{
      position: relative;
      box-sizing: border-box;
      background-color: #F7F7F7;
      padding: 0 0.3rem;
      overflow: scroll;
      ul{
        li{
          border-bottom: 1px solid #f2f2f2;
          height: 1.4rem ;
          line-height: 1.4rem;
          font-size: 0.4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          i:first-child{
            font-size: 0.6rem;
          }
          a{
            flex-grow: 1;
            padding-left: 0.3rem;
          }
          i:last-child{
            font-size: 0.4rem;
            color:#adadad;
          }
        }
      }
      .friend_user{
        margin-top: 0.58rem;
        &>p{
          font-size: 0.5rem;
          font-weight: 500;
          padding-left: 0.3rem;
          border-left: 4px #ff2448 solid;
          line-height: 1;
        }
        &>div{
          display: flex;
          padding: 0.29rem 0;
          border-bottom: 1px #f2f2f2 solid;
          img{
            width: 1.18rem;
            height: 1.18rem;
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
  }
</style>
