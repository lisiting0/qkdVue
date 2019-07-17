<template>
  <div :class="'main jy_all_top '+((blindDateSingle.state==3&&blindDateSingle.isCandidate==0)?'active':((blindDateSingle.state==3&&blindDateSingle.isCandidate==1)||blindDateSingle.state==6)?'live':'end')">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        <p>预览</p>
      </div>
    </div>
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
            {{blindDateSingle.datingDetailsExt.extDatetime&&blindDateSingle.datingDetailsExt.extDatetime.substring(0,10)}} 至
            {{blindDateSingle.datingDetailsExt.extDatetime2&&blindDateSingle.datingDetailsExt.extDatetime2.substring(0,10)}}</p>
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
    </template>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';

  export default {
    name: "preview",//预览
    components: {
      Loading,
      Back,
    },
    data() {
      return {
        isloading: false,
        id: null,
        specialType: null,//专场类型
        arrImg: [],
        blindDateSingle: {},
        lineType: {"1": "线上", "2": "线下"},
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
    }
  }
</script>

<style scoped lang="scss">
</style>
