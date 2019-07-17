<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left" v-if="!actDatingId"><i class="iconfont">&#xe613;</i></Back>
        <a v-else class="left" @click="hiddenInfo"><i class="iconfont">&#xe613;</i></a>
        <a class="right"><i class="iconfont">&#xe679;</i></a>{{datingDetail.areaName}}
      </div>
    </div>
    <div class="myscrollerdiv" :style="{height:myScrollerHeight+'px'}">
      <div class="tabs">
        <div class="tabs_header">
          <router-link :to="{name:'userInfo',query:{id:datingDetail.jiaoyouUser.id,silentState: datingDetail.jiaoyouUser.silentState}}" tag="div" class="header_icon" :style="'background-image:url('+$utils.getFullPath(datingDetail.jiaoyouUser.headimgAttachmentId)+');'"></router-link>
          <div class="header_right">
            <p><span class="nick_name">{{datingDetail.jiaoyouUser.aliasName}}</span><span><i class="iconfont">{{datingDetail.jiaoyouUser.sex==1?'&#xe64a;':'&#xe605;'}}</i>{{datingDetail.jiaoyouUser.age}}</span><span>Lv.{{datingDetail.jiaoyouUser.level}}</span><span>{{vipType}}</span>
            </p>
            <p><span>{{jiaoyouType[datingDetail.activityMethod]}}</span><span>{{datingDetail.jiaoyouUser.cashDepositLevel>0?'已交保证金':'未交保证金'}}</span>
            </p>
          </div>
          <template v-if="!$store.state.isLogin||datingDetail.jiaoyouUser.id!=$store.state.userInfo.id">
            <p @click="followFriend(datingDetail.jiaoyouUser.id)" class="attention"
               v-if="!$store.state.isLogin||datingDetail.jiaoyouUser.isFollow==0"><i class="iconfont">&#xe61f;</i>关注</p>
            <p @click="unfollowFriend(datingDetail.jiaoyouUser.id)" class="attention"
               v-else-if="datingDetail.jiaoyouUser.isFollow==1" style="width: 2.2rem"><i class="iconfont">&#xe61f;</i>取消关注
            </p>
          </template>
        </div>
        <div class="tabs_content">
          <p>{{datingDetail.datingTitle}}·{{datingDetail.areaName}}</p>
          <p>{{datingDetail.datingDesc}}</p>
          <div v-if="datingDetail.coverimgImages"><img :src="$utils.getFullPath(datingDetail.coverimgImages)"/></div>
          <p><span>报名费：{{datingDetail.enrollFee}}乾坤币</span><span :class="payTypeCls">AA</span><span></span><span :class="payTypeCls2">你买单</span><span></span><span :class="payTypeCls1">我买单</span></p>
          <p>{{datingDetail.allowCompanion==0?'不允许带好友':'允许带好友'}}</p>
        </div>
      </div>
      <div class="demand tabs_div">
        <p class="flex tabs_p"><span class="lable">资格要求：</span><span class="flex">
          <a :class="{demanda:datingDetail.idStatus}"><img :src="imgs.idcard"/></a>
          <a :class="{demanda:datingDetail.carStatus}"><img :src="imgs.car"/></a>
          <a :class="{demanda:datingDetail.houseStatus}"><img :src="imgs.house"/></a>
          <a :class="{demanda:datingDetail.healthyStatus}"><img :src="imgs.health"/></a></span></p>
      </div>
      <div class="followup tabs_div">
        <div class="white" style="margin-top: 0.3rem;">
          <div class="content3">
            <div>约会后续</div>
            <div>
              <slot v-for="item,index in (datingDetail.furtherAction).split(',')">
                <span :class="{active:1}">{{item}}</span>
              </slot>
            </div>
          </div>
          <div class="content3">
            <div>行为规范</div>
            <div>
              <slot v-for="item,index in (datingDetail.behaviorType).split(',')">
                <span :class="{active:1}">{{item}}</span>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div class="meet tabs_div">
        <template v-if="datingDetail.datingThemes==99">
          <p class="flex tabs_p"><span class="lable">约会主题：<span>{{datingDetail.datingTitle}}</span></span><span
            class="lable"></span></p>
          <p class="flex tabs_p"><span class="lable">约会时间：<span>{{datingDetail.datingStarttime}}</span></span><span
            class="lable"></span></p>
          <p class="flex tabs_p"><span class="lable">约会地点：<span style="color:#000;font-weight: 600;">{{datingDetail.datingLocation}}
            <!--<i class="iconfont" style="font-size: 0.4rem;color:#f5b40c;">&#xe6c6;</i>-->
        </span></span>
            <!--<span style="color:#000;">{{spacesRemark}}</span>-->
          </p>
        </template>
        <template v-else-if="datingDetail.datingThemes==1">
          <p class="flex tabs_p"><span class="lable">出发时间：<span>{{datingDetail.datingStarttime}}</span></span><span
            class="lable"></span></p>
          <!--<p class="flex tabs_p"><span class="lable">出发地点：<span style="color:#000;font-weight: 600;">{{datingDetail.datingLocation}}</span></span><span class="lable"></span></p>-->
          <p class="flex tabs_p"><span class="lable">目的地点：<span style="color:#000;font-weight: 600;">{{datingDetail.datingLocation}}</span></span>
          </p>
          <p class="flex tabs_p"><span class="lable">旅行周期：<span style="color:#000;font-weight: 600;">{{tripTimeLength[datingDetail.tripTimeLength]}}</span></span>
          </p>
          <p class="flex tabs_p"><span class="lable">出行方式：<span style="color:#000;font-weight: 600;">{{tripMode[datingDetail.tripMode]}}</span></span>
          </p>
        </template>
        <template v-else-if="datingDetail.datingThemes==2">
          <p class="flex tabs_p"><span class="lable">用餐时间：<span>{{datingDetail.datingStarttime}}</span></span><span
            class="lable"></span></p>
          <p class="flex tabs_p"><span class="lable">用餐地点：<span style="color:#000;font-weight: 600;">{{datingDetail.datingLocation}}</span></span>
          </p>
        </template>
        <template v-else-if="datingDetail.datingThemes==3">
          <p class="flex tabs_p"><span class="lable">影片名称：<span>{{datingDetail.datingTitle}}</span></span><span
            class="lable"></span></p>
          <p class="flex tabs_p"><span class="lable">观影时间：<span>{{datingDetail.datingStarttime}}</span></span><span
            class="lable"></span></p>
          <p class="flex tabs_p"><span class="lable">观影地点：<span style="color:#000;font-weight: 600;">{{datingDetail.datingLocation}}</span></span>
          </p>
        </template>
        <template v-else-if="datingDetail.datingThemes==4">
          <p class="flex tabs_p"><span class="lable">唱歌时间：<span>{{datingDetail.datingStarttime}}</span></span><span
            class="lable"></span></p>
          <p class="flex tabs_p"><span class="lable">唱歌地点：<span style="color:#000;font-weight: 600;">{{datingDetail.datingLocation}}</span></span>
          </p>
        </template>
        <template v-else-if="datingDetail.datingThemes==5">
          <p class="flex tabs_p"><span class="lable">运动项目：<span>{{datingDetail.datingTitle}}</span></span><span
            class="lable"></span></p>
          <p class="flex tabs_p"><span class="lable">运动时间：<span>{{datingDetail.datingStarttime}}</span></span><span
            class="lable"></span></p>
          <p class="flex tabs_p"><span class="lable">运动地点：<span style="color:#000;font-weight: 600;">{{datingDetail.datingLocation}}</span></span>
          </p>
        </template>
      </div>
      <div class="compete tabs_div">
        <p class="flex tabs_p"><span class="lable">{{jiaoyouType[datingDetail.activityMethod]}}时间：<span>{{datingDetail.activityStarttime}}</span></span><span
          class="link_to">活动说明<i class="iconfont">&#xe682;</i></span></p>
      </div>
      <div class="breakrule tabs_div">
        <p class="flex tabs_p"><span class="lable">违约惩罚：<span style="font-size: 0.35rem;">如若出现违约，平台将进行一定惩罚</span></span><span
          class="link_to">惩罚说明<i class="iconfont">&#xe682;</i></span></p>
      </div>
      <!--<router-link :to="{name:'home'}" class="act_join">报名</router-link>-->
    </div>
    <div class="footer">
      <!--活动发布者进入-->
      <template v-if="datingDetail.jiaoyouUser.id == $store.state.userId">
        <div class="grey" v-if="datingDetail.state==5">活动已结束</div>
        <div @click="enter" v-if="datingDetail.isCandidate==1||datingDetail.jiaoyouUser.id == $store.state.userId">进入现场</div>
      </template>
      <template v-else>
        <template v-if="datingDetail.state==5">
          <div class="grey" v-if="datingDetail.state==5">活动已结束</div>
          <div @click="enter" v-if="datingDetail.isCandidate==1||datingDetail.jiaoyouUser.id == $store.state.userId">进入现场</div>
        </template>
        <template v-else>
			<template v-if="!$store.state.isLogin">
            <div @click="candidate">确定参加</div>
            <div @click="followActivity" >关注</div>
          </template>
          <template v-if="datingDetail.isCandidate==0">
            <div @click="candidate">确定参加</div>
            <div @click="followActivity" v-if="datingDetail.isFollow==0">关注</div>
            <div @click="unfollowActivity" v-if="datingDetail.isFollow==1">取消关注</div>
          </template>
          <template v-else>
            <div @click="enter" v-if="datingDetail.isCandidate==1||datingDetail.jiaoyouUser.id == $store.state.userId">进入现场</div>
            <div @click="cancelCandidate" v-if="datingDetail.isCandidate==1">退出活动</div>
          </template>
        </template>
      </template>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" hide-on-blur class="dialog-attention" :dialog-style="{'max-width': '100%', width: '100%','padding': '20px 0', 'background-color': 'transparent'}">
        <div class="attention">
          <p>已关注<i class="iconfont" @click="showHideOnBlur=false">&#xe67c;</i></p>
          <div>进入<a>活动现场</a>或者稍后通过<a>我的关注</a>进入</div>
          <p><!--注：只关注活动用户，进入现场不能互动，只能观场！--></p>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlurPay" hide-on-blur class="dialog-pay" :dialog-style="{'max-width': '100%', width: '100%','padding': '20px 0', 'background-color': 'transparent'}">
        <div class="pay">
          <p>支付<i class="iconfont" @click="showHideOnBlurPay=false">&#xe67c;</i></p>
          <p>乾坤币</p>
          <p>20.00</p>
          <div>
            <input ref="pwd" type="number" maxlength="6" v-model="password" style="position: absolute;z-index: -1;left:-100%;opacity: 0"/>
            <ul class="pwd-wrap" @click="focus">
              <li><i class="iconfont" v-if="password.length > 0">&#xe612;</i></li>
              <li><i class="iconfont" v-if="password.length > 1">&#xe612;</i></li>
              <li><i class="iconfont" v-if="password.length > 2">&#xe612;</i></li>
              <li><i class="iconfont" v-if="password.length > 3">&#xe612;</i></li>
              <li><i class="iconfont" v-if="password.length > 4">&#xe612;</i></li>
              <li><i class="iconfont" v-if="password.length > 5">&#xe612;</i></li>
            </ul>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import car from '../../images/car.png';
  import idcard from '../../images/idcard.png';
  import house from '../../images/house.png';
  import health from '../../images/health.png';

  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import {XDialog, TransferDomDirective as TransferDom} from 'vux'
	//import { wxShare } from '@js/wxjssdk'
  export default {
    name: 'act',
    props: ['actDatingId'],
    data() {
      return {
        id: null,//当前活动id
        datingDetail: {
          jiaoyouUser: {},
          furtherAction: '',
          behaviorType: ''
        },
        showHideOnBlur: false,
        showHideOnBlurPay: false,
        imgs: {car: car, idcard: idcard, house: house, health: health},
        myScrollerHeight: 0,
        isloading: false,

        vipType: 'SVIP3',
        jiaoyouType: ["", "选缘", "抢缘", "竞缘", "中缘", "配缘", "寻觅对象"],
        datingTitles: ['旅行', '吃饭', '电影', '唱歌', '运动', '其他'],
        tripTimeLength: ['', '一两天', '三五天', '十天半月'],
        tripMode: ['', '火车', '飞机', '动高铁', '游轮', '自驾', '大巴', '骑行'],
        followup: [],
        rule: [],
        times: "08月10日 18:00-24:00",
        timeRemark: "可延长",
        spaces: "星巴克(萝岗万达店)",
        spacesRemark: "[平台合作单位]",
        competeTime: "2018-08-06 10:00:00",
        password: '',
      }
    },
    computed: {
      payTypeCls: function () {
        return {
          payTypeCls: this.datingDetail.payType == 0
        }
      },
      payTypeCls1: function () {
        return {
          payTypeCls: this.datingDetail.payType == 1
        }
      },
      payTypeCls2: function () {
        return {
          payTypeCls: this.datingDetail.payType == 2
        }
      },
      handleRoute() {
        return this.$store.state.handleRoute;
      },
    },
    watch: {
      handleRoute(newV) {
        if (!newV) {
          this.showHideOnBlur = false;
          this.showHideOnBlurPay = false;
        }
      },
      showHideOnBlur(newV) {
        let status = this.showHideOnBlur || this.showHideOnBlurPay
        this.$store.commit("CHANGEHANDLEROUTE", status)
      },
      showHideOnBlurPay(newV) {
        let status = this.showHideOnBlur || this.showHideOnBlurPay
        this.$store.commit("CHANGEHANDLEROUTE", status)
      },
      password(curVal) {
        if (/[^\d]/g.test(curVal)) {
          this.password = this.password.replace(/[^\d]/g, '');
        }
      },
    },
    async mounted() {
      this.id = this.$route.query.id || this.actDatingId;
      $("body").addClass("act");
      $(".dialog-attention").find(".weui-mask").css({'background-color': 'rgba(0,0,0,0)'})
      this.myScrollerHeight = document.body.clientHeight - $(".header").height() - $(".footer").height() - 0.75 * parseInt(document.documentElement.style.fontSize) - 2;
      this.$vux.loading.show()
      let result = await this.$server.getSingle({datingDetailsId: this.id});
      this.datingDetail = result.data.data
      console.log(JSON.stringify(this.datingDetail))
      let apiDict = await this.$server.apiDict({type: "dating_further_action"});
      this.followup = apiDict.data.data
      let rule = await this.$server.apiDict({type: "dating_behavior_type"});
      this.rule = rule.data.data
      this.$vux.loading.hide()
      this.$nextTick(()=>{
        this.actDatingId&&this.$emit('openInfo');
      });

    },
    destroyed() {
      $("body").removeClass("act");
    },
    directives: {
      TransferDom
    },
    components: {
      Loading,
      Back,
      XDialog
    },
    methods: {
      hiddenInfo(){
        this.$emit('hiddenInfo');
      },
      enter() {
        this.$router.push({
          path: "/actSceneNew",
          query: {
            id: this.datingDetail.activityMethod,
            datingId: this.id
          }
        })
      },
      async candidate() {
        //参加活动接口
        let _t = this
        if (this.datingDetail.enrollFee != 0) {
          this.$vux.confirm.show({
            content: `参加此活动会消耗${this.datingDetail.enrollFee}乾坤币，确定参加吗`,
            onCancel() {
            },
            async onConfirm() {
              _t.$vux.loading.show()
              await _t.$server.candidate({id: _t.id})
              _t.$vux.loading.hide()
              _t.$router.push({
                path: "/actSceneNew",
                query: {
                  id: _t.datingDetail.activityMethod,
                  datingId: _t.id
                }
              })
            }
          })
        } else {
          _t.$vux.loading.show()
          await _t.$server.candidate({id: _t.id})
          _t.$vux.loading.hide()
          _t.$router.push({
            path: "/actSceneNew",
            query: {
              id: _t.datingDetail.activityMethod,
              datingId: _t.id
            }
          })
        }
      },
      async cancelCandidate() {//取消参加活动
        let _t = this
        this.$vux.confirm.show({
          content: `确定退出活动吗?`,
          onCancel() {
          },
          async onConfirm() {
            _t.$vux.loading.show()
            await _t.$server.unCandidate({id: _t.id});
            _t.datingDetail.isCandidate = 0;
            _t.$vux.toast.show({
              type: 'text',
              text: '退出成功',
              position: 'middle',
              width: 'auto',
            })
            _t.$vux.loading.hide();
          }
        })
      },
      async followFriend(id) { //关注好友接口
        this.$vux.loading.show()
        await this.$server.followFriend(id);
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: '关注成功',
          position: 'middle',
          width: 'auto',
        })
        this.datingDetail.jiaoyouUser.isFollow = 1;
      },
      async unfollowFriend(id) { //取消关注好友接口
        this.$vux.loading.show()
        await this.$server.unfollowFriend(id);
        this.$vux.loading.hide();
        this.$vux.toast.show({
          type: 'text',
          text: '取消关注成功',
          position: 'middle',
          width: 'auto',
        })
        this.datingDetail.jiaoyouUser.isFollow = 0;
      },
      async followActivity() { //关注活动接口
        this.$vux.loading.show()
        await this.$server.followActivity(this.id);
        this.$vux.loading.hide()
        this.showHideOnBlur = true;
        this.datingDetail.isFollow = 1;
      },
      async unfollowActivity() { //取消关注活动接口
        this.$vux.loading.show()
        await this.$server.unfollowActivity(this.id);
        this.$vux.loading.hide()
        this.showHideOnBlur = true;
        this.datingDetail.isFollow = 0;
      },
      focus() {
        this.$refs.pwd.focus();
      },
    }
  }
