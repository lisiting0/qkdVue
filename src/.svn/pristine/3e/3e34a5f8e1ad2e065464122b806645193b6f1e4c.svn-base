<template>
  <div style="height: 100%;">
    <div class="login">
      <!--<div class="top">-->
        <!--<a @click.stop="$router.replace({path: '/login'})" class="left"><i class="iconfont">&#xe613;</i>登录</a>-->
      <!--</div>-->
      <!--<div style="padding: 0.2rem 0;color: #ff788c;" @click.stop="$router.replace({path: '/login'})"><i class="iconfont">&#xe613;</i>登录</div>-->
      <img class="login_logo" :src="imgs.login_logo"/>
      <p class="logo_name">乾坤岛</p>

      <div class="div_input">
        <input class="userName" v-model="phoneNumber" type="text" placeholder="请输入手机号">
      </div>
      <div class="div_input">
        <input class="verification" v-model="verificationCode" type="text" placeholder="请输入验证码">
        <span @click="getVerificationCode">{{verificationCodeContent}}</span>
      </div>
      <div class="div_input">
        <input class="passWord" type="password" v-model="password" placeholder="请输入6-16位密码" v-if="!showPwd">
        <input class="passWord" v-model="password" type="text" placeholder="请输入6-16位密码" v-else style="width: 90%;">
        <label @click="switchPwdState"><i class="switching-icon" :class="{on: !showPwd}"></i></label>
      </div>
      <div class="div_input">
        <input class="passWord" type="password" v-model="rePassword" placeholder="请再次输入密码" v-if="!showPwd">
        <input class="passWord" v-model="rePassword" type="text" placeholder="请再次输入密码" v-else style="width: 90%;">
      </div>
      <div @click="registered" class="btn_login" :class="{'btn_logined':showOpacity}">下一步</div>
	  <p class="jy_login_nb"><router-link :to="{name:'loginApp',query:$route.query}">已有账号</router-link><router-link  :to="{name:'forgetPassword'}">忘记密码</router-link></p>
      <div class="other_login registered_bottom">
        <p>登录代表您同意<span @click="showAgreement=true">&lt;&lt;乾坤岛用户协议&gt;&gt;</span></p>
      </div>

    </div>
    <transition enter-active-class="slideInUp" leave-active-class="slideOutUp">
      <agreement v-if="showAgreement" @goback="goback"></agreement>
    </transition>
  </div>
