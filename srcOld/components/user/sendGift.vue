<template>
  <div class="main jy_all_top jy_earn jy_state_top">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"></a><p>购买礼物</p>
      </div>
    </div>
    <div class="content-top" style="background-color: #f2f2f2">
    <div class="content bg_white">
      <i v-if="user.headimgAttachmentId" class="backImageCover" :style="'background-image:url('+$utils.getFullPath(user.headimgAttachmentId)+');width:1rem;height:1rem;border-radius: 50%;margin-right: 0.3rem;'"></i>
      <span v-if="user.aliasName">给<i>{{user.aliasName}}</i>送礼物</span><span @click.stop="selectFriend">{{user.aliasName==''?'选择好友':'更换好友'}}</span>
    </div>
    <div class="content2 bg_white"><span>余额：<i>{{this.$store.state.userInfo.userMoney}}</i>乾坤币</span><span @click="toLink('recharge')">获取乾坤币</span></div>
    </div>
    <div class="content3" :style="{height:myScrollerHeight+'px'}">
        <div v-for="v,num in giftList" :key="num" @click.stop="sendgift(v.id)">
          <img :src="$utils.getFullPath(v.giftImage)"/>
          <p>{{v.giftName}}</p>
          <p>乾坤币 {{v.jiaobi}}</p>
        </div>
    </div>
    <transition enter-active-class="slideInUp" leave-active-class="slideOutUp">
      <div class="selectGiftFriend" v-if="pagerouter==='selectGiftFriend'">
      <div>
        <div class="header">
          <div class="top">
            <Back class="left"><i class="iconfont">&#xe613;</i></Back><a @click.stop="sure" class="right">确定</a><p>选择好友</p>
          </div>
        </div>
        <div class="selectGiftFriendContent" :style="{height:myselectGiftFriendHeight+'px'}">
          <div class="search">
            <input type="text" placeholder="搜索" v-model="searchText">
          </div>
          <div class="friendItem" v-for="item in friendList">
            <i :style="'background-image:url('+$utils.getFullPath(item.jiaoyouUser.headimgAttachmentId)+');'"></i>
              <p>
                <span>{{item.jiaoyouUser.aliasName}}</span>
                <i @click.stop="selectUserM(item)" class="iconfont" :class="{select:item.rid==selectUser.id}">&#xe646;</i>
              </p>
          </div>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  export default {
    name: 'sendGift',
    data () {
      return {
        searchText:'',
        myselectGiftFriendHeight:0,
        pagerouter:'main',
        myScrollerHeight:0,
        isloading:false,
        user:{
          aliasName:'',
          headimgAttachmentId:'',
          id:'',
        },
        giftList:[],
        friendList:[],
        friendListOld:[],
        selectUser:{
          aliasName:'',
          headimgAttachmentId:'',
          id:'',
        }
      }
    },
    beforeRouteUpdate (to, from, next) {
      next();
      this.pagerouter = to.params.pagerouter;
    },
    components: {
      Loading,
      Back,
    },
    destroyed () {
      $("body").removeClass("sendGiftBg");
    },
    watch:{
      searchText(newVal){
        let list = this.$utils.deepCopy(this.friendListOld)
        this.friendList=list.filter(item=>{
           return item.jiaoyouUser.aliasName.indexOf(newVal)!=-1
        })
      }
    },
    async mounted () {
      this.myScrollerHeight = document.body.clientHeight - $(".content-top").height()-$(".header").height()-(0.75)*parseInt(document.documentElement.style.fontSize)-1;
      this.myselectGiftFriendHeight = document.body.clientHeight-$(".header").height()-(0.75)*parseInt(document.documentElement.style.fontSize)-1;
      $("body").addClass("sendGiftBg");
      this.getGift();
      let userInfo = await this.$server.getUserInfo({userId:this.$store.state.userId});
      this.$store.commit("LOGIN",userInfo.data.data);
      let data = {
        page:1,
        rows:10000
      }
      let result = await this.$server.myFriendsList(data);
      if(result.data.list){
        this.friendListOld = result.data.list;
        this.friendList = result.data.list;
      }
    },
    methods :{
      sendgift(giftId){
        if(this.user.id==""){
          this.$vux.toast.show({
            type:"text",
            text: "请先选择好友",
            position:"middle",
            width:"auto",
          });
          return;
        }
        const _this = this
        this.$vux.confirm.show({
          content: '确定支付乾坤币送礼吗?',
          onCancel () {
          },
          async onConfirm () {
            let data ={
              "receiverUser.id":_this.user.id,
              // "objectId":_this.activeId,
              "giftId":giftId,
              "amount":1
            }
            _this.$vux.loading.show()
            let result = await _this.$server.giveGift(data);
            _this.$vux.loading.hide()
            _this.$vux.toast.show({
              type:"success",
              text: '赠送成功',
              position:"middle",
              width:"auto",
            });
            setTimeout(()=>{
              _this.$router.go(-1);
            },500)
          }
        })
      },
      sure(){
        this.user=this.selectUser
        this.$router.go(-1);
      },
      selectFriend(){
        this.selectUser=this.user
        this.$router.push({
          path: "/sendGift/selectGiftFriend",
        })
      },
      selectUserM(user){
        this.selectUser = {
          aliasName:user.jiaoyouUser.aliasName,
          headimgAttachmentId:user.jiaoyouUser.headimgAttachmentId,
          id:user.rid,
        }
      },
      toLink(path){
        this.$router.push({
          path: "/"+path,
        })
      },
      async getGift(){
        let list = await this.$server.getGiftList()
        this.giftList = list.data.data||[];
        this.giftList.push(...list.data.data)
      },
    }
  }
