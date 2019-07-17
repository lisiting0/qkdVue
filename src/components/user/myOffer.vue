<template>
  <div class="main jy_new_love" @click="windowClick">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
         <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        <router-link :to="{name:'love'}" class="right">参加邀约</router-link>{{title}}
      </div>
    </div>
    <div class="title fixed" style="margin-top: 1.22rem;">
      <div class="underline" ref="underline" :style="{left:underlineLeft}"></div>
      <div @click="getList(1)" :class="{active:active==1}">已参加</div>
      <div @click="getList(2)" :class="{active:active==2}">已关注</div>
      <div @click="getList(3)" :class="{active:active==3}">已发起</div>
      <div @click="getList(4)" :class="{active:active==4}">待赴约</div>
    </div>
    <myScroller :style="$store.state.isBrowser?'padding:3.05rem 0 0;':'padding:3.95rem 0 0;'" :infinite="infinite" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller" :showbg="showbg">
      <div class="myscoll">
        <template>
          <ul class="jy_new_love_list">
            <router-link tag="li" v-for="item,index in listArr"  v-if="item.datingDetailsExt" :key="index"  :to="{name:'act',query:{id:item.id}}" >
              <div class="jy_new_love_list_t">
                <img v-if="active==1&&item.isWinner==0&&item.state==5" class="nowin" src="../../images/love/nowin.png"/>
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
                <img v-if="active==1&&item.state==6" class="state_" src="../../images/love/state6.png"/>
                <img v-else-if="active==1&&item.state==5" class="state_" src="../../images/love/state5.png"/>
                <h3><em :class="'jy_new_love_tit_'+item.datingThemes">{{item.datingThemes==1?'旅行':item.datingThemes==2?'吃饭':item.datingThemes==3?'电影':item.datingThemes==4?'唱歌':item.datingThemes==5?'运动':'其他'}}</em><span class="jy_new_love_datingDesc"> {{item.datingDesc}}</span></h3>
                <div class="jy_new_love_list_bimg" v-if="item.showImg">
                  <p v-for="v,i in item.showImg" :key="i" >
                    <i :style="{'background-image':'url('+getFullPath(v)+')'}" @click.stop="showImage(i,item.id,$event)"></i>
                  </p>
                </div>
                <p class="jy_new_love_list_pos">{{item.datingLocation}}({{item.datingDetailsExt.extString}})</p>
                <p class="jy_new_love_list_date">
                  {{item.datingDetailsExt.extInt7==1?"不限时间":item.datingDetailsExt.extInt7==2?"平常周末":(item.activityStarttime.substr(0,16)+" "+(item.datingDetailsExt.extInt10==1?"左右":"准点"))}}
                </p>
                <p class="jy_new_love_list_tip">{{item.expectSex==1?"仅限女性":item.expectSex==2?"仅限男性":"不限男女"}} · {{item.payType==0?'AA':item.payType==1?'我请客':item.payType==2?'你买单':item.payType==3?'男A女免':item.payType==4?'视情况而定':''}}· {{item.payType==0?'每人'+item.enrollFee+"元":item.payType==1?'':item.payType==2?'':item.payType==3?'男士'+item.enrollFee+"元":item.payType==4?'':''}}{{item.datingDetailsExt.extInt6==1?"[多退少补]":''}}</p>

                <div class="dodiv">
                  <p>
                    <span><i style="font-size: 0.6rem" class="iconfont">&#xe63b;</i>{{item.viewFrequency}}</span>
                    <span><i style="font-size: 0.5rem" class="iconfont">&#xe603;</i>{{item.likeCount}}</span>
                    <span><i style="font-size: 0.4rem" class="iconfont">&#xe619;</i>{{item.followCount}}</span>
                    <span><i style="font-size: 0.4rem" class="iconfont">&#xe6dc;</i>{{item.enrollCount}}{{item.activityMethod==8?"/"+item.datingDetailsExt.extInt12:""}}</span>
                  </p>
                  <div :ref="item.id">
                    <transition v-on:before-enter="beforeEnter(item.id,1)" v-on:before-leave="beforeEnter(item.id,1)" v-on:after-enter="afterEnter(item.id,1)" v-on:after-leave="afterEnter(item.id,1)" enter-active-class="slideInRight" leave-active-class="slideOutRight">
                            <span v-show="showCommentIndex==item.id">
                               <!--<span v-if="item.isLike==0&&$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;setFabulous(item.id,item.isLike)"><i class="iconfont">&#xe603;</i> 点赞</span>-->
                              <!--<span style="color:#ff3f63" v-if="item.isLike==1&&$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;setFabulous(item.id,item.isLike)"><i class="iconfont">&#xe603;</i> 点赞</span>-->
                               <!--<span v-if="$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;clickShowGift(item.jiaoyouUser.aliasName, item.jiaoyouUser.id,item.id)"><i class="iconfont">&#xe629;</i> 打赏</span>-->
                              <span v-if="$store.state.userInfo.id==item.jiaoyouUser.id&&item.state==2" @click.stop="showCommentIndex=0;edit(item)"><i class="iconfont">&#xe635;</i> 编辑</span>
                               <!--<span v-if="$store.state.isApp" @click.stop="showCommentIndex=0;checkShare(item.id,item.datingThemes,item.datingDetailsExt.extInt7==1?'不限时间':item.datingDetailsExt.extInt7==2?'平常周末':(item.activityStarttime.substr(0,16)+' '+(item.datingDetailsExt.extInt10==1?'左右':'准点')),item.datingLocation)"><i class="iconfont">&#xe638;</i> 分享</span>-->
                              <span v-if="item.isFollow==0&&$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;setGuanzhu(item.id,item.isFollow)"><i class="iconfont">&#xe619;</i> 关注</span>
                              <span style="color:#ff3f63" v-if="item.isFollow==1&&$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;setGuanzhu(item.id,item.isFollow)"><i class="iconfont">&#xe619;</i> 取消关注</span>
                              <span v-if="item.isCandidate==0&&$store.state.userInfo.id!=item.jiaoyouUser.id" @click.stop="showCommentIndex=0;candidate(item.id,item.money)"><i class="iconfont">&#xe6dc;</i> 参加</span>
                              <span style="color:#ff3f63" v-if="item.isCandidate==1" @click.stop="showCommentIndex=0;cancelCandidate(item.id,item.money,item.isDeFrequency,item.datingDetailsExt.extInt7==3?item.activityStarttime:'',item.hour)"><i class="iconfont">&#xe6dc;</i> 退出</span>
                              <span v-if="(item.isCandidate==1||$store.state.userInfo.id==item.jiaoyouUser.id)&&item.activityMethod!=8&&item.activityMethod!=7&&item.state!=2" @click.stop="showCommentIndex=0;toActScene(item.activityMethod,item.id)"><i class="iconfont">&#xe6d5;</i> 进入现场</span>
                              <span v-if="$store.state.userInfo.id==item.jiaoyouUser.id&&item.state!=2" @click.stop="showCommentIndex=0;unDating(item.id)"><i class="iconfont">&#xe6dc;</i> 取消发布</span>
                              <span v-if="active==4&&item.toTop==0" @click.stop="showCommentIndex=0;toTop(item.id,index)"><i class="iconfont">&#xe6dc;</i> 置顶</span>
                              <span v-if="active==4&&item.toTop==1" @click.stop="showCommentIndex=0;unToTop(item.id,index)"><i class="iconfont">&#xe6dc;</i> 取消置顶</span>
                            </span>
                    </transition>
                  </div>
                  <span @click.stop="showCommentIndex==item.id?showCommentIndex=0:showCommentIndex=item.id"><i class="iconfont">&#xe679;</i></span>
                </div>



              </div>
            </router-link>
          </ul>
        </template>
        <template v-if="active==100">
          <template v-if="listArr">
            <template v-if="listArr.length>0">
              <div class="content">
                <swipeout>
                  <ul class="myOffer_list">
                    <li v-for="(item,index) in listArr" :key="item.id" @click.stop="toActiveDetail(item.id)">
                      <swipeout-item transition-mode="follow">
                        <div slot="right-menu">
                          <swipeout-button @click.native="unfollowActivity(item.id,index)" type="primary" v-if="active==2">取消关注</swipeout-button>
                          <swipeout-button @click.native="unPulish(item.id,index)" type="primary" v-if="active==3">删除邀约</swipeout-button>
                        </div>
                        <a slot="content">
                          <i class="user_image" :style="'background-image:url('+getFullPath(item.coverimgImages?item.coverimgImages:item.jiaoyouUser.headimgAttachmentId)+');'" @click.stop="toActiveDetail(item.id)">
                            <div class="playing" style="position: absolute;right: 0;bottom: 0;" v-if="item.state==6">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                            <i class="djs_icon" v-if="item.state==3"></i>
                          </i>
                          <div class="offer_desc">
                            <div class="offer_title">
                              <span class="jy-type xy" v-if="item.activityMethod==1">选缘</span>
                              <span class="jy-type qy" v-if="item.activityMethod==2">抢缘</span>
                              <span class="jy-type jy" v-if="item.activityMethod==3">竞缘</span>
                              <span class="jy-type zy" v-if="item.activityMethod==4">中缘</span>
                              <span class="jy-type py" v-if="item.activityMethod==5">配缘</span>
                              一起{{item.datingThemes==1?'去旅行':item.datingThemes==2?'吃饭':item.datingThemes==3?'看电影':item.datingThemes==4?'唱歌':item.datingThemes==5?'运动':''}}{{item.datingThemes==1?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==2?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==3?item.datingTitle&&' · '+item.datingTitle:item.datingThemes==4?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==5?item.datingTitle&&' · '+item.datingTitle:item.datingTitle&&item.datingTitle}}
                            </div>
                            <div class="offer_con">
                              <p v-if="item.datingChoseShopName">{{item.datingChoseShopName}}</p>
                              <p v-if="item.datingLocation">{{item.datingLocation}}</p>
                              <p>{{item.activityStarttime}}</p>
                              <p v-if="item.datingDesc">{{item.datingDesc}}</p>
                              <p v-else>{{item.allowCompanion==0?'不允许带好友':'可协商携带好友'}}</p>
                            </div>
                            <template v-if="active==2">
                              <span class="jrxc" @click.stop="toActScene(item.activityMethod,item.id)">进入现场</span>
                              <span class="ygz_state" v-if="item.state==5">已结束</span>
                            </template>
                            <template v-if="active==3">
                              <template v-if="item.state!=5">
                                <span class="zdyy" v-if="item.state==2" @click.stop="edit(item)">编辑</span>
                                <span class="zdyy" v-else-if="item.toTop==0" @click.stop="toTop(item.id,index)">置顶邀约</span>
                                <span class="qxzd" v-else-if="item.toTop==1" @click.stop="unToTop(item.id,index)">取消置顶</span>
                              </template>
                              <span class="jrxc" :class="{top2:item.state!=5}" @click.stop="toActScene(item.activityMethod,item.id)">进入现场</span>
                              <span class="ygz_state" v-if="item.state==5">已结束</span>
                            </template>
                        </div>
                      </a>
                      </swipeout-item>
                    </li>
                  </ul>
                </swipeout>
              </div>
            </template>
          </template>
        </template>
        <template v-if="active==10000">
          <template v-if="listArr">
            <template v-if="listArr.length>0">
              <div class="content">
                <ul class="myOffer_list">
                  <li v-for="(item,index) in listArr" :key="item.id" @click.stop="toActiveDetail(item.id)">
                    <a>
                      <i class="user_image" :style="'background-image:url('+getFullPath(item.coverimgImages?item.coverimgImages:item.jiaoyouUser.headimgAttachmentId)+');'" @click.stop="toActiveDetail(item.id)">
                        <div class="playing" style="position: absolute;right: 0;bottom: 0;" v-if="item.state==6">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <i class="djs_icon" v-if="item.state==3"></i>
                      </i>
                      <div class="offer_desc">
                        <div class="offer_title">
                          <span class="jy-type xy" v-if="item.activityMethod==1">选缘</span>
                          <span class="jy-type qy" v-if="item.activityMethod==2">抢缘</span>
                          <span class="jy-type jy" v-if="item.activityMethod==3">竞缘</span>
                          <span class="jy-type zy" v-if="item.activityMethod==4">中缘</span>
                          <span class="jy-type py" v-if="item.activityMethod==5">配缘</span>
                          一起{{item.datingThemes==1?'去旅行':item.datingThemes==2?'吃饭':item.datingThemes==3?'看电影':item.datingThemes==4?'唱歌':item.datingThemes==5?'运动':''}}{{item.datingThemes==1?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==2?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==3?item.datingTitle&&' · '+item.datingTitle:item.datingThemes==4?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==5?item.datingTitle&&' · '+item.datingTitle:item.datingTitle&&item.datingTitle}}
                        </div>
                        <div class="offer_con">
                          <p v-if="item.datingChoseShopName">{{item.datingChoseShopName}}</p>
                          <p v-if="item.datingLocation">{{item.datingLocation}}</p>
                          <p>{{item.activityStarttime}}</p>
                          <p v-if="item.datingDesc">{{item.datingDesc}}</p>
                          <p v-else>{{item.allowCompanion==0?'不允许带好友':'可协商携带好友'}}</p>
                        </div>
                        <span class="jrxc"  @click.stop="showComment(item.id)"><i class="pj_icon"></i>待评价</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </template>
          </template>
        </template>
      </div>
    </myScroller>
    <div v-show="showTextarea" class="commentAdd" @click.stop>
      <textarea :ref="'textarea'" v-model="commentObj.comment"  placeholder="请输入..." :style="{height:textareaHeight+'px'}"/>
      <div @click.stop="sendComment(index)">发送</div>
    </div>
  </div>