</template>
<script>
  import md5 from 'js-md5';
  import login_logo from '../../images/registered/logo.png';
  import registered from '../../images/registered.png';
  import agreement from './agreement.vue';
  import routerBack from '@/plus/routerBack.js';
	routerBack.init("registered",{
		showAgreement:null,
	})

  export default {
    name: 'registered',
	mixins:[routerBack],
    components: {
      agreement
    },
    data() {
      return {
        showAgreement: false,
        imgs: {login_logo: login_logo, registered: registered},
        language: "cn",
        show: false,
        menus: {
          cn: "简体中文",
          en: "English"
        },
        verificationCodeContent: "获取验证码",
        verificationCodeUse: true,
        verificationCodeTime: 60,
        colorRed: {'color': '#ff788c', 'border-color': '#ff788c'},
        password: '',
        showPwd: false,
        rePassword: '',
        phoneNumber: '',
        verificationCode: '',
      }
    },
    computed: {
      showOpacity() {
        return !!(this.verificationCode && this.password && this.phoneNumber);
      },
    },
    watch: {
      verificationCode(curVal) {
        if (curVal && typeof curVal == 'string') {
          this.verificationCode = curVal.match(/^\d{0,6}/)[0];
        }
      }
    },
    methods: {
      switchPwdState() {
        this.showPwd = !this.showPwd;
      },
      switchRePwdState() {
        this.showRePwd = !this.showRePwd;
      },
      bindEvent() {
        const t = this;
        //t.isloading=true;(暂不用)
        window.api && window.api.addEventListener({
          name: 'closeShopWin'
        }, function (ret, err) {
          t.deBindEvent();
          if (ret.value.to) {
            t.$router.push({name: ret.value.to});
            if (ret.value.to == "login") {
              t.$store.commit("CHANGESTORE", {name: "redirectShop", value: ret.value.redirectUrl || true});
            } else {
              t.$store.commit("CHANGESTORE", {name: "redirectShop", value: false});
            }
          }
          t.$store.commit("CHANGESTORE", {name: "shopParam", value: ret.value});
          window.api && window.api.closeWin({
            name: "closeWin",
            animation: {
              type: 'push',
              subType: 'from_left',
            },
            slidBackEnabled: false,
          });
          t.isloading = false;
        });
      },
      deBindEvent() {
        window.api && window.api.removeEventListener({
          name: 'closeShopWin'
        });
      },
      goToShop(openUrl) {
        const t = this;
        if (!window.api) {
          window.location.href = t.$store.state.baseShopMobileURL + '?' + new Date().getTime();
          return false;
          t.$vux.toast.show({
            type: "cancel",
            text: "请在app端打开商城",
            position: "middle",
            width: "2rem",
          })
          return false;
        }
        t.bindEvent();
        let url = {};
        if (openUrl) {
          url = {
            url: openUrl + (openUrl.indexOf("?") != -1 ? "&" + new Date().getTime() : "?" + new Date().getTime())
          }
        }
        window.api.openWin({
          name: 'mobileShop',
          url: 'static/mobileShop.html?' + new Date().getTime(),//'mobileShop.html',
          //...url,
          animation: {
            type: 'push',
            subType: 'from_right',
          },
          slidBackEnabled: false,
          pageParam: {
            userId: t.giftUserId,
            userName: t.giftUserName,
            ...url,
            Authorization: "Bearer " + t.$store.state.Authorization,
          }
        });
      },
      goback() {
        this.showAgreement = false;
      },
      selectLanguage: function (key) {
        console.log(key)
        this.language = key;
      },
      toShow: function () {
        this.show = !this.show;
      },
      getVerificationCode: function () {
        if (!this.verificationCodeUse) {
          return false;
        }
        if (!this.$utils.isPhoneNum(this.phoneNumber)) {
          this.$vux.toast.show({
            type: "text",
            text: "请输入正确的手机号",
            position: "middle",
            width: "auto",
          });
          return false;
        }
        this.verificationCodeUse = false
        this.$vux.loading.show()
        this.$server.get_code({phoneNumber: this.phoneNumber}).then((result) => {
          this.$vux.loading.hide()
          let interval = setInterval(() => {
            this.verificationCodeTime--;
            if (this.verificationCodeTime == -1) {
              clearInterval(interval);
              this.verificationCodeUse = true
              this.verificationCodeTime = 60
              this.colorRed = {'color': '#ff788c', 'border-color': '#ff788c'}
              this.verificationCodeContent = "获取验证码"
            } else {
              this.colorRed = {}
              this.verificationCodeContent = this.verificationCodeTime + "(s)"
            }
          }, 1000)
          // this.colorRed={'color':'red'}
          this.colorRed = {}
          this.verificationCodeContent = this.verificationCodeTime + "(s)"
        }, (err) => {
          this.verificationCodeUse = true;
        })
        return;
      },
      registered: async function () {
        const t = this;
        if (!this.$utils.isPhoneNum(this.phoneNumber)) {
          this.$vux.toast.show({
            type: "text",
            text: "请输入正确的手机号",
            position: "middle",
            width: "auto",
          });
          return false;
        }
        if (this.password == "") {
          this.$vux.toast.show({
            type: "text",
            text: "请输入密码",
            position: "middle",
            width: "auto",
          });
          return false;
        }
        if (this.rePassword == "") {
          this.$vux.toast.show({
            type: "cancel",
            text: "请输入确认密码",
            position: "middle",
            width: "2rem",
          })
          return false;
        }
        if (this.password != this.rePassword) {
          this.$vux.toast.show({
            type: "cancel",
            text: "两次密码输入不一致",
            position: "middle",
            width: "2rem",
          })
          return false;
        }
        if (this.verificationCode == "") {
          this.$vux.toast.show({
            type: "text",
            text: "请输入验证码",
            position: "middle",
            width: "auto",
          });
          return false;
        }
        let location = {};
        this.$vux.loading.show()
        try {
          location = await this.$store.dispatch("getMylocation");
        } catch (e) {
          this.$vux.loading.hide()
          this.$vux.toast.show({
            type: "text",
            text: "获取定位失败",
            position: "middle",
            width: "auto",
          });
          return;
        }
        let data = {
          phoneNumber: this.phoneNumber,
          password: md5(this.password),
          code: this.verificationCode,
          // source:window.api.systemType=='ios'?4:3,
          //source: this.$store.state.isWeixin?1:4,
		  source:this.$store.state.isWeixin?1:this.$store.state.isiOSApp?4:this.$store.state.isApp?this.$store.state.appChannel:2,
          longitude: location.lon,
          latitude: location.lat,
          unionkey: t.$store.state.otherLogin && t.$store.state.otherLogin.unionkey,
        }
        let result = await this.$server.register(data);
        this.$store.commit("CHANGEACCESSTOKEN", result.data.data);
		let hasWrong=false;
        if (t.$store.state.otherLogin.isBind) {
          try {
            let bind;
            if (t.$store.state.otherLogin.type == 'wx') {
              bind = await t.$server.bindwx({
                accessToken: t.$store.state.otherLogin.accessToken,
                openId: t.$store.state.otherLogin.openId,
              });
            } else if (t.$store.state.otherLogin.type == 'qq') {
              bind = await t.$server.bindqq({
                accessToken: t.$store.state.otherLogin.accessToken,
              });
            } else if (t.$store.state.otherLogin.type == 'wxmp') {
              bind = await t.$server.WxMpbind({
                unionid: t.$store.state.otherLogin.unionid,
                openid: t.$store.state.otherLogin.openid,
                //unionkey:t.$store.state.otherLogin.unionkey
              });
            }
            /*t.$vux.toast.show({
              type: "text",
              text: "绑定账号成功",
              position: "bottom",
              width: "2rem",
            });*/
            //t.$store.commit("CHANGEOTHERLOGIN",{});//清空第三方临时登录信息
          } catch (e) {
				t.$store.commit("LOGINOUT");//清空登录信息
				hasWrong=true;
				console.log("绑定出错:"+JSON.stringify(e));
          }
        }
		if(hasWrong){
			return false;
		}
        let userInfo = await this.$server.getUserInfo({userId: result.data.data.userId});
        this.$store.commit("LOGIN", userInfo.data.data);
        let messageresult = await this.$store.dispatch("insertMessage");
        if (this.$store.state.registrationId == null && window.api) {
          let result2 = await this.$store.dispatch("initJpush");
        }
        if (this.$store.state.redirectShop) {
          this.goToShop(this.$store.state.redirectShop||this.$store.state.baseShopMobileURL);
        }
        this.$vux.loading.hide()
        if (t.$store.state.otherLogin.isBind) {
          if (t.$store.state.otherLogin.type == 'wxmp') {
            this.$router.replace({
              name: t.$store.state.otherLogin.params.name,
              query: t.$store.state.otherLogin.params.query
            });
          } else if (this.$store.state.redirect) {
            this.$router.replace(t.$store.state.redirect);
          } else {
            this.$router.replace({
              path: '/home'
            })
          }
          t.$store.commit("CHANGEOTHERLOGIN", {});//清空第三方临时登录信息
        } else if (this.$store.state.redirect) {
          this.$router.replace(t.$store.state.redirect);
        } else {
          this.$router.replace({
            path: '/home'
          })
        }
      }
    },
  }
