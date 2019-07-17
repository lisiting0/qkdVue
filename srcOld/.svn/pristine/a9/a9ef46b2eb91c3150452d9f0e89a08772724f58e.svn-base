<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <a class="left" @click="goback"><i class="iconfont">&#xe613;</i></a>等级说明
      </div>
    </div>
    <div class="level_desc_con">
      <div class="level_desc_panel">
        <p>什么是娇友等级</p>
        <p>娇友等级是活跃度、社交优势、消费能力的综合体现。</p>
      </div>
      <div class="level_desc_panel">
        <p>什么是娇友成长值是如何计算的</p>
        <p>成长值=活跃值+魅力值+财富值</p>
      </div>
      <div class="level_desc_panel">
        <p>娇友等级有上限吗？</p>
        <p>娇友等级不设上限、跟随活跃值、魅力值、财务值的升高，娇友等级将不断上升。</p>
      </div>
      <div class="level_desc_panel">
        <p>赠送会员计入财务值吗？</p>
        <p>赠送会员每日加分上限为3次，超过3次将不再增加财富值。</p>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  export default {
    name: 'levelDescription',
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
