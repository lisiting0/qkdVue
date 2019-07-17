import server from '@/server/getData';
import {store} from '../store/index';
import {Fn} from '@js/api';
import util from '@/server/util';
//import Vue from 'vue'
//import { WechatPlugin } from 'vux'
//Vue.use(WechatPlugin)//使用微信插件
import wechat from 'weixin-js-sdk';
let wxShare=null,wxChooseImage=null,wxUploadImage=null,chooseWXPay=null,scanQRCode=null,getLocation=null,showMenuItems=null,hideMenuItems=null,hideOptionMenu=null,showOptionMenu=null;
let isWeixin=false;

if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger"){
	store&&store.commit("CHANGESTORE",{name:"isWeixin",value:true});//是否微信打开
	isWeixin=true;
}
if(isWeixin||(store&&store.state.isWeixin)){
	let getUrl = function (){
	   let url = window.location.href;
	   let locationurl = url.split('#')[0];
	   //alert("签名地址:"+locationurl+",url:"+window.location.href);
	   return locationurl;
	}
	let debug=false;
	let wxConfig=async (jsApiList)=>{
		jsApiList=jsApiList||[
			'getLocation',
			'chooseWXPay',//微信支付
			'scanQRCode',//二维码
			'chooseImage',//选择图片
			'uploadImage',//上传图 
			'onMenuShareTimeline',//分享到朋友圈
			'onMenuShareAppMessage',//分享给朋友
			'onMenuShareQQ',//分享到QQ
			'onMenuShareQZone',//分享到QQ空间
			'onMenuShareWeibo',//分享到腾讯微博
			//'hideMenuItems',//批量隐藏功能按钮(已失效)
			//'showMenuItems',//批量显示功能按钮(已失效)
			'hideOptionMenu',//隐藏右上角菜单接口
			'showOptionMenu',//显示右上角菜单接口
		];
		try{
			let result=await server.wxSharesign({
				url:getUrl()
			});
			let wxdata = result.data.data;
			wxdata.debug = debug;
			wxdata.jsApiList= jsApiList;
			wechat.config(wxdata);
			return Promise.resolve("成功");
		}catch(e){
			console.log("微信授权失败:"+JSON.stringify(e));
			return Promise.reject(e);
		}
	}
	getLocation=async ()=>{
		return new Promise(async (resolve, reject)=>{
			try{	
				await wxConfig(['getLocation']);
				wechat.ready(function () {
					let timeout=setTimeout(()=>{
						reject("定位失败");
					},3000);
					wechat.getLocation({
						type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						success: function (res) {
							//alert("获取成功:"+JSON.stringify(res));
							clearTimeout(timeout);
							resolve(res);
						},
						fail:function(e){
							clearTimeout(timeout);
							//alert("获取失败:"+JSON.stringify(e));
							reject(e);
						}
					});
				});
			}catch(e){
				reject(e);
			}
		});	
	}
	chooseWXPay=async(signData)=>{
		return new Promise(async (resolve, reject)=>{
			if(!signData.data){
				reject({message:"参数出错"});
				return;
			}
			try{
				await wxConfig(['chooseWXPay']);
				try{
					//alert("签名数据:"+JSON.stringify(signData));
					let wxData={
						timeStamp: signData.data.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: signData.data.data.noncestr, // 支付签名随机串，不长于 32 位
						package:  signData.data.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						signType: signData.data.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign:  signData.data.data.sign, // 支付签名
					}
					//alert("支付签名:"+JSON.stringify(wxData));
					wechat.ready(function () {
						wechat.chooseWXPay({
							...wxData,
							success: function (res) {
								resolve(res);
							},
							fail(e){
								//console.log(JSON.stringify(e));
								reject(e);
							}
						});
					});
				}catch(e){
					reject(e);
				}
			}catch(e){
				reject(e);
			}
		});
	};
	scanQRCode=()=>{
		return new Promise(async (resolve, reject)=>{
			await wxConfig(['scanQRCode']);
			wechat.ready(function () {
				wechat.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: async function (res) {
						let data = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						let param=Fn.toWxUrl(data);
						if(param.name=="sign"&&param.query.id){//签到
							try{
								const result =await server.blindDateSignIn({
									datingActivityId:param.query.id
								});
								//console.log("签到成功:"+JSON.stringify(result.data));
								let extras={
									hasSign:true,
									userId:store.state.userInfo.id,
									type:'sign',
									extInt:result.data.data.ext.extInt,
								}
								let sendObj={
									groupId: param.query.id,
									chatType:2,
									msgType: 7,
									msgContent: 'broad',
									extras:extras
								}
								util.sendSocket(sendObj,function(data,err,per){});
								alert("签到成功,您的序号为:"+result.data.data.ext.extInt);
							}catch(e){
								//alert(e.message||JSON.stringify(e));
							}
						}else{
							alert(data);
						}
					}
				});
			});
		});	
	}
	wxChooseImage=({count=1,sizeType=['original', 'compressed'],sourceType=['album', 'camera']})=>{
		return new Promise(async (resolve, reject)=>{
			await wxConfig(['chooseImage','uploadImage']);
			wechat.ready(function () {
				wechat.chooseImage({
					count, // 默认9
					sizeType, // 可以指定是原图还是压缩图，默认二者都有
					sourceType, // 可以指定来源是相册还是相机，默认二者都有
					success(res) {
						//var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						// console.log(JSON.stringify(res));
						// resolve(res);
						let result={
						  localId:[],
						  serverId:[],
						}
						function uploadImage(localIds){
						  if(localIds.length>0){
							wechat.uploadImage({
							  localId:localIds[0], // 获取微信本地图片id
							  isShowProgressTips: 1, // 默认为1，显示进度提示
							  success(res1) {
								if(res1.serverId){
								  result.serverId.push(res1.serverId)
								  result.localId.push(localIds[0])
								  localIds.shift()
								  uploadImage(localIds);
								}
							  },
							  fail(e){
								//console.log(JSON.stringify(e));
								reject(e);
							  }
							});
						  }else{
							resolve(result);
						  }
						}
						uploadImage(res.localIds);
					},
					fail(e){
						//console.log(JSON.stringify(e));
						reject(e);
					},
					  cancel(){
						reject("")
					 }
				});
			});
		});	
	};
	wxUploadImage = async (localId)=>{
    return new Promise(async (resolve, reject)=>{
	  await wxConfig(['uploadImage']);
      wechat.ready(function () {
        wechat.uploadImage({
          localId, // 获取微信本地图片id
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success(res) {
            if(res.serverId){
              resolve(res.serverId);
            }
          },
          fail(e){
            //console.log(JSON.stringify(e));
            reject(e);
          }
        });
      });
    });
  };
	wxShare = async (obj,{success,cancel})=>{
		//微信分享
		try{
			if(!obj){
				alert('请传分享参数');
				return false;
			}
			let title = obj.title==undefined||obj.title==null?store.state.custom_config.defaultShareTile||'乾坤岛':obj.title;
			let link = obj.link==undefined||obj.link==null?window.location.href:obj.link;
			let params=Fn.toWxUrl(link);
			let staticLink=null;
			if(params.str){
				staticLink=store.state.baseFrontEndURL+"jiaoyou.html#/"+params.str.replace(/_{1}([a-z0-9A-Z]+)_{0,1}([a-z0-9A-Z\u4e00-\u9fa5]*)/g,"&$1=$2").replace("_&","?");
			}
			let desc = obj.desc==undefined||obj.desc==null?store.state.custom_config.defaultShareContent||'一个安全、纯粹、高效的婚恋交友平台':obj.desc;
			let imgUrl = obj.imgUrl==undefined||obj.imgUrl==null?'static/logo.png':obj.imgUrl;
			await wxConfig(['onMenuShareTimeline',//分享到朋友圈
				'onMenuShareAppMessage',//分享给朋友
				'onMenuShareQQ',//分享到QQ
				'onMenuShareQZone',//分享到QQ空间
				'onMenuShareWeibo',//分享到腾讯微博
			]);
			wechat.ready(function () {
				//自定义“分享给朋友”及“分享到QQ”按钮的分享内容
				/*wechat.updateAppMessageShareData({ 
					title, // 分享标题
					desc, // 分享描述
					link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl, // 分享图标
					success: function () {
					  // 设置成功
					  success && success();
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						cancel && cancel();
					}
				});
				//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
				wechat.updateTimelineShareData({ 
					title, // 分享标题
					link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl, // 分享图标
					success: function () {
					  // 设置成功
					  success && success();
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						cancel && cancel();
					}
				});*/
				//分享到朋友圈
				wechat.onMenuShareTimeline({
					title:title, // 分享标题
					link: link, // 分享链接
					desc: desc, // 分享描述
					imgUrl:imgUrl, // 分享图标
					success: function () {
						setTimeout(function(){
							success && success();
						},500);
						// 用户确认分享后执行的回调函数
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						setTimeout(function(){
							cancel && cancel();
						},500);
					}
				});
				//分享到朋友
				wechat.onMenuShareAppMessage({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: link, // 分享链接
					imgUrl: imgUrl, // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function () {
						// 用户确认分享后执行的回调函数
						setTimeout(function(){
							success && success();
						},500);
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						setTimeout(function(){
							cancel && cancel();
						},500);
					}
				});
				//分享到QQ
				wechat.onMenuShareQQ({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: staticLink||link, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
						setTimeout(function(){
							success && success();
						},500);
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						setTimeout(function(){
							cancel && cancel();
						},500);
					}
				});

				//分享到QQ空间
				wechat.onMenuShareQZone({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: staticLink||link, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function () {
					   // 用户确认分享后执行的回调函数
					   setTimeout(function(){
							success && success();
						},500);
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						setTimeout(function(){
							cancel && cancel();
						},500);
					}
				});
				
				//分享到腾讯微博
				wechat.onMenuShareWeibo({
					title, // 分享标题
					desc, // 分享描述
					link:staticLink||link, // 分享链接
					imgUrl, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
						setTimeout(function(){
							success && success();
						},500);
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						setTimeout(function(){
							cancel && cancel();
						},500);
					}
				});
			})
		}catch(e){
			console.log(JSON.stringify(e));
		}
	}
	hideMenuItems=async (menuList)=>{//已失效
		try{
			await wxConfig(['hideMenuItems']);
			menuList=menuList||[
				"menuItem:share:appMessage",//发送给朋友
				"menuItem:share:timeline",//分享到朋友圈
				"menuItem:share:qq",//分享到QQ
				"menuItem:share:weiboApp",//分享到Weibo
				"menuItem:favorite",//收藏
				"menuItem:share:facebook",//分享到FB
				"menuItem:share:QZone",//分享到 QQ 空间
				"menuItem:copyUrl",//复制链接
				"menuItem:openWithQQBrowser",//在QQ浏览器中打开
				"menuItem:openWithSafari"//在Safari中打开
			];
			wechat.ready(function () {
				wechat.hideMenuItems({
					menuList // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
				});
			});

		}catch(e){
			console.log(JSON.stringify(e));
		}
	}
	showMenuItems=async (menuList)=>{//已失效
		try{
			await wxConfig(['showMenuItems']);
			menuList=menuList||[
				"menuItem:share:appMessage",//发送给朋友
				"menuItem:share:timeline",//分享到朋友圈
				"menuItem:share:qq",//分享到QQ
				"menuItem:share:weiboApp",//分享到Weibo
				"menuItem:favorite",//收藏
				"menuItem:share:facebook",//分享到FB
				"menuItem:share:QZone",//分享到 QQ 空间
				//"menuItem:copyUrl",//复制链接
				//"menuItem:openWithQQBrowser",//在QQ浏览器中打开
				//"menuItem:openWithSafari"//在Safari中打开
			];
			wechat.ready(function () {
				wechat.showMenuItems({
					menuList // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
				});
			});
		}catch(e){
			console.log(JSON.stringify(e));
		}
	}
	hideOptionMenu=async (menuList)=>{//
		try{
			await wxConfig(['hideOptionMenu']);
			wechat.ready(function () {
				wechat.hideOptionMenu();
			});
		}catch(e){
			console.log(JSON.stringify(e));
		}
	}
	showOptionMenu=async (menuList)=>{//
		try{
			await wxConfig(['showOptionMenu']);
			wechat.ready(function () {
				wechat.showOptionMenu();
			});
		}catch(e){
			console.log(JSON.stringify(e));
		}
	}
}

export {wxShare,wxChooseImage,chooseWXPay,wxUploadImage,scanQRCode,getLocation,hideMenuItems,showMenuItems,hideOptionMenu,showOptionMenu}
