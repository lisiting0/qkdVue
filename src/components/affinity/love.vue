<template>
  <div>
    <div class="main jy_all_top jy_new_love jy_state_top" @click="windowClick">
      <Loading v-if="isloading"></Loading>
      <div class="header">
        <div>
          <div class="top">
            <Back class="left" v-if="$route.query.nearbydate"><i class="iconfont">&#xe613;</i></Back><a class="right"><i @click="showMyactivity" :style="{color:myactivity?'#00b4ff !important':''}" class="iconfont">&#xe648;</i><i @click="showPopoverm" class="iconfont">&#xe64d;</i></a><p class="tab">
            <span class="underline" ref="underline" :style="{left:underlineLeft}"></span>
            <span class="tab_index" @click="getOrderList(3)" :class="{active:active==3}"><i ref="tab_ref_3"></i>相亲</span>
            <span class="tab_index" @click="getOrderList(1)" :class="{active:active==1}"><i ref="tab_ref_1"></i>约会</span>
            <span class="tab_index" @click="getOrderList(2)" :class="{active:active==2}"><i ref="tab_ref_2"></i>二次元</span>
          </p>
          </div>
        </div>
      </div>
      <div v-show="active==1" class="jy_new_love_t">
        <ul class="jy_new_love_nav">
          <li v-if="datingThemes!=''" class="jy_new_love_n1" :class="{jy_new_love_n1s:datingThemes==''}" @click="getList('')"><p>全部</p></li>
          <li v-else class="jy_new_love_n1" :class="{jy_new_love_n1s:datingThemes==''}" ><p>全部</p></li>
          <li v-if="datingThemes!=2" class="jy_new_love_en2" :class="{jy_new_love_en2s:datingThemes==2}" @click="getList(2)"><p>吃饭</p></li>
          <li v-else class="jy_new_love_en2" :class="{jy_new_love_en2s:datingThemes==2}" ><p>吃饭</p></li>
          <li v-if="datingThemes!=4" class="jy_new_love_en3" :class="{jy_new_love_en3s:datingThemes==4}" @click="getList(4)"><p>唱歌</p></li>
          <li v-else class="jy_new_love_en3" :class="{jy_new_love_en3s:datingThemes==4}" ><p>唱歌</p></li>
          <li v-if="datingThemes!=3" class="jy_new_love_en4" :class="{jy_new_love_en4s:datingThemes==3}" @click="getList(3)"><p>电影</p></li>
          <li v-else class="jy_new_love_en4" :class="{jy_new_love_en4s:datingThemes==3}" ><p>电影</p></li>
          <li v-if="datingThemes!=5" class="jy_new_love_en5" :class="{jy_new_love_en5s:datingThemes==5}" @click="getList(5)"><p>运动</p></li>
          <li v-else class="jy_new_love_en5" :class="{jy_new_love_en5s:datingThemes==5}" ><p>运动</p></li>
          <li v-if="datingThemes!=1" class="jy_new_love_en6" :class="{jy_new_love_en6s:datingThemes==1}" @click="getList(1)"><p>旅行</p></li>
          <li v-else class="jy_new_love_en6" :class="{jy_new_love_en6s:datingThemes==1}" ><p>旅行</p></li>
        </ul>
      </div>
      <div v-show="active==2"  class="jy_new_love_t">
        <ul class="jy_new_love_nav">
          <li v-if="activityMethod!=null" class="jy_new_love_n1" :class="{jy_new_love_n1s:activityMethod==null}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,null)"><p>全部</p></li>
          <li v-else class="jy_new_love_n1" :class="{jy_new_love_n1s:activityMethod==null}" ><p>全部</p></li>
          <li v-if="activityMethod!=1" class="jy_new_love_n2" :class="{jy_new_love_n2s:activityMethod==1}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,1)"><p>选缘</p></li>
          <li v-else class="jy_new_love_n2" :class="{jy_new_love_n2s:activityMethod==1}" ><p>选缘</p></li>
          <li v-if="activityMethod!=2" class="jy_new_love_n3" :class="{jy_new_love_n3s:activityMethod==2}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,2)"><p>抢缘</p></li>
          <li v-else class="jy_new_love_n3" :class="{jy_new_love_n3s:activityMethod==2}" ><p>抢缘</p></li>
          <li v-if="activityMethod!=3" class="jy_new_love_n4" :class="{jy_new_love_n4s:activityMethod==3}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,3)"><p>竞缘</p></li>
          <li v-else class="jy_new_love_n4" :class="{jy_new_love_n4s:activityMethod==3}" ><p>竞缘</p></li>
          <li v-if="activityMethod!=4" class="jy_new_love_n5" :class="{jy_new_love_n5s:activityMethod==4}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,4)"><p>中缘</p></li>
          <li v-else class="jy_new_love_n5" :class="{jy_new_love_n5s:activityMethod==4}" ><p>中缘</p></li>
          <li v-if="activityMethod!=5" class="jy_new_love_n6" :class="{jy_new_love_n6s:activityMethod==5}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,5)"><p>配缘</p></li>
          <li v-else class="jy_new_love_n6" :class="{jy_new_love_n6s:activityMethod==5}" ><p>配缘</p></li>
        </ul>
        <ul class="jy_new_love_menu">
          <li v-if="datingThemes!=''" :class="{cur:datingThemes==''}" @click="getList('')"><a>全部</a></li>
          <li v-else :class="{cur:datingThemes==''}" ><a>全部</a></li>
          <li v-if="datingThemes!=2" :class="{cur:datingThemes==2}" @click="getList(2)"><a>吃饭</a></li>
          <li v-else :class="{cur:datingThemes==2}" ><a>吃饭</a></li>
          <li v-if="datingThemes!=4" :class="{cur:datingThemes==4}" @click="getList(4)"><a>K歌</a></li>
          <li v-else :class="{cur:datingThemes==4}" ><a>K歌</a></li>
          <li v-if="datingThemes!=1" :class="{cur:datingThemes==1}" @click="getList(1)"><a>旅行</a></li>
          <li v-else :class="{cur:datingThemes==1}" ><a>旅行</a></li>
          <li v-if="datingThemes!=5" :class="{cur:datingThemes==5}" @click="getList(5)"><a>运动</a></li>
          <li v-else :class="{cur:datingThemes==5}" ><a>运动</a></li>
          <li v-if="datingThemes!=99" :class="{cur:datingThemes==99}" @click="getList(99)"><a>其他</a></li>
          <li v-else :class="{cur:datingThemes==99}" ><a>其他</a></li>
        </ul>
      </div>
      <div class="jy_new_love_con" :style="{'padding-top': active==1?'2.03rem':active==2?'3.23rem':'0rem'}">
        <scroll v-show="active!=3" ref="scroll" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp" :ifinit="ifinit" :style="{margin: '0.2rem 0 0 0',height:myScrollerHeight+'px','background-color': '#f5f7f8'}" :probeType="3" :listenScroll="true" @scroll="myscroll" :click="true" >
          <ul class="jy_new_love_list" v-if="active!=3">
            <router-link tag="li" v-for="item,index in showList" v-if="item.datingDetailsExt" :key="index"  :to="{name:'act',query:{id:item.id}}" >
              <div class="jy_new_love_list_t">
                <i class="jy_new_love_list_timg" :style="'background-image:url('+$utils.getFullPath(item.jiaoyouUser.headimgAttachmentId)+')'"></i>
                <h4>{{item.jiaoyouUser.aliasName}}</h4>
                <p>
                  <em v-if="item.activityMethod!=7&&item.activityMethod!=8" :class="'jy_new_love_tit_'+item.activityMethod">{{yuan(item.activityMethod)}}</em>
                  <em :style="{'color':item.activityMethod==7?'#50cbff':'','border':item.activityMethod==7?'1px solid #50cbff':''}" v-else>{{item.activityMethod==7?'一对一':'多人'}}</em>
                  <i class="jy_auth_age" :class="{jy_auth_age_man:item.jiaoyouUser.sex==2}">{{item.jiaoyouUser.sex==1?'&#xe64a;':'&#xe605;'}}{{item.jiaoyouUser.age}}</i>
                  <i class="jy_auth_age" style="background-color: #fff;color:#9e9e9e;">{{$utils.formarDistance(item.distance)}}</i>
                </p>
              </div>
              <div class="jy_new_love_list_b">
                <h3><em :class="'jy_new_love_tit_'+item.datingThemes">{{item.datingThemes==1?'旅行':item.datingThemes==2?'吃饭':item.datingThemes==3?'电影':item.datingThemes==4?'唱歌':item.datingThemes==5?'运动':'其他'}}</em><span class="jy_new_love_datingDesc"> {{item.datingDesc}}</span></h3>
                <div class="jy_new_love_list_bimg" v-if="item.showImg">
                  <p v-for="v,i in item.showImg" :key="i" >
                    <i :style="{'background-image':'url('+getFullPath(v)+')'}" @click.stop="showImage(i,item.id,$event)"></i>
                  </p>
                </div>
                <p class="jy_new_love_list_pos">{{item.datingLocation}}({{item.datingDetailsExt.extString}})</p>
                <p class="jy_new_love_list_date">
                  {{item.datingDetailsExt.extInt7==1?"不限时间":item.datingDetailsExt.extInt7==2?"平常周末":(item.activityStarttime.substr(0,16))}}
                </p>
                <p class="jy_new_love_list_tip">{{item.expectSex==1?"仅限女性":item.expectSex==2?"仅限男性":"不限男女"}} · {{item.payType==0?'AA':item.payType==1?'我请客':item.payType==2?'你买单':item.payType==3?'男A女免':item.payType==4?'视情况而定':''}}· {{item.payType==0?'每人'+item.enrollFee+"元":item.payType==1?'':item.payType==2?'':item.payType==3?'男士'+item.enrollFee+"元":item.payType==4?'':''}}{{item.datingDetailsExt.extInt6==1?"[多退少补]":''}}</p>

                <div class="dodiv">
                  <p>
                    <span><i  class="iconfont">&#xe63b;</i>{{item.viewFrequency}}</span>
                    <span><i  class="iconfont">&#xe603;</i>{{item.likeCount}}</span>
                    <span><i  class="iconfont">&#xe619;</i>{{item.followCount}}</span>
                    <span><i  class="iconfont">&#xe6dc;</i>{{item.enrollCount}}{{item.activityMethod==8?"/"+item.datingDetailsExt.extInt12:""}}</span>
                  </p>
                  <div :ref="item.id">
                    <transition v-on:before-enter="beforeEnter(item.id,1)" v-on:before-leave="beforeEnter(item.id,1)" v-on:after-enter="afterEnter(item.id,1)" v-on:after-leave="afterEnter(item.id,1)" enter-active-class="slideInRight" leave-active-class="slideOutRight">
                          <span v-show="showCommentIndex==item.id">
                             <span v-if="item.isLike==0&&$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;setFabulous(item.id,item.isLike)"><i class="iconfont">&#xe603;</i> 点赞</span>
                            <span style="color:#ff3f63" v-if="item.isLike==1&&$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;setFabulous(item.id,item.isLike)"><i class="iconfont">&#xe603;</i> 点赞</span>
                             <span v-if="$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;clickShowGift(item.jiaoyouUser.aliasName, item.jiaoyouUser.id,item.id)"><i class="iconfont">&#xe629;</i> 打赏</span>
                            <span v-if="$store.state.userInfo.id==item.jiaoyouUser.id&&item.state==2" @click.stop="showCommentIndex=0;edit(item)"><i class="iconfont">&#xe635;</i> 编辑</span>
                             <span v-if="$store.state.isApp" @click.stop="showCommentIndex=0;checkShare(item)"><i class="iconfont">&#xe638;</i> 分享</span>
                            <span v-if="item.isFollow==0&&$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;setGuanzhu(item.id,item.isFollow)"><i class="iconfont">&#xe619;</i> 关注</span>
                            <span style="color:#ff3f63" v-if="item.isFollow==1&&$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;setGuanzhu(item.id,item.isFollow)"><i class="iconfont">&#xe619;</i> 关注</span>
                            <span v-if="item.isCandidate==0&&$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;candidate(item.id,item.money)"><i class="iconfont">&#xe6dc;</i> 参加</span>
                            <span style="color:#ff3f63" v-if="item.isCandidate==1" @click.stop="showCommentIndex=0;cancelCandidate(item.id,item.money,item.isDeFrequency,item.datingDetailsExt.extInt7==3?item.activityStarttime:'',item.hour)"><i class="iconfont">&#xe6dc;</i> 退出</span>
                            <span v-if="myactivity&&$store.state.userInfo.id==item.jiaoyouUser.id&&item.state!=2" @click.stop="showCommentIndex=0;unDating(item.id)"><i class="iconfont">&#xe6dc;</i> 取消发布</span>
                          </span>
                    </transition>
                  </div>
                  <span @click.stop="showCommentIndex==item.id?showCommentIndex=0:showCommentIndex=item.id"><i class="iconfont">&#xe679;</i></span>
                </div>
              </div>
				<template v-if="item.showImg&&item.showImg.length>0">
					<div v-transfer-dom>
					  <previewer :list="getImage(item.showImg)" :ref="'previewer'+item.id" :options="options" @on-close="closeImg()"></previewer>
					</div>
				</template>
			    
            </router-link>
          </ul>
        </scroll>
        <registration-activity :myactivity="myactivity" v-if="active==3" ref="registration"></registration-activity>
      </div>

      <div v-transfer-dom>
        <x-dialog v-model="showChooseThemes" hide-on-blur class="dialog-chooseThemes" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
          <div class="chooseThemes">
            <p>发起约会</p>
            <div>
              <div @click.stop="chooseThemes(2)">
                <div>
                  <img src="../../images/love/putong.png">
                </div>
                <p>约会</p>
                <p>说明：{{$store.state.custom_config.appointment||''}}</p>
              </div>
              <div @click.stop="chooseThemes(1)">
                <div>
                  <img src="../../images/love/yuanfen.png">
                </div>
                <p>二次元约会</p>
                <p>说明：{{$store.state.custom_config.twice_appoint||''}}</p>
              </div>
            </div>
          </div>
          <div class="arrow"></div>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <popup v-model="showPay" height="100%" :hide-on-blur=false position="bottom" :popup-style="{zIndex:600}" :should-scroll-top-on-show="true">
          <div class="top_userInfo" v-if="showPayWin">
            <actPay :actDatingId="payObj.id" :enrollFee="payObj.enrollFee||0"  @openPayWin="openPayWin" @hiddenPayWin="hiddenPayWin"></actPay>
          </div>
        </popup>
      </div>
      <div class="publishButton" v-if="!$route.query.nearbydate&&!showPhotoStatus&&!showPopover&&active!=3"  @click.stop="showChooseThemes=!showChooseThemes"><i class="iconfont" :class="showChooseThemes?'rotate':''" >&#xe61f;</i></div>
      <div class="publishButton" v-if="active==3&&$store.state.isLogin&&$store.state.userInfo.identity==1"  @click.stop="linkTo('publishBlindDate')"><i class="iconfont" >&#xe61f;</i></div>
    </div>
    <!--<transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
      <setSort v-show="showPopover" @close="closePopover" @makesure="makesure"></setSort>
    </transition>-->
	<transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
      <setSort v-show="showPopover" @shPlacePicker="placePicker" @shStartDate="shStartDate" @shEndDate="shEndDate"  @shHeightRe="shHeightRe" @shAge="shAge" :showStartDate="showStartDate" :showEndDate="showEndDate" :showHeightRe="showHeightRe" :showAge="showAge" :placePicker="showPlacePicker" @close="closePopover" @makesure="makesure" :keytype="keytype"  :areaColumns="2"></setSort>
    </transition>
    <div v-transfer-dom>
      <popup class="dialog-gift" v-model="showGift" height="50%" :hide-on-blur="true" style="background-color: #FFFFFF;border-top-left-radius: 0.4rem;border-top-right-radius: 0.4rem;">
        <div class="gift_con">
          <div class="reward_title">打赏： <span>{{aliasName}}</span><i @click="showGift=false"></i></div>
          <div class="gift_list">
            <div class="gift">
              <template v-if="giftList">
                <template v-if="giftList.length>0">
                  <swiper height="6.2rem" :show-dots="false" @on-index-change="onIndexChange">
                    <swiper-item class="black" v-for="(item,index) in giftList" :key="index+1000">
                      <div class="gift_li" v-for="(v,num) in item" :class="{active:giftId==v.id}" @click="clickSelGift(v.id,v.giftName,v.jiaobi)">
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
              <span v-for="item,index in giftList" :key="index" :class="{active:giftIndex==index}"></span>
            </div>
          </div>
          <div class="footer"><img src="../../images/coin.png"/><span>{{userMoney}}</span><div class="gift_button" @click="reward">确定打赏<br><span>{{giftName?'（'+giftName+'）':''}}</span> </div><span class="cz" @click="linkTo('recharge')">充值</span></div>
        </div>
      </popup>
    </div>
    <share :show="showShare" :shareTitle="shareTitle" :shareDesc="shareDesc" :shareImg="shareImg" :shareUrl="shareUrl" @changeShow="changeShow"></share>
  </div>

