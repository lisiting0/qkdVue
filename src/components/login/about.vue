<template>
  <div>
    <div class="main jy_all_top jy_setting jy_state_top">
      <div class="header">
        <div class="top">
          <Back class="left"><i class="iconfont">&#xe613;</i></Back><p>关于</p>
        </div>
      </div>
      <div class="content">
        <img src="../../images/home/logo.png">
        <p>乾坤岛V{{$store.state.version}}</p>
        <div class="version">
          <p><span>版本信息</span><span>V{{$store.state.version}}</span></p>
          <p><span>联系电话</span><span>400-8086-521</span></p>
          <p><span>微信公众号</span><img src="../../images/home/qrcode.jpg"></p>
        </div>
        <div class="footer">
          <span @click="showAgreement=true">&lt;&lt;乾坤岛用户协议及隐私政策&gt;&gt;</span>
          <p>Copyright@2018 All Rights Reserved</p>
        </div>
      </div>
    </div>
    <transition enter-active-class="slideInUp" leave-active-class="slideOutUp">
      <agreement v-if="showAgreement" @goback="goback"></agreement>
    </transition>
  </div>
</template>
<script>
  import Back from '@other/back.vue';
  import agreement from '../login/agreement';
  export default {
    name: 'about',
    data () {
      return {
        showAgreement:false,
      }
    },
    components: {
      Back,
      agreement
    },
    destroyed () {
      $("body").removeClass("gray");
    },
    watch:{

    },
    mounted () {
      $("body").addClass("gray");
    },
    methods :{
      goback() {
        this.showAgreement=false;
      },


    }
  }
</script>
<style lang="scss" scoped>
  @keyframes slideInUp {
    from {
      transform: translate3d(0, 100%, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideOutUp {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, 100%, 0);
    }
  }
  .slideInUp {
    animation-name: slideInUp;
  }

  .slideOutUp {
    animation-name: slideOutUp;
  }
  .slideOutUp, .slideInUp {
    animation-duration: 0.3s;
  }
  .content{
    padding-top:1.1rem;
    &>img{
      width: 3.92rem;
      height: 3.92rem;
      margin: 0 auto;
      display: block;
    }
    &>p{
      margin-top:0.44rem;
      font-size: 0.36rem;
      color:#ababab;
      text-align: center;
    }
    .version{
      margin: 2rem 0.37rem 0;
      p{
        height: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.36rem;
        color:#ababab;
        border-bottom: 1px solid #ededed;
      }
      p:last-child{
        height: 2rem;
      }
      img{
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    .footer{
      width: 100%;
      position: absolute;
      bottom: 0.5rem;
      font-size: 0.36rem;
      color:#ababab;
      text-align: center;
      span{
        color:#3c85fd;
      }
      p{
        text-align: center;
      }
    }
  }
</style>
