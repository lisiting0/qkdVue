<template>
  <div class="main page" ref="scrollTop" @scroll="scroll">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <a class="left" @click="goback"><i class="iconfont">&#xe613;</i></a>
        <a class="right">分享</a>我的等级
      </div>
    </div>
    <div class="accout_level_con">
      <div class="accoutLevel_info">
        <i class="level_icon"></i>
        <p>当前成长值：118</p>
        <p>超越广州 83% 的男性用户</p>
        <div class="progress">
          <x-progress :percent="percent" :show-cancel="false"></x-progress>
          <div class="level_progress">
            <span class="left_level">LV9(97)</span>
            <span class="right_level">LV10(150)</span>
          </div>
        </div>
      </div>
      <div class="accoutLevel_czzgc">成长值构成</div>
      <div class="accoutLevel_data">
        <div class="data_top">
          <div class="x_circle">
            <x-circle :percent="circlePercent" :stroke-width="12" :trail-width="12" stroke-color="#27bdfc" trail-color="#5d74e7"></x-circle>
          </div>
          <div class="level_desc">
            <p>级别：Lev9</p>
            <p>娇友等级是用户在娇友的活跃度、魅力值和消费能力的综合体现</p>
          </div>
        </div>
        <div class="data_bottom" >
          <div class="data_val hyz">
            <span>活跃值</span>
            <br/>
            85
          </div>
          <div class="data_val mlz">
            <span>魅力值</span>
            <br/>85
          </div>
          <div class="data_val cwz">
            <span>财务值</span>
            <br/>
            0
          </div>
        </div>
      </div>
      <router-link :to="{name:'growthValue'}" tag="div" class="link_tab">
        <p>昨日成长值 <span class="right-text">3</span><i class="iconfont">&#xe702;</i></p>
      </router-link>
      <p class="gray_space"></p>
      <router-link :to="{name:'levelPrivilege'}" tag="div" class="link_tab">
        <p>等级特权<i class="iconfont">&#xe702;</i></p>
      </router-link>
    </div>
    <div class="bottom_action">提升我的娇友等级</div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import { XProgress,XCircle } from 'vux'
  export default {
    name: 'accountLevel',
    data() {
      return {
        isloading: false,
        percent: 83,
        circlePercent:83,
        userTop: false,
      }
    },
    computed: {

    },
    components: {
      Loading,
      XProgress,
      XCircle,
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
      scroll () {
        if (this.$refs.scrollTop.scrollTop > 2) {
          this.userTop = true
        } else {
          this.userTop = false
        }
      },
      goback () {
        this.$router.go(-1)
      },
    }
  }
</script>
<style scoped lang="scss">
  .page {
    height: 100%;
    overflow: auto;
    position: relative;
  }

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
