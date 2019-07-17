<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <!--<div class="top">-->
    <!--<router-link :to="{name:'friendlist'}" class="friendl"></router-link><a class="add"></a>好友-->
    <!--</div>-->
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        黑名单
      </div>
    </div>
    <div style="position: relative">
      <div class="wrapper" ref="wrapper" :style="{height:myScrollerHeight+'px'}">
        <ul class="content" ref="ul">
          <!--<div class="search">-->
          <!--<input type="input" placeholder="搜索" @change="search">-->
          <!--</div>-->
          <ul class="friend">
            <swipeout>
              <swipeout-item v-for="item in blacklist" :key="item.rid" ref="swipeoutItem" :right-menu-width="210"
                             :sensitivity="15">
                <div slot="right-menu">
                  <swipeout-button @click.native="outBlack(item.rid)" type="warn" :width="70">移出黑名单</swipeout-button>
                </div>

                <div slot="content" class="demo-content vux-1px-b">
                  <li>
                    <a class="i">
                      <i
                        :style="'background-image:url('+$utils.getFullPath(item.jiaoyouUser.headimgAttachmentId)+');'"></i>
                      <h3><em>{{item.jiaoyouUser.selfLabel}}</em>{{item.jiaoyouUser.aliasName}}</h3>
                    </a>
                  </li>
                </div>
              </swipeout-item>
            </swipeout>
          </ul>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  import Loading from '@other/loading.vue';
  import BScroll from 'better-scroll'
  import Back from '@other/back.vue';

  export default {
    name: 'blacklist',
    data() {
      return {
        blacklist: [],
        scroll: null,
        myScrollerHeight: 0,
        isloading: false,
        loadRefresh: false,//下拉刷新
        loadInfinite: false, //上拉加载
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.myScrollerHeight = document.body.clientHeight - $(".header").height() - $(".menu").height() - 0.75 * parseInt(document.documentElement.style.fontSize) - 3;
      this.getUserBlacklist()
      this.$nextTick(function () {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: 3,
          click: true
        })
      })
    },
    destroyed() {
      this.scroll && this.scroll.destroy()
    },
    components: {
      Loading,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Back
    },
    methods: {
      async outBlack(id) {
        this.$vux.loading.show();
        await this.$server.outBlacklist(id)
        let list = await this.$server.getUserBlacklist()
        if (list.data.list) {
          this.blacklist = list.data.list;
        } else {
          this.blacklist = []
        }
        this.$vux.loading.hide();
      },
      async getUserBlacklist() {
        this.$vux.loading.show();
        let list = await this.$server.getUserBlacklist()
        if (list.data.list) {
          this.blacklist = list.data.list;
        }
        this.$vux.loading.hide();
      },
      refresh(done) {//下拉刷新
        console.log("刷新 ");
        setTimeout(() => {
          console.log("刷新完成");
          done();
        }, 1000);
      },
      search() {

      },
      deleteItem(key) {
        console.log(key)
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
    .myscrollerdiv {
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    .wrapper {
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
    }
    .friend {
      .i {
        line-height: 1.5;
      }
    }
  }
</style>
