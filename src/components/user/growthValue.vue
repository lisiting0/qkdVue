<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <a class="left" @click="goback"><i class="iconfont">&#xe613;</i></a>昨日成长值
      </div>
    </div>
    <div class="growthValue_con">
     <div class="fraction">共计：<span>9</span>分</div>
      <div class="growth_title hyz_panel">
        <p>
          <span class="hyz">活跃值</span>
          <span>购买会员，加速成长</span>
        </p>
      </div>
      <div class="growth_panel">
        <span>登录</span>
        <span>+2</span>
      </div>
      <div class="growth_panel">
        <span>群聊发言</span>
        <span>+3</span>
      </div>
      <div class="growth_title mlz_panel">
        <p>
          <span class="mlz">魅力值</span>
        </p>
      </div>
      <div class="growth_panel">
        <span>收到1个招呼</span>
        <span>+1</span>
      </div>
      <div class="growth_panel">
        <span>信息被别人查看</span>
        <span>+3</span>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  export default {
    name: 'growthValue',
    data() {
      return {
        isloading: false,
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
    },
    methods: {
      goback () {
        this.$router.go(-1)
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
