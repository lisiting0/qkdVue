<template>
  <div class="main jy_all_top" :class="'jy_userInfo'+(datingId?' showActInfo':'')"  v-if="userInfo">
    <Loading v-if="isloading"></Loading>
    <div class="header" :class="showBackgroundColor == true ? 'backgroundColor' :''">
      <div class="top">
        <Back class="left" v-if="!datingId"><i class="iconfont">&#xe613;</i></Back>
        <a v-else class="left" @click="hiddenInfo"><i class="iconfont">&#xe613;</i></a>
        <a class="right" @click="clickShare" v-if="!datingId&$store.state.userInfo.id!=id"><i class="iconfont">&#xe679;</i></a>
        <router-link :to="{name:'modifyData'}" class="right" style="font-size: 0.44rem" v-else><i class="iconfont">&#xe635;</i></router-link>
        <p>{{userInfo.aliasName}}</p>
      </div>
    </div>
    <div class="swiper_container" id="swiper_container">
      <swiper loop auto :show-dots="false" height="7.5rem" v-model="currIndex">
        <template v-if="coverimgAttachement&&coverimgAttachement.length>0">
          <swiper-item v-for="item in coverimgAttachement" :key="item"><img :src="getFullPath(item)"></swiper-item>
        </template>
      </swiper>
      <p class="swiper_count" v-if="coverimgAttachement.length>0">{{(currIndex+1)}} / {{coverimgAttachement.length}}</p>
      <p class="swiper_count" v-else>0 / 0</p>
      <p class="rz spyrz" v-if="userInfo.videoStatus==1"><i class="spyrz_icon"></i>视频已认证</p>
      <p class="rz yjbzj"><i class="yjbzj_icon"></i>已交保证金</p>
    </div>
    <div class="jy_info_desc">
      <div class="jy_info_desc_t">
        <div class="jy_info">
          <span class="aliasName">{{userInfo.aliasName}} </span><span class="gz_count"><i class="iconfont">&#xe642;</i>210</span><span class="sh_count"><i></i>96</span>
          <p class="jy_info_ico"><em class="jy_auth_age"><i class="iconfont">{{$store.state.userInfo.sex==2?'&#xe602;':'&#xe605;'}}</i>{{userInfo.age}}</em><em class="jy_xz">{{userInfo.userExt.constellation}}</em></p>
          <div class="pp_val">
            <i class="iconfont">&#xe612;</i>
            <span>84%</span>
          </div>
        </div>
        <!--<i class="jy_info_desc_img" :style="'background-image:url('+getFullPath(userInfo.headimgAttachmentId)+');'"></i>-->
        <!--<p class="address_distance" v-if="userInfo.userExt&&userInfo.userExt.cityName"> {{userInfo.userExt.cityName}} {{userInfo.userExt.areaName}} </p>-->
        <!--<p class="address_distance" v-else> 未知星球 </p>-->
        <!--<template v-if="$store.state.userInfo.id!=id">-->
        <!--<i class="jy_info_desc_gz" @click="followFriend(id)" v-if="userInfo.isFollow==0">关注</i>-->
        <!--<i class="jy_info_desc_gz" @click="unfollowFriend(id)"v-if="userInfo.isFollow==1">取消关注</i>-->
        <!--</template>-->
      </div>
      <p class="jy_info_qm">{{userInfo.selfLabel?userInfo.selfLabel:'愿得一人心,白首不相离'}}</p>
    </div>
    <div class="jy_info_title">动态</div>
    <div class="bg_white jy_info_com">
      <img src="../../images/w4.jpg" />
      <img src="../../images/w4.jpg" />
      <img src="../../images/w4.jpg" />
      <img src="../../images/w4.jpg" />
      <img src="../../images/w4.jpg" />
    </div>
    <div class="jy_info_title">账号信息</div>
    <div class="bg_white jy_info_account">
      <div class="dj">
        <i class="yhdj_icon"></i>
        <div class="dj_right">
          <p>用户等级</p>
          <p>Lv.{{userInfo.level}}</p>
        </div>
      </div>
      <div class="dj">
        <template v-if="userInfo.vipType">
          <i></i>
          <div class="dj_right">
            <p>用户等级</p>
            <p>Lv.{{userInfo.level}}</p>
          </div>
        </template>
        <template v-else>
          <div class="dj_right hydj_right">
            <p>会员等级</p>
            <p>暂未开通会员</p>
          </div>
        </template>
      </div>
    </div>
    <div class="jy_info_title">{{$store.state.userInfo.id!=id?"她":"我"}}的认证</div>
    <div class="bg_white jy_info_rz">
      <ul class="rz_list">
        <template v-if="$store.state.userInfo.id!=id">
          <li :class="{ok:userInfo.idStatus==1}">
            <a> <img :src="imgs.idcard" class="idCard"/></a><div>实名</div>
          </li>
          <li :class="{ok:userInfo.carStatus==1}">
            <a> <img :src="imgs.car" class="car"/></a><div>车产</div>
          </li>
          <li :class="{ok:userInfo.videoStatus==1}">
            <a> <img :src="imgs.video" class="video"/></a><div>视频</div>
          </li>
          <li :class="{ok:userInfo.houseStatus==1}">
            <a> <img :src="imgs.house" class="house"/></a><div>房产</div>
          </li>
          <li :class="{ok:userInfo.healthyStatus==1}">
            <a> <img :src="imgs.health" class="health"/></a><div>健康</div>
          </li>
          <li class="ok">
            <a> <img src="../../images/phone_icon.png" class="health"/></a><div>手机</div>
          </li>
        </template>
        <template v-else>
          <li :class="{ok:userInfo.idStatus==1}" v-if="userInfo.idStatus==1 || userInfo.idStatus==2">
            <a> <img :src="imgs.idcard" class="idCard"/></a><div>实名</div>
          </li>
          <router-link :to="{name:'identityAuth'}" tag="li" v-else>
            <a> <img :src="imgs.idcard" class="idCard"/></a><div>实名</div>
          </router-link>
          <li :class="{ok:userInfo.carStatus==1}" v-if="userInfo.carStatus==1 || userInfo.carStatus==2">
            <a> <img :src="imgs.car" class="car"/></a><div>车产</div>
          </li>
          <router-link :to="{name:'carAuth'}" tag="li" v-else>
            <a> <img :src="imgs.car" class="car"/></a><div>车产</div>
          </router-link>
          <li :class="{ok:userInfo.videoStatus==1}" v-if="userInfo.videoStatus==1 || userInfo.videoStatus==2">
            <a> <img :src="imgs.video" class="video"/></a><div>视频</div>
          </li>
          <router-link :to="{name:'videoAuth'}" tag="li" v-else>
            <a> <img :src="imgs.video" class="video"/></a><div>视频</div>
          </router-link>
          <li :class="{ok:userInfo.houseStatus==1}" v-if="userInfo.houseStatus==1 || userInfo.houseStatus==2">
            <a> <img :src="imgs.house" class="house"/></a><div>房产</div>
          </li>
          <router-link :to="{name:'houseAuth'}" tag="li" v-else>
            <a> <img :src="imgs.house" class="house"/></a><div>房产</div>
          </router-link>
          <li :class="{ok:userInfo.healthyStatus==1}" v-if="userInfo.healthyStatus==1|| userInfo.healthyStatus==2">
            <a> <img :src="imgs.health" class="health"/></a><div>健康</div>
          </li>
          <router-link :to="{name:'healthyAuth'}" tag="li" v-else>
            <a> <img :src="imgs.health" class="health"/></a><div>健康</div>
          </router-link>
          <li class="ok">
            <a> <img src="../../images/phone_icon.png" class="health"/></a><div>手机</div>
          </li>
        </template>
      </ul>
    </div>
    <div class="bg_white jy_info_detail" :class="{paddingBottom2:$store.state.userInfo.id!=id}">
      <div class="detail_title zoyx_title"><i class="iconfont">&#xe641;</i>择偶意向</div>
      <div class="detail_info">
        <p><span>年龄</span><span>{{userInfo.age}}</span></p>
        <p><span>身高</span><span>165cm</span></p>
        <p><span>学历</span><span>本科</span></p>
        <p><span>居住地</span><span v-if="userInfo.userExt&&userInfo.userExt.cityName">{{userInfo.userExt.cityName}} {{userInfo.userExt.areaName}}</span><span v-else> 未知星球 </span></p>
        <p><span>购房情况</span><span>自购房</span></p>
        <p><span>购车情况</span><span>不限</span></p>
        <p><span>有无子女</span><span>无</span></p>
      </div>
      <div class="detail_title gyw_title"><i class="iconfont">&#xe6b3;</i>关于我</div>
      <div class="detail_info">
        <p><span>年龄</span><span>{{userInfo.age}}</span></p>
        <p><span>身高</span><span>165cm</span></p>
        <p><span>学历</span><span>本科</span></p>
        <p><span>居住地</span><span v-if="userInfo.userExt&&userInfo.userExt.cityName">{{userInfo.userExt.cityName}} {{userInfo.userExt.areaName}}</span><span v-else> 未知星球 </span></p>
        <p><span>购房情况</span><span>自购房</span></p>
        <p><span>购车情况</span><span>不限</span></p>
        <p><span>有无子女</span><span>无</span></p>
      </div>
      <div class="detail_title "><i class="iconfont">&#xe626;</i>私密资料</div>
    </div>


    <!--<div class="jy_info_comment" @click="linkTo('/myComments',{userId:id})">-->
    <!--<p class="jy_info_c_tit">{{$store.state.userInfo.id!=id?"她":"我"}}的动态</p>-->
    <!--</div>-->
    <!--<div class="jy_info_comment">-->
    <!--<p class="jy_info_tit_nnext">{{$store.state.userInfo.id!=id?"她":"我"}}的认证</p>-->
    <!--<ul class="rz_list">-->
    <!--<template v-if="$store.state.userInfo.id!=id">-->
    <!--<li :class="{ok:userInfo.idStatus==1}">-->
    <!--<a> <img :src="imgs.idcard" class="idCard"/></a><div>实名</div>-->
    <!--</li>-->
    <!--<li :class="{ok:userInfo.carStatus==1}">-->
    <!--<a> <img :src="imgs.car" class="car"/></a><div>车产</div>-->
    <!--</li>-->
    <!--<li :class="{ok:userInfo.videoStatus==1}">-->
    <!--<a> <img :src="imgs.video" class="video"/></a><div>视频</div>-->
    <!--</li>-->
    <!--<li :class="{ok:userInfo.houseStatus==1}">-->
    <!--<a> <img :src="imgs.house" class="house"/></a><div>房产</div>-->
    <!--</li>-->
    <!--<li :class="{ok:userInfo.healthyStatus==1}">-->
    <!--<a> <img :src="imgs.health" class="health"/></a><div>健康</div>-->
    <!--</li>-->
    <!--</template>-->
    <!--<template v-else>-->
    <!--<li :class="{ok:userInfo.idStatus==1}" v-if="userInfo.idStatus==1 || userInfo.idStatus==2">-->
    <!--<a> <img :src="imgs.idcard" class="idCard"/></a><div>实名</div>-->
    <!--</li>-->
    <!--<router-link :to="{name:'identityAuth'}" tag="li" v-else>-->
    <!--<a> <img :src="imgs.idcard" class="idCard"/></a><div>实名</div>-->
    <!--</router-link>-->
    <!--<li :class="{ok:userInfo.carStatus==1}" v-if="userInfo.carStatus==1 || userInfo.carStatus==2">-->
    <!--<a> <img :src="imgs.car" class="car"/></a><div>车产</div>-->
    <!--</li>-->
    <!--<router-link :to="{name:'carAuth'}" tag="li" v-else>-->
    <!--<a> <img :src="imgs.car" class="car"/></a><div>车产</div>-->
    <!--</router-link>-->
    <!--<li :class="{ok:userInfo.videoStatus==1}" v-if="userInfo.videoStatus==1 || userInfo.videoStatus==2">-->
    <!--<a> <img :src="imgs.video" class="video"/></a><div>视频</div>-->
    <!--</li>-->
    <!--<router-link :to="{name:'videoAuth'}" tag="li" v-else>-->
    <!--<a> <img :src="imgs.video" class="video"/></a><div>视频</div>-->
    <!--</router-link>-->
    <!--<li :class="{ok:userInfo.houseStatus==1}" v-if="userInfo.houseStatus==1 || userInfo.houseStatus==2">-->
    <!--<a> <img :src="imgs.house" class="house"/></a><div>房产</div>-->
    <!--</li>-->
    <!--<router-link :to="{name:'houseAuth'}" tag="li" v-else>-->
    <!--<a> <img :src="imgs.house" class="house"/></a><div>房产</div>-->
    <!--</router-link>-->
    <!--<li :class="{ok:userInfo.healthyStatus==1}" v-if="userInfo.healthyStatus==1|| userInfo.healthyStatus==2">-->
    <!--<a> <img :src="imgs.health" class="health"/></a><div>健康</div>-->
    <!--</li>-->
    <!--<router-link :to="{name:'healthyAuth'}" tag="li" v-else>-->
    <!--<a> <img :src="imgs.health" class="health"/></a><div>健康</div>-->
    <!--</router-link>-->
    <!--</template>-->
    <!--</ul>-->
    <!--</div>-->
    <!--<div class="jy_info_comment">-->
    <!--<p class="jy_info_c_tit" @click="linkTo('myEvaluation')">{{$store.state.userInfo.id!=id?"她":"我"}}的评价</p>-->
    <!--<div class="comment_con">-->
    <!--<template v-if="commentList">-->
    <!--<template v-if="commentList.length>0">-->
    <!--<div class="comment_arr" v-for="item in commentList">-->
    <!--<div class="user">-->
    <!--<i class="user_img" :style="'background-image:url('+getFullPath(item.user.headimgAttachmentId)+');'"></i>-->
    <!--<div>-->
    <!--&lt;!&ndash;<i class="question_icon"></i>&ndash;&gt;-->
    <!--<p>{{item.user&&item.user.aliasName}}</p>-->
    <!--<p>{{item.createDate}}</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="comment_text">-->
    <!--<span>评价：</span>-->
    <!--<span>{{item.content}}</span>-->
    <!--</div>-->
    <!--<router-link :to="{name:'act',query:{ id: item.object.id}}" tag="div" class="active_link">-->
    <!--<div>-->
    <!--<span class="jy-type xy" v-if="item.object.activityMethod==1">选缘</span>-->
    <!--<span class="jy-type qy" v-if="item.object.activityMethod==2">抢缘</span>-->
    <!--<span class="jy-type jy" v-if="item.object.activityMethod==3">竞缘</span>-->
    <!--<span class="jy-type zy" v-if="item.object.activityMethod==4">中缘</span>-->
    <!--<span class="jy-type py" v-if="item.object.activityMethod==5">配缘</span>-->
    <!--{{item.object.datingDesc}}-->
    <!--<i class="iconfont">&#xe702;</i>-->
    <!--</div>-->
    <!--</router-link>-->
    <!--</div>-->
    <!--</template>-->
    <!--<template v-else>-->
    <!--<div class="no-data">暂无评价</div>-->
    <!--</template>-->
    <!--</template>-->
    <!--</div>-->
    <!--</div>-->
    <!--<dl class="jy_info_zl" :class="{paddingBottom2:$store.state.userInfo.id!=id}">-->
    <!--<dt></dt>-->
    <!--<dd>-->
    <!--<p class="jy_i_zl_tit">{{$store.state.userInfo.id!=id?"她":"我"}}的个人信息</p>-->
    <!--<div class="personal_info" v-if="userInfo.userExt">-->
    <!--<p>家乡：{{userInfo.userExt.cityName}} {{userInfo.userExt.areaName}}</p>-->
    <!--<p>星座：{{userInfo.userExt.constellation}} </p>-->
    <!--<p>职业：{{userInfo.userExt.profession}}</p>-->
    <!--<p>学校：{{userInfo.userExt.school}}</p>-->
    <!--<p v-if="userInfo.userExt.emotion==0">情感状态：保密</p>-->
    <!--<p v-else-if="userInfo.userExt.emotion==1">情感状态：单身</p>-->
    <!--<p v-else-if="userInfo.userExt.emotion==2">情感状态：恋爱</p>-->
    <!--<p v-else-if="userInfo.userExt.emotion==3">情感状态：已婚</p>-->
    <!--<p v-else-if="userInfo.userExt.emotion==4">情感状态：分居</p>-->
    <!--</div>-->
    <!--</dd>-->
    <!--</dl>-->

    <p class="jy_info_xy" v-if="datingId&&$store.state.userInfo.id!=id&&select">
      <i class="jy_info_select" @click="xySelect">确定选择</i>
      <i  v-if="userInfo.isFollow==0" @click="followFriend(id)">关注</i>
      <i  v-else-if="userInfo.isFollow==1" @click="unfollowFriend(id)">取消关注</i>
    </p>
    <p class="jy_info_gz" v-else-if="$store.state.userInfo.id!=id">
      <i v-if="!datingId" @click="intoChat(userInfo.id,userInfo.aliasName)" class="dialogue">对话</i>
      <i  v-if="userInfo.isFollow==0" @click="followFriend(id)">关注</i>
      <i  v-else-if="userInfo.isFollow==1" @click="unfollowFriend(id)">取消关注</i>
    </p>
    <div v-transfer-dom>
      <popup v-model="showShare" height="35%" :hide-on-blur="true" style="background-color: #FFFFFF;border-top-left-radius: 0.4rem;border-top-right-radius: 0.4rem;">
        <div class="sharePopup">
          <ul>
            <li class="friends-icon"><router-link :to="{name:'home'}">好友/群组</router-link></li>
            <li class="circle-icon"><router-link :to="{name:'home'}">朋友圈</router-link></li>
            <li class="wxFriends-icon"><router-link :to="{name:'home'}">微信好友</router-link></li>
            <li class="qq-icon"><router-link :to="{name:'home'}">QQ好友</router-link></li>
            <li class="qqSpace-icon"><router-link :to="{name:'home'}">QQ空间</router-link></li>
            <li class="report-icon"><router-link :to="{name:'home'}">举报</router-link></li>
            <li class="notInterested-icon"><router-link :to="{name:'home'}">不感兴趣</router-link></li>
          </ul>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import car from '@/images/car.png'
  import idcard from '@/images/idcard.png'
  import video from '@/images/video_icon.png'
  import house from '@/images/house.png'
  import health from '@/images/health.png'
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import { TransferDom, Popup,Swiper,SwiperItem} from 'vux';
  export default {
    name: 'recharge',
    directives: {
      TransferDom
    },
    props: ['select','actDatingId','userId'],
    components: {
      Loading,
      Back,
      Popup,
      Swiper,
      SwiperItem,
    },
    data () {
      return {
        isloading:false,
        showBackgroundColor:false,
        showShare:false,//分享弹出层
        imgs: {car: car, idcard: idcard, house: house, health: health,video:video},
        id:null,//用户id
        datingId:this.$route.query.datingId||this.actDatingId,//选缘时使用
        userInfo:null,
        commentList:null,
        currIndex:0,
        coverimgAttachement:[],
      }
    },
    destroyed () {
      $("body").removeClass("lgray");
      window.removeEventListener('touchmove', this.handleScroll)
    },
    mounted () {
      $("body").addClass("lgray");
      window.addEventListener('touchmove', this.handleScroll)
      const t=this;
      t.id=this.userId||t.$route.query.id;
      t.getUserInfo();
      t.getComment();
      t.$nextTick(()=>{
        t.setBgImg();
      });
    },
    methods :{
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let offsetTop = document.querySelector('#swiper_container').offsetTop;
        if (scrollTop > offsetTop) {
          this.showBackgroundColor = true
        } else {
          this.showBackgroundColor = false
        }
      },
      clickShare() {
        this.showShare = !this.showShare;
      },
      hiddenInfo(){
        this.$emit('hiddenInfo');
      },
      linkTo (link,query) {
        this.$router.push({
          path: link,
          query
        })
      },
      intoChat(id,name){
        if(window.api){
          this.$router.push({
            path: "/chatWindow",
            query:{
              id:id,
              name:name,
            }
          })
        }else{
          this.$router.push({
            path: "/chatWindowWeb",
            query:{
              id:id,
              name:name,
            }
          })
        }
        // this.$router.push({
        //   path: "/chatWindow",
        //   query:{
        //     id:id,
        //     name:name,
        //   }
        // })
      },
      getFullPath (path) {
        return this.$utils.getFullPath(path)
      },
      setBgImg(){
        $("a,i,em,li,div").each(function(){//加载背景图片
          const bgimg=$(this).attr("bgImg");
          if(bgimg){
            $(this).css({"background-image":"url("+bgimg+")"});
            $(this).attr("bgImg","");
          }
        });
      },
      event(index) {
        this.isActive = !!index;
      },
      async getUserInfo() {
        const _this = this;
        _this.$vux.loading.show();
        let newsResult = await _this.$server.userHomePage({userId:_this.id});

        _this.userInfo = newsResult.data.data;
        _this.coverimgAttachement = (_this.userInfo.coverimgAttachementId&&_this.userInfo.coverimgAttachementId.split(','))||[];
        _this.$vux.loading.hide();
        _this.$nextTick(()=>{
          _this.setBgImg();
          this.datingId&&this.$emit('openWin');
        });
      },
      async followFriend(id){ //关注好友接口
        this.$vux.loading.show()
        await this.$server.followFriend(id);
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: '关注成功',
          position: 'middle',
          width: 'auto',
        })
        this.userInfo.isFollow=1;
      },
      async unfollowFriend(id){ //取消关注好友接口
        this.$vux.loading.show()
        await this.$server.unfollowFriend(id);
        this.$vux.loading.hide();
        this.$vux.toast.show({
          type: 'text',
          text: '取消关注成功',
          position: 'middle',
          width: 'auto',
        })
        this.userInfo.isFollow=0;
      },
      async xySelect(){
        const t=this;
        try{
          const result =await t.$server.xySelect({
            candidateId:t.id,
            datingActivityId:t.datingId
          });
          t.hiddenInfo();
        }catch(e){

        }
      },
      async getComment(){
        const t=this;
        const result= await t.$server.commentList({
          businessType:5,
          rid:t.id,
        })
        if(!t.commentList){
          t.commentList=[];
        }
        if(result.data.list){
          t.commentList.push(...result.data.list);
        }
      },
      onIndexChange(index){
        this.index = index
      }
    }
  }