</script>
<style scoped lang="scss">
  .main {
    padding-bottom: 0;
    &:before {
      background-color: #3a3845;
    }
    .header {
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
    .tabs {
      .tabs_header {
        background-color: #FFF;
        padding: 0.72rem 0.4rem 0;
        height: 1.3rem;
        position: relative;
        & > div {
          display: inline-block;
        }
        .header_icon {
          width: 1.3rem;
          height: 1.3rem;
          background-size: 100%;
          border-radius: 0.65rem;
          vertical-align: bottom;
        }
        .header_right {
          font-size: 0.26rem;
          height: 1.3rem;
          line-height: 1.3rem;
          margin: 0 0 0 0.16rem;
          p {
            line-height: 0.65rem;
            i {
              font-size: 0.22rem;
            }
          }
          p:first-child {
            .nick_name {
              font-size: 0.36rem;
              margin-right: 0.2rem;
              vertical-align: middle;
            }
            span:not(.nick_name) {
              font-size: 0.22rem;
              margin-right: 0.2rem;
              width: 0.88rem;
              height: 0.34rem;
              line-height: 0.34rem;
              text-align: center;
              display: inline-block;
              border-radius: 0.17rem;
              color: #FFF;
            }
            span:nth-of-type(2) {
              background-color: #ff84ac;
            }
            span:nth-of-type(3) {
              background-color: #c37a51;
            }
            span:nth-of-type(4) {
              background-color: #ffb400;
            }
          }
          p:last-child {
            span:first-child {
              background: -webkit-linear-gradient(left, #ff7900, #ffd455); /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(right, #ff7900, #ffd455); /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(right, #ff7900, #ffd455); /* Firefox 3.6 - 15 */
              background: linear-gradient(to right, #ff7900, #ffd455); /* 标准的语法 */
              padding: 0.05rem 0.15rem;
              color: #FFF;
              border-radius: 3px;
            }
            span:last-child {
              margin-left: 0.33rem;
              color: #45a3ff;
            }
          }
        }
        .attention {
          font-size: 0.24rem;
          position: absolute;
          right: 0.4rem;
          top: 0.84rem;
          width: 1.3rem;
          height: 0.45rem;
          line-height: 0.45rem;
          text-align: center;
          color: #FFF;
          background-color: #ff5a00;
          border-radius: 0.23rem;
          i {
            font-size: 0.24rem;
            margin-right: 0.1rem;
          }
        }

      }
      .tabs_content {
        background-color: #FFF;
        p:before {
          content: "●";
          color: #E0E0E0;
          font-size: 0.12rem;
          line-height: 2;
          vertical-align: text-top;
          display: inline-block;
          margin-right: 0.4rem;
        }
        p {
          padding: 0 1.05rem 0.46rem;
          font-size: 0.4rem;
          color: #b4b4b4;
        }
        p:nth-of-type(1) {
          padding: 0.46rem 1.05rem;
          &:before {
            font-size: 0.3rem;
            margin-left: -0.04rem
          }
          font-size: 0.48rem;
          color: #000;
        }
        div {
          margin: 0 1.57rem 0.46rem;
          img {
            height: 2.8rem;
          }
        }
        p:nth-of-type(3) {
          padding: 0 0 0.46rem 1.05rem;
          span:not(:first-child) {
            float: right;
            height: 0.52rem;
            text-align: center;
            margin: 0 0.2rem;
            padding: 0 0.2rem;
          }
          span:nth-of-type(3), span:nth-of-type(5) {
            margin: 0;
            padding: 0;
            float: right;
            width: 1px;
            border-left: 1px solid #c4c4c4;
          }
          span {
            line-height: 0.52rem;
          }
          .payTypeCls {
            background-color: #33c841;
            border-radius: 3px;
            color: #FFF;
          }
        }
      }
    }
    .tabs_div {
      margin-top: 0.34rem;
      padding: 0 0.4rem;
      background-color: #fff;
    }
    .tabs_p {
      height: 1.54rem;
      line-height: 1.54rem;
      color: #d5d5d5;
      font-size: 0.35rem;
    }
    .lable {
      color: #81818b;
      font-size: 0.4rem;
    }
    .demand {
      p {
        span:last-child {
          .demanda {
            background-color: #ffa800;
          }
        }
      }
      a {
        margin-left: 0.5rem;
        width: 0.64rem;
        height: 0.64rem;
        background-color: #c4c4c4;
        border-radius: 0.32rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 0.5rem;
        }
      }
    }
    .followup {
      .content3 {
        .active {
          color: #31c63f;
          border: 1px solid #31c63f;
        }
        .demanda {
          background-color: #ffa800;
        }
        font-size: 0.4rem;
        border-bottom: 1px solid #f2f2f2;
        div:first-child {
          height: 1rem;
          line-height: 1rem;
          color: #81818b;
        }
        div:last-child {
          font-size: 0.30rem;
          color: #aeaeae;
          padding-bottom: 0.2rem;
        }
        div > span {
          border: 1px solid #aeaeae;
          border-radius: 0.275rem;
          margin: 0.08rem 0.4rem;
          padding: 0 0.25rem;
          height: 0.55rem;
          display: inline-flex;
          align-items: center;
          text-align: center;
        }
      }
    }
    .compete {
      span {
        color: #ff84ac;
      }
    }
    .link_to {
      font-size: 0.3rem;
      color: #589bff !important;
      i {
        font-size: 0.3rem;
        margin-left: 0.15rem;
      }
    }
    .myscrollerdiv {
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 0 0.4rem;
      height: 2.97rem;
      display: flex;
      z-index: 1000;
      justify-content: space-between;
      align-items: center;
      div {
        height: 1.26rem;
        font-size: 0.48rem;
        line-height: 1.26rem;
        text-align: center;
        width: 4rem;
        border: 1px solid #ff84ac;
        border-radius: 0.64rem;
        color: #ff84ac;
        &:first-child {
          color: #FFF;
          width: 5.6rem;
          background-color: #ff84ac;
          &.grey {
            color: #fff;
            background-color: #c3c3c3;
            border: 1px solid #fff;
          }
        }
      }
      .grey {
        color: black;
        background-color: grey;
        border: 1px solid #fff;
      }
    }
  }

  .dialog-attention {
    .attention {
      background-color: #FFF;
      height: 2.7rem;
      width: 9.6rem;
      margin: auto;
      box-shadow: 0 0 10px 5px #e1e1e1;
      line-height: 1;
      position: relative;
      .iconfont {
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 0.6rem;
      }
      p:first-child {
        padding: 0.62rem 0 0.4rem;
        font-size: 0.48rem;
        color: #707070;
        font-weight: 600;
      }
      div {
        color: #8e8e8e;
        font-size: 0.36rem;
        line-height: 1.2;
        a {
          margin: 0 0.2rem;
          text-decoration: underline;
          color: #ff881d;
          font-weight: 500;
        }
        a:active {
          background-color: #ff881d;
          color: #FFF;
        }
      }
      p:last-child {
        padding-top: 0.28rem;
        font-size: 0.24rem;
        color: #8e8e8e;
      }
    }
  }

  .dialog-pay {
    .pay {
      background-color: #FFF;
      height: 6.75rem;
      width: 8.1rem;
      margin: auto;
      line-height: 1;
      position: relative;
      border-radius: 8px;
      p:first-child {
        padding: 0.6rem 0 1rem;
        font-weight: 600;
        font-size: 0.52rem;
        .iconfont {
          position: absolute;
          right: 5px;
          top: 5px;
          font-size: 0.6rem;
        }
      }
      p:nth-of-type(2) {
        font-size: 0.52rem;
        font-weight: 500;
        padding-bottom: 0.35rem;
      }
      p:nth-of-type(3) {
        font-size: 1.2rem;
        font-weight: 800;
        padding-bottom: 0.75rem;
      }
      .pwd-wrap {
        width: 6.9rem;
        height: 1.15rem;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #ddd;
        display: flex;
      }
      .pwd-wrap li {
        list-style-type: none;
        text-align: center;
        line-height: 1.15rem;
        flex: 1;
        border-right: 1px solid #ddd;
      }
      .pwd-wrap li:last-child {
        border-right: 0;
      }
      .pwd-wrap li i {
        color: #ff84ac;
      }
    }
  }
</style>