</script>
<style scoped lang="scss">
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

  .login {
    .top {
      color: #ff788c;
      font-size: 0.52rem;
      position: fixed;
      top: 0.75rem;
      width: 100%;
      margin-left: -0.85rem;
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

  .logo_name {
    color: #ff788c;
    text-align: center;
    font-size: 0.44rem;
    font-weight: 400;
    margin-bottom: 0.8rem;
  }

  .div_input {
    position: relative;
    input::-webkit-input-placeholder {
      color: #c6cad1;
    }
    input::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #c6cad1;
    }
    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #c6cad1;
    }
    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #c6cad1;
    }
    .userName, .passWord {

    }
    .verification {

    }
    span {
      position: absolute;
      padding:0 0.2rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      top: 50%;
	  margin-top:-0.42rem;
      right: 0.16rem;
      color: #999;
      border: 1px solid;
      border-color: #eee;
      border-radius: 0.4rem;
    }
    label{
      position: absolute;
      width: 0.5rem;
      height: 0.36rem;
      top: 50%;
	  margin-top:-0.18rem;
      right: 0.16rem;
      i.switching-icon {
        display: inline-block;
		vertical-align:top;
        width: 0.5rem;
        height: 0.36rem;
        background: url("../../images/login_showepwd_icon.png") no-repeat center center/0.5rem;
        &.on {
          background: url("../../images/login_hidepwd_icon.png") no-repeat center center/0.5rem;
        }
      }
    }
  }

  .other_login {
    .btn_toLogin {
      color: #FFF;
    }
    span {
      color: #00e6b4;
    }
  }

  .jy_isBrowser {
    .login {
      .top {
        top: 0;
      }
    }
  }
</style>
