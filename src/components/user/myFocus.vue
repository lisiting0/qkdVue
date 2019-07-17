<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
		<Back class="left" v-if="!datingId"><i class="iconfont">&#xe613;</i></Back>
        <a v-else class="left" @click="hiddenInfo"><i class="iconfont">&#xe613;</i></a>
        <a class="right"><i class="iconfont"></i></a><a v-if="!datingId" @click="addFriend" class="right"><i
        class="iconfont">&#xe61f;</i></a>{{title}}
      </div>
    </div>
    <div class="title fixed" style="margin-top: 1.22rem;">
      <div class="underline" ref="underline" :style="{left:underlineLeft}"></div>
      <div @click="getList(1)" :class="{active:active==1}">好友
        <span :class="{news:news.newFriendCount>0}"></span>
      </div>
      <div @click="getList(2)" :class="{active:active==2}">关注</div>
      <div @click="getList(3)" :class="{active:active==3}">粉丝
        <span :class="{news:news.newFanCount>0}"></span>
      </div>
      <!--<div @click="getList(4)" :class="{active:active==4}">群聊</div>-->
    </div>
    <!--<div class="fixed title title3" style="margin-top: 1.22rem;" v-else>
      <div class="underline" ref="underline" :style="{left:underlineLeft}"></div>
      <div @click="getList(1)" :class="{active:active==1}">好友
        <span :class="{news:news.newFriendCount>0}"></span>
      </div>
      <div @click="getList(2)" :class="{active:active==2}">关注</div>
      <div @click="getList(3)" :class="{active:active==3}">粉丝
        <span :class="{news:news.newFanCount>0}"></span>
      </div>
    </div>-->
    <div class="search fixed" style="margin-top: 2.82rem;">
      <input type="search" placeholder="搜索" v-model="searchKey" @search="search">
    </div>
    <myScroller :style="$store.state.isBrowser?'padding:4.05rem 0 0;':'padding:4.95rem 0 0;'" :infinite="infinite" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller" :showbg="showbg">
      <div class="myscoll">
        <template v-if="listArr">
          <template v-if="listArr.length>0">
            <template v-if="active==1 || active==2">
              <swipeout>
                <div class="content">
                  <div v-for="(item,index) in listArr" :key="item.id">
                    <swipeout-item transition-mode="follow">
                      <div slot="right-menu">
                        <swipeout-button @click.native="unfollowFriend(item.rid,index,true)" type="primary">取消关注
                        </swipeout-button>
                        <swipeout-button @click.native="setTop(item.rid,index)" type="warn">置顶</swipeout-button>
                      </div>
                      <div class="c_wrap" slot="content">
                        <router-link :to="{name:'userInfo',query:{id:item.rid,silentState: item.jiaoyouUser.silentState}}" tag="div" :style="{'background-image':'url('+getFullPath(item.jiaoyouUser.headimgAttachmentId)+')'}" v-if="active==1|| active==2"></router-link>
                        <div v-if="!$store.state.isWeixin" @click.stop="intoChat(active,item)">
                          <p>{{item.jiaoyouUser.aliasName}}</p>
                          <p>{{item.jiaoyouUser.selfLabel}}</p>
                        </div>
                        <div v-else>
                          <p>{{item.jiaoyouUser.aliasName}}</p>
                          <p>{{item.jiaoyouUser.selfLabel}}</p>
                        </div>
                        <div></div>
                      </div>
                    </swipeout-item>
                  </div>
                </div>
              </swipeout>
            </template>
            <template v-else-if="active==3">
              <div class="content">
                <div class="c_wrap" v-for="(item,index) in listArr" :key="item.id">
                  <router-link :to="{name:'userInfo',query:{id:item.userId,silentState: item.jiaoyouUser.silentState}}" tag="div" :style="{'background-image':'url('+getFullPath(item.jiaoyouUser.headimgAttachmentId)+')'}"></router-link>
                  <div v-if="!$store.state.isWeixin" @click.stop="intoChat(active,item)">
                    <p>{{item.jiaoyouUser.aliasName}}</p>
                    <p>{{item.jiaoyouUser.selfLabel}}</p>
                  </div>
                  <div v-else>
                    <p>{{item.jiaoyouUser.aliasName}}</p>
                    <p>{{item.jiaoyouUser.selfLabel}}</p>
                  </div>
                  <div>
                    <span v-if="item.jiaoyouUser.isFollow==0" @click="followFriend(item.userId,index)">关注</span>
                    <span v-if="item.jiaoyouUser.isFollow==1" @click="unfollowFriend(item.userId,index)">取消关注</span>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="active==4">
              <div class="groupChat_con">
                <div class="groupChat" v-for="item in listArr" :key="item.id">
                  <i></i>
                  <!--:style="{'background-image':'url('+getFullPath(item.jiaoyouUser.headimgAttachmentId)+')'}"-->
                  <div class="group_info">
                    <span>{{item.chatgroupName}}</span>
                    <span>1.6km</span>
                  </div>
                </div>
                <!--<div class="groupChat">-->
                <!--<i :style="{'background-image':'url('+imgs.w2+')'}"></i>-->
                <!--<div class="group_info">-->
                <!--<span>信息餐厅交流群</span>-->
                <!--<span>1.4km</span>-->
                <!--</div>-->
                <!--</div>-->
                <!--<div class="groupChat">-->
                <!--<i :style="{'background-image':'url('+imgs.w3+')'}"></i>-->
                <!--<div class="group_info">-->
                <!--<span>万达电影交流群</span>-->
                <!--<span>1km</span>-->
                <!--</div>-->
                <!--</div>-->
              </div>
              <p class="total_group">{{listArr.length}}个群聊</p>
            </template>
          </template>
          <template v-else>
            <div class="no-data">暂无数据</div>
          </template>
          <!--<div class="content">-->
          <!--<div v-for="item in people" :key="item.id">-->
          <!--<div :style="{'background-image':'url('+item.icon+')'}"></div>-->
          <!--<div>-->
          <!--<p>{{item.name}}<img v-if="item.level!=null" :src="'../../../static/img/V'+item.level+'.png'"/></p>-->
          <!--<p>{{item.signs}}</p>-->
          <!--</div>-->
          <!--<div>-->
          <!--<span v-if="active==1" class="hxgz"><i class="hxgz_icon"></i>互相关注</span>-->
          <!--<span v-if="active==2 || active==3">关注</span>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </template>
     </div>
    </myScroller>
  </div>
