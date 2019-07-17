<template>
  <div class="main jy_all_top jy_state_top">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        <a v-if="!$store.state.isBrowser" class="right" @click="clickShare"><i class="iconfont">&#xe679;</i></a>
        <p>相亲广场</p>
        <a v-if="!$store.state.isBrowser&&$store.state.userInfo.identity==1" class="right"
           :class="{right2:!$store.state.isBrowser}" @click="linkTo('publishBlindDate')">发布</a>
        <a class="right" style="top: 0.24rem" :class="{right2:!$store.state.isBrowser}"
           @click="linkToUserInfo('myBlindDate')" v-else-if="$store.state.isLogin">
          <i class="backImageCover"
             :style="'background-image:url('+getFullPath($store.state.userInfo.headimgAttachmentId)+');width:1rem;height:1rem;border-radius: 50%;'"></i>
        </a>
      </div>
    </div>
    <div class="fixed search_box">
      <div class="search_input">
        <i class="iconfont">&#xe64d;</i>
        <input type="search" :placeholder="placeholder" disabled="disabled">
        <span @click="showFilter=true">筛选</span>
      </div>
    </div>
    <activityFilter :showFilter="showFilter" :location="location" @close="showFilter=false"
                    @filterMakesure="filterMakesure" @changeLocation="changeLocation"
                    @changePlace="changePlace"></activityFilter>
    <myScroller :style="$store.state.isBrowser?'padding:3.13rem 0 0;':'padding:3.88rem 0 0;'" :infinite="infinite"
                :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller">
      <template v-if="listArr">
        <div class="activity_list" v-for="item,index in listArr">
          <router-link tag="div" :to="{name:'activityDetail',query:{id:item.id}}" class="activity_img">
            <i class="jy_bl_img" :style="'background-image:url('+getFullPath(item.coverimgImages)+')'"></i>
            <div class="jzsj_block" v-if="item.state==3&&item.isCandidate==0">
              <p v-if="item.state==3&&item.isStartEnroll==0&&item.isStopEnroll==0">报名开始时间<br/>{{item.datingDetailsExt.extDatetime.substring(0,10)}}
              </p>
              <p v-if="item.state==3&&item.isStartEnroll==1&&item.isStopEnroll==0">报名截止时间<br/>{{item.datingDetailsExt.extDatetime2.substring(0,10)}}
              </p>
              <p style="line-height: 0.8rem" v-if="item.state==3&&item.isCandidate==0&&item.isStopEnroll==1">报名已截止</p>
            </div>
            <div class="jzsj_block" v-else-if="item.state==5">
              <p style="line-height: 0.8rem">活动已结束</p>
            </div>
          </router-link>
          <!--<div class="activity_img" v-if="item.state==6">-->
          <!--<i class="jy_bl_img" :style="'background-image:url('+getFullPath(item.coverimgImages)+')'"></i>-->
          <!--<div class="jzsj_block" v-if="item.state==3&&item.isCandidate==0">-->
          <!--<p v-if="item.state==3&&item.isStartEnroll==0&&item.isStopEnroll==0">报名开始时间<br/>{{item.datingDetailsExt.extDatetime.substring(0,10)}}</p>-->
          <!--<p v-if="item.state==3&&item.isStartEnroll==1&&item.isStopEnroll==0">报名截止时间<br/>{{item.datingDetailsExt.extDatetime2.substring(0,10)}}</p>-->
          <!--<p style="line-height: 0.8rem" v-if="item.state==3&&item.isCandidate==0&&item.isStopEnroll==1">报名已截止</p>-->
          <!--</div>-->
          <!--</div>-->

          <div class="activity_info"
               :class="{active:getClassStatus(item).type==6,live:getClassStatus(item).type==2||getClassStatus(item).type==3,waiting:getClassStatus(item).type==7,end:getClassStatus(item).type==1||getClassStatus(item).type==4||getClassStatus(item).type==5}">
            <div class="activity_title"><span v-if="item.datingDetailsExt">{{getClassStatus(item).type}}  [{{lineType[item.datingDetailsExt.extInt]}}·{{specialType[item.datingDetailsExt.extInt5]}}专场]</span><span>{{item.datingTitle}}</span>
            </div>
            <div class="activity_desc">
              <p><i class="iconfont">&#xe62c;</i>{{item.datingLocation}}</p>
              <p>
                <i class="iconfont">&#xe642;</i>
                <span>{{item.followCount?parseInt(item.followCount)+parseInt(actContent[item.id]?actContent[item.id].followCount||0:0):0}}
				</span>人关注
                <i class="iconfont" style="margin-left: 1rem">&#xe612;</i>
                <span>{{item.enrollCount}}</span>人报名
              </p>
              <p><i class="yhsj_icon"></i>{{item.activityStarttime}}</p>
              <router-link v-if="getClassStatus(item).type==1" tag="div"
                           :to="{name:'publishBlindDate',query:{id:item.id}}" class="activity_act"><i
                class="edit"><span>编辑</span></i></router-link>
              <router-link v-else-if="getClassStatus(item).type==2||getClassStatus(item).type==3" tag="div"
                           :to="{name:'blindDateNew',query:{id:item.id}}" class="activity_act"><i class="jrxc"><span>进入现场</span></i>
              </router-link>
              <router-link v-else-if="getClassStatus(item).type==6" tag="div"
                           :to="{name:'activityDetail',query:{id:item.id}}" class="activity_act activity_actJoin">
                <i class="ljbm"><span v-if="item.enrollFee>0" style="line-height: 0.4rem;text-align: center;">立即报名<br/>{{getFee(item)}}元</span><span
                  v-else>立即报名</span></i>
                <del class="act_del_price" v-if="item.enrollFee>0&&item.enrollFee>getFee(item)">{{item.enrollFee}}元
                </del>
              </router-link>
              <div class="activity_act" v-else-if="getClassStatus(item).type==4"><i class="yjs"><span>活动结束</span></i>
              </div>
              <div class="activity_act" v-else-if="getClassStatus(item).type==7"><i class="yjs"><span>即将开始</span></i>
              </div>
              <div class="activity_act" v-else-if="getClassStatus(item).type==5"><i class="yjs"><span>报名截止</span></i>
              </div>
            </div>
          </div>
        </div>
      </template>
    </myScroller>
    <share :show="showShare" :shareTitle="shareTitle" :shareDesc="shareDesc" :shareImg="shareImg" :shareUrl="shareUrl"
           @changeShow="changeShow"></share>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import myScroller from '@other/myScroller.vue';
  import {TransferDom, Popup, PopupPicker, Group, Datetime} from 'vux'
  import activityFilter from './activityFilter'
  import {wxShare} from '@js/wxjssdk'
  import Share from '@/components/home/share.vue'
  import {actContent} from './actStatic.data.js'

  export default {
    name: "registrationActivity",//报名活动
    directives: {
      TransferDom
    },
    components: {
      Loading,
      Back,
      myScroller,
      Popup,
      PopupPicker,
      Group,
      Datetime,
      activityFilter,
      Share,
    },
    data() {
      return {
        showBack: false,
        isloading: false,
        showFilter: false,
        placeholder: "",
        location: "",
        selectArea: [],
        datingTime: "",//1选择""不限
        startDate: "",
        endDate: "",
        specialTypeVal: "",
        state: "",
        listArr: null,
        //分页参数
        pageNo: 1,
        isRead: false,
        isEnd: false,
        loadRefresh: true,//下拉刷新
        loadInfinite: true, //上拉加载
        isRefresh: false,
        noDataText: "",
        first: true,
        specialType: null,//专场类型
        lineType: {"1": "线上", "2": "线下"},
        showShare: false,
        shareTitle: '',
        shareDesc: '',
        shareImg: '',
        shareUrl: '',
        blindDateSingle: {},
        actContent: actContent,
      }
    },
    computed: {
      handleRoute() {//返回键
        return this.$store.state.handleRoute;
      },
    },
    watch: {
      isEnd(val) {
        const t = this;
        if (val) {
          t.$refs.myScroller.finishInfinite(true);
        } else {
          //t.$refs.myScroller.scrollTo(1);
          t.$refs.myScroller.finishInfinite(false);
        }
      },
      handleRoute(newV) {//返回键触发
        const t = this;
        if (!newV) {
          if (t.showShare) {
            t.showShare = false;
          }
        }
      },
      showShare(val) {
        const t = this;
        let status = val;
        t.$store.commit("CHANGEHANDLEROUTE", status);
      },
    },
    async mounted() {
      const t = this;
      this.showBack = t.$route.query.showBack
      $("body").addClass("gray");
      try {
        await t.getList();
      } catch (e) {
        console.log(JSON.stringify(e));
      }
      let shareTitle = "来乾坤岛报名相亲吧！乾坤岛是一个安全高效纯粹的婚恋交友平台。";
      let shareDesc = "乾坤岛“相亲广场”打破传统相亲和相亲会的弊端，对相亲活动事前相互了解、事中交流互动、事后约会跟踪进行支撑。快来加入开启您的寻爱之旅吧！";
      let shareLink = this.$store.state.baseURL + "/api/account/publicAddressLoginUrl?state=registrationActivity"
      if (t.$store.state.userInfo.id) {
        shareLink = shareLink + "__pid_" + this.$store.state.userInfo.jyNumber + "_taskId_34"
      }
      if (t.blindDateSingle.isUnion) {
        shareLink += "_isUnion_" + t.blindDateSingle.isUnion;
      }
      /*if(t.blindDateSingle.jyNumber){
              shareLink+="_jyNumber_"+t.blindDateSingle.jyNumber;
          }*/
      t.shareTitle = shareTitle;
      t.shareDesc = shareDesc;
      t.shareUrl = shareLink;
      console.log(shareLink)
      wxShare && wxShare({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: t.$store.state.baseFrontEndURL + 'static/logo.png', // 分享图标
        debug: false
      }, {
        success() {
          //	alert("分享成功");
        },
        cancel() {
          //alert("分享失败");
        }
      });

    },
    destroyed() {
      $("body").removeClass("gray");
    },
    methods: {
      getFee(item) {
        const t = this;
        let money = 0;
        //报名费用统计
        if (t.$store.state.channel.isUnion && item.datingDetailsExt) {//有渠道
          let channel = null;
          if (t.blindDateSingle.isUnionCorrect && item.datingDetailsExt.extString6) {
            try {
              let channelObj = item.datingDetailsExt.extString6.replace(/(?:\s*['"]*)?([a-zA-Z0-9]+)(?:['"]*\s*)?:/g, '"$1":');
              let d = JSON.parse(channelObj || {});
              channel = d[t.blindDateSingle.isUnionCorrect];
            } catch (e) {
              console.log("渠道格式错误:" + JSON.stringify(e));
            }
          }
          if (channel) {//渠道信息附加表
            if (t.$store.state.userInfo.sex == 1 && channel.girlFee != undefined) {
              money = channel.girlFee;
            } else if (t.$store.state.userInfo.sex == 2 && channel.boyFee != undefined) {
              money = channel.boyFee;
            } else if (channel.fee != undefined) {
              money = channel.fee;
            } else if (t.$store.state.userInfo.sex == 1 && item.datingDetailsExt.extDouble2 != undefined) {//女
              money = item.datingDetailsExt.extDouble2
            } else if (t.$store.state.userInfo.sex == 2 && item.datingDetailsExt.extDouble != undefined) {//男
              money = item.datingDetailsExt.extDouble
            } else {
              money = item.enrollFee;
            }
          } else {//没渠道(限男女)
            if (t.$store.state.userInfo.sex == 1 && item.datingDetailsExt.extDouble2 != undefined) {//女
              money = item.datingDetailsExt.extDouble2
            } else if (t.$store.state.userInfo.sex == 2 && item.datingDetailsExt.extDouble != undefined) {//男
              money = item.datingDetailsExt.extDouble
            } else {
              money = item.enrollFee;
            }
          }
        } else {//没渠道的
          if (t.$store.state.userInfo.sex == 1 && item.datingDetailsExt.extDouble2 != undefined) {//女
            money = item.datingDetailsExt.extDouble2
          } else if (t.$store.state.userInfo.sex == 2 && item.datingDetailsExt.extDouble != undefined) {//男
            money = item.datingDetailsExt.extDouble
          } else {
            money = item.enrollFee;
          }
        }
        return money || 0;
      },
      changeLocation(val) {
        this.location = val;
      },
      changePlace(val) {
        //if(val){
        this.placeholder = val;
        //}
      },
      clickShare() {
        this.showShare = !this.showShare;
      },
      changeShow(val) {
        this.showShare = val;
      },
      getIsAdmin(item) {
        const t = this;
        if (item.adminList && item.adminList.length > 0) {
          let isAdmin = item.adminList.filter((val) => {
            return val.userId == t.$store.state.userInfo.id;
          });
          if (isAdmin.length > 0) {
            return true;
          }
        }
        return false;
      },
      getClassStatus(item) {
        let result = {
          text: '',
          type: null,//1表示主持人编辑2表示主持人进入现场3表示用户进入现场4表示用户活动结束5表示未报名的报名已结束6表示未报名的立即报名7报名未开始8未登录立即报名
        }
        if (!this.$store.state.userInfo.id) {
          if (item.isStartEnroll == 0) {//未开始报名
            result.text = '即将开始'
            result.type = 7
          } else {//开始报名
            if (item.isStartEnroll == 1 && item.isStopEnroll == 0) {
              result.text = '立即报名'
              result.type = 6
            } else if (item.state == 5) {
              result.text = '活动结束'
              result.type = 4
            } else {
              result.text = '报名截止'
              result.type = 5
            }
          }
        } else {
          if (this.$store.state.userInfo.id == item.jiaoyouUser.id || this.getIsAdmin(item)) {//主持人
            console.log("是否进入主持人这里")
            if (item.state == 2 && this.$store.state.userInfo.id == item.jiaoyouUser.id) {
              result.text = '编辑'
              result.type = 1
            } else {
              result.text = '进入现场'
              result.type = 2
            }
          } else {//用户
            console.log("是否进入用户这里")
            if (item.isCandidate == 1) {//已报名
              if (item.state == 5) {
                result.text = '活动结束'
                result.type = 4
              } else {
                result.text = '进入现场'
                result.type = 3
              }
            } else {//未报名
              if (item.isStartEnroll == 0) {//未开始报名
                result.text = '即将开始'
                result.type = 7
              } else {//开始报名
                if (item.state == 5) {
                  result.text = '活动结束'
                  result.type = 4
                } else if (item.isStopEnroll == 1) {
                  result.text = '报名截止'
                  result.type = 5
                } else {
                  result.text = '立即报名'
                  result.type = 6
                }
              }
            }
          }
        }
        return result;
      },
      async getLocation() {
        let district = await this.$server.getDistrict();
        let areaData = district.data.data;
        try {
          let loc = await this.$store.dispatch("getMylocation");
          if (loc.province || loc.city) {
            let proId = null;
            let cityId = null;
            this.placeholder = loc.province.substring(0, 2) + '·' + loc.city.substring(0, 2);
            for (let i = 0; i < areaData.length; i++) {
              if (loc.province.substring(0, 2).indexOf(areaData[i].name) != -1) {
                proId = areaData[i].value;
                break;
              }
            }
            for (let j = 0; j < areaData.length; j++) {
              if (loc.city.substring(0, 2).indexOf(areaData[j].name) != -1) {
                cityId = areaData[j].value;
                break;
              }
            }
            this.location = 1;
            this.selectArea = [proId, cityId];
          }
        } catch (e) {
          console.log(e);
        }
      },
      async getSpecialType() {
        const t = this;
        try {
          const apiDict = await this.$server.apiDict({type: "blind_dating_special_type"});
          let item = apiDict.data.data;
          for (let i = item.length; i--;) {
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
      linkToUserInfo(link, id) {
        let query = null;
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
      linkToXC(link, id) {
        let query = null;
        if (id) {
          query = {
            datingId: id
          }
        }
        this.$router.push({
          path: link,
          query: query
        })
      },
      async getList(reload, flag) {
        const t = this;
        if (t.isRead) {
          return false;
        }
        t.isRead = true;
        if (!t.specialType) {
          await t.getSpecialType(); //先获取专场类型
        }
        if (t.isRefresh || flag || reload) {
          t.pageNo = 1;
          if (flag) {
            t.$refs.myScroller.scrollTo(1);
            t.isloading = true;
          }
        }
        try {
          let isRefresh = {};
          if (t.isRefresh) {
            isRefresh = {isRefresh: true};
          }
          if (!t.listArr || t.isRefresh || flag || reload) {
            t.listArr = [];
          }
          const result = await t.$server.blindDatingList({
            ...isRefresh,
            areaId: t.location == 1 ? t.selectArea && t.selectArea[t.selectArea.length - 1] : '',
            beginActivityStarttime: t.datingTime == 1 ? t.startDate + " 00:00:01" : "",
            endActivityStarttime: t.datingTime == 1 ? t.endDate + " 23:59:59" : "",
            'datingDetailsExt.extInt5': t.specialTypeVal,
            state: "",
            isCandidate: t.state == 2 ? 1 : "",
            isFollow: t.state == 1 ? 1 : '',
            page: t.pageNo,
            rows: t.$store.state.pageSize,
            isUnion: t.$store.state.channel.isUnion,
            //jyNumber:t.$store.state.channel.jyNumber
          });
          //console.log(JSON.stringify(result));
          if (result.data.list) {
            for (var i = 0; i < result.data.list.length; i++) {
              console.log(t.getClassStatus(result.data.list[i]).type);
            }
            t.listArr.push(...result.data.list);
          }
          t.blindDateSingle = result.data.data;
          if (result.data.count <= t.$store.state.pageSize * t.pageNo || result.data.list.length < t.$store.state.pageSize) {//判断是否最后一页
            t.noDataText = '已加载全部数据';
            t.isEnd = true;
          } else {
            t.isEnd = false;
          }
        } catch (e) {
          t.noDataText = "加载异常,请重试";
          t.isEnd = true;
          t.isRefresh = false;
          console.log(e)
        }
        t.pageNo++;
        t.isRead = false;
        t.isloading = false;
        t.isRefresh = false;
      },
      async infinite(done) {//上拉加载(防止初始内容不满一屏会无限加载)
        const t = this;
        if (t.first) {
          t.getLocation();
          t.first = false;
        }
        if (t.isEnd) {
          done(true);
          return false;
        }
        //if(t.isRead){
        //	return false;
        //}
        console.log("加载");
        t.getList().then(() => {
          if (t.isEnd) {
            done(true);
          } else {
            done();
          }
        });
      },
      refresh(done) {//下拉刷新
        const t = this;
        console.log("刷新");
        t.isRefresh = true;
        t.getList().then((res) => {
          done();
        });
      },
      filterMakesure(location, selectArea, selPlace, datingTime, startDate, endDate, specialTypeVal, state) {
        if (location == 1) {
          this.placeholder = selPlace
        }
        if (specialTypeVal) {
          this.placeholder = this.specialType[specialTypeVal] + '专场'
        }
        if (location == 0 && !specialTypeVal) {
          this.placeholder = "";
        }
        if (location == 1 && specialTypeVal) {
          this.placeholder = selPlace + '·' + this.specialType[specialTypeVal] + '专场'
        }
        this.location = location;
        this.selectArea = selectArea;
        this.datingTime = datingTime;
        this.startDate = startDate;
        this.endDate = endDate;
        this.specialTypeVal = specialTypeVal;
        this.state = state;
        this.getList(true);
        this.showFilter = false;
      },
    }
  }
</script>

<style scoped lang="scss">
</style>
