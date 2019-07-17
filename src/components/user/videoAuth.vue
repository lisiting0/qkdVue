<template>
<div class="main jy_all_top jy_auth jy_state_top">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>视频形象认证</p>
		</div>
	</div>
	<p class="jy_auth_v">
    <i>点击录制
      <input ref="changeInput" type="file" accept="video/*" capture="user" @change="changeVideo" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;"/>
    </i>
    <!--<video id="myvideo" width="4.8rem" height="4.8rem" autoplay="true"x5-video-player-type="h5" x5-video-player-fullscreen="true" :src="videoSrc" ref="videoId" controls muted v-show="showVideo"></video>-->
  </p>
	<p class="jy_auth_v_b">乾坤岛为侠客们提供一个纯粹、高效、安全的社交网络平台，为保护用户的真实性及约会的安全性，我们通过拍摄一段您本人的真实视频来保障双方的权益。</p>
</div>
</template>
<script>
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
import GIF from "../../../static/js/gif.js"

export default {
	name: 'identityAuth',
  props:['playOptions'],
  components: {
    Loading,
    Back,
  },
	data () {
		return {
			isloading:false,
      // videoSize: '',
      videoSrc: '',
      videoSrcPath: '',
      // videoLength: '',
      isAndroid: false,
      fileAndroid: {},
      gifSetTime: false,
      gif: '',
      winWidth: 200,
      winHeight: 200,
      showVideo: false,
      id:null,
		}
	},
  created(){
    //判断终端
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid){
      console.log('isAndroid')
      this.isAndroid = true;
    }else if(isiOS){
      console.log('isiOS')
      this.isAndroid = false;
    }
  },
  watch:{

  },
  computed: {

  },
	mounted () {
		$("body").addClass("gray");
      //初始gif
    this.gif = new GIF({
      workers: 1,
      quality: 1000,
      width: this.winWidth,
      height: this.winHeight,
      workerScript: '../../../static/js/gif.worker.js',
    });
    this.viewCertification();
	},
	destroyed () {
		$("body").removeClass("gray");
	},
	methods:{
    //input文件走向
    changeVideo(e){
      let file = e.target.files[0];
      const video = document.getElementById('myvideo');
      if(file !== undefined){
        //判断走向
        if(this.isAndroid){
          //视频开始播放
          video.removeEventListener('play', this.videoPlay, false);
          //视频播放完
          video.removeEventListener('ended', this.videoEnded, false);
          this.androidFile(file);
        }else{
          this.iphoneFile(file);
        }
      }
    },
    //IOS拍摄视频
    iphoneFile(file){
      const that = this;
      //视频字节大小
      // this.videoSize = file.size;
     if(file.size >= 2100000){
        this.$vux.toast.show({
          type:"text",
          text: "视频太大，请限制在10秒内",
          position:"middle",
          width:"auto",
        });
        return false;
      }
      if(file.size <= 200000){
        this.$vux.toast.show({
          type:"text",
          text: "视频录制不能少于2秒",
          position:"middle",
          width:"auto",
        });
        return false;
      }
      let url = null ;
      //file转换成blob
      if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
      } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
      } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
      }
      this.videoSrc = url;
      this.uploadVideo(file);
    },
    //安卓拍摄视频
    androidFile(file){
      //视频字节大小
      // this.videoSize = file.size;
      if(file.size >= 21000000){
        this.$vux.toast.show({
          type:"text",
          text: "视频太大，请限制在10秒内",
          position:"middle",
          width:"auto",
        });
        return false;
      }
      if(file.size <= 2000000){
        this.$vux.toast.show({
          type:"text",
          text: "视频录制不能少于2秒",
          position:"middle",
          width:"auto",
        });
        return false;
      }
      const that = this;
      const video = document.getElementById('myvideo');
      this.gifSetTime = true;
      this.gif.abort()
      this.gif.frames = [];
      //file转base64
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        that.videoSrc = this.result;
        video.play();
      }
      //视频开始播放
      video.addEventListener('play', this.videoPlay, false);
      //视频播放完
      video.addEventListener('ended', this.videoEnded, false);
      this.gif.on('finished', function(blob) {
        if(that.fileAndroid.size == blob.size) return;
        console.log("gif的blob文件",blob);
        that.fileAndroid = that.convertBase64UrlToFile(blob);
        that.uploadVideo(that.fileAndroid);
      });
      this.uploadVideo(file);
    },
    //视频开始播放
    videoPlay(){
      const that = this;
      const video = document.getElementById('myvideo');
      console.log("视频时长",video.duration);
      // this.videoLength = video.duration;
    },
    //视频播放完
    videoEnded(){
      this.gifSetTime = false;
      console.log("视频播放完毕！")
      this.gif.render();
    },
    //blob to file
    convertBase64UrlToFile(blob) {
      var d = new Date().getTime();
      var type = 'image/gif'
      return new File([blob],"fileGif-" + d + '.gif', {type:type});
    },
    //上传视频
    async uploadVideo(file){
      console.log("上传的视频文件", file)
      const _this = this;
      if (!file) {
        return false;
      }
      _this.$vux.loading.show();
      let param = new FormData(); //创建form对象
      param.append('fileArray', file, file.name); //单个视频
	  param.append('dataSources','videoAuth');
      let result = await _this.$server.uploadPic(param);
      _this.videoSrcPath= result.data.data.path;
      this.showVideo =! this.showVideo;
      let data = {
        id:this.id,
        type:6,//视频认证
        attachment1: this.videoSrcPath,
      }
      let submitResult = await this.$server.userCertification(data);
      _this.$vux.loading.hide()
      this.$vux.toast.show({
        type: 'text',
        text: '视频上传成功',
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
      let viewResult = await _this.$server.certificationInfo(6);
      if(viewResult.data.data) {
        if(viewResult.data.data.result!="0"){
          this.showVideo =! this.showVideo;
          _this.videoSrc = _this.$utils.getFullPath(viewResult.data.data.attachment1);
          _this.videoSrcPath = viewResult.data.data.attachment1;
        }
        _this.id = viewResult.data.data.id
      }
      _this.$vux.loading.hide()
    },
  }
}
</script>
<style type="text/css" scoped>
 video{
   position: absolute;
   top: 2.14rem;
   left: 3.3rem;
   width: 4.18rem;
   height: 4.18rem;
   margin: 1.5rem auto;
   text-align: center;
   object-fit:fill
 }
</style>