</template>
<script>
  import Loading from '../loading.vue';
  import myScroller from '@other/myScroller.vue';
  import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
import Back from '@other/back.vue';
  let fontsize = parseInt(document.documentElement.style.fontSize);
  export default {
    name: 'myFocus',
    components: {
      Loading,
      myScroller,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
	  Back,
    },
	props: ['datingId'],
    data() {
      return {
        isloading: false,
        showPopover: false,
        title: '好友',
        active: 1,
        listArr: [],
        searchKey: null,
        news: {},
        //分页参数
        pageNo: 1,
        isRead: false,
        isEnd: false,
        loadRefresh:true,//下拉刷新
        loadInfinite:true, //上拉加载
		showbg:true,
      }
    },
    computed: {
      underlineLeft: function () {
        if(!this.$store.state.isWeixin){
          return (this.active - 1) * document.body.clientWidth * 0.33 + 'px'
        }else{
          return (this.active - 1) * document.body.clientWidth * 0.33 + 'px'
        }
      },
    },
	watch:{
		isEnd(val) {
			const t = this;
			if (val) {
			  t.$refs.myScroller.finishInfinite(true);
			} else {
			  t.$refs.myScroller.finishInfinite(false);
			}
		  },
	},
    mounted() {
      this.active = this.$route.query.active;
	 if(this.datingId){
		this.active=3;
		this.getList(this.active);
	 }
	  if(this.$store.state.isLogin){
		this.unreadNews();
	  }

    },
    methods: {
		hiddenInfo() {
        this.$emit('hiddenInfo');
      },
      addFriend() {
        this.$router.push({
          path: "/addFriend"
        })
      },
      intoChat(active, item) {
        let query = {
          id: item.rid,
          name: item.jiaoyouUser.aliasName,
        }
        if (active == 3) {
          query = {
            id: item.userId,
            name: item.jiaoyouUser.aliasName,
          }
        }
        if(window.api){
          this.$router.push({
            path: "/chatWindow",
            query:query
          })
        }else{
          this.$router.push({
            path: "/chatWindowWeb",
            query:query
          })
        }
        // this.$router.push({
        //   path: "/chatWindow",
        //   query: query
        // })
      },
      getFullPath(path) {
        return this.$utils.getFullPath(path)
      },
      async getList(active,searchKey,flag) {
        const _this = this;
        if (_this.isRead) {
          return false;
        }
        _this.isRead = true;
        if (_this.isRefresh || flag || _this.active!=active || _this.searchKey!=searchKey) {
          _this.pageNo = 1;
          if (flag) {
            _this.isloading = true;
          }
        }
        try {
          let data = {
            searchKey: _this.searchKey,
            page: _this.pageNo,
            rows: _this.$store.state.pageSize
          };
          if (!_this.listArr || _this.isRefresh || flag || _this.active != active || _this.searchKey!=searchKey) {
            _this.$refs.myScroller.scrollTo(1);
            _this.listArr = [];
            _this.active = active;
          }
          let result = null;
          if (_this.active == 1) {
            result = await _this.$server.myFriendsList(data);
          } else if (_this.active == 2) {
            result = await _this.$server.myFocusOnList(data);
          } else if (_this.active == 3) {
            result = await _this.$server.myFansList(data);
          } else {
            result = await _this.$server.chatGroupList(data);
          }
          if(_this.active!=4){
				if(result.data.list){
				_this.showbg=false;
				_this.listArr.push(...result.data.list);		
			  }
			  if (result.data.count <= _this.$store.state.pageSize * _this.pageNo || result.data.list.length < _this.$store.state.pageSize) {//判断是否最后一页
				_this.isEnd = true;
			  } else {
				_this.isEnd = false;
			  }
		  }else if(_this.active==4){
			if(result.data.data){
				_this.showbg=false;
				_this.listArr.push(...result.data.data);
			}
            
			  if (result.data.count <= _this.$store.state.pageSize * _this.pageNo || result.data.data.length < _this.$store.state.pageSize) {//判断是否最后一页
				_this.isEnd = true;
			  } else {
				_this.isEnd = false;
			  }
          }
          
		  this.datingId && this.$emit('openWin');
        } catch (e) {
          console.log(e)
		  this.datingId && this.$emit('openWin',true);
          _this.isEnd = true;
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
        t.getList(this.active,this.searchKey).then(()=>{
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
        t.getList(this.active,this.searchKey).then((res)=>{
          done();
        });
      },
      search(event) {
        this.getList(this.active, this.searchKey, true);
      },
      async unreadNews() {
        const _this = this;
        _this.$vux.loading.show();
        let newsResult = await _this.$server.userUnreadVisitNumer();

        _this.news = newsResult.data.data || {};
        _this.$vux.loading.hide()
      },
      async followFriend(id, index) { //关注好友接口
        this.$vux.loading.show()
        let result = await this.$server.followFriend(id);
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: result.data.message,
          position: 'middle',
          width: 'auto',
        })
        this.$set(this.listArr[index].jiaoyouUser, "isFollow", 1)
      },
      async setTop(id, index) {//置顶
        this.$vux.toast.show({
          type: 'text',
          text: "功能暂未开放",
          position: 'bottom',
          width: 'auto',
        })
      },
      async unfollowFriend(id, index, flag) { //取消关注好友接口
        this.$vux.loading.show()
        let result = await this.$server.unfollowFriend(id);
        this.$vux.loading.hide();
        this.$vux.toast.show({
          type: 'text',
          text: result.data.message,
          position: 'middle',
          width: 'auto',
        })
        if (flag) {
          this.listArr.splice(index, 1);
        } else {
          this.$set(this.listArr[index].jiaoyouUser, "isFollow", 0)
        }

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

    .title {
      font-size: 0;
      margin-top: 1.39rem;
      padding: 0.28rem 0 0;
      height: 1.32rem;
      line-height: 1.32rem;
      background-color: #f2f2f2;
      div.underline {
        position: absolute;
        width: 33.333%;
        top: 0.28rem;
        height: 1.32rem;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0);
        transition: 0.2s all linear;
        &::before {
          content: "";
          margin-top: -6px;
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
        width: 33.333%;
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
      &.title3{
        div.underline {
          width: 33.33%;
          &::before {
            content: "";
            margin-top: -6px;
            width: 33.33%;
            height: 1.32rem;
            display: inline-block;
            border-bottom: 2px solid #ff4300;
          }
        }
        div{
          width: 33.33%;
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
      .content {
        .c_wrap {
          position: relative;
          padding: 0 0.3rem;
          display: flex;
          align-items: center;
          height: 2.2rem;
          line-height: 2.2rem;
          border-bottom: 1px solid #f6f6f6;
          & > div:first-child {
            width: 1.4rem;
            height: 1.4rem;
            background-size: cover;
            background-position: center;
            border-radius: 50%;
          }
          & > div:nth-of-type(2) {
            width: 6rem;
            p {
              line-height: 2;
              padding: 0 0 0 0.2rem;
              font-size: 0.48rem;
              img {
                margin-left: 0.1rem;
                width: 0.35rem;
                height: 0.35rem;
              }
            }
            p:last-child {
              font-size: 0.36rem;
              color: #9a9a9d;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          & > div:last-child {
            position: absolute;
            right: 0.3rem;
            width: 1.8rem;
            text-align: center;
            color: #ffa443;
            font-size: 0.36rem;
            span {
              border: 1px solid #ffa443;
              display: inline-block;
              width: 100%;
              height: 0.7rem;
              line-height: 0.75rem;
              border-radius: 5px;
              &.hxgz {
                border: 1px solid #f2f2f2;
                color: #d0cdd1;
              }
              i {
                &.hxgz_icon {
                  vertical-align: 0.04rem;
                  display: inline-block;
                  width: 0.22rem;
                  height: 0.16rem;
                  background: url("../../images/hxgz_icon.png") no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

