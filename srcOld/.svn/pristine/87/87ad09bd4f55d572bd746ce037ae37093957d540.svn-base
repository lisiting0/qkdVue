<template>
  <div class="shade" @click="selectPhoto">
    <slot>

    </slot>
    <div v-if="showBottom" class="bottom">
      <span @click.stop="close">取消</span>
      <span @click.stop="reset">重置</span>
      <span @click.stop="save">确定</span>
    </div>
  </div>
</template>
<script>
  const COMPONENT_NAME = 'SelectPhoto'
import { wxChooseImage ,wxUploadImage} from '@js/wxjssdk'
  export default {
    name: COMPONENT_NAME,
    props: {
      cutTypeX: {
        type: null,
        default: 350,//
      },
      cutTypeY: {
        type: null,
        default: 350,//
      },
      compress: {
        type: null,
        default: 60,//80表示压缩后图片质量为原图的80%范围（30~100）
      },
      amount: {
        type: null,
        default: 1,//本次一共想获取多少张图片
      },
      cutting:{
        type: Boolean,
        default: false//是否需要裁切
      }
    },
    data(){
      return {
        showBottom:false,
        FCimageTrans:null,
        FNImageClip:null,
        result:{
          url:[],
          file:[],
        }
      }
    },
    methods:{
      async pathToFile(Path){
        return await new Promise((resolve,reject) => {
            this.FCimageTrans.decodeImgToBase64({
              imagePath: Path
            }, function(ret3, err) {
              if (ret3.status) {
                let mime = 'data:image/jpg;base64'.match(/:(.*?);/)[1],
                  bstr = atob(ret3.msg), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                  u8arr[n] = bstr.charCodeAt(n);
                }
                let file=new File([u8arr],new Date().getTime()+'.jpg', {type:mime});
                // console.log(file.size)
                // let param = new FormData(); //创建form对象
                // param.append('fileArray', file, file.name)
                // _this.api.postImg("/r/uploadFiles", param).then((res) => {//提交图片
                //   console.log(JSON.stringify(res))
                // },(err)=>{
                //   console.log(JSON.stringify(err)+"---")
                // });
                resolve(file);
              }else{
                reject('转换文件失败');
              }
            })
        })
      },
      close(){
        this.showBottom=false;
        this.FNImageClip.close();
      },
      reset(){
        this.FNImageClip.reset();
      },
      save(){
        let _this = this;
        let imgPath = 'cache://shareImage/';
        if (api.systemType != "ios") {
          imgPath = 'fs://shareImage/';
        }
        let fs = api.require('fs');
        let ret = fs.rmdirSync({ // 删除文件目录，里面的所有文件将会一起被删除
          path: imgPath
        });
        this.FNImageClip.save({
          destPath: imgPath+'result.jpg',
          copyToAlbum: false,
          quality: 0.5
        }, async function(ret, err) {
          if (ret) {
            let file = await _this.pathToFile(ret.destPath);
            _this.result={
              url:[],
              file:[],
            }
            _this.result.url.push(ret.destPath)
            _this.result.file.push(file)
            _this.result.url = _this.result.url.map(v=>{
              return v+'?v='+ new Date().getTime();
            })
            _this.$emit('fileBack', _this.result);
          } else {
            alert(JSON.stringify(err));
          }
        });
        _this.showBottom=false;
        _this.FNImageClip.close();
      },
		getBase64(path){
			const t=this;
			return new Promise((resolve,reject)=>{
        let img=new Image(),
          maxWidth=1080*window.FS/100;
        img.setAttribute('crossorigin', 'anonymous');
				img.onload =function(){
					let canvasId = 'canvasBase64ImgidPhoto',  
						canvas = document.getElementById(canvasId);  
						alert(path+"图片加载完毕");
					if(canvas!=null){document.body.removeChild(canvas);}  
					canvas = document.createElement("canvas");  
					canvas.innerHTML = 'New Canvas';  
					canvas.setAttribute("id", canvasId);  
					// canvas.style.display='none';
					document.body.appendChild(canvas);  
					document.body.appendChild(img);
					canvas.width = this.width;
					canvas.height = this.height;
					let imageWidth = this.width,   
					imageHeight = this.height;  
					if (this.width > maxWidth){  
						imageWidth = maxWidth;  
						imageHeight = this.height * maxWidth/this.width;  
						canvas.width = imageWidth;  
						canvas.height = imageHeight;  
					}  
					let context = canvas.getContext('2d');  
					context.clearRect(0, 0, imageWidth, imageHeight);  
					context.drawImage(this, 0, 0, imageWidth, imageHeight);  
					let base64 = canvas.toDataURL('image/jpeg',0.7);  
					//let imgbase = base64.substr(22);  
					img.onload=null;
					resolve(base64);
					//this.imgUrl =   
				}
				img.onerror=(e)=>{
					alert(path+"图片加载失败");
					img.onerror=null;
					reject(e);
				}
				alert("图片路径:"+path);
				img.src = path;
			});
		},
		async wxPathToFile(path){
			const t=this;
			try{
				alert(path+"开始转换");
				const base64Codes=await t.getBase64(path);
				alert(path+"转换成功");
			}catch(e){
				alert("转换报错:"+JSON.stringify(e));
			}
			const file=t.convertBase64UrlToBlob(base64Codes);
			return file;
		},
		convertBase64UrlToBlob(urlData){
            var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        },
      async selectPhoto(){
		const t=this;
        if(this.amount==0){
          this.$vux.toast.show({
            type: "cancel",
            text: "最多选择3张图片",
            position: "middle",
            width: "2rem",
          });
          return;
        }
		if(t.$store.state.isWeixin){
      try{
        let imgData=wxChooseImage&&await wxChooseImage({
          count:t.amount,
          // count:1,
        });
        t.result={
                url:[],
                file:[],
                serverId:[],
              }
      // let serverId=wxUploadImage&&await wxUploadImage({
      //   localId:imgData.localIds[0],
      // });
			 t.result.url.push(...imgData.localId);
			 t.result.serverId.push(...imgData.serverId);
        console.log("微信图片:"+JSON.stringify(t.result))
			 t.$emit('fileBack', t.result);
		  }catch(e){
        this.$vux.toast.show({
          type: "text",
          text: "选取图片失败",
          position: "bottom",
          width: "2rem",
        });
		  }
			return false;
		}else if(!window.api){
			 this.$vux.toast.show({
				type: "text",
				text: "当前环境不支持该功能",
				position: "bottom",
				width: "2rem",
			  });
			return false;
		}
        this.FCimageTrans = api.require('FCimageTrans');
        this.FNImageClip = api.require('FNImageClip');
        let _this = this;
        try{
          let index = await new Promise((resolve,reject)=>{
            api.actionSheet({
              cancelTitle: '取消',
              buttons: ['拍照', '从相册获取']
            }, function(ret) {
              resolve(ret.buttonIndex);
            })
          })
          if(index==3){
            return false;
          }
          let sourceType = index == 1 ? "camera" : "library";
          let allowEdit = false;
          if(api.systemType == "ios"&&_this.cutting==true){
            allowEdit = true;
          }
          if(_this.amount==1){//只选一张
            let souceImgUrl = await new Promise((resolve,reject)=>{
              api.getPicture({
                sourceType: sourceType,
                mediaValue: 'pic',
                destinationType: 'url',
                encodingType: "jpg",
                allowEdit: allowEdit,
                quality: parseInt(_this.compress)
              },function (ret, err){
                if (ret&&ret.data) {
                  resolve(ret.data);
                }else{
                  reject("api.getPicture获取图片失败"+JSON.stringify(err))
                }
              })
            })
            if(_this.cutting){
              // _this.showBottom=true;
              // _this.FNImageClip.open({
              //   rect: {
              //     x: 0,
              //     y: 0,
              //     w: api.winWidth,
              //     h: api.winHeight-60
              //   },
              //   srcPath: souceImgUrl,
              //   highDefinition:true,
              //   style: {
              //     mask: 'rgba(0,0,0,0.3)',
              //     clip: {
              //       w: parseInt(_this.cutTypeX),
              //       h: parseInt(_this.cutTypeY),
              //       borderColor: '#0f0',
              //       borderWidth: 1,
              //       appearance: 'rectangle'
              //     }
              //   },
              //   mode:'image'
              // }, function(ret, err) {
              //   if (!ret) {
              //     throw '图片裁切失败'
              //   }
              // });
              if(api.systemType != "ios"){
                let FCimageTrans = api.require('FCimageTrans');
                souceImgUrl = await new Promise((resolve,reject)=>{
                  FCimageTrans.startPhotoZoomBig({
                    filePath: souceImgUrl,
                    picName: 'AccountImage.jpg',
                    quality: 80,
                    outputX: parseInt(_this.cutTypeX), //输出图片宽度质量
                    outputY: parseInt(_this.cutTypeY), //输出图片高度质量
                    aspectX: 1, //裁剪宽比
                    aspectY: 1, //裁剪高比
                  }, function(ret2, err) {
                    setTimeout(function() {
                      if (ret2.msg != 'false') {
                        resolve(ret2.msg);
                      }else{
                        reject("startPhotoZoom裁切图片失败"+JSON.stringify(ret2))
                      }
                    }, 500);
                  })
                })
              }
            }
            _this.result={
              url:[],
              file:[],
            }
            _this.result.url.push(souceImgUrl)
            _this.result.file.push(await _this.pathToFile(souceImgUrl))
            _this.result.url = _this.result.url.map(v=>{
              return v+'?v='+ new Date().getTime();
            })
            _this.$emit('fileBack', _this.result);
          }else{//选多张
            if(sourceType=='camera'){
              let souceImgUrl = await new Promise((resolve,reject)=>{
                api.getPicture({
                  sourceType: sourceType,
                  mediaValue: 'pic',
                  destinationType: 'url',
                  encodingType: "jpg",
                  allowEdit: false,
                  quality: parseInt(_this.compress)
                },function (ret, err){
                  if (ret&&ret.data) {
                    resolve(ret.data);
                  }else{
                    reject("api.getPicture获取图片失败"+JSON.stringify(err))
                  }
                })
              })
              _this.result={
                url:[],
                file:[],
              }
              _this.result.url.push(souceImgUrl)
              _this.result.file.push(await _this.pathToFile(souceImgUrl))
              _this.result.url = _this.result.url.map(v=>{
                return v+'?v='+ new Date().getTime();
              })
              _this.$emit('fileBack', _this.result);
            }else{
              let fs = api.require('fs');
              // let filePath = api.cacheDir+ "/getPicture";
              let filePath = "cache://getPicture";
              fs.rmdirSync({ // 删除文件目录，里面的所有文件将会一起被删除
                path: filePath
              });
              let ret = fs.createDirSync({
                path: filePath
              });
              if (!ret.status) {
                throw ('创建失败！');
              }
              let souceImgUrlArr=await new Promise((resolve,reject)=>{
                _this.FCimageTrans.getViewImgList({
                  filePath: api.cacheDir+ "/getPicture",
                  imgCount: _this.amount,
                  msg: '图片数量已达上限',
                  alertTitle:'提示',
                  alertContent:'图片数量已达上限',
                  alertOk:'好的',
                }, function (ret) {
                  if(ret.status){
                    resolve(ret.imagePath)
                  }else{
                    reject('获取多张图片失败')
                  }
                })
              })
              _this.result={
                url:[],
                file:[],
              }
              Promise.all(souceImgUrlArr.map(function(v){
                return new Promise(async function(resolve, reject){
                  _this.result.url.push(v)
                  _this.result.file.push(await _this.pathToFile(v));
                  resolve(1);
                })
              })).then(function(data){
                _this.result.url = _this.result.url.map(v=>{
                  return v+'?v='+ new Date().getTime();
                })
                _this.$emit('fileBack', _this.result);
              })
            }
          }
        }catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .shade{
    display: inline-block;
  }
.bottom{
  z-index: 100000;
  position: fixed;
  left:0;
  bottom:0;
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #000;
  color:#FFF;
  span{
    flex-grow: 1;
    text-align: center;
  }
  span:nth-of-type(2){
    flex-grow: 3;
  }
}
</style>
