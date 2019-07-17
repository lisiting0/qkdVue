<template>
  <div class="main page" ref="scrollTop" @scroll="scroll">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <a class="left" @click="goback"><i class="iconfont">&#xe613;</i></a>等级特权
      </div>
    </div>
    <div class="privilege">
      <table>
        <tbody>
        <tr>
          <td><span class="lv_1"></span></td>
          <td><i class="lv1_icon"></i>点亮等级标签</td>
        </tr>
        <tr>
          <td><span class="lv_10"></span></td>
          <td><i class="lv10_icon"></i>点亮等级标签</td>
        </tr>
        <tr>
          <td><span class="lv_15"></span></td>
          <td><i class="lv15_icon"></i>点亮等级标签</td>
        </tr>
        <tr>
          <td rowspan="2"><span class="lv_20"></span></td>
          <td><i class="lv20_icon"></i>点亮等级标签</td>
        </tr>
        <tr>
          <td style="width: 80%;text-align: left"><i class="lv25_icon"></i>点亮等级标签</td>
        </tr>
        <tr>
          <td><span class="lv_25"></span></td>
          <td><i class="lv25_icon"></i>点亮等级标签</td>
        </tr>
        <tr>
          <td><span class="lv_30"></span></td>
          <td><i class="lv30_icon"></i>点亮等级标签</td>
        </tr>
        <tr>
          <td><span class="lv_35"></span></td>
          <td><i class="lv35_icon"></i>点亮等级标签</td>
        </tr>
        <tr>
          <td><span class="lv_40"></span></td>
          <td><i class="lv40_icon"></i>点亮等级标签</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  export default {
    name: 'levelPrivilege',
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


