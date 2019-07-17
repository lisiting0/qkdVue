<template>
  <div class="shade" @click="selectPhoto">
    <slot>

    </slot>
  </div>
</template>
<script>
  const COMPONENT_NAME = 'newSelectPhoto'

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
      async selectPhoto(){
        if(this.amount==0){
          this.$vux.toast.show({
            type: "cancel",
            text: "最多选择3张图片",
            position: "middle",
            width: "2rem",
          });
          return;
        }
        if(!window.api){
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
                    outputX: 350, //输出图片宽度质量
                    outputY: 350, //输出图片高度质量
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
              let filePath = api.cacheDir+ "/getPicture";
              fs.rmdirSync({ // 删除文件目录，里面的所有文件将会一起被删除
                path: filePath
              });
              let ret = fs.createDirSync({
                path: filePath + "/getPicture"
              });
              if (!ret.status) {
                throw ('创建失败！');
              }
              let souceImgUrlArr=await new Promise((resolve,reject)=>{
                let UIAlbumBrowser = api.require('UIAlbumBrowser');
                UIAlbumBrowser.imagePicker({
                  max: _this.amount,
                  showCamera:false,
                  styles: {
                    bg: '#FFFFFF',
                    mark: {
                      icon: '',
                      position: 'top_right',
                    },
                    nav: {
                      bg: '#fff',
                      cancelColor: '#000',
                      cancelSize: 16,
                      nextStepColor: '#000',
                      nextStepSize: 16
                    }
                  },
                  animation:true,
                }, function(ret) {
                  if (ret.eventType == 'nextStep') {
                    UIAlbumBrowser.closePicker();
                    Promise.all(ret.list.map(function(v){
                      return new Promise(async function(resolve, reject){
                        UIAlbumBrowser.transPath({
                          path: v.path
                        }, function(ret, err) {
                          if (ret) {
                            resolve(ret.path)
                          } else {
                            reject("选取失败")
                          }
                        });
                        resolve(1);
                      })
                    })).then(function(data){
                      console.log('图片路径'+JSON.stringify(data))
                      resolve(data);
                    },function(err){
                      reject('获取多张图片失败')
                    })
                  }
                });
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
