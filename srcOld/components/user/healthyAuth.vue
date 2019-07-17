<template>
<div class="main jy_all_top jy_auth jy_state_top">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>健康认证</p>
		</div>
	</div>
	<div class="jy_auth_block">
		<p class="jy_auth_dp">认证后{{$store.state.userInfo.sex==1?'男':'女'}}生会更安心的与您约会</p>
		<!--<ul class="jy_auth_list">-->
			<!--<li>-->
        <!--<i v-if="$store.state.userInfo.sex==1" class="jy_auth_l_img" bgImg="@images/lhc.jpg"></i>-->
        <!--<i v-else class="jy_auth_l_img" bgImg="@images/ryy.jpg"></i>-->
				<!--<h4>{{$store.state.userInfo.sex==1?'令狐冲':'任盈盈'}}<em class="jy_auth_age" :style="{'background-color':($store.state.userInfo.sex==1?'rgb(0, 180, 255)':'')}">{{$store.state.userInfo.sex==1?'&#xe605;':'&#xe64a;'}}23</em><em class="jy_auth_level">17</em><em class="jy_auth_svip">3</em><em class="jy_icon_healthy"></em></h4>-->
				<!--<p class="jy_auth_l_p"><em>竞缘</em>已交保证金</p>-->
			<!--</li>-->
		<!--</ul>-->
    <div class="jy_info_block">
      <div class="jy_info_title">认证</div>
      <div class="bg_white jy_info_rz">
        <ul class="rz_list">
          <li>
            <a> <img :src="imgs.idcard" class="idCard"/></a>
            <div>实名</div>
          </li>
          <li>
            <a> <img :src="imgs.car" class="car"/></a>
            <div>车产</div>
          </li>
          <li>
            <a> <img :src="imgs.video" class="video"/></a>
            <div>视频</div>
          </li>
          <li>
            <a> <img :src="imgs.house" class="house"/></a>
            <div>房产</div>
          </li>
          <li class="ok">
            <a> <img :src="imgs.health" class="health"/></a>
            <div>健康</div>
          </li>
        </ul>
      </div>
    </div>
		<p class="jy_auth_dp">真实度与实力体现，为您加分，提升关注</p>
	</div>
	<div class="jy_auth_block">
		<p class="jy_auth_tit3">上传证件</p>
    <selectPhoto @fileBack="fileBack">
		<!--<div class="jy_auth_up4" :class="{noUploadPhoto:attachmentUrl==''}" data-tip="拍摄健康证正面":style="'background-image:url('+attachmentUrl+');'"></div>-->
      <div class="jy_auth_up4" :class="{noUploadPhoto:attachmentUrl==''}" :style="'background-image:url('+attachmentUrl+');'"></div>
    </selectPhoto>
	</div>
	<p class="jy_auth_tip"><em>所有上传信息，仅供审核用，不对外显示。</em></p>
	<p class="jy_auth_btn" @click="certification">上传</p>
</div>
</template>
<script>
import car from '@/images/car.png'
import idcard from '@/images/idcard.png'
import video from '@/images/video_icon.png'
import house from '@/images/house.png'
import health from '@/images/health.png'
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
	data () {
		return {
			isloading:false,
      imgs: {car: car, idcard: idcard, house: house, health: health, video: video},
      file: null,
      attachmentUrl: '',
      attachment1: '',
      id:null,
		}
	},
	mounted () {
		const t=this;
		t.viewCertification();
		$("body").addClass("gray");
		t.$nextTick(()=>{
			t.setBgImg();
		})
	},
	destroyed () {
		$("body").removeClass("gray");
	},
	methods:{
		setBgImg(){
			$("a,i,em,li,div").each(function(){//加载背景图片
				const bgimg=$(this).attr("bgImg");
				if(bgimg){
					$(this).css({"background-image":"url("+bgimg+")"});
					$(this).attr("bgImg","");
				}
			});
		},
    async fileBack (obj) {
      const t = this;
      if(obj.serverId){
        let result = await t.$server.wxMpMedia({
          mediaId:obj.serverId[0]
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
      let result = await _this.$server.uploadPic(param);
      _this.attachment1= result.data.data.path;
      _this.$vux.loading.hide();
    },
    async certification () {
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
        type:5,//健康认证
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
      let viewResult = await _this.$server.certificationInfo(5);
      if(viewResult.data.data) {
        _this.attachmentUrl = this.$utils.getFullPath(viewResult.data.data.attachment1);
        _this.attachment1 = viewResult.data.data.attachment1;
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
