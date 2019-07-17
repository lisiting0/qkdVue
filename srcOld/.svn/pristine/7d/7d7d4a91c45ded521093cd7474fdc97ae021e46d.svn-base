<template>
  <div class="login">
    <div class="top">
      <Back class="left"><i class="iconfont">&#xe613;</i></Back>忘记密码
    </div>
    <!--<div style="padding: 0.2rem 0;color: #ff788c;position: relative;" @click.stop="$router.replace({path: '/login'})"><i class="iconfont">&#xe613;</i>登录</div>-->
    <img class="login_logo" :src="imgs.login_logo"/>
    <p class="logo_name">乾坤岛</p>
    <div class="div_input">
      <input class="userName" v-model="phoneNumber" type="text" placeholder="请输入手机号">
    </div>
    <div class="div_input">
      <input class="verification" v-model="verificationCode"  type="text" placeholder="请输入验证码">
      <span @click="getVerificationCode" :style="colorRed">{{verificationCodeContent}}</span>
    </div>
    <div class="div_input">
      <input v-if="!showPassword" type="text" v-model="password" placeholder="请输入6-16位新密码" class="passWord">
      <input v-else type="password" placeholder="请输入6-16位新密码" v-model="password" class="passWord">
      <label @click="switchPwdState"><i class="switching-icon" :class="{on: showPassword}"></i></label>
    </div>
    <div class="div_input">
      <input v-if="!showPassword" type="text" v-model="rePassword" placeholder="请再次输入密码" class="passWord">
      <input v-else type="password" placeholder="请再次输入密码" v-model="rePassword" class="passWord">
    </div>
    <div @click="forgetPwd" class="btn_login" :class="{'btn_logined':showOpacity}">确定</div>

  </div>
</template>

<script>
  import Back from '@other/back.vue';
  import login_logo from '../../images/registered/logo.png';
  import md5 from 'js-md5';
  export default {
      name: "forgetPassword",
      data () {
        return {
          imgs:{login_logo:login_logo},
          verificationCodeContent:"发送",
          verificationCodeUse:true,
          verificationCodeTime:60,
          colorRed:{'color':'#ff788c','border-color': '#ff788c'},
          password:'',
          rePassword:'',
          phoneNumber:'',
          verificationCode:'',
          code:'',
          timeNum:60,
          time:60,//验证码倒计时 60s
          canCode:true,
          cPassword:'',
          showPassword: true, // 是否显示密码
          isFlag:false,
        }
      },
	    components: {
		  Back,
		},
      destroyed () {

      },
    computed:{
      showOpacity(){
        return !!(this.verificationCode&&this.password&&this.phoneNumber);
      },
    },
      watch:{
        phoneNumber(val){
          if(val&&typeof val=='string'){
            this.phoneNumber = val.match(/^\d+/)&&val.match(/^\d+/)[0];
          }
        },
      },
      methods: {
        getVerificationCode:function(){
          if(!this.verificationCodeUse){
            return false;
          }
          if(!this.$utils.isPhoneNum(this.phoneNumber)){
            this.$vux.toast.show({
              type:"text",
              text: "请输入正确的手机号",
              position:"middle",
              width:"auto",
            });
            return false;
          }
          this.verificationCodeUse = false
          this.$vux.loading.show()
          this.$server.get_code({phoneNumber:this.phoneNumber}).then((result)=>{
            this.$vux.loading.hide()
            let interval=setInterval(()=>{
              this.verificationCodeTime--;
              if(this.verificationCodeTime==-1){
                clearInterval(interval);
                this.verificationCodeUse=true
                this.verificationCodeTime=60
                this.colorRed={'color':'#ff788c','border-color': '#ff788c'}
                this.verificationCodeContent="发送"
              }else{
                this.colorRed={}
                this.verificationCodeContent=this.verificationCodeTime+"(s)"
              }
            },1000)
            // this.colorRed={'color':'red'}
            this.colorRed={}
            this.verificationCodeContent=this.verificationCodeTime+"(s)"
          },(err)=>{
            this.verificationCodeUse=true;
          })
          return;
        },
        switchPwdState() {
          this.showPassword = !this.showPassword;
        },
        switchRePwdState() {
          this.showRePassword = !this.showRePassword;
        },
        async forgetPwd(){
          if(!this.$utils.isPhoneNum(this.phoneNumber)){
            this.$vux.toast.show({
              type:"text",
              text: "请输入正确的手机号",
              position:"middle",
              width:"auto",
            });
            return false;
          }
          if(this.verificationCode==""){
            this.$vux.toast.show({
              type:"text",
              text: "请输入验证码",
              position:"middle",
              width:"auto",
            });
            return false;
          }
          if(this.password==""){
            this.$vux.toast.show({
              type:"text",
              text: "请输入密码",
              position:"middle",
              width:"auto",
            });
            return false;
          }
          if(this.rePassword==""){
            this.$vux.toast.show({
              type:"text",
              text: "请再次输入密码",
              position:"middle",
              width:"auto",
            });
            return false;
          }
          if(this.rePassword != this.password){
            this.$vux.toast.show({
              type:"text",
              text: "两次密码输入不一致",
              position:"middle",
              width:"auto",
            });
            return false;
          }
          let data = {
            phoneNumber:this.phoneNumber,
            code:this.verificationCode,
            password:md5(this.password),
          }
          this.$vux.loading.show();
          let result= await this.$server.forgetPwd(data);
          this.$vux.loading.hide();
          if(result.data.status==1){
            this.$vux.toast.show({
              type:"text",
              text: "密码修改成功",
              position:"middle",
              width:"auto",
            });
            this.$router.replace({
              path:'/login'
            })
          }
        }
      },
  }
</script>

<style scoped lang="scss">
  .login{
    .top{
      padding: 0.2rem 0 0.4465rem;
      color: #ff788c;
      font-size: 0.52rem;
      i{
        font-size: 0.52rem;
      }
      a{
        position:absolute;
        padding:3px;
      }
      .left{
        left:0;
      }
      .right{
        right:0.325rem;
      }
    }
    .btn_login{
      margin: 1.18rem 0 0.38rem;
    }
  }
  .logo_name{
    color:#ff788c;
    text-align: center;
    font-size: 0.44rem;
    font-weight: 400;
    margin-bottom: 0.4rem;
  }
  .div_input{
    position:relative;
    label{
      position: absolute;
      width: 0.46rem;
      height: 0.32rem;
      top: 0.68rem;
      right: 0.16rem;
      i.switching-icon {
        display: inline-block;
        width: 0.46rem;
        height: 0.32rem;
        background: url("../../images/login_showepwd_icon.png") no-repeat center center/0.35rem;
        &.on {
          background: url("../../images/login_hidepwd_icon.png") no-repeat center center/0.35rem;
        }
      }
    }
    input::-webkit-input-placeholder{
      color:#c6cad1;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
      color:#c6cad1;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      color:#c6cad1;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
      color:#c6cad1;
    }
    .userName,.passWord{

    }
    .verification{

    }
    span{
      position:absolute;
      width:1.58rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      top:0.44rem;
      right:0.16rem;
      color:#aaa8aa;
      border: 1px solid;
      border-color: #aaa8aa;
      border-radius: 0.4rem;
    }
  }
  .other_login{
    .btn_toLogin{
      color:#FFF;
    }
    span{
      color:#00e6b4;
    }
  }
  .jy_isBrowser{
    .login{
      .top{
        top:0;
      }
    }
  }
</style>
