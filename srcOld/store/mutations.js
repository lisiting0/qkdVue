import {
  //GEOLOCATION,
  LOGIN,
  CHECK_LOGIN,
  //CHANGE_CITY,
  REDIRECT,
  LOGINOUT,
  EDITNAME,
  //MYHISTORY,
  CLEARHISTORY,
  DELHISTORY,
 // CHANGEHOTELTIME,
  EDITLOGINNAME,
  EDITUSERPHOTO,
  //SETLANGUAGE,
  SEARCHHISTORY,
  //CHAGEISCHECK,
  CHANGEACCESSTOKEN,
  ADDCACHE,
  ADDLOCALCACHE,
  CLEARLOCALCACHE,
  //CHANGEISTOCITY,
  CLEARCACHE,
 // CHANGEMINHEIGHT,
  //CHANGEMOLPAY,
  //CHANAGCANELOCATION,
 // CHANGEISFIRSTHOME,
	ADDKEEPALIVE,
	DELKEEPALIVE,
	EDITUSERINFO,
	CHANGEGIFTOBJ,
	FILEIMAGE,
	CHANGEOTHERLOGIN,
	CHANGESTORE,
	CHANGESENDBROAD,
	CHANGEBLINDDATESIGLEOBJ,
  QRCODE,
} from './mutation-types.js'

 import {setStore, getStore,clearStore,removeStore} from '../config/mUtils'
import utils from '@/utils/utils';
// import {i18n} from './index.js';

//import {localapi, proapi} from '../config/env'

