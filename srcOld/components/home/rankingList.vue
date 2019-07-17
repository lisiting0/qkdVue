<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        <a class="right" @click="clickShare"><i class="iconfont">&#xe679;</i></a>最美娇友
      </div>
    </div>
    <share :show="showShare"  @changeShow="changeShow"></share>
    <div class="myscroll">
      <scroll ref="scroll" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp" :ifinit="ifinit" :style="{height:myScrollerHeight+'px'}" :probeType="3" :listenScroll="true" @scroll="myscroll" :click="true">
        <div class="top_img" @click="linkTo('rankingSignUp',activeList.id)" v-if="activeList">
          <i :style="'background-image:url('+getFullPath(activeList.thumbnail)+');'"/>
        </div>
        <dl class="tabs tabs-3">
          <dt class="indexListFixedHeight">
            <i class="tab" :class="module==0?'cur':''" @click="getList(0)">总榜</i>
            <i class="tab" :class="module==1?'cur':''" @click="getList(1)">日榜</i>
            <i class="tab" :class="module==2?'cur':''" @click="getList(2)">周榜</i>
            <i class="tab" :class="module==3?'cur':''" @click="getList(3)">月榜</i>
            <a class="filter menu-filter" @click="clickShowFilter"><i class="iconfont"></i></a>
          </dt>
          <dd>
            <ul class="zmjy-ul-arr">
              <template v-if="listArr">
                <template v-if="listArr.length>0">
                  <li v-for="item in listArr" :key="item.id">
                  <a :style="'background-image:url('+getFullPath(item.coverimgAttachmentId)+');'">
                    <i class="count">{{item.voteCount}}</i>
                    <i class="name">{{item.aliasName}}</i>
                  </a>
                  <p data-tip="1.7km">
                    <span @click="clickShowGift(item.aliasName,item.voteActivityId,item.candidateId)"><i class="iconfont">&#xe6e1;</i>打赏</span>
                    <span @click="vote(item.voteActivityId,item.candidateId)"><i class="iconfont">&#xe603;</i>投票</span>
                  </p>
                </li>
                </template>
                <template v-else>
                  <div class="no-data">暂无数据</div>
                </template>
              </template>
            </ul>
          </dd>
        </dl>
      </scroll>
      <div class="index-list-fixed" ref="fixed" v-show="indexListFixed">
        <dl class="tabs">
          <dt>
            <i class="tab" :class="module==1?'cur':''" @click="getList(1)">日榜</i>
            <i class="tab" :class="module==2?'cur':''" @click="getList(2)">周榜</i>
            <i class="tab" :class="module==3?'cur':''" @click="getList(3)">月榜</i>
            <a class="filter menu-filter" @click="clickShowFilter"><i class="iconfont"></i></a>
          </dt>
        </dl>
      </div>
    </div>
    <div v-transfer-dom>
      <popup class="dialog-gift" v-model="showGift" height="50%" :hide-on-blur="true" style="background-color: #FFFFFF;border-top-left-radius: 0.4rem;border-top-right-radius: 0.4rem;">
          <div class="gift_con">
            <div class="reward_title">打赏： <span>{{aliasName}}</span><i @click="showGift=false"></i></div>
            <div class="gift_list">
              <div class="gift">
                <template v-if="giftList">
                  <template v-if="giftList.length>0">
                    <!--<div class="gift_li" :class="{active:giftId==item.id}" v-for="(item,index) in giftList" :key="item.id" @click="clickSelGift(item.id,item.giftName)">-->
                    <!--<img :src="getFullPath(item.giftImage)" />-->
                    <!--<p class="name">{{item.giftName}}</p>-->
                    <!--<p class="jiaobi">乾坤币{{item.jiaobi}}</p>-->
                    <!--</div>-->
                    <swiper height="6.2rem" :show-dots="false" @on-index-change="onIndexChange">
                      <swiper-item class="black" v-for="(item,index) in giftList" :key="index+1000">
                        <div class="gift_li" v-for="(v,num) in item" :class="{active:giftId==v.id}" @click="clickSelGift(v.id,v.giftName)">
                          <img :src="getFullPath(v.giftImage)" />
                          <p class="name">{{v.giftName}}</p>
                          <p class="jiaobi">乾坤币{{v.jiaobi}}</p>
                        </div>
                      </swiper-item>
                    </swiper>
                  </template>
                </template>
              </div>
              <div class="diot" @click.stop="">
                <span v-for="item,index in giftList" :key="index" :class="{active:activeIndex==index}"></span>
              </div>
            </div>
            <div class="footer"><img src="../../images/coin.png"/><span>{{userMoney}}</span><div class="gift_button" @click="reward">确定打赏<br><span>{{giftName?'（'+giftName+'）':''}}</span> </div><span class="cz" @click="linkTo('recharge')">充值</span></div>
          </div>
        </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="showFilter" height="45%">
        <div class="shade" :hide-on-blur="true">
          <div>
            <div class="filterPopover">
              <div>
                <p><i class="sex_icon"></i>性别</p>
                <div>
                  <span @click="sex=''" :class="{active:sex==''}">不限</span>
                  <span @click="sex=2" :class="{active:sex==2}">男</span>
                  <span @click="sex=1" :class="{active:sex==1}">女</span>
                </div>
              </div>
              <div>
                <p><i class="verification_icon"></i>认证</p>
                <div>
                  <span @click="auth" :class="{active:withoutAuth}">不限</span>
                  <span @click="authentication.idcard==1?authentication.idcard='':authentication.idcard=1" :class="{active:authentication.idcard}">身份认证</span>
                  <span @click="authentication.car==1?authentication.car='':authentication.car=1" :class="{active:authentication.car}">车辆认证</span>
                  <span @click="authentication.video==1?authentication.video='':authentication.video=1" :class="{active:authentication.video}">视频认证</span>
                  <span @click="authentication.house==1?authentication.house='':authentication.house=1" :class="{active:authentication.house}">房产认证</span>
                  <span @click="authentication.health==1?authentication.health='':authentication.health=1" :class="{active:authentication.health}">健康认证</span>
                </div>
              </div>
              <button @click="filterMakesure">确定</button>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import 'swiper/dist/css/swiper.css'
  import {TransferDom, Popup,XDialog,PopupPicker,Swiper, SwiperItem,} from 'vux'
  import BScroll from 'better-scroll'
  import myScroller from '../scroller/myScroller.vue';
  import Scroll from '@/components/betterscroll/scroll/scroll.vue'
  import Share from '@/components/home/share.vue'
  // import {swiper, swiperSlide} from 'vue-awesome-swiper'

  let fontsize = parseInt(document.documentElement.style.fontSize);
  export default {
    name: 'rankingList',
    directives: {
      TransferDom
    },
    components: {
      Loading,
      // swiper,
      // swiperSlide,
      // PopupPicker,
      // BScroll,
      // myScroller,
      Scroll,
      Back,
      Popup,
      XDialog,
      Share,
      Swiper,
      SwiperItem,
    },
    data() {
      let _this = this;
      return {
        // imgs: {s1: s1, s2: s2, s3: s3, s4: s4, zmjy1: zmjy1, zmjy2: zmjy2, zmjy3: zmjy3, zmjy4: zmjy4},
        isloading: false,
        showShare:false,
        loadRefresh: true,//下拉刷新
        loadInfinite: false, //上拉加载
        indexListFixed: false,
        indexListFixedHeight: 0,
        myScrollerHeight: 0,
        scroll: null,
        ifinit: false,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 60,
        pullDownRefreshStop: 40,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        list1: [["按票数", "按年龄"]],
        value1: ['按票数'],
        // ul1width: 0,
        // ul2width: 0,
        // ul3width: 0,
        // swiperOption: {
        //   effect: 'coverflow',
        //   centeredSlides: true,
        //   slidesPerView: 'auto',
        //   loop: true,
        //   autoplay: {
        //     delay: 3000,
        //     stopOnLastSlide: false,
        //     disableOnInteraction: false,
        //   },
        //   coverflowEffect: {
        //     rotate: 0,
        //     stretch: -3.6 * fontsize,
        //     depth: 800,
        //     modifier: 1,
        //     slideShadows: true
        //   },
        //   on: {
        //     init: function () {
        //     },
        //     tap: function (event) {
        //       _this.$router.push({
        //         path: "/rankingSignUp"
        //       })
        //     },
        //   },
        // },
        module: 0,
        activeList:{},
        listArr:[],
        showGift:false,//打赏礼品弹出层
        userMoney: 0,
        amount: 0,
        activeIndex:0,
        giftList:[],
        activeId:null,//活动编号
        candidateId:null,//活动用户id
        aliasName:null,
        giftId:null,//礼物Id
        giftName:null,//礼物名称
        showFilter:false,//筛选弹出层
        sex: "",//0男1女""不限
        authentication:{//认证信息0不需要1需要
          idcard:"",
          car:"",
          house:"",
          health:"",
          video:"",
        },
        //分页参数
        page:1,
        rows:20,
      }
    },
    computed: {
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold)
        } : false
      },
      withoutAuth(){
        return this.authentication.idcard==""&&this.authentication.car==""&&this.authentication.house==""&&this.authentication.health==""&&this.authentication.video==""
      },
      handleRoute(){
        return this.$store.state.handleRoute;
      },
    },
    watch:{
      handleRoute(newV){
        if(!newV){
          this.showFilter=false;
          this.showGift=false;
        }
      },
      showFilter(newV){
        let status = this.showFilter||this.showGift
        this.$store.commit("CHANGEHANDLEROUTE",status)
      },
      showGift(newV){
        let status = this.showFilter||this.showGift
        this.$store.commit("CHANGEHANDLEROUTE",status)
      },
    },
    created() {

    },
    destroyed() {
    },
    mounted() {
      this.getUnderwayActivity();
      this.getList(0);
      this.getGiftList();
      // this.ul1width = (5 * 3.4 + 0.2) * (parseInt(document.documentElement.style.fontSize) + 1);
      // this.ul2width = (7 * 3.4 + 0.2) * (parseInt(document.documentElement.style.fontSize) + 1);
      // this.ul3width = (6 * 3.4 + 0.2) * (parseInt(document.documentElement.style.fontSize) + 1);
      // this.$nextTick(function () {
      //   this.scroll1 = new BScroll(this.$refs.scroll1, {
      //     click: true,
      //     scrollX: true,
      //     eventPassthrough: 'vertical',
      //     scrollY: false
      //   })
      //   this.scroll2 = new BScroll(this.$refs.scroll2, {
      //     click: true,
      //     scrollX: true,
      //     eventPassthrough: 'vertical',
      //     scrollY: false
      //   })
      //   this.scroll3 = new BScroll(this.$refs.scroll3, {
      //     click: true,
      //     scrollX: true,
      //     eventPassthrough: 'vertical',
      //     scrollY: false
      //   })
      // })
      this.userMoney = this.$store.state.userInfo.userMoney;
      this.myScrollerHeight = document.body.clientHeight - $(".header").height() - $(".swiper").height() - (0.08) * parseInt(document.documentElement.style.fontSize) - 3;
      this.indexListFixedHeight = $(".indexListFixedHeight").height();
      this.$nextTick(function () {
        this.ifinit = true;
      })
    },
    methods: {
      getFullPath (path) {
        return this.$utils.getFullPath(path)
      },
      clickShare() {
        this.showShare = !this.showShare;
      },
      changeShow(val){
        this.showShare=val;
      },
      auth(){
        this.authentication.idcard="";
        this.authentication.car="";
        this.authentication.house="";
        this.authentication.health="";
        this.authentication.video="";
      },
      clickShowFilter(){
        this.showFilter = !this.showFilter;
      },
      filterMakesure(){
        this.getList(this.module,null,true,this.sex,this.authentication);
        this.showFilter = false;
      },
      async getGiftList() {
        let listData = await this.$server.getGiftList();
        // this.giftList.push(...listData.data.data);
        if(listData.data.data){
          this.giftList=[];
          let data = listData.data.data;
          let page = Math.ceil(data.length/8)
          for(let i=0;i<page;i++){
            let arr=[];
            for(let j=0;j<8;j++){
              if(8*i+j==data.length){
                break;
              }
              arr.push(data[8*i+j])
            }
            this.giftList.push(arr);
          }
        }
      },
      clickShowGift(aliasName,activeId,candidateId){
        if(this.$store.state.userInfo.id==candidateId){
          this.$vux.toast.show({
            type: 'text',
            text: '不能给自已打赏',
            position: 'middle',
            width: 'auto',
          })
          return false;
        }
        this.showGift = !this.showGift;
        this.aliasName = aliasName;
        this.activeId = activeId;
        this.candidateId = candidateId;
      },
      onIndexChange(index){
        this.activeIndex = index
      },
      clickSelGift(id,name){
        this.giftId=id;
        this.giftName = name;
      },
      myscroll(pos) {
        const newVal = pos.y;
        if (!this.beforeIndexListFixedHeight) {
          this.beforeIndexListFixedHeight = $(".header").height() + (3.5) * parseInt(document.documentElement.style.fontSize)
        }
        if (newVal > -this.beforeIndexListFixedHeight) {
          this.indexListFixed = false
          return
        }
        this.indexListFixed = true;
      },
      async onPullingDown() {
        // 模拟更新数据
        console.log('下拉刷新')
        this.$refs.scroll.openPullUp()
        let totalPage = await this.getList(this.module,null,true)
      },
      async onPullingUp() {
        // 更新数据
        console.log('上拉加载')
        let totalPage = await this.getList(this.module)

      },
      refresh(done) {//下拉刷新
        console.log("刷新 ");
        setTimeout(()=>{
          console.log("刷新完成");
          done();
        },1000);
      },
      infinite(done){
        console.log("加载 ");
        setTimeout(()=>{
          console.log("加载完成");
          done(true);
        },1000);
      },
      linkTo(link, id) {
        let query = null
        if (id) {
          query = {
            id: id
          }
        }
        this.$router.push({
          path: link,
          query: query
        })
      },
      async getUnderwayActivity() {
        const _this = this;
        let result = await _this.$server.getUnderwayActivity();
        if(result.data.data){
          _this.activeList = result.data.data;
        }
      },
      async getList(module,search,PullingDown,sex,authentication) {
        try{
          const _this = this;
          if(_this.module!=module){
            this.page = 1;
            _this.listArr=[];
            this.$refs.scroll.openPullUp()
            console.log("打开上拉加载")
          }
          if(PullingDown){
            this.page = 1;
          }
          _this.module = module;
          let data = Object.assign({
            sex:sex,
            idStatus:authentication&&authentication.idcard,
            houseStatus:authentication&&authentication.house,
            carStatus:authentication&&authentication.car,
            healthyStatus:authentication&&authentication.health,
            videoStatus:authentication&&authentication.video,
            page:this.page,
            rows:this.rows
          },search)
          this.$vux.loading.show();
          let result = null;
          if (_this.module == 0) {
            result = await _this.$server.candidateVoteStatTotal(data);
          } else if (_this.module == 1) {
            result = await _this.$server.candidateVoteStatDayly(data);
          } else if (_this.module == 2) {
            result = await _this.$server.candidateVoteStatWeekly(data);
          } else {
            result = await _this.$server.candidateVoteStatMonthly(data);
          }
          this.page++
          if(PullingDown){
            _this.listArr=[];
          }
          if(result.data.list){
            _this.listArr.push(...result.data.list);
          }
          this.$vux.loading.hide()
          this.$refs.scroll.forceUpdate()
          if(this.page>result.data.totalPage){
            console.log("关闭上拉加载")
            this.$refs.scroll.closePullUp()
          }
          return Promise.resolve(result.data.totalPage)
        }catch (e) {
          console.log(e)
          return Promise.reject("error")
        }
      },
      async reward() {
        this.$vux.loading.show();
        const _this = this;
        let data ={
          "receiverUser.id":_this.candidateId,
          "objectId":_this.activeId,
          "giftId":_this.giftId,
          "amount":1,//打赏数，默认是1
        }
        let result = await _this.$server.giveGift(data);
        _this.showGift=false;
        _this.userMoney = parseInt(_this.$store.state.userInfo.userMoney - _this.amount)
        _this.$store.commit('EDITUSERINFO',{key:"userMoney" ,value:_this.userMoney});
        this.$vux.toast.show({
          type:"text",
          text: "打赏成功",
          position:"middle",
          width:"auto",
        });
        this.$vux.loading.hide();
      },
      async vote(activityId,candidateId) {
        this.$vux.loading.show();
        const _this = this;
        let result = await _this.$server.activityVote(activityId,candidateId);
        this.$vux.toast.show({
          type:"text",
          text: "投票成功",
          position:"middle",
          width:"auto",
        });
        this.$vux.loading.hide();
      },
    }
  }
