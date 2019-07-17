<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <a class="left" @click="goback"><i class="iconfont">&#xe613;</i></a>认证中心
      </div>
    </div>
    <div class="certificationCenter_con">
      <div class="certificationCenter_panel">
        <div class="link_panel">
          <a :class="{ok:userInfo.idStatus==1}"><i class="iconfont">&#xe69c;</i></a>
          <router-link :to="{name:'identityAuth'}" tag="div" v-if="userInfo.idStatus==0 || userInfo.idStatus==3">
            <span>身份认证</span>
            <span>立即认证</span>
            <i class="iconfont">&#xe702;</i>
          </router-link>
          <div v-else :class="{ok:userInfo.idStatus==1}">
            <span>身份认证</span>
            <span v-if="userInfo.idStatus==1">已认证</span>
            <span v-if="userInfo.idStatus==2">认证中</span>
          </div>
        </div>
        <div class="link_panel">
          <a :class="{ok:1==1}"><i class="iconfont">&#xe6ba;</i></a>
          <div :class="{ok:1==1}">
            <span>手机认证</span>
            <span>已认证</span>
          </div>
        </div>
        <div class="link_panel">
          <a :class="{ok:userInfo.videoStatus==1}"><i class="iconfont">&#xe697;</i></a>
          <router-link :to="{name:'videoAuth'}" tag="div" v-if="userInfo.videoStatus==0 || userInfo.videoStatus==3">
            <span>视频认证</span>
            <span>立即认证</span>
            <i class="iconfont">&#xe702;</i>
          </router-link>
          <div v-else :class="{ok:userInfo.videoStatus==1}">
            <span>视频认证</span>
            <span v-if="userInfo.videoStatus==1">已认证</span>
            <span v-if="userInfo.videoStatus==2">认证中</span>
          </div>
        </div>
      </div>
      <div class="space_gray"></div>

      <div class="certificationCenter_panel">
        <div class="link_panel">
          <a :class="{ok:userInfo.carStatus==1}"><i class="iconfont">&#xe69f;</i></a>
          <router-link :to="{name:'carAuth'}" tag="div" v-if="userInfo.carStatus==0 || userInfo.carStatus==3">
            <span>车产认证</span>
            <span>立即认证</span>
            <i class="iconfont">&#xe702;</i>
          </router-link>
          <div v-else :class="{ok:userInfo.carStatus==1}">
            <span>车产认证</span>
            <span v-if="userInfo.carStatus==1">已认证</span>
            <span v-if="userInfo.carStatus==2">认证中</span>
          </div>
        </div>
        <div class="link_panel">
          <a :class="{ok:userInfo.houseStatus==1}"><i class="iconfont">&#xe69e;</i></a>
          <router-link :to="{name:'houseAuth'}" tag="div" v-if="userInfo.houseStatus==0 || userInfo.houseStatus==3">
            <span>房产认证</span>
            <span>立即认证</span>
            <i class="iconfont">&#xe702;</i>
          </router-link>
          <div :class="{ok:userInfo.houseStatus==1}" v-else>
            <span>房产认证</span>
            <span v-if="userInfo.houseStatus==1">已认证</span>
            <span v-if="userInfo.houseStatus==2">认证中</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  export default {
    name: 'certificationCenter',
    data() {
      return {
        isloading: false,
        userInfo:{},
      }
    },
    computed: {

    },
    components: {
      Loading,
    },
    beforeRouteEnter(to, from, next) {//进入组件前
      setTimeout(() => {//模拟获取数据,显示loading
        next();
      }, 300);
    },
    beforeRouteLeave(to, from, next) {
      this.isloading = true;
      next();
    },
    created() {

    },
    destroyed() {
    },
    mounted() {
      this.viewProfile();
    },
    methods: {
      goback () {
        this.$router.go(-1)
      },
      async viewProfile () {
        const _this = this;
        let data = {
          userId: _this.$store.state.userInfo.id
        }
        _this.$vux.loading.show();
        let viewResult = await _this.$server.getUserInfo(data);
        _this.userInfo = viewResult.data.data;
        _this.$vux.loading.hide()
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
  }
</style>
