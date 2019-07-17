<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <a class="left" @click="goback"><i class="iconfont">&#xe613;</i></a><a class="right"><i class="iconfont">&#xe679;</i></a>会员成长体系
      </div>
    </div>
    <div class="vipGrowth_con">
      <div class="growth_top" >
          <div class="vip_growth">
              <p>今日成长值</p>
              <p>15</p>
          </div>
          <div class="vip_growth_total">总成长值：<span>260</span><span>续费会员</span></div>
      </div>
      <div class="growth_center">
        <p>年费会员：+15/天</p>
        <p>会员：+10/天</p>
        <div class="not_vip">非会员：-5/天</div>
        <div class="growth_val_chart">
          <div id="loading">
            <span class="ok">
              <span class="tips">0天后成长值降为0 <i class="iconfont">&#xe7aa;</i></span>
              <span class="headImg"><a><img :src="vipImg.headImg"></img></a></span>
              <em style="left: 0;">0</em><em>VIP1</em>
            </span>
            <span><em>600</em><em>VIP2</em></span>
            <span><em>1800</em><em>VIP3</em></span>
            <span><em>3600</em><em>VIP4</em></span>
            <span><em>6000</em><em>VIP5</em></span>
            <span><em>10000</em><em>VIP6</em></span>
            <span><em>24000</em><em>VIP7</em></span>
          </div>
        </div>
      </div>
      <div class="growth_bottom">
        <div class="growth_title">成长任务</div>
        <div class="right_qd">
          <i class="qd_icon"></i>
          <div class="qd_text">
            <p>每日签到福利</p>
            <p><em>成长值</em>+1</p>
            <span>签到</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headImg from '@/images/vip_img.png'
  import Loading from '@other/loading.vue';
  export default {
    name: 'membershipGrowthSystem',
    data() {
      return {
        isloading: false,
        vipImg: {headImg: headImg},
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
