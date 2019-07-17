<template>
<div class="main jy_all_top jy_auth jy_state_top">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>车产认证</p>
		</div>
	</div>
	<div class="jy_auth_block">
		<p class="jy_auth_dp">认证后{{$store.state.userInfo.sex==1?'男':'女'}}生会看到您独有的车辆认证图标</p>
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
          <li class="ok">
            <a><i class="iconfont">&#xe69f;</i></a>
            <div>车产</div>
          </li>
          <li>
            <a><i class="iconfont">&#xe697;</i></a>
            <div>视频</div>
          </li>
          <li>
            <a><i class="iconfont">&#xe69e;</i></a>
            <div>房产</div>
          </li>
        </ul>
      </div>
    </div>

		<p class="jy_auth_dp">真实度与实力体现，为您加分，提升关注</p>
	</div>
	<div class="jy_auth_block">
		<p class="jy_auth_tit3">选择车辆品牌</p>
		<div class="jy_auth_xqname" @click="selCardBrand">{{carSystemName}}</div>
	</div>
	<div class="jy_auth_block">
		<p class="jy_auth_tit3">上传证件</p>
		<selectPhoto @fileBack="fileBack1">
		  <div class="jy_auth_up3" data-tip="拍摄行驶证主页" :style="attachmentUrl1?'background-image:url('+attachmentUrl1+');':''"><i v-if="attachmentUrl1" class="jy_auth_up_prev" @click.stop="showImage(0,$event)">&#xe6ad;</i></div> 
		</selectPhoto>
		<selectPhoto @fileBack="fileBack2">
			  <div class="jy_auth_up3 no_mar_r" data-tip="拍摄行驶证副页"  :style="attachmentUrl2?'background-image:url('+attachmentUrl2+');':''"><i v-if="attachmentUrl2" class="jy_auth_up_prev" @click.stop="showImage(1,$event)">&#xe6ad;</i></div>
		</selectPhoto>
	</div>
	<p class="jy_auth_tip"><em>所有上传信息，仅供审核用，不对外显示。</em></p>
	<p class="jy_auth_btn" @click="certification">上传</p>
  <div v-transfer-dom>
    <popup v-model="showCarBrand" height="100%">
      <div class="main popup fixed">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="showCarBrand=false">车产认证<a slot="right" style="color:#FFFFFF;" @click="selCardBrandConfirm">确定</a></x-header>
        <div class="cadBrand_con">
          <div class="left_con">
            <scroller lock-x height="-40" @on-scroll="onScroll" ref="scrollerEvent">
              <ul>
                <li v-for="item in listArr" :class="{active:brandId==item.id}" @click="getCarTypeInfo(item.id,item.name)">{{item.name}}</li>
              </ul>
            </scroller>
          </div>
          <div class="right_con">
            <div class="brand_title">{{brandName}}</div>
            <scroller lock-x height="-40" @on-scroll="onScroll" ref="scrollerEvent">
              <div class="brand_system">
                <span v-for="item in infoArr" :class="{active:carSystemId==item.id}" @click="selCarSystem(item.id,item.name)">{{item.name}}</span>
              </div>
            </scroller>
          </div>
        </div>
      </div>
    </popup>
  </div>
  <div v-transfer-dom>
	  <previewer :list="previmg" :ref="'previewerPhoto'" :options="options" @on-close="closeImg()"></previewer>
	</div>
</div>
</template>
<script>
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
import selectPhoto from '../plugs/selectPhoto'
import { TransferDom,Popup,XHeader,Scroller,Previewer} from 'vux'
import routerBack from '@/plus/routerBack.js';
	routerBack.init("carAuth",{
		showPhotoStatus:{
			change:'showPhotoStatusChange',
		},
	})
