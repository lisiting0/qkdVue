<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        <a class="right"></a>我的奖品
      </div>
    </div>
    <myScroller :style="$store.state.isBrowser?'padding:1.65rem 0 0;':'padding:2.4rem 0 0;'" :infinite="infinite" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller">
      <div class="myscoll">
        <div class="content">
          <template v-if="listArr">
            <template v-if="listArr.length>0">
              <div class="myPrize" v-for="(item,index) in listArr" :key="item.id">
                <div class="left_info">
                  <p>{{item.type==1?"乾坤币":item.objId}}</p>
                  <p>{{Fn.timeFormat(item.createDate,'yyyy-MM-dd')}}</p>
                </div>
                <div class="right_info">
                  <p class="jb" v-if="item.type==1">+ {{item.objId}}</p>
                  <router-link tag="div" :to="{name:'act',query:{id:item.objId}}" class="dating_info" v-else-if="item.dating&&item.dating.jiaoyouUser&&item.type==0" >
                    <img :src="getFullPath(item.dating.jiaoyouUser.headimgAttachmentId)" alt="">
                    <div class="dating_detail">
                      <p>{{item.dating.datingDesc}}</p>
                      <p>{{item.dating.datingStarttime}}</p>
                    </div>
                  </router-link>
                  <p class="jb" v-else>+ {{1}}</p>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </myScroller>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import myScroller from '@other/myScroller.vue';

  let fontsize = parseInt(document.documentElement.style.fontSize);
  export default {
    name: 'myPrize',
    components: {
      Loading,
      myScroller,
      Back,
    },
    data() {
      return {
        isloading: false,
        listArr: [],
        //分页参数
        pageNo: 1,
        isRead: false,
        isEnd: false,
        loadRefresh: true,//下拉刷新
        loadInfinite: true, //上拉加载
      }
    },
    computed: {},
    created() {

    },
    destroyed() {
    },
    mounted() {
    },
    methods: {
      getFullPath(path) {
        return this.$utils.getFullPath(path)
      },

      async getList(flag) {
        const _this = this;
        if (_this.isRead) {
          return false;
        }
        _this.isRead = true;
        if (_this.isRefresh || flag) {
          _this.pageNo = 1;
          if (flag) {
            _this.isloading = true;
          }
        }
        try {
          let data = {
            page: _this.pageNo,
            rows: _this.$store.state.pageSize
          };
          if (!_this.listArr || _this.isRefresh || flag) {
            _this.$refs.myScroller.scrollTo(1);
            _this.listArr = [];
          }
          let result = await _this.$server.recordList(data);
          if (result.data.list) {
            _this.listArr.push(...result.data.list);
          }
          if (result.data.count <= _this.$store.state.pageSize * _this.pageNo || result.data.list.length < _this.$store.state.pageSize) {//判断是否最后一页
            _this.isEnd = true;
          } else {
            _this.isEnd = false;
            _this.$refs.myScroller.finishInfinite(false);
          }
        } catch (e) {
          console.log(e)
        }
        _this.isRead = false;
        _this.isloading = false;
        _this.isRefresh = false;
        _this.pageNo++;
      },
      infinite(done) {//上拉加载(防止初始内容不满一屏会无限加载)
        const t = this;
        if (t.isEnd) {
          done(true);
          return false;
        }
        console.log("加载");
        t.getList(this.active, this.searchKey).then(() => {
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
        t.getList(this.active, this.searchKey).then((res) => {
          done();
        });
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
    .myscoll {
      background-color: #ffffff;
      .content {
        padding: 0 0.3rem;
        .myPrize {
          width: 100%;
          height: 2.4rem;
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border-bottom: 1px solid #f2f2f2;
          &:last-child{
            border-bottom: none;
          }
          .left_info {
            p {
              &:nth-of-type(1) {
                line-height: 1rem;
                font-size: 0.48rem;
                color: #000000;
              }
              &:nth-of-type(2) {
                font-size: 0.36rem;
                color: #9a9a9d;
              }
            }
          }
          .right_info {
            position: absolute;
            right: 0.2rem;
            .jb {
              top: 25%;
              color: #ffa443;
              font-size: 0.48rem;
              font-weight: bold;
            }
            .dating_info {
              width: 6rem;
              height: auto;
              line-height: 0.9rem;
              border-radius: 0.1rem;
              background-color: #efefef;
              text-align: left;
              display: flex;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
              padding: 0.2rem 0;
              img {
                width: 1rem;
                height: 1rem;
                margin: 0 0.2rem;
              }
              .dating_detail {
                line-height: 0.54rem;
                p {
                  &:nth-of-type(1) {
                    font-size: 0.44rem;
                    color: #000000;
                    width: 4.4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  &:nth-of-type(2) {
                    font-size: 0.36rem;
                    color: #9a9a9d;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>

