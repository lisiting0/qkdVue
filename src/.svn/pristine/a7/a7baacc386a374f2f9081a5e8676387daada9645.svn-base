<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="img">
      <img src="../../images/extend/hongl.jpg"/>
    </div>
    <div class="login">
      <div class="div_input">
        <input class="userName" v-model="loginName" type="text" placeholder="请填写真实姓名">
      </div>
      <div class="div_input">
        <label class="userName" @click="visibility=true" :class="{grey:!birthday}">{{birthday?birthday:'请选择您的生日'}}</label><i class="birthday_i iconfont">&#xe702;</i>
        <group style="display: none">
          <datetime v-model="birthday" :start-date="startDate" :end-date="endDate" confirm-text="确定" cancel-text="取消" :show.sync="visibility" :default-selected-value="endDate"></datetime>
        </group>
      </div>
      <div class="div_input">
        <div class="male-cls">
          <input type="radio" id="male" name="sex" v-model="sex" value="2"/>
          <label for="male">男</label>
          <input type="radio" id="female" name="sex" v-model="sex" value="1"/>
          <label for="female">女</label>
        </div>
      </div>
      <div class="div_input" >
        <input class="userName" style="border-bottom: 0 solid #f9f9f9;" v-model="phone" type="text" placeholder="请输入手机号码">
      </div>
      <textarea v-model="desc" rows="4" placeholder="请简要填写个人情况说明及要求..." class="div_input" style="width:100%;border: 1px solid #f9f9f9;padding: 0.6rem 0.22rem;border-radius: 3px;outline: none;">
      </textarea>
    </div>
    <div class="button" @click="send">提交</div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import {TransferDom, Actionsheet, PopupPicker, Group, Datetime, XDialog} from 'vux'

  export default {
    name: 'feedback',
    data() {
      return {
        hide:false,
        isloading: false,
        colorRed: {'color': '#ff788c', 'border-color': '#ff788c'},
        file: null,
        iconUrl:null,
        userIcon: '',
        showToast: false,
        loginName: this.$store.state.userInfo.aliasName,
        visibility: false,
        birthday: this.$store.state.userInfo.birthday.substr(0,10),
        sex: this.$store.state.userInfo.sex,
        phone:this.$store.state.userInfo.phoneNumber,
        desc:'',
        verificationCode: '',
        verificationCodeContent: "发送",
        verificationCodeUse: true,
        verificationCodeTime: 60,
        qkid:null,
        width:640,
        height:368,
      }
    },
    computed: {
      endDate(){
        let nowYear = this.$utils.format(new Date(),'yyyy')
        return (nowYear-18)+'-'+this.$utils.format(new Date(),'MM-dd');
      },
      startDate(){
        let nowYear = this.$utils.format(new Date(),'yyyy')
        return (nowYear-70)+'-'+this.$utils.format(new Date(),'MM-dd');
      },
      showOpacity() {
        return !!((this.file||this.userIcon)&&this.loginName&&this.birthday&&this.sex&&this.phone&&this.verificationCode);
      },
    },
    mounted() {
      document.title='红娘服务'
    },
    destroyed() {

    },
    components: {
      Actionsheet,
      PopupPicker,
      Loading,
      Group,
      Datetime,
      XDialog
    },
    directives: {
      TransferDom
    },
    methods: {
      async send() {
        const t = this;
        if (this.loginName == '') {
          this.$vux.toast.show({
            type: "text",
            text: "请填写您的真实姓名",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if (this.birthday == '') {
          this.$vux.toast.show({
            type: "text",
            text: "请选择您的生日",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if (this.sex == null) {
          this.$vux.toast.show({
            type: 'cancel',
            text: '请选择性别',
            position: 'middle',
            width: 'auto',
          })
          return
        }
        if (this.phone == '') {
          this.$vux.toast.show({
            type: "text",
            text: "请输入您的手机号码",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if (this.desc == '') {
          this.$vux.toast.show({
            type: "text",
            text: "请输入您的情况说明和要求",
            position: "middle",
            width: "auto",
          });
          return;
        }
        try {
          this.$vux.loading.show()
          const result = await t.$server.matchingRequest({
            realName:this.loginName,
            birthday:this.birthday,
            sex:this.sex,
            phone:this.phone,
            desc:this.desc,
            type:1
          });
          this.$vux.loading.hide()
          this.$vux.toast.show({
            type:"success",
            text: '提交成功',
            position:"middle",
            width:"auto",
          });
        } catch (e) {
          console.log(e);
        }
      },

    }
  }
</script>
<style lang="scss" scoped>
  .main{
    padding-bottom: 0.7rem;
  }
  .button{
    background-color: #ff3b65;
    color:#FFF;
    text-align: center;
    height: 1.5rem;
    line-height: 1.5rem;
    width: 10rem;
    margin: 0.6rem auto;
    border-radius: 0.75rem;
    font-size: 0.44rem;
  }
  .img{
    width: 100%;
    height: 4.8rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .login{
    padding: 0 0.8rem 1rem;
    height:auto;
    margin: 0.23rem 0.2rem 0;
    overflow: hidden;
  }
  .login .userName, .login .passWord, .login .verification{
     margin: 0;
  }
  .div_input {
    color:#000;
    font-size: 0.46rem;
    font-weight: 500;
    .grey{
      color: #c6cad1 !important;
    }
    .male-cls {
      padding: 0.58rem 0 0.58rem 0.37rem;
      border-bottom: 1px solid #f9f9f9;
      label {
        color: #d2d5db;
        font-size: 0.5rem;
        margin-right: 1.2rem;
      }
      label::before {
        content: "\a0"; /*不换行空格*/
        display: inline-block;
        vertical-align: middle;
        font-size: 0.5rem;
        width: 0.8em;
        height: 0.8em;
        margin-right: .4em;
        border-radius: 50%;
        border: 1px solid rgba(210,213,219, 0.5);
        line-height: 1;
        padding: .2em;
        background-clip: content-box;
      }
      input[type="radio"] {
        position: absolute;
        clip: rect(0, 0, 0, 0);
      }
      input[type="radio"]:checked + label::before {
        background-color: #000;
        background-clip: content-box;
      }
    }
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
    textarea::-webkit-input-placeholder {
      color: #c6cad1;
    }
    textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #c6cad1;
    }
    textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #c6cad1;
    }
    textarea:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #c6cad1;
    }

    .birthday_i{
      position: absolute;
      right: 0.2rem;
      top:0.6rem;
      color:#d2d5db;
    }
    span {
      position: absolute;
      width: 1.58rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      top: 0.44rem;
      right: 0.16rem;
      color: #aaa8aa;
      border: 1px solid;
      border-color: #aaa8aa;
      border-radius: 0.4rem;
    }
  }
</style>