</template>
<script>
import Back from '@other/back.vue';
import { TransferDom, Popup,XDialog,Previewer,Swiper, SwiperItem} from 'vux';
import setSort from '@other/setSort'
import Loading from '@other/loading.vue';
import Scroll from '@/components/betterscroll/scroll/scroll.vue'
import routerBack from '@/plus/routerBack.js';
import actPay from './actPay.vue';
import registrationActivity from '../blindDate/registrationActivityLove';
import Share from '@/components/home/share.vue'
	routerBack.init("love",{
		showPhotoStatus:{
			change:'showPhotoStatusChange',
		},
		showChooseThemes:null,
		showStartDate:null,
		showEndDate:null,
		showPlacePicker:null,
		showHeightRe:null,
		showAge:null,
		showPopover:null,
		showShare:null,	
	});
export default {
	name: 'love',
	mixins:[routerBack],
	data () {
		return {
      shareTitle:"",
      shareDesc:"",
      shareImg:"",
      shareUrl:"",


      showGift:false,//打赏礼品弹出层
      userMoney: 0,
      amount: 0,
      giftIndex:0,
      giftList:[],
      objectId:null,//业务ID，从什么途径打赏的填写什么id，通过动态打赏填写动态ID，通过文章打赏填写文
      candidateId:null,//被赠送用户的ID
      aliasName:null,
      giftId:null,//礼物Id
      giftName:null,//礼物名称
      qiankunbi:0,

		  payObj:{
		    id:0,
        enrollFee:0,
      },
      showPay:false,
      showPayWin:false,

      showCommentIndex:0,
      myactivity:false,

			showStartDate:false,
			showEndDate:false,
			showPlacePicker:false,
			showHeightRe:false,
			showAge:false,
			
		  active:3,
		  isloading:false,
		  indexListFixed:false,
		  title:"约会",
		  menuFixed:false,
		  showChooseThemes:false,
		  pullDownRefresh: true,
		  pullDownRefreshThreshold: 60,
		  pullDownRefreshStop: 40,
		  pullUpLoad: true,
		  pullUpLoadThreshold: 0,
		  ifinit:false,
		  myScrollerHeight:0,
		  scrollwidth:0,
		  parentwidth:0,
		  activity:{1:'旅行',2:'吃饭',3:'电影',4:'唱歌',5:'运动',99:'其他' },
		  listArr:[],
		  datingThemes: '',
		  activityMethod:null,
		  showPopover:false,
		  showShare:false,
		  //分页参数
		  page:1,
		  rows:20,
		  searchResult:{
			authentication:{}
		  },
		   showPhotoStatus: false,
		  options: {
			  fullscreenEl: false,
			  getThumbBoundsFn: () => {
				let thumbnail = this._previewer.target
				let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
				let rect = thumbnail.getBoundingClientRect()
				return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
			  }
			},
			keytype:{},
		}
	},
  directives: {
    TransferDom
  },
  components: {
    Loading,
    Scroll,
    Popup,
    XDialog,
    setSort,
	Back,
	Previewer,
    registrationActivity,
    actPay,Swiper, SwiperItem,Share
  },
  computed: {
    underlineLeft: function () {
      if(this.active==3){
        return  '0px'
      }else if(this.active==1){
        return (2.4)*parseFloat(document.documentElement.style.fontSize) + 'px'
      }else{
        return (2 * (2.4))*parseFloat(document.documentElement.style.fontSize) + 'px'
      }
    },
	  yuan:function(){
	    return function(index){
	      return ['选缘','抢缘','竞缘','中缘','配缘'][index-1]
      }
    },
	  showList:function(){
		const t=this;
	    return this.listArr.map(v=>{
			let item=t.$utils.deepCopy(v);
			if(item.showPic){
				let showPic = item.showPic.split(",").filter((va,i)=>{
						return va!='';
					});
				item.showImg=showPic;
			}
			return item
		})
    },
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
  },
	watch:{
    publishActivity(val){
      if(val.isRefresh){
        this.active = val.active
        this.isRefresh = val.isRefresh;
        this.getList('',null,val.isRefresh)
        this.$store.commit("UPDATAPUBLISHACTIVITY",{
          isRefresh:false,
          active:1,
        })
      }
    },
	},
  activated(){
	  console.log("activated")
    if(this.$store.state.publishActivity.isRefresh){
      this.active = this.$store.state.publishActivity.active
      this.isRefresh = this.$store.state.publishActivity.isRefresh;
      this.getList('',null,this.$store.state.publishActivity.isRefresh)
      this.$store.commit("UPDATAPUBLISHACTIVITY",{
        isRefresh:false,
        active:this.active,
      })
    }
  },
  beforeMount(){
    let queryactive = this.$route.query.active;
	  if(queryactive==1||queryactive==2){
      this.$store.commit("UPDATAPUBLISHACTIVITY",{
        isRefresh:false,
        active:this.$route.query.active,
      })
    }
  },
	async mounted () {
		const t=this;
		$("body").addClass("gray");
		this.myScrollerHeight = document.body.clientHeight-$(".jy_new_love_t").height()-$(".menu").height()-$(".header").height()-1-(0.2)*parseInt(document.documentElement.style.fontSize);
		if(window.api){
		  this.myScrollerHeight = document.body.clientHeight-$(".jy_new_love_t").height()-$(".menu").height()-$(".header").height()-1-(0.95)*parseInt(document.documentElement.style.fontSize);
		}
		console.log(this.$store.state.publishActivity)
		this.active = this.$store.state.publishActivity.active
    this.isRefresh = this.$store.state.publishActivity.isRefresh;
    this.getList('',null,this.$store.state.publishActivity.isRefresh)
    this.$store.commit("UPDATAPUBLISHACTIVITY",{
      isRefresh:false,
      active:this.active,
    })
		this.$nextTick(function () {
		  this.ifinit = true;
		});
		/*try{
			let result = await t.$server.apiDict({type:"appointment_desc"});
			console.log(result.data.data)
			for(let i=result.data.data.length;i--;){
				t.$set(t,result.data.data[i].value,result.data.data[i].remarks);
			}
		}catch(e){
			console.log(JSON.stringify(e));
		}*/
    this.userMoney = this.$store.state.userInfo.userMoney;
    if(this.$store.state.isLogin){
      this.getGiftList({
		readonly:true
	  });
    }
	},
	destroyed () {
		$("body").removeClass("gray");
	},
	methods:{
		showPhotoStatusChange(val){
			const t=this;
			if(!val&&t.showImgID){
				;((t.$refs)[t.showImgID])[0].close();
				t.showImgID=null;
			}
		},
		checkShare(item){
			const t=this;
			let {id,datingThemes,time,address,shareImg}={
				id:item.id,
				datingThemes:item.datingThemes,
				time:item.datingDetailsExt.extInt7==1?'不限时间':item.datingDetailsExt.extInt7==2?'平常周末':(item.activityStarttime.substr(0,16)),
				address:item.datingLocation,
				shareImg:t.$utils.getFullPath(item.jiaoyouUser.headimgAttachmentId)
			}
			let type = datingThemes==1?'一起旅行':datingThemes==2?'一起吃饭':datingThemes==3?'一起看电影':datingThemes==4?'一起唱歌':datingThemes==5?'一起运动':'其他'
		  let shareTitle=this.Fn.dictReplace(this.$store.state.custom_config.appoinSharTitle,[type,item.jiaoyouUser.aliasName])
		  let shareDesc=this.Fn.dictReplace(this.$store.state.custom_config.appoinSharContent,[time,address,type])
		  let shareLink =this.$store.state.baseURL+"/api/account/publicAddressLoginUrl?state=act"
		  shareLink = shareLink + "__id_"+id;
		  this.shareTitle=shareTitle;
		  this.shareDesc=shareDesc;
		  this.shareUrl=shareLink;
		   this.shareImg=shareImg;
		  this.showShare=true;
		 
		},

    onIndexChange(index){
      this.giftIndex = index
    },
    clickSelGift(id,name,qiankunbi){
      this.giftId=id;
      this.giftName = name;
      this.qiankunbi = qiankunbi;
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
      _this.userMoney = parseInt(_this.$store.state.userInfo.userMoney - _this.qiankunbi)
      _this.$store.commit('EDITUSERINFO',{key:"userMoney" ,value:_this.userMoney});
      this.$vux.toast.show({
        type:"text",
        text: "打赏成功",
        position:"middle",
        width:"auto",
      });
      this.$vux.loading.hide();
      this.showCommentIndex=0;
    },
    async getGiftList() {
      let listData = await this.$server.getGiftList();
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
    async  clickShowGift(aliasName,candidateId,objectId){
      if(this.giftList.length<1){
        await this.getGiftList();
      }
      this.showGift = !this.showGift;
      this.aliasName = aliasName;
      this.candidateId = candidateId;
      this.objectId = objectId;
    },
    edit(item){
      let path='publishAppointment';
      if(item.activityMethod==7||item.activityMethod==8){
        path='publishDate'
      }
      this.$router.push({
        path: path,
        query: {
          id: item.id
        }
      })
    },
    openPayWin() {
      const t = this;
      t.showPay = true;
    },
    hiddenPayWin() {
      this.showPay = false;
      setTimeout(() => {
        this.showPayWin = false;
      }, 800)
      this.getList('',null,true)
    },
    windowClick() {
      this.showCommentIndex = 0
    },
    async setFabulous(id,isLike){
      await this.$server.pointLike({
        datingId:id
      })
      let arr = this.$utils.deepCopy(this.listArr);
      arr.map(v=>{
        if(v.id==id){
          v.isLike = isLike==0?1:0
        }
      })
      this.listArr=arr;
    },
    async setGuanzhu(id,isFollow){
      if(isFollow==1){
        await this.$server.unfollowActivity(id);
      }else{
        await this.$server.followActivity(id);
      }
      let arr = this.$utils.deepCopy(this.listArr);
      arr.map(v=>{
        if(v.id==id){
          v.isFollow = isFollow==0?1:0
        }
      })
      this.listArr=arr;
    },
    async unDating(id){//取消发布活动
      let _t = this
      this.$vux.confirm.show({
        content: `确定取消发布活动吗?`,
        cancelText:'再想一想',
        onCancel() {
        },
        async onConfirm() {
          _t.$vux.loading.show()
          await _t.$server.unDating({id: id});
          _t.$vux.loading.hide();
          _t.getList('',null,true)
        }
      })
    },
    async cancelCandidate(id,enrollFee,isDeFrequency,time,hour) {//取消参加活动
      let _t = this
      let text = `确定退出活动吗?`
      if(isDeFrequency==1){
        text = _t.$store.state.custom_config.cancelActNeedTimeAgain?_t.Fn.dictReplace(_t.$store.state.custom_config.cancelActNeedTimeAgain,[hour]):`取消参加活动后${hour}小时内所有活动将不能报名参加，你确定要取消吗？`
      }
      let timestamp = null;
      if(time){
        timestamp = (new Date(Date.parse(time.replace(/-/g,"/")))).getTime()-new Date().getTime()
      }
      if(timestamp&&timestamp<14400000&&enrollFee>0){
        text = _t.$store.state.custom_config.cancelActNeedMoney||`取消参加此次活动将扣除20%报名费用，你确定要取消吗？`
        if(isDeFrequency==1){
          text = _t.$store.state.custom_config.cancelActNeedMoneyAndTime?_t.Fn.dictReplace(_t.$store.state.custom_config.cancelActNeedMoneyAndTime,[hour]):`取消参加活动后${hour}小时内所有活动将不能再报名参加并且扣除20%报名费用，你确定要取消吗？`
        }
      }
      this.$vux.confirm.show({
        content: text,
        cancelText:'再想一想',
        onCancel() {
        },
        async onConfirm() {
          _t.$vux.loading.show()
          await _t.$server.unCandidate({id: id});
          _t.$vux.toast.show({
            type: 'text',
            text: '退出成功',
            position: 'middle',
            width: 'auto',
          })
          _t.$vux.loading.hide();
          _t.getList('',null,true)
          // let arr = _t.$utils.deepCopy(_t.listArr);
          // arr.map(v=>{
          //   if(v.id==id){
          //     v.isCandidate = 0
          //   }
          // })
          // _t.listArr=arr;
        }
      })
    },
    async candidate(id,enrollFee) {
      let _t = this
      _t.$vux.confirm.show({
        content:"确定参加本次约会活动吗？" ,
        cancelText:'再想一想',
        onCancel() {
        },
        async onConfirm() {
          _t.payObj.id=id
          _t.payObj.enrollFee=enrollFee
          //参加活动接口

          if (enrollFee != 0) {
            _t.showPayWin = true;
            return ;
          } else {
            try{
              _t.$vux.loading.show()
              await _t.$server.candidate({id:id})
              _t.$vux.loading.hide()
              _t.getList('',null,true)
            }catch (e) {
              console.log("报名异常",e)
              let content = "";
              let path = "";
			  
			  if(e.status&&e.status==110068){
				content=_t.$store.state.custom_config.actNeedAuth?_t.Fn.dictReplace(_t.$store.state.custom_config.actNeedAuth,[e.message]):`${e.message},认证通过后才可以报名参加本活动`
				path="certificationCenter"
			  }else if(e.status&&e.status==110014){
				content=_t.$store.state.custom_config.actNeedIdentityAuth||`本活动有认证要求，您需要通过身份证实名认证才可以报名参加本活动`
				path="identityAuth"
			  }else if(e.status&&e.status==110015){
				content=_t.$store.state.custom_config.actNeedHouseAuth||`本活动有认证要求，您需要通过房产认证才可以报名参加本活动`
				path="houseAuth"
			  }else if(e.status&&e.status==110016){
				content=_t.$store.state.custom_config.actNeedCarAuth||`本活动有认证要求，您需要通过车产认证才可以报名参加本活动`
				path="carAuth"
			  }else if(e.status&&e.status==110018){
				content=_t.$store.state.custom_config.actNeedVideoAuth||`本活动有认证要求，您需要通过视频认证才可以报名参加本活动`
				path="videoAuth"
			  }
              if(content){
                _t.$vux.confirm.show({
                  content:content ,
                  confirmText: '去认证',
                  cancelText: '再想一想',
                  onCancel() {
                  },
                  onConfirm() {
                    _t.$router.push({
                      path: path,
                    })
                  }
                })
              }
            }


          }
        }
      })



    },
    beforeEnter(id) {
      $((this.$refs)[id]).addClass('hidden')
    },
    afterEnter(id) {
      $((this.$refs)[id]).removeClass('hidden')
    },
    showMyactivity(){
      if(!this.$store.state.isLogin){
        this.$router.push({
          path: 'login',
        })
      }else{
        this.myactivity=!this.myactivity;
        if(this.active!=3){
          this.datingThemes='';
          this.activityMethod=null;
          this.listArr=[];
          this.getList('',null,true)
        }else{

        }
      }
    },
    showPopoverm(){
     /* if(this.active!=3){
        this.showPopover=!this.showPopover
      }else{
        this.$refs.registration.showFilterm();
      }*/
	  if(this.active!=3){
        this.keytype={sex:true,place:true,date:true,auth:true,edu:true,height:true,age:true}
      }else{
        this.keytype={place:true,date:true,blindType:true}
      }
	  this.showPopover=!this.showPopover
    },
    linkTo(link, act) {
      let query = null;
      if (act) {
        query = {
          act: act
        }
      }
      this.$router.push({
        path: link,
        query: query
      })
    },
		placePicker(val){
			this.showPlacePicker=val;
		},
		shStartDate(val){
			this.showStartDate=val;
		},
		shEndDate(val){
			this.showEndDate=val;
		},
		shHeightRe(val){
			this.showHeightRe=val;
		},
		shAge(val){
			this.showAge=val;
		},
		
		showImage(index, id, e) {
			let pid = 'previewer' + id
			this._previewer = e;
			this.showPhotoStatus=true;
			this.showImgID=pid;
			;((this.$refs)[pid])[0].show(index)
		},
		getImage(imageArr) {
			return imageArr.map((item) => {
				return {
					src: this.getFullPath(item)
				}
			})
		},
		closeImg(){
			this.showPhotoStatus=false;
		},
		formatDate(date){
			if(date){
				let endDate=date.split(" ")[0];
				if(endDate){
					let endTime=new Date(endDate.replace(/\-/g, "/")).getTime();
					let nowTime=new Date(new Date().setHours(0, 0, 0, 0)).getTime();//今天凌晨
					let dis=(endTime-nowTime)/(24*60*60*1000);
					if(dis==0){
						return "今天 "+date.split(" ")[1]
					}else if(dis==1){
						return "明天 "+date.split(" ")[1]
					}
				}
			}
			return date;
		},
    myscroll(pos) {
      const newVal = pos.y;
      if (!this.beforeIndexListFixedHeight) {
        this.beforeIndexListFixedHeight = $(".yuan").height()+0.4*parseInt(document.documentElement.style.fontSize);
      }
      if (newVal > -this.beforeIndexListFixedHeight) {
        if(this.indexListFixed){
          $(".yuan").css("display","");
          this.menuFixed = false;
        }
        this.indexListFixed = false
        return
      }
      this.indexListFixed = true
    },
    clickShare() {
      this.showShare = !this.showShare;
    },
    changeShow(val){
      this.showShare=val;
    },
    showFilter(){
      this.showPopover = !this.showPopover;
    },
    closePopover(){
      this.showPopover = false;
    },
    makesure(result){
		if(this.active!=3){
        this.searchResult = result;
		this.getList(this.datingThemes,null,true,null,null,null,null,null,null);
      
      }else{
        this.$refs.registration.filterMakesure(result)
      }
	  this.showPopover = false;  
    },
    chooseThemes(index){
      this.showChooseThemes=false;
	  this.$store.commit("CHANGEHANDLEROUTE",false);//不保持页面不被返回 或用下面settimeout
      //setTimeout(()=>{//如果跳转的路由也有监听routerback要做延迟处理
		if(index==1){
			this.$router.push({
			  path: '/publishAppointment',
			})
		  }else{
			this.$router.push({
			  path: '/publishDate',
			})
		  }
	  //},0)
      return false;
      let path = '/publish/main'
      if(index==1){//旅行
        path = '/travel/main'
      }else if(index==2||index==4){

      }else if(index==5||index==99){
        path = '/other/main'
      }else if(index==3){
        path = '/movie/main'
      }

      this.$router.push({
        path: path,
        query:{
          datingThemes:index
        }
      })
    },
    getFullPath (path) {
      return this.$utils.getFullPath(path)
    },
    async onPullingDown() {
      // 模拟更新数据
      console.log('下拉刷新')
      this.$refs.scroll.openPullUp()
	  this.isRefresh = true;
      let totalPage = await this.getList(this.datingThemes,null,true)
    },
    async onPullingUp() {
      // 更新数据
      console.log('上拉加载')
      let totalPage = await this.getList(this.datingThemes)

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
    toLoveList(index){
      console.log(index)
      this.$router.push({
        path: "/loveList",
        query: {
          listIndex: index
        }
      })
    },
    toListItem(id){
      this.$router.push({
        path: "/act",
        query: {
          id: id
        }
      })
    },
    clickShare() {
      this.showShare = !this.showShare;
    },
    getOrderList(type){
      this.active=type;
      if(type!=3){
        this.datingThemes='';
        this.activityMethod=null;
        this.listArr=[];
        this.getList('',null,true)
      }else{

      }
      console.log(type)
      this.$refs["tab_ref_"+type].style.transition="all 300ms linear";
      this.$refs["tab_ref_"+type].style.width="4rem";
      this.$refs["tab_ref_"+type].style.height="4rem";
      this.$refs["tab_ref_"+type].style.opacity="0";
      setTimeout(()=>{
        this.$refs["tab_ref_"+type].style.transition="all 0ms linear";
        this.$refs["tab_ref_"+type].style.width="0";
        this.$refs["tab_ref_"+type].style.height="0";
        this.$refs["tab_ref_"+type].style.opacity="1";
      },300)
    },
    async getList(datingThemes,search,PullingDown,sex,authentication,areaId,datingTime,startDate,endDate,activityMethod){
      try{
        const _this = this;
        if(_this.indexListFixed){
          $(".yuan").css("display","none");
          _this.menuFixed = true;
        }
        if(_this.datingThemes!=datingThemes){
          this.page = 1;
          _this.listArr=[];
          this.$refs.scroll.openPullUp()
          console.log("打开上拉加载")
        }
        if(typeof(activityMethod) == "undefined"){
          activityMethod = _this.activityMethod;
        }
        if(_this.activityMethod!=activityMethod){
          this.page = 1;
          _this.listArr=[];
          this.$refs.scroll.openPullUp()
          console.log("打开上拉加载")
        }
        if(PullingDown){
          this.isRefresh = true;
          this.page = 1;
        }
        _this.datingThemes = datingThemes;
        _this.activityMethod = activityMethod;
		let isRefresh={};
		  if(_this.isRefresh){
			isRefresh={isRefresh:true};
		}
        let location = await _this.$store.dispatch("getMylocation");
		  console.log(location)
        let data = Object.assign({//myactivity
          returnMyPublisher:_this.myactivity?2:null,
          latitude:location.lat==0?null:location.lat,
          longitude: location.lon==0?null:location.lon,
          datingThemes:_this.datingThemes,
          activityMethod:activityMethod,
          appointmentType:_this.active==1?0:1,
          sex:_this.searchResult.sex,
          idStatus:_this.searchResult.authentication.idcard,
          houseStatus:_this.searchResult.authentication.house,
          carStatus:_this.searchResult.authentication.car,
          videoStatus:_this.searchResult.authentication.video,
          areaId:_this.searchResult.areaId,
          beginActivityStarttime:_this.searchResult.beginActivityStarttime?_this.searchResult.beginActivityStarttime+" 00:00:00":null,
          endActivityStarttime:_this.searchResult.endActivityStarttime?_this.searchResult.endActivityStarttime+" 23:59:59":null,
          page:this.page,
          rows:this.rows,
          education:_this.searchResult.education,
          minHeight:_this.searchResult.minHeight,
          minAge:_this.searchResult.minAge,
          maxAge:_this.searchResult.maxAge,
          filtNotQuali:_this.myactivity?'':2,
		  ...isRefresh
        },search)
        if(_this.searchResult.lat!=null){
          data =  Object.assign({
            latitude1:_this.searchResult.lat,
            longitude1: _this.searchResult.lon,
          },data)
        }
        this.$vux.loading.show()
        let result = await _this.$server.searchDatingList(data);
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
	}
}
</script>
<style scoped lang="scss">
  @keyframes slideInRight {
    from {
      transform: translate3d(100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(100%, 0, 0);
    }
  }
  .slideInRight {
    animation-name: slideInRight;
  }

  .slideOutRight {
    animation-name: slideOutRight;
  }

  .slideInRight, .slideOutRight{
    animation-duration: 0.3s;
  }
  .dodiv {
    p{
      font-size: 0.4rem;
      color: #9e9e9e;
      padding: 0.13rem 0;
      display: inline-block;
      span{
        padding: 0 0.15rem;
        i{
          margin-right: 0.1rem;
        }
      }
    }
    position: relative;
    span {
      height: 1.3rem;
      line-height:1.3rem;
    }
    div {
      position: absolute;
      right: 1.2rem;
      top: 0.2rem;
      & > span {
        display: inline-block;
        background-color: #4c5254;
        color: #FFF;
        font-size: 0;
        border-radius: 3px;
        & > span {
          position: relative;
          font-size: 0.36rem;
          padding: 0 0.2rem;
          box-sizing: border-box;
          white-space :  nowrap ;
          &:not(:first-child){
            border-left: 1px solid #414749;
          }
        }
        i {
          font-size: 0.36rem;
        }
      }
    }
    & > span:last-child {
      position: absolute;
      right: 0;
      color: #fff;
      i {
        vertical-align: -0.25rem;
        display: inline-block;
        width: 1.1rem;
        height: 0.7rem;
        line-height: 0.7rem;
        background-color: #c4c4c4;
        text-align: center;
        border-radius: 3px;
      }
    }
  }
  .hidden {
    overflow: hidden;
  }
  .header{
    &>div{
      position: relative;
      .top{
        padding: 0.4rem 0.3rem 0.06rem;
        height: 0.93rem;
        .tab{
          position: relative;
          text-align: left;
          height: 0.83rem;
          line-height: 0.83rem;
          font-size: 0;
          margin: 0 !important;
          overflow: visible;
          span{
            width: 2.4rem;
            height: 0.83rem;
            display: inline-block;
            text-align:center;
            color:#aeaeae;
            font-size: 0.5rem;
            &.active{
              color:#ff3f63;
              font-size: 0.6rem;
            }
          }
          .tab_index{
            position:relative;
            overflow: hidden;
            i{
              position: absolute;
              display: table;
              width: 0;
              height: 0;
              margin: auto;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              background-color: #b7b7b7;
              border-radius: 50%;
            }
          }
          .underline {
            position: absolute;
            height: 0.83rem;
            z-index: 1000;
            text-align: center;
            background-color: rgba(0, 0, 0, 0);
            transition: 0.2s all linear;
            &::before {
              content: "";
              position: absolute;
              width: 35%;
              bottom: -5px;
              left: 0.78rem;
              height: 2px;
              background-color: #ff3f63;
              border-radius: 5px;
              display: inline-block;
              box-sizing: border-box;
              /*border-bottom: 3px solid #ff3f63;*/
            }
          }
        }
        .right{
          top:0;
          bottom:0;
          right: 0;
          i{
            height: 100%;
            display: inline-flex;
            align-items: center;
            padding: 0 0.28rem;
          }
          i:last-child::before{
            position: absolute;
            content: "";
            z-index: 99;
            margin-left: -0.28rem;
            top: 50%;
            margin-top: -0.3rem;
            width: 1px;
            height: 0.6rem;
            background-color: #eaeaea;
          }
          i:active{
            background-color: #f4f4f4;;
          }
        }
      }
    }
  }
  .dialog-chooseThemes{
    .chooseThemes{
      background-color: #FFF;
      width: 9.96rem;
      margin: auto;
      line-height: 1;
      overflow: hidden;
      border-radius: 10px;
      &>p{
        position: relative;
        padding:0.64rem 0;
        font-size: 0.5rem;
        .iconfont{
          position:absolute;
          right: 5px;
          top:5px;
          font-size: 0.6rem;
        }
      }
      &>div{
        margin: 0 auto 1.2rem;
        color:#8e8e8e;
        width: 8.56rem;
        font-size: 0.36rem;
        line-height: 1.2;
        display:flex ;
        justify-content: space-between;
        &>div{
          width: 4.13rem;
         // height: 5.2rem;
          background-color: #f2f4fc;
          div{
            height: 1.97rem;
            display: inline-flex;
            align-items: flex-end;
            img{
              width: 1.4rem;
            }
          }
          p{
            font-size: 0.44rem;
            font-weight: 500;
            margin: 0.3rem 0 0.48rem;
          }
          p:nth-of-type(2){
            text-align: left;
            margin: 0 0.15rem;
            border-top: 1px solid #e4e5e7;
            line-height: 1.8;
			padding:0.2rem 0;
            font-size: 0.36rem;
            color:#b5b6ba;
			table-layout:fixed;word-wrap:break-word;word-break:break-all;
          }
        }
      }
    }
    .arrow{
      position: relative;
      &:after{
        content: '';
        z-index: 1002;
        position: absolute;
        top: -0.6rem;
        right:1.6rem;
        border-width:0.6rem;
        border-style:dashed solid dashed dashed;
        border-color:transparent #FFF transparent transparent;
      }
    }
  }
  .publishButton{
    position: fixed;
    bottom: 2.74rem;
    right: 0.4rem;
    width: 1.54rem;
    height: 1.54rem;
    z-index: 5001;
    text-align: center;
    line-height: 1.54rem;
    border: 1px solid #FFF;
    background: linear-gradient(to right, #ff9a63 , #ff5b02); /* 标准的语法 */
    border-radius: 50%;
    color: #FFF;
    transition-duration:0.5s;
    i{
      transition-duration:0.5s;
      transform:rotate(0deg);
      display: inline-block;
    }
    i.rotate{
      transform:rotate(45deg);
    }
    &.active{
      /*bottom: 1.4rem;*/
    }
  }
</style>