export default {
	name: 'carAuth',
	mixins:[routerBack],
  directives: {
    TransferDom,
  },
  components: {
    Loading,
    Back,
    selectPhoto,
    Popup,
    XHeader,
    Scroller,
	Previewer,
  },
  data () {
    return {
      isloading:false,
      showCarBrand:false,
      file1: null,
      file2: null,
      attachmentUrl1: '',
      attachmentUrl2: '',
      attachment1: '',
      attachment2: '',
      id:null,

      brandId: null,//品牌Id
      brandName:null,//品牌名称
      listArr:[],
      carSystemId: null,//车系Id
      carSystemName:'选择品牌',//车系名称
      infoArr:[],
      scrollTop: 0,
      onFetching: false,
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
	watch:{
		attachmentUrl1(val){
			const t=this;
			if(val){
				if(t.previmg.length==0){
					t.previmg.push({
						src:val
					})
				}else if(t.attachmentUrl2!=''&&t.previmg.length==1){
					t.previmg.unshift({
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
		attachmentUrl2(val){
			const t=this;
			if(val){
				if(t.previmg.length>1){
					t.previmg.pop();
				}
				t.previmg.push({
					src:val
				})
			
			}
		},
	},
	mounted () {
		const t=this;
		$("body").addClass("gray");
		t.viewCertification();
    this.$nextTick(() => {
      this.$refs.scrollerEvent.reset({top: 0})
    })
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
    async fileBack1 (obj) {
      const t = this;
      if(obj.serverId){
        // t.userIcon = obj.serverId;
        let result = await t.$server.wxMpMedia({
          mediaId:obj.serverId[0],
		  dataSources:'carAuth'
        })
        t.attachmentUrl1 = t.$utils.getFullPath(result.data.data&&result.data.data.path)
        t.attachment1 = result.data.data&&result.data.data.path;
      }else{
        t.file1 = obj.file[0]//提交的图片
        t.$utils.getBase64(t.file1, (url) => {
          t.attachmentUrl1 = 'data:image/png;base64,' + url   //显示的图片
        })
        t.uploadPhone(1);
      }
    },
    async fileBack2 (obj) {
      const t = this
      if(obj.serverId){
        // t.userIcon = obj.serverId;
        let result = await t.$server.wxMpMedia({
          mediaId:obj.serverId[0],
		  dataSources:'carAuth'
        })
        t.attachmentUrl2 = t.$utils.getFullPath(result.data.data&&result.data.data.path)
        t.attachment2 = result.data.data&&result.data.data.path;
      }else{
        t.file2= obj.file[0]//提交的图片
        t.$utils.getBase64(t.file2, (url) => {
          t.attachmentUrl2 = 'data:image/png;base64,' + url   //显示的图片
        })
        t.uploadPhone(2);
      }
    },
    async uploadPhone(index){//上传图片
      const _this = this;
      if (index == 1) {
        if (!_this.file1) {
          return false;
        }
      } else{
        if (!_this.file2) {
          return false;
        }
      }
      _this.$vux.loading.show();
      let param = new FormData(); //创建form对象
      if (index == 1) {
        param.append('fileArray', _this.file1, _this.file1.name); //单个图片 ，多个用循环 append 添加
      } else{
        param.append('fileArray', _this.file2, _this.file2.name); //单个图片 ，多个用循环 append 添加
      }
	  param.append('dataSources','carAuth');
      let result = await _this.$server.uploadPic(param);
      if(index == 1){
        _this.attachment1= result.data.data.path;
      }else{
        _this.attachment2=result.data.data.path
      }
      _this.$vux.loading.hide();
    },
    async selCardBrand(){//选择车品牌
      this.showCarBrand=true;
      this.getBrandList();
    },
    async selCardBrandConfirm(){//确定车品牌
      if(!this.carSystemId){
        this.$vux.toast.show({
          type: 'text',
          text: '请选择某种车系',
          position: 'middle',
          width: 'auto',
        })
        return
      }
      this.showCarBrand=false;
    },
    onScroll (pos) {
      this.scrollTop = pos.top
    },
    async getBrandList() {
      this.$vux.loading.show()
      const _this = this;
      let result = await _this.$server.getCarBrandInfo();
      if(result.data.data){
        _this.listArr.push(...result.data.data);
        _this.brandId = result.data.data[0].id;
        _this.brandName = result.data.data[0].name;
        _this.getCarTypeInfo(_this.brandId,_this.brandName);
      }
      this.$vux.loading.hide()
    },
    async getCarTypeInfo(id,name) {
      this.$vux.loading.show()
      const _this = this;
      if(_this.brandId!=id){
        _this.infoArr=[];
        _this.carSystemId=null;
      }
      let result = await _this.$server.getCarTypeInfo(id);
      _this.brandId = id;
      _this.brandName = name;
      if(result.data.data){
        _this.infoArr.push(...result.data.data);
      }
      this.$vux.loading.hide()
    },
    async selCarSystem(id,name) {
		  this.carSystemId = id;
		  this.carSystemName=name;
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
      if (!this.attachment2) {
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
        type:3,//车产认证
        attachment1: _this.attachment1,
        attachment2:  _this.attachment2,
        appendInfo1:  _this.carSystemName
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
      let viewResult = await _this.$server.certificationInfo(3);
      if(viewResult.data.data){
        _this.attachmentUrl1 = this.$utils.getFullPath(viewResult.data.data.attachment1);
        _this.attachmentUrl2 = this.$utils.getFullPath(viewResult.data.data.attachment2);
        _this.attachment1 = viewResult.data.data.attachment1;
        _this.attachment2 = viewResult.data.data.attachment2;
        _this.carSystemName = viewResult.data.data.appendInfo1;
        _this.id = viewResult.data.data.id;
      }
      _this.$vux.loading.hide()
    },
	}
}
</script>
<style scoped lang="scss">
  .vux-popup-dialog{
    z-index: 888;
    .vux-header {
      background-color: #2d2d2d;
    }
  }
  .popup{
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    .cadBrand_con{
      .left_con{
        width: 24%;
        height: auto;
        float: left;
        border-right: 1px solid #F2F2F2;
        ul{
          li{
            font-size: 0.4rem;
            line-height: 0.36rem;
            font-weight: bold;
            color: #666666;
            padding: 0.6rem 0;
            text-align: center;
            &.active{
              color: #ff8708;
              border-left: 0.15rem solid #ff8708;
            }
          }
        }
      }
      .right_con{
        width: 70%;
        float: left;
        padding: 0.3rem;
        .brand_title{
          padding: 0.2rem 0 0.2rem 0.4rem;
          position: relative;
          font-size: 0.36rem;
          color: #ff8708;
          &:before{
            content: "";
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 50%;
            background-color: #ff8708;
            margin-right: 0.6rem;
            position: absolute;
            top: 0.4rem;
            left: 0;
          }
          &:after{
              content: "";
              width: 4.4rem;
              height: 1px;
              background-color: #F2F2F2;
              margin-right: 0.6rem;
              position: absolute;
              top: 0.45rem;
              right: -0.3rem;
            }
        }
        .brand_system{
          display: flex;
          flex-wrap: wrap;
          span {
            height: 0.6rem;
            font-size: 0.36rem;
            color: #989797;
            line-height: 0.6rem;
            border-radius: 0.3rem;
            border: 1px solid #f5f5f5;;
            padding: 0 10px;
            margin: 0.35rem 0.35rem 0 0;
            &.active{
              color: #ff8708;
              border: 1px solid #ff8708;
            }
          }
        }
      }
    }
  }

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