export default {
  /*[GEOLOCATION] (state, position) {//获取当前地理位置
    state.latitude = position.latitude
    state.longitude = position.longitude
    state.city = position.city
    state.address = position.address
    state.isGetAddress = true
    setStore('geolocationPosition', position)
  },*/
 /* [CHANGEISTOCITY] (state, flag) {
    state.isToCity = flag
  },*/
  /*[CHANGE_CITY] (state, {//酒店选择城市
    name,
    id,
  }) {
    if (name == state.city) {//选择当前城市
      state.isOtherCity = false
    } else {
      state.isOtherCity = true
    }
    state.selectCityName = name
    state.selectCityId = id
  },*/
  [LOGIN] (state, userInfo) {//登录
    window.$api.setStorage('userInfo', userInfo)
    state.userInfo = userInfo
	//state.isGetMessage=true;
    // setStore("userInfo",state.userInfo);
    // setStore("groupbuyAccessToken",info.headers["access-token"]);
    // state.AccessToken=info.headers["access-token"];
    state.isLogin=true;
    state.qrcode = {};
  },
  [CHANGEACCESSTOKEN] (state, data) {
    window.$api.setStorage('Authorization', data.token)
    window.$api.setStorage('userId', data.userId)
    state.Authorization = data.token
    state.userId = data.userId
  },
  //查询图片服务器配置信息
  ['CHANGEIMAGEURL'](state,data){
    state.imageUrl = data.jiaoyouAttachmentPath||state.imageUrl;
    state.imageUploadUrl = data.jiaoyouImgBaseUrl||state.imageUploadUrl;
    state.phpURL = data.shopBaseUrl||state.phpURL;
	state.baseShopMobileURL=data.baseShopMobileURL||state.baseShopMobileURL;
	state.baseFrontEndURL=data.baseFrontEndURL||state.baseFrontEndURL;
	state.socketUrl=data.socketUrl||state.socketUrl;
  },
  //修改socket连接状态
  ['CHANGESCOKETCONNECT'](state,status){
    state.scoketConnect = status;
  },
  //修改融云token
  ['CHANGERONGYUNTOKEN'](state,token){
    state.rongYunToken = token;
  },
  ['CHANGEREGISTRATIONID'](state,registrationId){
    state.registrationId = registrationId;
  },
  ['CHANGESYNCSTATE'](state,syncState){
    state.syncState = syncState;
  },
  ['CHANGELONGPRESS'](state,longpressObj){
    state.longpress = Object.assign(state.longpress,longpressObj);
  },
  ['CHANGERONGCLOUD'](state,rongCloud){
    state.rongCloud = rongCloud;
  },
  ['CHANGERONGCONVERSATIONLIST'](state,rongConversationList){
    state.rongConversationList = rongConversationList;
  },
  ['CHANGEUNREADCOUNT'](state,count){
    state.unreadCount = count;
  },
  //浏览器模式下改变系统和互动消息数组
  ['CHANGEWEBACTIVEMESSAGELIST'](state,webActiveMessageList){
    state.webActiveMessageList = webActiveMessageList;
  },
  ['CHANGEWEBSYSTEMMESSAGELIST'](state,webSystemMessageList){
    state.webSystemMessageList = webSystemMessageList;
  },
  ['CHANGEWEBSYSTEMMESSAGEDETAILSLIST'](state,webSystemMessageDetailsList){
    state.webSystemMessageDetailsList = webSystemMessageDetailsList;
  },
  /*浏览器模式下改变系统和互动消息数组**/
  /*浏览器模式下添加chcheMessageArr**/
  ['PUSHCHCHEMESSAGEARR'](state,obj){
    if (Array.isArray(obj)){
      state.chcheMessageArr.push(...obj);
    }else{
      state.chcheMessageArr.push(obj);
    }
  },
  ['SHIFTCHEMESSAGEARR'](state){
    state.chcheMessageArr.shift()
  },
  ['CHANGEDOMESSAGE'](state,doMessage){
    state.doMessage = doMessage;
  },
  /*浏览器模式下添加chcheMessageArr**/

  /*浏览器模式下改变单聊和群聊**/
  ['CHANGEWEBMESSAGESTORAGE'](state,webMessageStorage){
    let arr={};
    arr.rongConversationList = webMessageStorage.rongConversationList
    arr.unreadCount = webMessageStorage.unreadCount
    arr.userList = webMessageStorage.userList
    Object.keys(webMessageStorage).forEach(function(key){
      if(key!='rongConversationList'&&key!='unreadCount'&&key!='userList'){
        let obj1 = {};
        let obj = {};
        obj1 = (webMessageStorage[key])
        obj1.sort((v1,v2)=>{
          let t1 = new Date(Date.parse((v1.time).replace(/-/g,"/"))).getTime()
          let t2 = new Date(Date.parse((v2.time).replace(/-/g,"/"))).getTime()
          return t1-t2;
        })
        arr[key]=obj1;
      }
    });
    state.webMessageStorage = arr;
  },
  /*浏览器模式下改变单聊和群聊**/
  /*苹果支付**/
  ['CHANGESETTRANSACTIONLISTENER'](state,setTransactionListener){
    state.setTransactionListener = setTransactionListener;
  },
  ['CHANGETRANSACTION'](state){
    state.changeTransaction = !state.changeTransaction;
  },
  /*苹果支付**/
  ['CHANGEGETNEWMESSAGE'](state,status){
    state.getNewMessage = status;
  },
  ['CHANGEGETNEWNOTICE'](state,status){
    state.getNewNotice = status;
  },
  ['CHANGECHATROOMMESSAGELIST'](state,chatRoomMessageList){//更新聊天室聊天列表
    state.chatRoomMessageList = chatRoomMessageList;
  },
  ['CHAGECHATROOMINFO'](state,data){//现场活动信息
	state.chatRoomInfo=data;
  },
  ['CHANGECURRENTCHATROOMID'](state,currentChatRoomId){
    state.currentChatRoomId = currentChatRoomId;
  },
  ['CHANGECURRENTPRIVATEID'](state,currentPrivateId){
    state.currentPrivateId = currentPrivateId;
  },
  ['CHANGEGIFT'](state,gift){
    state.gift = gift;
  },
  ['CHANGEACTIVE'](state,active){
    state.active = active;
  },
  ['CHANGEHANDLEROUTE'](state,handleRoute){
    state.handleRoute = handleRoute;
	/*if(handleRoute){
		//dispatch("pushHistory");//微信阻止返回按钮
	}else{
		window.history.back();
	}*/
  },
  [EDITLOGINNAME] (state, phone) {//修改登录名(手机)
    if (state.userInfo) {
      state.userInfo.loginName = phone
      setStore('userInfo', state.userInfo)
    }
  },
  [EDITUSERPHOTO] (state, img) {//修改头像
    if (state.userInfo) {
      state.userInfo.photo = img
      setStore('userInfo', state.userInfo)
    }
  },
  [LOGINOUT] (state) {//登出
    state.Authorization = '';
    state.userInfo = {}
    state.userId = null
	state.rongYunToken = '';
	state.isLogin=false;
    window.$api.clearStorage();
	state.isGetMessage=false;
  },
  [CHECK_LOGIN] (state, info) {//记录第一次进系统检查登录后的信息
    state.isCheck = true
    if (info.status == 1) {
		state.isLogin = true
    } else {
      state.isLogin = false
      state.userInfo = {}
    }
	//alert("state.isLogin:"+state.isLogin);
  },
  /*[CHAGEISCHECK] (state, flag) {
    state.isCheck = flag
    state.isLogin = flag
  },*/
  [REDIRECT] (state, url) {//记录登录后的跳转地址
    state.redirect = url
  },
  [EDITNAME] (state, name) {//修改昵称
    state.userInfo.name = name
    setStore('userInfo', state.userInfo)
  },
 /* [MYHISTORY] (state, {data, historyType}) {//获取浏览记录
    if (!state.userInfo) {
      return false
    }
    if (!state.myHistory && getStore('myHistory_' + state.userInfo.id)) {
      state.myHistory = JSON.parse(getStore('myHistory_' + state.userInfo.id))
    }
    if (!state.myHistory || !state.myHistory.length) {
      state.myHistory = []
    }
    if (data) {
      data.viewTime = new Date().getTime()
      data.historyType = historyType//商品
      state.myHistory.push(data)
      let sortId
      sortId = state.myHistory.sort((a, b) => {
        return b.viewTime - a.viewTime
      })
      if (sortId.length > 20) {
        sortId.length = 20
      }
      let arr = []
      state.myHistory = sortId.filter((value, index, arr) => {
        if (!arr.includes(value.id)) {
          arr.push(value.id)
          return true
        }
        return false
      })
      setStore('myHistory_' + state.userInfo.id, JSON.stringify(state.myHistory))
    }
  },*/
  /*[DELHISTORY] (state, index) {//删除浏览记录
    if (state.myHistory[index]) {
      state.myHistory.splice(index, 1)
      setStore('myHistory_' + state.userInfo.id, JSON.stringify(state.myHistory))
    }
  },
  [CLEARHISTORY] (state) {//清空浏览记录
    state.myHistory = []
    removeStore('myHistory_' + state.userInfo.id)
  },*/
  /*[CHANGEHOTELTIME] (state, arr) {//改变酒店入住离店时间
    if (arr[0]) {
      state.checkInTime = arr[0]
    }
    if (arr[1]) {
      state.checkOutTime = arr[1]
    }
  },*/
  /*[SETLANGUAGE] (state, language) {
    if (language) {
      state.language = language.language
      state.languageImg = language.languageImg
      setStore('language', language)
    } else if (getStore('language')) {
      const lan = JSON.parse(getStore('language'))
      state.language = lan.language
      state.languageImg = lan.languageImg
    } else {
      state.language = i18n.locale
    }
    i18n.locale = state.language
  },*/
 /* [SEARCHHISTORY] (state, {data}) {//获取浏览记录
    if (!state.searchList && getStore('searchList')) {
      state.searchList = JSON.parse(getStore('searchList'))
    }
    if (!state.searchList || !state.searchList.length) {
      state.searchList = []
    }
    if (data) {
      data.viewTime = new Date().getTime()
      //state.searchList[data.key]=data;
      state.searchList.push(data)
      let sortId
      sortId = state.searchList.sort((a, b) => {
        return b.viewTime - a.viewTime
      })
      if (sortId.length > 20) {
        sortId.length = 20
      }
      let arr = []
      state.searchList = sortId.filter((value, index, arr) => {
        if (!arr.includes(value.key)) {
          arr.push(value.key)
          return true
        }
        return false
      })
      setStore('searchList', JSON.stringify(state.searchList))
    }
  },*/
  [ADDCACHE] (state, {url, name, data,timeout}) {//页面缓存
    if (!state.cachelist[url]) {
      state.cachelist[url] = {}
    }
    delete name['Access-Token'];
    const strName = JSON.stringify(name)
    if (!state.cachelist[url][strName]) {
      state.cachelist[url][strName] = {}
    } else if (name.page == 1) {//之前已经有了,表示下拉刷新了页面.
      let page = 2
      while (true) {
        name.page = page
        const strName = JSON.stringify(name)
        if (state.cachelist[url][strName]) {
          state.cachelist[url][strName] = null
          console.log('销毁:' + page)
        } else {
          break
        }
        page++
      }
    }
    console.log("保存cachelist:"+url+":"+strName);
    state.cachelist[url][strName] = {data, creatDate: new Date().getTime(),timeout}
  },
  [CLEARCACHE] (state) {
    state.cachelist = {}
  },
  [ADDLOCALCACHE] (state, {url, name, data,timeout}) {//缓存
    if (!state.localcache[url]) {
      state.localcache[url] = {}
    }
    delete name['Access-Token']
    const strName = JSON.stringify(name)
    if (!state.localcache[url][strName]) {
      state.localcache[url][strName] = {}
    } else if (name.page == 1) {//之前已经有了,表示下拉刷新了页面.
      let page = 2
      while (true) {
        name.page = page
        const strName = JSON.stringify(name)
        if (state.localcache[url][strName]) {
          state.localcache[url][strName] = null
          console.log('销毁:' + page)
        } else {
          break
        }
        page++
      }
    }
   // console.log(url, strName)
    /*let storeData={data,creatDate:new Date().getTime()}
        //if(((name.pageNo&&name.pageNo==1)||!name.pageNo)){//只保存第一页数据跟没页码的数据
        if(url=="ra/gb/type/gbShopType"||url=="ra/gb/marketing/gbAdvertisement"){//只保存固定接口的数据到本地
            state.localcacheStore.push({name:url+strName});
            setTimeout(()=>{
                state.localcacheStore.shift();
                setStore(url+strName,storeData);//保存到本地
            },state.localcacheStore.length*100);
        }*/
	console.log("保存localcache:"+url+":"+strName);
    state.localcache[url][strName] = {data, creatDate: new Date().getTime(),timeout}
  },
  [CLEARLOCALCACHE] (state) {
    let localStorage = window.localStorage
    for (let i = localStorage.length; i--;) {
      if (localStorage.key(i) != 'loginData' && localStorage.key(i) != 'userId' && localStorage.key(i) != 'userInfo' && localStorage.key(i).indexOf('myHistory_') == -1 && localStorage.key(i) != 'Authorization') {
        removeStore(localStorage.key(i))
      }
    }
	state.cachelist={}//页面缓存
    state.localcache = {}//缓存
  },
  /*[CHANGEMINHEIGHT] (state, height) {
    state.minHeight = height || document.documentElement.clientHeight || window.innerHeight
    //console.log("minHeight:"+state.minHeight);
    //document.documentElement.style.minHeight=state.minHeight+"px";
  },*/
  /*[CHANGEMOLPAY] (state, flag) {
    state.molpay = flag
  },*/
  /*[CHANAGCANELOCATION] (state, flag) {
    state.canLocation = flag
  },*/
  /*[CHANGEISFIRSTHOME] (state, flag) {
    state.isfirstHome = flag
  },*/
	[DELKEEPALIVE](state,index){
		state.keepAlive.splice(index,1);
	},
	[ADDKEEPALIVE](state,val){
		if(val.length>0){
			state.keepAlive.push(...val);
		}else{
			state.keepAlive=[];
		}
	},
	[EDITUSERINFO](state,{key,value}){//更新用户信息中的某个值
		if(state.userInfo){
			state.userInfo[key]=value||"";
			window.$api.setStorage('userInfo', state.userInfo);
		}
	},
	[CHANGESENDBROAD](state,obj){
		state.broadObj=obj;
	},
	[CHANGEGIFTOBJ](state,obj){
		state.giftObj=obj;
	},
	[CHANGEBLINDDATESIGLEOBJ](state,obj){
		state.blindDateSigleObj=obj;
	},
	[FILEIMAGE](state,file){
		state.fileImg=file;
	},
	[CHANGEOTHERLOGIN](state,obj){
		state.otherLogin=obj;
	},
	[CHANGESTORE](state,{name,value}){
		state[name]=value;
	},
  [QRCODE] (state, data) {
    state.qrcode = data
  },
}
