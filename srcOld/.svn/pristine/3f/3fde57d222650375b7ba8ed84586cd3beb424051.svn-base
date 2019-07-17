<template>
  <div class="main jy_all_top jy_auth jy_state_top">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        <p>身份认证</p>
      </div>
    </div>
    <p class="jy_auth_tit">身份证自拍照示范</p>
    <p class="jy_auth_p1">1、手持您的身份证自拍一张，以证明是您本人。</p>
    <p class="jy_auth_p2">所有上传信息，仅供审核用，不对外显示。</p>
    <p class="jy_auth_tit2">如上所示，上传两张照片</p>
    <ul class="jy_auth_up">
      <template v-if="result.result==1">
        <li class="showBlur" :style="'background-image:url('+attachmentUrl1+');'"></li>
        <li class="showBlur" :style="'background-image:url('+attachmentUrl2+');'"></li>
      </template>
      <template v-else-if="result.result==2">
        <li :class="{'noUploadPhoto':attachmentUrl1==''}" :style="'background-image:url('+attachmentUrl1+');'"></li>
        <li :class="{noUploadPhoto:attachmentUrl2==''}" :style="'background-image:url('+attachmentUrl2+');'"></li>
      </template>
      <template v-else>
        <selectPhoto @fileBack="fileBack1">
          <li :class="{'noUploadPhoto':attachmentUrl1==''}" :style="'background-image:url('+attachmentUrl1+');'"></li>
        </selectPhoto>
        <selectPhoto @fileBack="fileBack2">
          <li :class="{noUploadPhoto:attachmentUrl2==''}" :style="'background-image:url('+attachmentUrl2+');'"></li>
        </selectPhoto>
      </template>
    </ul>
    <div class="div_input">
      <input class="userName" v-model="username" type="text" placeholder="请输入真实名称" disabled v-if="result.result==1 || result.result==2">
      <input class="userName" v-model="username" type="text" placeholder="请输入真实名称" v-else>
    </div>
    <div class="div_input">
      <input class="userName" v-model="idNumber" type="text" placeholder="请输入身份证号码" disabled v-if="result.result==1 || result.result==2">
      <input v-else class="userName" v-model="idNumber" type="text" placeholder="请输入身份证号码">
    </div>
    <p class="jy_auth_btn" v-if="result.result==1">已通过</p>
    <p class="jy_auth_btn" v-else-if="result.result==2">审核中</p>
    <p class="jy_auth_btn" @click="certification" v-else-if="result.result==0">审核未通过,重新提交</p>
    <p class="jy_auth_btn" @click="certification" v-else>提交</p>
    <p class="memo" v-if="result.result==0&&result.memo">原因：{{result.memo}}</p>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import selectPhoto from '../plugs/selectPhoto'

  export default {
    name: 'identityAuth',
    components: {
      Loading,
      Back,
      selectPhoto,
    },
    data() {
      return {
        isloading: false,
        file1: null,
        file2: null,
        attachmentUrl1: '',
        attachmentUrl2: '',
        attachment1: '',
        attachment2: '',
        result: {},
        username: '',
        idNumber: '',
        id: null,
      }
    },
    mounted() {
      $("body").addClass("gray");
      this.viewCertification();
    },
    destroyed() {
      $("body").removeClass("gray");
    },
    methods: {
      async fileBack1(obj) {
        const t = this;
        if (obj.serverId) {
          let result = await t.$server.wxMpMedia({
            mediaId: obj.serverId[0]
          })
          t.attachmentUrl1 = t.$utils.getFullPath(result.data.data && result.data.data.path)
          t.attachment1 = result.data.data && result.data.data.path;
        } else {
          t.file1 = obj.file[0]//提交的图片
          t.$utils.getBase64(t.file1, (url) => {
            t.attachmentUrl1 = 'data:image/png;base64,' + url   //显示的图片
          })
          t.uploadPhone(1);
        }
      },
      async fileBack2(obj) {
        const t = this
        if (obj.serverId) {
          let result = await t.$server.wxMpMedia({
            mediaId: obj.serverId[0]
          })
          t.attachmentUrl2 = t.$utils.getFullPath(result.data.data && result.data.data.path)
          t.attachment2 = result.data.data && result.data.data.path;
        } else {
          t.file2 = obj.file[0]//提交的图片
          t.$utils.getBase64(t.file2, (url) => {
            t.attachmentUrl2 = 'data:image/png;base64,' + url   //显示的图片
          })
          t.uploadPhone(2);
        }
      },
      async uploadPhone(index) {//上传图片
        const _this = this;
        if (index == 1) {
          if (!_this.file1) {
            return false;
          }
        } else {
          if (!_this.file2) {
            return false;
          }
        }
        _this.$vux.loading.show();
        let param = new FormData(); //创建form对象
        if (index == 1) {
          param.append('fileArray', _this.file1, _this.file1.name); //单个图片 ，多个用循环 append 添加
        } else {
          param.append('fileArray', _this.file2, _this.file2.name); //单个图片 ，多个用循环 append 添加
        }
        let result = await _this.$server.uploadPic(param);
        if (index == 1) {
          _this.attachment1 = result.data.data.path;
        } else {
          _this.attachment2 = result.data.data.path
        }
        _this.$vux.loading.hide();
      },
      async certification() {
        if (!this.attachment1) {
          this.$vux.toast.show({
            type: 'text',
            text: '请上传图片',
            position: 'middle',
            width: 'auto',
          })
          return
        }
        if (!this.attachment2) {
          this.$vux.toast.show({
            type: 'text',
            text: '请上传图片',
            position: 'middle',
            width: 'auto',
          })
          return
        }
        if (!this.username) {
          this.$vux.toast.show({
            type: 'text',
            text: '请输入真实姓名',
            position: 'middle',
            width: 'auto',
          })
          return
        }
        if (!this.idNumber) {
          this.$vux.toast.show({
            type: 'text',
            text: '请输入身份证号码',
            position: 'middle',
            width: 'auto',
          })
          return
        }
        const _this = this
        let data = {
          id: _this.id,
          type: 1,//身份证实名认证
          attachment1: _this.attachment1,
          attachment2: _this.attachment2,
          attachment3: _this.username,
          attachment4: _this.idNumber
        }
        _this.$vux.loading.show();
        let submitResult = await _this.$server.userCertification(data);

        this.$vux.toast.show({
          type: 'text',
          text: '提交成功',
          position: 'middle',
          width: 'auto',
        });
        await this.viewCertification();
        _this.$vux.loading.hide();
        setTimeout(() => {
          this.$router.go(-1);
        }, 500)
      },
      async viewCertification() {
        const _this = this
        _this.$vux.loading.show();
        let viewResult = await _this.$server.certificationInfo(1);
        if (viewResult.data.data) {
          _this.result = viewResult.data.data;
          _this.attachmentUrl1 = this.$utils.getFullPath(viewResult.data.data.attachment1);
          _this.attachmentUrl2 = this.$utils.getFullPath(viewResult.data.data.attachment2);
          _this.attachment1 = viewResult.data.data.attachment1;
          _this.attachment2 = viewResult.data.data.attachment2;
          _this.username = viewResult.data.data.attachment3;
          _this.idNumber = viewResult.data.data.attachment4;
          _this.id = viewResult.data.data.id
        }
        _this.$vux.loading.hide()
      },
    }
  }
</script>
<style scoped lang="scss">
  .memo {
    padding: 0 0.3rem;
  }

  .div_input {
    position: relative;
    background-color: #ffffff;
    input {
      display: block;
      color: #000;
      font-size: 0.46rem;
      outline: 0;
      padding: 0.4rem 0.5rem;
      margin: 0 0.15rem;
      width: 100%;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      border: 0;
      background-color: rgba(0, 0, 0, 0);
      border-bottom: 1px solid #f9f9f9;
    }
  }
</style>