</script>
<style scoped lang="scss">
  .main {
    &:before {
      background-color: #3a3845;
    }
    .header {
      position: fixed;
      width: 100%;
      z-index: 10;
      .top {
        background-color: #3a3845;
        color: #FFF;
        font-size: 0.52rem;
        position: relative;
        i {
          font-size: 0.52rem;
        }
        a {
          position: absolute;
          padding: 3px;
        }
        .left {
          left: 0.325rem;
        }
        .right {
          right: 0.325rem;
        }
      }
    }
    .swiper {
      margin-top: 1.39rem;
      padding: 0.34rem 0;
      background-color: #fff;
    }
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 9.4rem;
      height: 2.4rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      margin-top: 0.34rem;
      background-color: #FFF;
      height: 0.9rem;
      line-height: 0.9rem;
      font-size: 0.32rem;
      color: #999;
      padding: 0 0.2rem;
      position: relative;
      .picker {
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        padding: 0 0.3rem;
        border: 1px solid #f2f2f2;
        font-size: 0.24rem;
        .picker-in {
          display: inline-block;
        }
        i {
          font-size: 0.24rem;
        }
      }
    }
    .ranking-list {
      background-color: #FFF;
      height: 4.9rem;
      p {
        padding: 0 0.2rem;
        font-size: 0.32rem;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #ff2e8b;
        i {
          font-size: 0.32rem;
        }
      }
      .scroll {
        font-size: 0;
        width: 100%;
        li {
          margin-left: 0.2rem;
          display: inline-block;
          div:first-child {
            position: relative;
            width: 3.2rem;
            height: 3.2rem;
            img {
              width: 100%;
              height: 100%;
              border-radius: 3px;
            }
            i {
              position: absolute;
              right: 0.15rem;
              bottom: 0.15rem;
              height: 0.36rem;
              line-height: 0.36rem;
              padding: 0 0.15rem;
              font-size: 0.24rem;
              border-radius: 2px;
              color: #FFF;
              background-color: rgba(0, 0, 0, 0.5);
            }
            .iconfont {
              top: 0.15rem;
              left: 0;
              font-size: 0.4rem;
              color: #ffde59;
              background-color: rgba(0, 0, 0, 0);
            }
          }
          div:last-child {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 0.32rem;
            & > i {
              width: 1.4rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            span {
              &:last-child {
                margin-left: 0.1rem
              }
              font-size: 0.24rem;
              width: 0.8rem;
              text-align: center;
              padding: 0 0.025rem;
              border-radius: 2px;
              background-color: #ff2e8b;
              color: #FFF;
              i {
                font-size: 0.24rem;
              }
            }
          }
        }
      }
    }
    .myscroll {
      position: relative;
      padding-top: 1.4rem;
      .list-wrapper {
        background: none;
      }
      .index-list-fixed {
        position: absolute;
        z-index: 1;
        top: 1.4rem;
        left: 0;
        width: 100%;
      }
    }
  }

  .shade{
    width: 100%;
    height: 100%;
    position:absolute;
    top:0;
    left: 0;
    z-index: 100;
    overflow: hidden;
    &>div{
      position:relative;
      height: 100%;
      background-color: #efefef;
      overflow: hidden;
    }
  }
  .filterPopover{
    padding:0 0.5rem;
    &>div{
      color:#908f92;
      padding: 0.1rem 0;
      border-bottom: 1px solid #b9b9b9;
      &:last-of-type{
        border-bottom: none;
      }
      p{
        height:1.4rem;
        line-height: 1.4rem;
        font-size: 0.36rem;
        font-weight: 500;
        i{
          display: inline-block;
          width: 0.26rem;
          height: 0.36rem;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin-right: 0.2rem;
          &.location_icon{
            background-image: url("../../images/position_icon.png");
          }
          &.time_icon{
            background-image: url("../../images/position_icon.png");
          }
          &.sex_icon{
            width: 0.33rem;
            height: 0.31rem;
            background-image: url("../../images/sex_icon.png");
          }
          &.verification_icon{
            width: 0.31rem;
            height: 0.35rem;
            background-image: url("../../images/renzheng_icon.png");
          }
        }
      }
      div{
        display: flex;
        justify-content: space-between;
        flex-wrap:wrap;
        &:after {
          content: "";
          width: 46%;
        }
        span{
          font-size: 0.34rem;
          width: 23%;
          height: 0.76rem;
          line-height: 0.76rem;
          text-align: center;
          margin-bottom: 0.34rem;
          box-sizing: border-box;
          &.active{
            background-color:#fff;
            border-radius: 5px;
            border: 1px solid #70c466;
            color:#70c466;
          }
        }
      }
    }
    .date_range{
      display: inline-table;
      width: 66%;
      height: 0.76rem;
      line-height: 0.76rem;
      box-sizing: border-box;
      white-space: nowrap;
      padding: 0 0 0 0.4rem;
      &.active{
        background-color:#fff;
        border-radius: 5px;
        border: 1px solid #70c466;
        color: #70c466 !important;
      }
      .vux-datetime {
        width: 37%;
        display: inline-block;
        &.active{
          color: #70c466 !important;
        }
        .vux-cell-value {
          font-size: 0.36rem;
        }
      }
      i{
        display: inline-block;
        width: 0.34rem;
        height: 0.34rem;
        background-image: url("../../images/calendar_icon.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    button{
      height: 1.13rem;
      line-height: 1.13rem;
      width: 100%;
      margin-bottom: 0.54rem;
      border: 1px solid #d4d4d4;
      color:#70c466;
      background-color:#fff;
    }
  }
</style>