</script>
<style lang="scss" scoped>
  @keyframes slideInUp {
    from {
      transform: translate3d(0, 100%, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideOutUp {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, 100%, 0);
    }
  }
  .slideInUp {
    animation-name: slideInUp;
  }

  .slideOutUp {
    animation-name: slideOutUp;
  }
  .slideOutUp, .slideInUp {
    animation-duration: 0.3s;
  }
  .bg_white{
    background-color: #FFF;
    padding:0 0.45rem;
  }
  .content{
    display: flex;
    align-items: center;
    height: 1.84rem;
    position: relative;
    img{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.3rem;
    }
    span{
      font-size: 0.48rem;
      color:#999999;
      i{
        color:#ff6d00;
        margin: 0 0.1rem;
      }
    }
    span:last-child{
      position:absolute;
      right: 0.45rem;
      display: inline-block;
      font-size: 0.32rem;
      width: 1.78rem;
      height: 0.48rem;
      line-height: 0.48rem;
      border: 1px solid #999;
      border-radius: 0.24rem;
      text-align: center;
    }
  }
  .content2{
    margin-top: 0.35rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.84rem;
    span{
      font-size: 0.48rem;
      color:#999999;
      i{
        color:#ff6d00;
        margin: 0 0.1rem;
      }
    }
    span:last-child{
      font-size: 0.32rem;
      display: inline-block;
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      width: 2.6rem;
      color:#000;
      background-color: #ffe456;
      border-radius: 0.35rem;
    }
  }
  .content3{
    box-sizing: border-box;
    padding:0.37rem 0.45rem 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    div{
      width: 3.2rem;
      margin-right: 0.13rem;
      text-align: center;
      background-color: #FFF;
      padding: 0.5rem 0 0;
      margin-bottom: 0.17rem;
      border-radius: 5px;
      overflow: hidden;
      &:nth-of-type(3n){
        margin-right: 0;
      }
      img{
        height: 1.77rem;
        max-width: 1.77rem;
      }
      p{
        font-size: 0.36rem;
        color:#a6a6ac;
      }
      p:last-child{
        font-size: 0.32rem;
        color:#000;
        font-weight: 500;
        padding: 0.3rem;
        background-color: #f2f4fc;
      }
    }
  }
  .selectGiftFriend{
    position: absolute;
    width: 100%;
    background-color: #f2f2f2;
    top:0;
    z-index: 10000;
    padding-top: 2.14rem;
    &>div{
      position:relative;
    }
    .friendItem{
      height: 1.6rem;
      display: flex;
      align-items: center;
      background-color: #FFF;
      padding: 0 0.3rem;
      i{
        width: 1rem;
        height: 1rem;
        background-size: cover;
        background-position: center;
        border-radius: 0.5rem;
        margin-right: 0.3rem;
      }
      p{
        height: 1.6rem;
        line-height: 1.6rem;
        flex-grow: 1;
        border-bottom: 1px solid #f2f2f2;
        position: relative;
        i{
          position:absolute;
          right: 0;
          top:0.5rem;
          color:#f6f6f6;
          height: 0.6rem;
          line-height: 0.6rem;
          width: 0.6rem;
          border-radius: 50%;
          border: 1px solid #e7e7e7;
          text-align: center;
          font-size: 0.4rem;
        }
        .select{
          color:#FFF;
          background-color: #ff8a00;
        }
      }
    }
  }
  .jy_isBrowser{
    .selectGiftFriend{
      padding-top: 1.39rem;
    }
  }
</style>

