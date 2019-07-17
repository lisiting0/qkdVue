export async function getImage(size){
  // let UIAlbumBrowser = window.api.require('UIAlbumBrowser');
  let result = await new Promise((resolve,reject)=>{
    api.getPicture({
      sourceType: "album",
      mediaValue: 'pic',
      destinationType: 'url',
      encodingType: "jpg",
      allowEdit: false
    },function (ret, err){
      if (ret&&ret.data) {
        resolve(ret.data);
      }else{
        resolve("");
      }
    })
    // UIAlbumBrowser.imagePicker({
    //   max: size||1,
    //   showCamera:false,
    //   styles: {
    //     bg: '#3a3845',
    //     mark: {
    //       icon: '',
    //       position: 'bottom_right',
    //       size: 20
    //     },
    //     nav: {
    //       bg: '#3a3845',
    //       cancelColor: '#fff',
    //       cancelSize: 16,
    //       nextStepColor: '#fff',
    //       nextStepSize: 16
    //     }
    //   },
    //   animation:true,
    // }, function(ret) {
    //   UIAlbumBrowser.closePicker();
    //   resolve(ret)
    // });
  })
  // if(window.api.systemType=='ios'){
  //   if(result.eventType=="nextStep"){
  //     let arr = [];
  //     arr = result.list.map(async item=>{
  //       return  transPath(item.path);
  //     })
  //     let patharr=await Promise.all(arr);
  //     result.list = patharr;
  //   }
  // }
  return result;
}
function transPath(path){
  let UIAlbumBrowser = window.api.require('UIAlbumBrowser');
  return new Promise((resolve,reject)=>{
    UIAlbumBrowser.transPath({
      path: path
    }, function(ret, err) {
      if (ret) {
        resolve(ret.path);
      } else {
        resolve("")
      }
    });
  })
}
export async function takePhoto(){
  let result = await new Promise((resolve,reject)=>{
    api.getPicture({
      sourceType: "camera",
      mediaValue: 'pic',
      destinationType: 'url',
      encodingType: "jpg",
      allowEdit: false
    },function (ret, err){
      if (ret&&ret.data) {
        resolve(ret.data);
      }else{
        resolve("");
      }
    })
  })
  return result;
}
