<template>
<div class="main jy_all_top jy_auth jy_state_top">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>房产认证</p>
		</div>
	</div>
	<div class="jy_auth_block">
		<p class="jy_auth_dp">认证后{{$store.state.userInfo.sex==1?'男':'女'}}生会看到您独有的房产认证图标</p>
    <div class="jy_info_block">
      <div class="jy_info_title">认证</div>
      <div class="bg_white jy_info_rz">
        <ul class="rz_list">
          <li>
            <a><i class="iconfont">&#xe69c;</i></a>
            <div>实名</div>
          </li>
          <li>
            <a><i class="iconfont">&#xe6ba;</i></a>
            <div>手机</div>
          </li>
          <li>
            <a><i class="iconfont">&#xe69f;</i></a>
            <div>车产</div>
          </li>
          <li>
            <a><i class="iconfont">&#xe697;</i></a>
            <div>视频</div>
          </li>
          <li class="ok">
            <a><i class="iconfont">&#xe69e;</i></a>
            <div>房产</div>
          </li>
        </ul>
      </div>
    </div>
		<p class="jy_auth_dp">真实度与实力体现，为您加分，提升关注</p>
	</div>
	<div class="jy_auth_block">
		<p class="jy_auth_tit3">完善小区信息</p>
		<input type="text" class="jy_auth_xqname" placeholder="请填写小区名称" v-model="name">
	</div>
	<div class="jy_auth_block">
		<p class="jy_auth_tit3">上传证件</p>
		<selectPhoto @fileBack="fileBack">
		  <div class="jy_auth_up2" :class="{noUploadPhoto:attachmentUrl==''}" :style="attachmentUrl?'background-image:url('+attachmentUrl+');':''"><i v-if="attachmentUrl" class="jy_auth_up_prev" @click.stop="showImage(0,$event)">&#xe6ad;</i></div>
		</selectPhoto>
	</div>
	<p class="jy_auth_tip"><em>所有上传信息，仅供审核用，不对外显示。</em></p>
	<p class="jy_auth_btn" @click="certification">上传</p>
	<div v-transfer-dom>
	  <previewer :list="previmg" :ref="'previewerPhoto'" :options="options" @on-close="closeImg()"></previewer>
	</div>
</div>
</template>
<script>
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
import selectPhoto from '../plugs/selectPhoto'
import { TransferDom,Previewer} from 'vux'
import routerBack from '@/plus/routerBack.js';
	routerBack.init("houseAuth",{
		showPhotoStatus:{
			change:'showPhotoStatusChange',
		},
	})
export default {
	name: 'houseAuth',
	mixins:[routerBack],
  components: {
    Loading,
    Back,
    selectPhoto,
	Previewer,
  },
	data () {
		return {
			isloading:false,
			  name:null,
			  file: null,
			  attachmentUrl: '',
			  attachment1: '',
			  id:null,
			previmg:[],
			options: {
			  fullscreenEl: false,
			  getThumbBoundsFn: () => {
				let thumbnail = this._previewer.target.parentNode;
				let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
				let rect = thumbnail.getBoundingClientRect()
				return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
			  }
			},
			showPhotoStatus:false,
		}
	},
	directives: {
		TransferDom,
	},
	watch:{
		attachmentUrl(val){
			const t=this;
			if(val){
				if(t.previmg.length==0){
					t.previmg.push({
						src:val
					})
				}else{
					t.previmg.shift()
					t.previmg.unshift({
						src:val
					})
				}
			}
		},
	},
	mounted () {
		const t=this;
		$("body").addClass("gray");
		t.viewCertification();
	},
	destroyed () {
		$("body").removeClass("gray");
	},
	methods:{
		showPhotoStatusChange(val){
			const t=this;
			if(!val){
				((this.$refs)["previewerPhoto"]).close();
			}
		},
		showImage(index,e) {
			this._previewer = e;
			this.showPhotoStatus=true;
			((this.$refs)["previewerPhoto"]).show(index);
		},
		closeImg(){
			this.showPhotoStatus=false;
		},
    async fileBack (obj) {
      const t = this;
      if(obj.serverId){
        let result = await t.$server.wxMpMedia({
          mediaId:obj.serverId[0],
		  dataSources:'houseAuth'
        })
        t.attachmentUrl = t.$utils.getFullPath(result.data.data&&result.data.data.path)
        t.attachment1 = result.data.data&&result.data.data.path;
      }else{
        t.file = obj.file[0]//提交的图片
        t.$utils.getBase64(t.file, (url) => {
          t.attachmentUrl = 'data:image/png;base64,' + url   //显示的图片
        })
        t.uploadPhone();
      }
    },
    async uploadPhone(){//上传图片
      const _this = this;
      if (!_this.file) {
        return false;
      }
      _this.$vux.loading.show();
      let param = new FormData(); //创建form对象
        param.append('fileArray', _this.file, _this.file.name); //单个图片 ，多个用循环 append 添加
		param.append('dataSources','houseAuth');
      let result = await _this.$server.uploadPic(param);
      _this.attachment1= result.data.data.path;
      _this.$vux.loading.hide();
    },
    async certification () {
      if (!this.name) {
        this.$vux.toast.show({
          type: 'text',
          text: '请完善小区信息',
          position: 'middle',
          width: 'auto',
        })
        return
      }
      if (!this.attachment1) {
        this.$vux.toast.show({
          type: 'text',
          text: '请上传图片',
          position: 'middle',
          width: 'auto',
        })
        return
      }
      const _this = this
      let data = {
        id:_this.id,
        type:2,//身房产认证
        appendInfo1:  _this.name,
        attachment1: _this.attachment1,
      }
      _this.$vux.loading.show();
      let submitResult = await _this.$server.userCertification(data);
      _this.$vux.loading.hide();
      this.$vux.toast.show({
        type: 'text',
        text: '提交成功',
        position: 'middle',
        width: 'auto',
      })
      setTimeout(() => {
        this.$router.go(-1);
      }, 500)
    },
    async viewCertification () {
      const _this = this
      _this.$vux.loading.show();
      let viewResult = await _this.$server.certificationInfo(2);
      if(viewResult.data.data) {
        _this.attachmentUrl = this.$utils.getFullPath(viewResult.data.data.attachment1);
        _this.attachment1 = viewResult.data.data.attachment1;
        _this.name = viewResult.data.data.appendInfo1;
        _this.id = viewResult.data.data.id
      }
      _this.$vux.loading.hide()
    },
	}
}
</script>
<style scoped lang="scss">
  .jy_info_block{
    background-color:#fff;
    margin: 0.25rem 0.2rem 0;
    border-radius: 3px;
    position:relative;
    .jy_info_title{
      font-size: 0.4rem;
      color: #000;
      font-weight: 500;
      line-height: 1.18rem;
      height: 1.18rem;
      position: relative;
      padding-left: 0.2rem;
      &::before{
        content: "";
        position: absolute;
        left: 0;
        top:0.37rem;
        height: 0.4rem;
        border-left: 2px #ff3552 solid;
      }
    }
  }
</style>