</template>
<script>
  import processing from '../../images/processing.png';
  import Loading from '../loading.vue';
   import Back from '@other/back.vue';
  import myScroller from '@other/myScroller.vue';
  import { Scroller,Swipeout, SwipeoutItem, SwipeoutButton } from 'vux';

  let fontsize = parseInt(document.documentElement.style.fontSize);
  export default {
    name: 'myOffer',
    components: {
      Loading,
      myScroller,
      Scroller,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
	    Back,
    },
    data() {
      return {
        showCommentIndex:0,
        myactivity:false,


        imgs: {processing:processing},
        showPopover: false,
        title: '我的约会',
        active: 1,
        isloading: false,
        showTextarea: 0,
        commentObj: {
          momentId: null,
          parentId: null,
          userId: null,
          comment: null
        },
        textareaHeight:0,
        listArr:[],
        endList:[],
        copyList:[],
        //分页参数
        pageNo: 1,
        isRead: false,
        isEnd: false,
        loadRefresh:true,//下拉刷新
        loadInfinite:true, //上拉加载
		showbg:true,
      }
    },
    watch:{
      isEnd(val) {
        const t=this;
        if(val){
          t.$refs.myScroller.finishInfinite(true);
        }else{
          t.$refs.myScroller.finishInfinite(false);
        }
      },
    },
    computed: {
      yuan:function(){
        return function(index){
          return ['选缘','抢缘','竞缘','中缘','配缘'][index-1]
        }
      },
      underlineLeft:function(){
        return (this.active-1)*document.body.clientWidth*0.25 +'px'
      },
    },
    mounted() {

    },
    methods: {
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
      beforeEnter(id) {
        $((this.$refs)[id]).addClass('hidden')
      },
      afterEnter(id) {
        $((this.$refs)[id]).removeClass('hidden')
      },
      showComment(momentId) {
        let obj = {
          momentId: null,
          parentId: null,
          userId: null,
          comment: null
        }
        obj.momentId = momentId
        this.textareaHeight = 1.5 * fontsize
        this.commentObj = obj
        this.showTextarea = momentId
        let pid = 'textarea';
        this.$nextTick(function () {
          $((this.$refs)[pid]).focus()
        })
      },
      windowClick() {
        if (this.showTextarea != 0) {
          this.showTextarea = 0
        }
      },
      getFullPath (path) {
        return this.$utils.getFullPath(path)
      },
      enter(activityMethod,id){
        if(activityMethod==7||activityMethod==8){
          this.$router.push({
            path: "/act",
            query: {
              id: id
            }
          })
        }else{
          this.$router.push({
            path: "/actSceneNew",
            query: {
              id: activityMethod,
              datingId:id
            }
          })
        }
      },
      toActiveDetail(id){
		  //  console.log("dddddddddd"+id);
        this.$router.push({
          path: "/act",
          query: {
            id: id
          }
        })
      },
      toUserInfo(id,silentState){
        this.$router.push({
          path: "userInfo",
          query: {
            id: id,
          	silentState: silentState
          }
        })
      },
      toActScene(id,datingId){
        if(id==7||id==8){
          this.$router.push({
            path: "/act",
            query: {
              id: datingId
            }
          })
        }else{
          this.$router.push({
            path: "actSceneNew",
            query: {
              id: id,
              datingId:datingId
            }
          })
        }
      },
      async getList(active,flag) {
        const _this = this;
        if (_this.isRead) {
          return false;
        }
        _this.isRead = true;
        if (_this.isRefresh || flag || _this.active!=active) {
          _this.pageNo = 1;
          if (flag) {
            _this.isloading = true;
          }
        }
        try{
          let data = {
            page: _this.pageNo,
            rows: _this.$store.state.pageSize
          };
          if (!_this.listArr || !_this.endList || _this.isRefresh || flag || _this.active != active) {
            _this.$refs.myScroller.scrollTo(1);
            _this.listArr = [];
            _this.endList=[];
            _this.copyList=[];
            _this.active = active;
          }
          let result = null;
          let result2 = null;
          let endResult = null;
          if (_this.active == 1) {
            result = await _this.$server.getMyCandidateDating({state:6});
            result2 = await _this.$server.getMyCandidateDating({state:3});
            let data2 = {
              state:5,//已结束
              page: _this.pageNo,
              rows: _this.$store.state.pageSize
            }
            endResult = await _this.$server.getMyCandidateDating(data2);
          } else if(_this.active == 2){
            result = await _this.$server.getMyFollowDating(data);
          }else if(_this.active == 3){
            result = await _this.$server.getMyPublishDating(data);
          }else{
            data.beginDatingStarttime = _this.$utils.format(new Date(),'yyyy-MM-dd hh:mm:ss');
            result = await _this.$server.getWaitingDating(data);
          }
          if(result.data.list){
			_this.showbg=false;
            _this.listArr.push(...result.data.list);
          }
          if(result2 && result2.data.list){
			_this.showbg=false;
            _this.listArr.push(...result2.data.list);
            let allList= _this.listArr;
            allList.map( (obj,index)=>{
              this.$set(
                obj,"djs",this.compareDate(obj.activityStarttime)
              );
            })
            this.copyList = allList;
          }
          if(endResult && endResult.data.list){
			_this.showbg=false;
            _this.listArr.push(...endResult.data.list);
          }
          if (result.data.count <= _this.$store.state.pageSize * _this.pageNo || result.data.list.length < _this.$store.state.pageSize) {//判断是否最后一页
            _this.isEnd = true;
          } else {
            _this.isEnd = false;
            _this.$refs.myScroller.finishInfinite(false);
          }
        }catch (e) {
          console.log(e)
        }
        _this.isRead = false;
        _this.isloading = false;
        _this.isRefresh = false;
        _this.pageNo++;
      },
      infinite(done) {//上拉加载(防止初始内容不满一屏会无限加载)
        const t=this;
        if(t.isEnd){
          done(true);
          return false;
        }
        console.log("加载");
        t.getList(this.active).then(()=>{
          if(t.isEnd){
            done(true);
          }else{
            done();
          }
        });
      },
      refresh(done) {//下拉刷新
        const t=this;
        console.log("刷新");
        t.isRefresh=true;
        t.getList(this.active).then((res)=>{
          done();
        });
      },
      async unfollowActivity(id,index){ //取消关注活动接口
        this.$vux.loading.show()
        let result = await this.$server.unfollowActivity(id);
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: result.data.message,
          position: 'middle',
          width: 'auto',
        })
        this.listArr.splice(index, 1);
      },
      async sendComment(){
        const t=this;
        const index = t.commentObj.index;
        try{
          if(!t.commentObj.comment){
            t.$vux.toast.show({
              type:"text",
              text: "评论内容不能为空",
              position:"bottom",
              width:"auto",
            });
            return;
          }
          const result=await t.$server.postComment({
            businessType:5,
            objectId:t.commentObj.momentId,
            content:t.commentObj.comment
          })
          t.showTextarea=0;
          t.$vux.toast.show({
            type:"text",
            text: "评论成功",
            position:"bottom",
            width:"auto",
          });
          this.listArr.splice(index, 1);
        }catch(e){
        }
      },
      async edit(item){
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
      async toTop(id,index){ //置顶约会活动
        this.$vux.loading.show()
        let result = await this.$server.toTop(id);
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: "置顶活动成功",
          position: 'middle',
          width: 'auto',
        })
        this.$set(this.listArr[index],"toTop",1)
      },
      async unToTop(id,index){ //取消置顶约会活动
        this.$vux.loading.show()
        let result = await this.$server.unToTop(id);
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: "取消置顶活动成功",
          position: 'middle',
          width: 'auto',
        })
        this.$set(this.listArr[index],"toTop",0)
      },
      async unPulish(id,index){ //取消邀约
        this.$vux.loading.show()
        let result = await this.$server.unPublish({id:id});
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: "删除活动成功",
          position: 'middle',
          width: 'auto',
        })
        this.listArr.splice(index, 1);
      },
      compareDate(time){
        let date1= time;          //活动开始时间
        let date2 = new Date(); //当前时间
        let date3 =  new Date(date1).getTime()-date2.getTime();   //时间差的毫秒数
        if(date3>0){
          //计算出相差天数
          let days=Math.floor(date3/(24*3600*1000))
          //计算出小时数
          let leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
          let hours=Math.floor(leave1/(3600*1000))
          //计算相差分钟数
          let leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
          let minutes=Math.floor(leave2/(60*1000))
          //计算相差秒数
          let leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
          let seconds=Math.round(leave3/1000);
          if(hours<10){
            hours="0"+hours;
          }
          if(minutes<10){
            minutes="0"+minutes;
          }
          if(seconds<10){
            seconds="0"+seconds;
          }
          if(hours<=0 && minutes<=0 && seconds<=0){
            hours="00";
            minutes="00";
            seconds="00";
          }
          if(days>=1){
            let date = new Date(date1);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();
            if (month < 10) {
              month = "0" + month;
            }
            if (day < 10) {
              day = "0" + day;
            }
            if (hour < 10) {
              hour = "0" + hour;
            }
            if (min < 10) {
              min = "0" + min;
            }
            if(month<=0 && day<=0 && hour<=0&& min<=0){
              month="00";
              day="00";
              hour="00";
              min="00";
            }
            return month+"-"+day+" "+hour+":"+min;
          }else{
            return hours+":"+ minutes+":"+seconds;
          }
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
  .main {
    padding-bottom: 0;
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
        font-size: 0.6rem;
        position: relative;
        i {
          font-size: 0.52rem;
        }
        a {
          position: absolute;
        }
        .left {
          left: 0.325rem;
        }
        .right {
          right: 0.325rem;
          font-size: 0.42rem;
          padding: 3px;
          color: #ffffff;
        }
      }
    }
    .title {
      font-size: 0;
      margin-top: 1.39rem;
      padding: 0.28rem 0 0;
      height: 1.32rem;
      line-height: 1.32rem;
      background-color: #f2f2f2;
      div.underline{
        position:absolute;
        width: 25%;
        top:0.28rem;
        height: 1.32rem;
        z-index: 1000;
        background-color: rgba(0,0,0,0);
        transition: 0.2s all linear;
        &::before {
          content: "";
          margin-top:-6px;
          width: 30%;
          height: 1.32rem;
          display: inline-block;
          border-bottom: 2px solid #ff4300;
        }
      }
      div {
        position: relative;
        font-size: 0.44rem;
        display: inline-block;
        color: #9a9a9d;
        box-sizing: border-box;
        width: 25%;
        text-align: center;
        background-color: #fff;
        overflow: hidden;
		&:not(.underline):active{
			background-color:#f4f4f4;
		  }
        /*&::before {*/
        /*content: "";*/
        /*position: absolute;*/
        /*bottom: 6px;*/
        /*left: 118%;*/
        /*width: 15%;*/
        /*height: 0;*/
        /*border-bottom: 2px solid #ff4300;*/
        /*transition: 2s all linear;*/
        /*}*/
        .news {
          display: inline-block;
          text-align: center;
          background: #f74c31;
          color: #fff;
          font-size: 12px;
          height: 7px;
          line-height: 7px;
          border-radius: 50%;
          padding: 0 3.5px;
          background-clip: padding-box;
          vertical-align: middle;
          position: absolute;
          top: 0.2rem;
        }
      }
      div.active {
        /*&::before {*/
        /*width: 15%;*/
        /*left: 43%;*/
        /*transition-delay: 1s;*/
        /*}*/
        color: #000;
      }
      div.active ~ div {
        /*&::before {*/
        /*left: -18%;*/
        /*}*/
      }
    }
    .myscoll {
      background-color: #ffffff;
     // margin-top: 3rem;
      .content {
        padding: 0.3rem;
        background-color: #ffffff;
      }
    }
    .commentAdd {
      position: fixed;
      left: 0;
      width: 100%;
      bottom: 0;
      border-top: 1px solid #ccc;
      background-color: #fff;
      padding: 0.2rem;
      textarea {
        padding: 0.1rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 0.4rem;
        background-color: #f2f2f2;
        resize: none;
        width: 77.5%;
        outline: none;
        border: 0;
        vertical-align: top;
      }
      div {
        height: 1.5rem;
        line-height: 1.5rem;
        display: inline-block;
        width: 16%;
        text-align: center;
        background-color: #f2f2f2;
        border-radius: 5px;
      }
    }
  }
  .jy_new_love_list li{
    margin-bottom: 0.4rem !important;
  }
  .jy_new_love_list li .jy_new_love_list_t {
    overflow: visible !important;
  }
  .jy_new_love_list_t{
    position: relative;
    .nowin{
      position:absolute;
      top:-0.38rem;
      right: 0.2rem;
      height: 0.52rem;
      width: 1.46rem;
    }
  }
  .jy_new_love_list_b{
    position: relative;
    .state_{
      position:absolute;
      bottom:1.28rem;
      right: 0.3rem;
      height: 1.66rem;
      width: 1.66rem;
    }
  }
</style>

