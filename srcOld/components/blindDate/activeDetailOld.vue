<template>
  <div :class="'main jy_all_top '+((blindDateSingle.state==3&&blindDateSingle.isCandidate==0)?'active':((blindDateSingle.state==3&&blindDateSingle.isCandidate==1)||blindDateSingle.state==6)?'live':'end')">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        <a class="right" @click="clickShare"><i class="iconfont" v-if="$store.state.userInfo.identity==1">&#xe679;</i></a>
        <p>活动详情</p>
      </div>
    </div>
    <share :show="showShare" @changeShow="changeShow"></share>
    <template v-if="blindDateSingle">
      <div class="at_img" v-if="blindDateSingle.datingDetailsExt">
        <img :src="getFullPath(blindDateSingle.coverimgImages)"/>
        <div class="at_zc">{{specialType[blindDateSingle.datingDetailsExt.extInt5]}}专场</div>
      </div>
      <div class="at_desc">
        <div class="at_title"><span v-if="blindDateSingle.datingDetailsExt">[{{lineType[blindDateSingle.datingDetailsExt.extInt]}}·{{specialType[blindDateSingle.datingDetailsExt.extInt5]}}专场]</span>{{blindDateSingle.datingTitle}}</div>
        <div class="at_count"><i class="iconfont">&#xe642;</i><span :class="{active:blindDateSingle.state==3&&blindDateSingle.isCandidate==0}">{{blindDateSingle.followCount}}</span>人关注<i class="iconfont" style="margin-left: 1rem">&#xe612;</i><span :class="{active:blindDateSingle.state==3&&blindDateSingle.isCandidate==0}">{{blindDateSingle.enrollCount}}</span>人报名
        </div>
      </div>
      <div class="at_con"><i class="iconfont">&#xe6b6;</i>{{blindDateSingle.activityStarttime}}</div>
      <router-link tag="div" :to="{name:'addressMap',query:{city:blindDateSingle.cityName,address:blindDateSingle.datingLocation}}" class="at_con at_address"><i class="iconfont">&#xe62c;</i><span>{{blindDateSingle.datingLocation}}</span><i class="iconfont">&#xe702;</i></router-link>
      <div class="at_con at_address"><i class="iconfont">&#xe62c;</i><span>{{blindDateSingle.datingLocation}}</span></div>
      <div class="at_con"><i class="iconfont">&#xe6e1;</i><em>{{Fn.toFixed(blindDateSingle.enrollFee)}}</em> 元</div>
      <div class="at_con" v-if="blindDateSingle.datingDetailsExt"><i class="iconfont">&#xe668;</i>{{specialType[blindDateSingle.datingDetailsExt.extInt5]}}专场
      </div>
      <div class="ct_intro_title">活动</div>
      <div class="ct_intro">
        <div class="ct_into_con">
          <p class="title">主题</p>
          <p class="desc">{{blindDateSingle.datingDesc}}</p>
        </div>
        <div class="ct_into_con">
          <p class="title">报名时间</p>
          <p v-if="blindDateSingle.datingDetailsExt" class="desc">
            {{blindDateSingle.datingDetailsExt.extDatetime.substring(0,10)}} 至
            {{blindDateSingle.datingDetailsExt.extDatetime2.substring(0,10)}}</p>
        </div>
        <div class="ct_into_con">
          <p class="title">活动时间</p>
          <p class="desc">{{blindDateSingle.activityStarttime}}</p>
        </div>
        <div class="ct_into_con">
          <p class="title">活动地点</p>
          <p class="desc">{{blindDateSingle.cityName}}{{blindDateSingle.areaName}}{{blindDateSingle.datingLocation}}</p>
          <p style="padding-left: 0.4rem">地址导航：</p>
          <div @click="showBigImg($event)" class="contentDetail" v-html="contentCpt"></div>
        </div>
        <div class="ct_into_con">
          <p class="title">活动流程</p>
          <div class="contentDetail" v-html="activityProcessHtml"></div>
        </div>
        <div class="ct_into_con" v-if="blindDateSingle.hostPartyList&&blindDateSingle.hostPartyList.length>0">
          <p class="title">主办单位</p>
          <div class="logo_list">
            <div v-for="item in blindDateSingle.hostPartyList" :key="item.id">
              <img :src="getFullPath(item.company.logoUrl)" alt="" class="logo">
              <p style="text-align: center;font-size: 0.36rem;color: #666666">{{item.company.unitName}}</p>
            </div>
          </div>
        </div>
        <div class="ct_into_con" v-if="blindDateSingle.assistingPartyList&&blindDateSingle.assistingPartyList.length>0">
          <p class="title">协办单位</p>
          <div class="logo_list">
            <div v-for="item in blindDateSingle.assistingPartyList" :key="item.id">
              <img :src="getFullPath(item.company.logoUrl)" alt="" class="logo">
              <p style="text-align: center;font-size: 0.36rem;color: #666666">{{item.company.unitName}}</p>
            </div>
          </div>
        </div>
        <div class="ct_into_con">
          <p class="title">温馨提示</p>
          <div class="contentDetail" v-html="tipsHtml"></div>
        </div>
      </div>
      <div class="ybm_list">
        <router-link tag="div" :to="{name:'registrationStaff',query:{id:id}}" v-if="blindDateSingle.candidateList">
          已报名 <span v-if="$store.state.userInfo.identity==1">（{{blindDateSingle.candidateList.length}}/{{blindDateSingle.datingDetailsExt.extInt4}}；&nbsp;<em class="blue_text">男：</em>&nbsp;&nbsp;<em class="pink_text">女：</em>）</span>
        </router-link>
        <div v-else>暂无报名人员</div>
        <template v-if="blindDateSingle.candidateList">
          <ul class="ybm_user_list">
            <router-link :to="{name:'userInfo',query:{id: item.jiaoyouUser.id}}" tag="li" v-for="item in blindDateSingle.candidateList" :key="item.id" v-if="blindDateSingle.candidateList.length<=15">
              <i class="backImageCover" :style="'background-image:url('+getFullPath(item.jiaoyouUser.headimgAttachmentId)+');width:1.2rem;height:1.2rem;'"></i>
            </router-link>
            <li style="vertical-align: middle;" v-else><i class="iconfont">&#xe679;</i></li>
          </ul>
        </template>
      </div>
      <template v-if="$store.state.userInfo.identity!=1">
        <div class="action_footer">
          <div class="gzfx">
            <p v-if="blindDateSingle.isFollow==0" @click="followBlindDating"><i class="iconfont">&#xe61e;</i><i>关注</i></p>
            <p v-if="blindDateSingle.isFollow==1" @click="unfollowBlindDating"><i class="iconfont">&#xe67b;</i><i>取消关注</i>
            </p>
            <p><i class="iconfont">&#xe604;</i><i>分享</i></p>
          </div>
          <template v-if="blindDateSingle&&blindDateSingle.jiaoyouUser&&blindDateSingle.jiaoyouUser.id!=$store.state.userInfo.id&&blindDateSingle.isStartEnroll==1&&blindDateSingle.isStopEnroll==0&&blindDateSingle.state==3">
            <div class="ljbm" v-if="blindDateSingle.isCandidate == 0" @click="bmBlindDating">立即报名</div>
            <div class="ljbm" v-if="blindDateSingle.isCandidate == 1" @click="unbmBlindDating">取消报名</div>
          </template>
          <router-link tag="div" v-if="(blindDateSingle.state==3 || blindDateSingle.state==6) && blindDateSingle.isCandidate==1" :to="{name:'blindDate',query:{id:id}}" class="jrxc">进入现场</router-link>
        </div>
      </template>
      <template v-else>
        <p class="identity_act">
          <template v-if="blindDateSingle.state==3 || blindDateSingle.state==6">
            <em @click="stopMaleRegistration" class="blue">停止报名（男）</em>
            <em @click="stopFemaleRegistration" class="pink">停止报名（女）</em>
          </template>
          <router-link tag="em" :to="{name:'blindDate',query:{id:id}}" class="orange">进入现场</router-link>
        </p>
      </template>
    </template>
    <div v-transfer-dom>
      <popup v-model="showPay" height="100%" :hide-on-blur=false position="bottom" :popup-style="{zIndex:600}" :should-scroll-top-on-show="true">
        <div class="top_userInfo" v-if="showPayWin">
          <blindDatePay :actDatingId="id" :enrollFee="blindDateSingle.enrollFee"  @openPayWin="openPayWin" @hiddenPayWin="hiddenPayWin"></blindDatePay>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import blindDatePay from './blindDatePay.vue';
  import {Popup, TransferDom} from 'vux'
  import Share from '@/components/home/share.vue'

  export default {
    name: "activityDetail",//详情
    components: {
      Loading,
      Back,
      blindDatePay,
      Popup,
      Share
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        isloading: false,
        id: null,
        specialType: null,//专场类型
        arrImg: [],
        blindDateSingle: {},
        showPayWin: false,
        showPay: false,
        lineType: {"1": "线上", "2": "线下"},
        showShare:false,//分享
      }
    },
    watch: {},
    computed: {
      contentCpt() {
        const t = this;
        if (this.blindDateSingle.datingDetailsExt) {
          let content = t.blindDateSingle.datingDetailsExt.extString2;
          const imgReg = /<img.*?(?:>|\/>)/gi;
          const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          const arr = t.blindDateSingle.datingDetailsExt.extString2.match(imgReg);
          if (arr) {
            let arrImg = [];
            arr.forEach((v, i) => {
              const src = v.match(srcReg)[1];
              arrImg.push({
                id: i,
                src
              });
              let reg = new RegExp('<img src=\"' + src + '\"', 'g');
              content = content.replace(reg, '<img data-id="' + i + '" src="' + t.$utils.getFullPath(src) + '"');
            });
            t.arrImg = arrImg;
          }
          return content;
        }
      },
      activityProcessHtml() {
        const t = this;
        if (this.blindDateSingle.datingDetailsExt) {
          let content = t.blindDateSingle.datingDetailsExt.extString3;
          const imgReg = /<img.*?(?:>|\/>)/gi;
          const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          const arr = t.blindDateSingle.datingDetailsExt.extString3.match(imgReg);
          if (arr) {
            let arrImg = [];
            arr.forEach((v, i) => {
              const src = v.match(srcReg)[1];
              arrImg.push({
                id: i,
                src
              });
              let reg = new RegExp('<img src=\"' + src + '\"', 'g');
              content = content.replace(reg, '<img data-id="' + i + '" src="' + t.$utils.getFullPath(src) + '"');
            });
            t.arrImg = arrImg;
          }
          return content;
        }
      },
      tipsHtml() {
        const t = this;
        if (this.blindDateSingle.datingDetailsExt) {
          let content = t.blindDateSingle.datingDetailsExt.extString5;
          const imgReg = /<img.*?(?:>|\/>)/gi;
          const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          const arr = t.blindDateSingle.datingDetailsExt.extString5.match(imgReg);
          if (arr) {
            let arrImg = [];
            arr.forEach((v, i) => {
              const src = v.match(srcReg)[1];
              arrImg.push({
                id: i,
                src
              });
              let reg = new RegExp('<img src=\"' + src + '\"', 'g');
              content = content.replace(reg, '<img data-id="' + i + '" src="' + t.$utils.getFullPath(src) + '"');
            });
            t.arrImg = arrImg;
          }
          return content;
        }
      }

    },
    mounted() {
      const t = this;
      t.id = t.$route.query.id;
      t.getSpecialType();
      t.getBlindDateSingle();
      $("body").addClass("gray");
    },
    destroyed() {
      $("body").removeClass("gray");
    },
    methods: {
      clickShare() {
        this.showShare = !this.showShare;
      },
      changeShow(val){
        this.showShare=val;
      },
      openPayWin() {
        const t = this;
        t.showPay = true;
      },
      hiddenPayWin(flag) {
        this.showPay = false;
        if (flag) {
          this.$set(this.blindDateSingle, "isCandidate", 1)
        }
        setTimeout(() => {
          this.showPayWin = false;
        }, 800)
      },
      async getSpecialType() {
        const t = this;
        try {
          const apiDict = await this.$server.apiDict({type: "blind_dating_special_type"});
          let item = apiDict.data.data;
          for (let i = 0; i < item.length; i++) {
            if (!t.specialType) {
              t.specialType = {};
            }
            t.specialType[item[i].value] = item[i].label;
          }
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      },
      getFullPath(path) {
        return this.$utils.getFullPath(path)
      },
      async getBlindDateSingle() {
        const _this = this;
        const result = await _this.$server.blindDatingSingle({
          datingDetailsId: _this.id
        });
        _this.blindDateSingle = result.data.data;
      },
      showBigImg(e) {
        if (e.target.nodeName == 'IMG') {
          this.showPhoto(e.target.src)
        }
      },
      async followBlindDating() { //关注活动接口
        this.$vux.loading.show()
        await this.$server.followBlindDating(this.id);
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: '关注成功',
          position: 'middle',
          width: 'auto',
        })
        this.$set(this.blindDateSingle, "isFollow", 1)
      },
      async unfollowBlindDating() { //取消关注活动接口
        this.$vux.loading.show()
        await this.$server.unfollowBlindDating(this.id);
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: '取消关注成功',
          position: 'middle',
          width: 'auto',
        })
        this.$set(this.blindDateSingle, "isFollow", 0)
      },
      bmBlindDating() { //参加活动接口
        const t = this;
        // t.$router.push({name:'blindDatePay',query:{id:t.id}});
        t.showPayWin = true;
      },
      async unbmBlindDating() { //取消参加活动接口
        this.$vux.loading.show()
        try {
          const result = await this.$server.unCandidateBlindDating({id: this.id});
          this.$vux.toast.show({
            type: 'success',
            text: '取消参加成功',
            position: 'middle',
            width: 'auto',
          })
          this.$set(this.blindDateSingle, "isCandidate", 0)
        } catch (e) {
          this.$vux.toast.show({
            type: 'cancel',
            text: e.message,
            position: 'middle',
            width: 'auto',
          })
        }
        this.$vux.loading.hide()
      },
      async stopMaleRegistration(){
        this.$vux.confirm.show({
          content: '确定停止男的报名吗？',
          onCancel() {
          },
          async onConfirm() {
            _t.$vux.loading.show()
            // await _t.$server.candidate({id: _t.id})
            _t.$vux.loading.hide()
          }
        })
      },
      async stopFemaleRegistration(){
        this.$vux.confirm.show({
          content: '确定停止女的报名吗？',
          onCancel() {
          },
          async onConfirm() {
            _t.$vux.loading.show()
            // await _t.$server.candidate({id: _t.id})
            _t.$vux.loading.hide()
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