</script>
<style scoped lang="scss">
  .main {
    padding-bottom: 0;
    &:before {
      content: "";
      position: fixed;
      display: block;
      z-index: 99;
      left: 0;
      top: 0;
      width: 100%;
      height: 0.75rem;
      background-size: 100%;
      background-color: #3a3845;
    }
    .backgroundColor{
      background-color: #fff;
    }
    .photos {
      padding-top: 0.2rem;
      li {
        width: 20%;
        margin-left: 0.3rem;
        display: inline-block;
        &:nth-of-type(4n+1) {
          margin-left: 0.4rem;
        }
        div {
          width: 100%;
          padding-bottom: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }
    .swiper_container {
      position: relative;
      margin-top: 0.7rem;
      background-image: url("../../images/userInfoBg.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      .swiper_count {
        position: absolute;
        right: 0.46rem;
        bottom: 0.4rem;
        width: 1.2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        color: #fff;
        font-size: 0.28rem;
        border-radius: 0.3rem;
        background-color:rgba(0,0,0,0.2);
        text-align: center;
      }
      img {
        width: 100%;
        height: auto;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      .rz{
        position: absolute;
        right: 0.46rem;
        width: 2.6rem;
        height: 0.7rem;
        line-height: 0.75rem;
        color: #fff;
        font-size: 0.28rem;
        border-radius: 0.2rem;
        background-color:rgba(0,0,0,0.2);
        text-align: center;
        &.spyrz{
          bottom: 4rem;
          i{
            display: inline-block;
            vertical-align: middle;
            width: 0.29rem;
            height: 0.3rem;
            background: url("../../images/spyyz_icon.png") no-repeat;
            background-size: 100% 100%;
            margin-right: 0.2rem;
          }
        }
        &.yjbzj{
          bottom: 3rem;
          i{
            display: inline-block;
            vertical-align: middle;
            width: 0.27rem;
            height: 0.32rem;
            background: url("../../images/bzj_icon.png") no-repeat;
            background-size: 100% 100%;
            margin-right: 0.2rem;
          }
        }
      }
    }
  }
</style>

