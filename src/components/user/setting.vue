<template>
  <div class="main jy_all_top jy_setting jy_state_top">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        <p>设置</p>
      </div>
    </div>
    <div class="jy_block_t">
      <ul class="jy_aInfo_line">
        <router-link tag="li" :to="{name:'accountSecurity'}">账号安全</router-link>
      </ul>
    </div>
    <div class="jy_block_t">
      <ul class="jy_aInfo_line">
        <router-link tag="li" :to="{name:'notice'}">消息通知</router-link>
        <!--<router-link tag="li" :to="{name:'privacy'}">隐私</router-link>-->
        <router-link tag="li" :to="{name:'blacklist'}">黑名单</router-link>
      </ul>
    </div>
    <group title="">
      <x-switch title="不允许别人看我" prevent-default v-model="onOff" @on-click="onClick"></x-switch>
    </group>
    <div class="jy_block_t">
      <ul class="jy_aInfo_line">
        <li @click="clearCache">清理缓存</li>
      </ul>
    </div>
    <div class="jy_block_t">
      <ul class="jy_aInfo_line">
        <router-link tag="li" :to="{name:'about'}">关于</router-link>
      </ul>
    </div>
    <p v-if="!$store.state.isWeixin" class="jy_auth_btn" @click.stop="logout">退出当前账号</p>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import {Group , XSwitch} from 'vux'

  export default {
    name: 'setting',
    data() {
      return {
        isloading: false,
        disabled: false,
        onOff: this.$store.state.userInfo.silentState == 0 ? false : true,
      }
    },
    components: {
      Loading,
      Back,
      Group,
      XSwitch,
    },
    destroyed() {
      this.$vux.confirm.hide();
      $("body").removeClass("gray");
    },
    watch: {
    },
    mounted() {
      const t = this;
      $("body").addClass("gray");
    },
    methods: {
      onClick(newVal, oldVal){
        const _this = this;
        if (newVal) {
          _this.$vux.confirm.show({
            title: '温馨提示',
            theme: 'android',
            content: _this.$store.state.custom_config.notAllowedSeeInfoSwitch||'开启“不允许别人看我”期间，你将无法看到Ta的信息，同时Ta也无法看到你的信息.',
            confirmText: '确认',
            cancelText:'再想一想',
            onCancel() {
              _this.onOff = oldVal;
            },
            onConfirm() {
              _this.onOff = newVal;
              _this.updateSilentState();
            }
          })
        } else {
          _this.onOff = newVal;
          _this.updateSilentState();
        }
      },
      clearCache() {
        const t = this;
        t.$vux.confirm.show({
          title: "清除缓存",
          content: "确定清除本地缓存和数据缓存吗?",
          maskZIndex: 98,
          cancelText:'再想一想',
          onCancel() {

          },
          onConfirm() {
            t.toClear();
          }
        });
      },
      toClear() {
        const t = this;
        t.$store.commit("CLEARLOCALCACHE");
        t.$vux.toast.show({
          type: "text",
          text: "清除成功",
          position: "bottom",
          width: "2rem",
        });
      },
     async logout() {
        const t = this;
		try{
			const result=await t.$server.loginOut({});
		}catch(e){
			console.log(JSON.stringify(e));
		}
        t.$store.dispatch("disconnectSocket");
        t.$store.commit("LOGINOUT");
        t.$router.replace({name: 'login'});
      },
      async updateSilentState() {
        const _this = this;
        let result = await _this.$server.updateSilentState();
        _this.$store.commit("LOGIN", result.data.data);
      }
    }
  }
</script>
<style scoped lang="scss">
  .weui-cell{
    padding: 0.18rem 0.4rem !important;
    font-size: 0.44rem !important;
    color: #151515 !important;
  }
</style>

