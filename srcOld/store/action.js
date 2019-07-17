// import {
// 	getGeolocation,
// 	checkLogin,
// 	getLanguage,
// } from '../service/getData'
import {
 // GEOLOCATION,
 // CHECK_LOGIN,
  //CHANGE_CITY,
  //MYHISTORY,
  DELHISTORY,
 // LANGUAGE,
 // SETLANGUAGE,
  SEARCHHISTORY,
  CHECKMONEY,
} from "./mutation-types.js";
// import {setStore, getStore} from '../config/mUtils'
// import {i18n} from './index.js';
import server from '@/server/getData';
import util from '@/server/util';
import utils from '@/utils/utils';
import db from '@/utils/db.js';
import {store} from "./index";
import {getLocation} from "@js/wxjssdk";
import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

export default {
  setTransactionListener({commit,state,dispatch}){
    if(window.api&&!state.setTransactionListener&&window.api.systemType == "ios"){
      console.log("监听苹果支付----------------------------")
      commit('CHANGESETTRANSACTIONLISTENER',true)
      let iap = window.api.require('iap');
      iap.setTransactionListener({
        autoFinishTransaction:false
      },async function(ret, err) {
        if (ret) {
          console.log("苹果支付返回值："+JSON.stringify(ret))
          if(ret.state==1){//支付成功
            commit('CHANGETRANSACTION')
            Vue.$vux.loading.show()
            let result=await server.setIapCertificate({
              receiptDate:ret.receipt
            })
            console.log("后台返回："+JSON.stringify(result))
            result.data.data.forEach(v=>{
              iap.finishTransaction({
                transactionId:v
              });
            })
            if(state.userId){
              let userInfo = await server.getUserInfo({userId:state.userId});
              commit("LOGIN",userInfo.data.data);
            }
            Vue.$vux.loading.hide()
          }else if(ret.state==0){
            setTimeout(function(){
              commit('CHANGETRANSACTION')
            },10000)
          }else{
            commit('CHANGETRANSACTION')
            if(ret.transactionId){
              iap.finishTransaction({
                transactionId:ret.transactionId
              });
            }
          }
        } else {
          commit('CHANGETRANSACTION')
          Vue.$vux.toast.show({
            type:"text",
            text: "支付失败",
            position:"bottom",
          });
        }
      });
    }else{
      commit('CHANGESETTRANSACTIONLISTENER',true)
    }
  },
  initSocket({commit,state,dispatch}){
    if(state.userId){
      console.log("进入尝试初始化")
      dispatch("setTransactionListener");
      try{
        if(state.scoketConnect=='disconnect'){
          //调用发起连接
          console.log("初始化聊天组件")
          commit('CHANGESCOKETCONNECT','connectting')
          Vue.use(new VueSocketIO({
            debug: true,
            connection: state.socketUrl+'?token='+"Bearer " + state.Authorization,
            vuex: {
              store,
              actionPrefix: 'SOCKET_'
            }
          }))
		  //console.log("dd")
          dispatch("initMessageCount");
		 // console.log("aa")
          if(window.api){
			//  console.log("bb")
            db.insertOrUpdateUser([{userId:state.userId,userName:state.userInfo.aliasName,userIcon:state.userInfo.headimgAttachmentId}],state.userId)
          }else {
            let obj = state.webMessageStorage
            obj.userList[state.userId] = {
              userId: state.userId,
              userName: state.userInfo.aliasName,
              userIcon: state.userInfo.headimgAttachmentId
            }
            commit('CHANGEWEBMESSAGESTORAGE',utils.deepCopy(obj));
          }
		 // console.log("cc")
         // dispatch("insertMessage")
          if(state.registrationId==null){
            dispatch("initJpush");
          }
        }
      }catch (e) {
        console.log("错误码："+JSON.stringify(e))
        commit('CHANGESCOKETCONNECT','disconnect')
        dispatch("initMessageCount");
        dispatch("insertMessage")
        dispatch("getConversationList")
        Vue.$vux.toast.show({
          type:"cancel",
          text: "即时通讯组件初始化失败，请退出后重试",
          position:"middle",
          width:"auto",
        });
      }
    }else{
      commit('CHANGESCOKETCONNECT','disconnect')
      console.log("还没有登录，不做聊天和推送初始化")
    }
  },
  ['SOCKET_connectedSocket']({commit,state,dispatch},data){
    console.log('SOCKET_connectedSocket')
    if(data.userId){
      commit('CHANGESCOKETCONNECT','connected')
      if(state.isBrowser){
        dispatch("getHistroyMessageList")
      }else{
        dispatch("getConversationList")
      }
      //
    }
    console.log(data)

  },
  ['SOCKET_disconnect']({commit,state,dispatch},data){
    console.log('SOCKET_disconnect')
    commit('CHANGESCOKETCONNECT','disconnect')
    console.log(data)
  },
  ['SOCKET_onTalk']({commit,state,dispatch},data){
    if(window.api){
      dispatch("processingWebMessage",data);
    }else{
      commit('PUSHCHCHEMESSAGEARR',data);
      if(state.doMessage){
        dispatch("constructionMessage")
      }
    }
  },
  async ['SOCKET_onOffMessageTalk']({commit,state,dispatch},data){
    let userIdArr=[];
    let chche = [];
    data.forEach(v=>{
      chche.push(v)
      userIdArr.push(v.sourceClientId)
      // dispatch("processingWebMessage",v);
    })
    commit('PUSHCHCHEMESSAGEARR',chche);
    await dispatch("insertUserList",Array.from(new Set(userIdArr)))
    if(state.doMessage){
      dispatch("constructionMessage")
    }
  },
  //处理web端聊天信息
  async getHistroyMessage({commit,state,dispatch},message){
    let result=await server. getImMessageList(message)
    console.log("历史消息:",result.data.data.list);
    let userIdArr=[];
    let chche = [];
    result.data.data.list.forEach(v=>{
      let lins = '';
      if(v.sourceClientId==state.userId){
        // lins = v.sourceClientId;
        // // v.sourceClientId = v.targetClientId
        // v.targetClientId = v.lins
        v.insertMe=true;
        v.onlyDetail=true;
        v.targetId = v.targetClientId
        chche.push(v)
        if(v.chatType==1){
          userIdArr.push(v.targetId)
        }else if(v.chatType==2){
          userIdArr.push(v.sourceClientId)
        }
        // dispatch("insertMe",v)
      }else{
        v.isZero=true;
        v.onlyDetail=true;
        chche.push(v)
        userIdArr.push(v.sourceClientId)
        // dispatch("processingWebMessage",v)
      }

    })
    commit('PUSHCHCHEMESSAGEARR',chche);
    await dispatch("insertUserList",Array.from(new Set(userIdArr)))
    if(state.doMessage){
      dispatch("constructionMessage")
    }
    console.log('历史消息记录结束')
    return Promise.resolve(result.data.data);
  },
  async getHistroyMessageList({commit,state,dispatch}){
    let result=await server. getImMessageListList()
    console.log("历史消息列表:",result.data.data);
    let userIdArr=[];
    let chche = [];
    result.data.data.forEach(v=>{
      let lins = '';
      if(v.sourceClientId==state.userId){
        // lins = v.sourceClientId;
        // v.sourceClientId = v.targetClientId
        // v.targetClientId = v.lins
        v.insertMe=true;
        v.onlyDetail=false;
        v.targetId = v.targetClientId
        chche.push(v)
        if(v.chatType==1){
          userIdArr.push(v.targetId)
        }else if(v.chatType==2){
          userIdArr.push(v.sourceClientId)
        }
        // dispatch("insertMe",v)
      }else{
        v.isZero=true;
        chche.push(v)
        userIdArr.push(v.sourceClientId)
        // dispatch("processingWebMessage",v)
      }
    })
    commit('PUSHCHCHEMESSAGEARR',chche);
    await dispatch("insertUserList",userIdArr)
    if(state.doMessage){
      dispatch("constructionMessage")
    }
    return Promise.resolve("");
  },
  async constructionMessage({commit,state,dispatch}){
    let messageArr = state.chcheMessageArr
    if(messageArr.length>0){
      commit('CHANGEDOMESSAGE',false);
      let obj = messageArr[0];
      if(obj.insertMe){
        await dispatch("insertMe",obj)
      }else{
        await dispatch("processingWebMessage",obj)
      }
      commit('SHIFTCHEMESSAGEARR');
      dispatch("constructionMessage")
    }else{
      commit('CHANGEDOMESSAGE',true);
      dispatch("getConversationList")
    }
  },
  async insertUserList({commit,state,dispatch},userIdArr){
    if(userIdArr.length==0){
      return Promise.resolve("");
    }
    try{
      let result = await server.batchProfilePhoto(userIdArr);
      let obj = state.webMessageStorage;
      if(result.data.data&&result.data.data.length>0){
        result.data.data.forEach(v=>{
          if(!obj.userList[v.id]){
            obj.userList[v.id] = {
              userId: v.id,
              userName: v.aliasName,
              userIcon: v.headimgAttachmentId
            }
          }
        })
      }
      commit('CHANGEWEBMESSAGESTORAGE',utils.deepCopy(obj));
      return Promise.resolve("");
    }catch (e) {
      return Promise.resolve("");
    }
  },
  async insertMe({commit,state,dispatch},message){
    let text = message.msgContent;
    let imgUrl=null;
    let location=null;
    let voicePath=null;
    let extras = JSON.parse(message.extras)
    if(extras){
      imgUrl = extras.imageUrl;
      voicePath = extras.voicePath;
      location = extras.poi||{};
    }
    
	if(message.chatType==1){//私聊
		await util.insertOrUpdateUser(message.targetId);
		if(text){
		  if(!message.onlyDetail){
			util.handleWebMessageList(message.targetId,message.chatType,'','',0,text,message.createDate,message.msgId,state.userId,state.userId)
		  }else{
			util.handleWebMessage(message.targetId,message.chatType,'','',state.userId,text,message.createDate,'',state.userId,null,null,null,message.msgId,null,null)
		  }

		}else if(imgUrl){
		  if(!message.onlyDetail){
			util.handleWebMessageList(message.targetId,message.chatType,'','',0,'[图片]',message.createDate,message.msgId,state.userId,state.userId)
		  }else{
			util.handleWebMessage(message.targetId,message.chatType,'','',state.userId,null,message.createDate,'',state.userId,null,extras.imageUrl,null,message.msgId,null,null)
		  }

		}else if(voicePath){
      if(!message.onlyDetail){
        util.handleWebMessageList(message.targetId,message.chatType,'','',0,'[语音]',(message.createDate),message.msgId,state.userId,state.userId)
      }
      util.handleWebMessage(message.targetId,message.chatType,'','',state.userId,null,(message.createDate),extras.duration,state.userId,null,null,extras.voicePath,message.msgId,null,null)
    }else{
		  if(!message.onlyDetail){
			util.handleWebMessageList(message.targetId,message.chatType,'','',0,'[地理位置]',message.createDate,message.msgId,state.userId,state.userId)
		  }
			util.handleWebMessage(message.targetId,message.chatType,'','',state.userId,null,message.createDate,'',state.userId,extras.poi,null,null,message.msgId,extras.longitude,extras.latitude)


		}
	}else if(message.chatType==2){//群聊
		await util.insertOrUpdateUser(message.sourceClientId);
		let icon='',name='',activeType='',activeState='';
			//console.log((state.webMessageStorage.rongConversationList,state.webMessageStorage.rongConversationList[message.groupId]))
			//console.log("dddddddddddddd+"+db.getUnreadCountByTargetId(message.groupId,state.userId))
            if(!db.getUnreadCountByTargetId(message.groupId,state.userId)){
              let result,title='';
              if(extras.actType==6){
                result = await server.blindDatingSingle({//活动详情
                  datingDetailsId:message.groupId,
				  cacheTimeout:10,//(秒)
                });
				title=result.data.data.datingTitle;
              }else if(extras.actType){
                result = await server.getSingle({
                  datingDetailsId:message.groupId,
				  cacheTimeout:10,//(秒)
                });
				title='一起'+(result.data.data.datingThemes==1?'去旅行':result.data.data.datingThemes==2?'吃饭':result.data.data.datingThemes==3?'看电影':result.data.data.datingThemes==4?'唱歌':result.data.data.datingThemes==5?'运动':'');
              }
              if(result&&result.data&&result.data.data){
                icon=result.data.data.coverimgImages?result.data.data.coverimgImages:result.data.data.jiaoyouUser.headimgAttachmentId;
                name=title+"-"+result.data.data.jiaoyouUser.aliasName
                activeType=result.data.data.activityMethod
                activeState=result.data.data.state
              }
            }
            if(!message.onlyDetail){
              util.handleWebMessageList(message.groupId,2,icon,name,0,message.msgContent,(message.createDate),message.msgId,state.userId,message.sourceClientId,activeState,activeType)
            }
            util.handleWebMessage(message.groupId,2,'123','',message.sourceClientId,message.msgContent,message.createDate,'',state.userId,null,null,null,message.msgId,null,null)
            //if(message.groupId==state.currentChatRoomId){
             // let dataChats=state.webMessageStorage[message.groupId];
             // db.resetCount(message.groupId,state.userId);
             // commit('CHANGECHATROOMMESSAGELIST',dataChats)
           // }
            //dispatch("getConversationList")
	}
    return Promise.resolve("");
  },
  async processingWebMessage({commit,state,dispatch},message){
    let isZero = message.isZero
    let onlyDetail = message.onlyDetail
    console.log("isZero",isZero)
    console.log("onlyDetail",onlyDetail)
    if(window.api){//app环境
      await dispatch("processingMessage",message);
    }else{//web环境
      console.log('接收到的websocket消息'+JSON.stringify(message))
      //服务端自定义消息
      if(message.commandCode&&message.commandCode=='SYSTEMNOTIFY'){
        dispatch("insertMessage")
      }else if(message.commandCode&&message.commandCode=='SCENE_ACTIVE_INFO'){
        let targetId,
		data = JSON.parse(message.msgContent);
        if(message.chatType==1){
			if(message.msgType==7&&data&&data.activityId){
				targetId = data.activityId;	
			}else{
				targetId = message.targetClientId;
			}
        }else{
          targetId = message.groupId;
        }
        if(data&&data.state){
          if(!db.getUnreadCountByTargetId(targetId,state.userId)){
            let result,title='';
            if(data.activityMethod==6){
              result = await server.blindDatingSingle({//活动详情
                datingDetailsId:targetId,
				cacheTimeout:10,//(秒)
              });
			  title=result.data.data.datingTitle;
            }else{
              result = await server.getSingle({
                datingDetailsId:targetId,
				cacheTimeout:10,//(秒)
              });
			  title='一起'+(result.data.data.datingThemes==1?'去旅行':result.data.data.datingThemes==2?'吃饭':result.data.data.datingThemes==3?'看电影':result.data.data.datingThemes==4?'唱歌':result.data.data.datingThemes==5?'运动':'');
            }
            let icon=result.data.data.coverimgImages?result.data.data.coverimgImages:result.data.data.jiaoyouUser.headimgAttachmentId;
            let name=title+"-"+result.data.data.jiaoyouUser.aliasName
            let activeType=result.data.data.activityMethod
            let activeState=result.data.data.state
            // db.insertOrUpdateUnreadCountName(message.targetClientId,2,icon,name,0,'',(message.createDate),message.msgId,state.userId,'',activeState,activeType)
            let arr = state.webMessageStorage
            arr.rongConversationList.push({"cname":"","messageId":message.msgId,"notificationStatus":"","count":0,"time":utils.format(new Date(message.createDate),"yyyy-MM-dd hh:mm:ss"),"type":2,"activeState":activeState,"icon":icon,"text":"","stick":0,"bname":"","activeType":activeType,"bicon":"","name":name,"targetId":targetId})
            commit('CHANGEWEBMESSAGESTORAGE',utils.deepCopy(arr));
          }else{
            // db. updateActiveState(message.targetClientId,state.userId,data.state)
            let arr = state.webMessageStorage
            arr.rongConversationList .forEach(v=>{
              if(v.targetId==targetId){
                v.activeState = data.state
              }
            })
            commit('CHANGEWEBMESSAGESTORAGE',utils.deepCopy(arr));
          }
          dispatch("getConversationList");
        }
		console.log(targetId,state.currentChatRoomId)
        if(targetId==state.currentChatRoomId){
			//data.chatType=message.chatType;
			//data.msgType=message.msgType;
          commit('CHAGECHATROOMINFO',data);
        }
      }else{
        //单聊
        if(message.chatType==1) {//私聊
		  if(message.msgType==7&&message.msgContent=='chageSingle'){//相亲现场发私聊的命令消息
            let data = JSON.parse(message.extras);
            commit('CHANGEBLINDDATESIGLEOBJ',data)
          }else if(message.msgType==7&&message.msgContent=='gift'){
            //收到礼物
            let gift = JSON.parse(message.extras);
            await util.insertOrUpdateUser(message.sourceClientId);
            let type = 1;
            if(!onlyDetail){
              util.handleWebMessageList(message.sourceClientId,type,'','',isZero?0:1,'[收到礼物]',(message.createDate),message.msgId,state.userId,message.sourceClientId)
            }
            util.handleWebGift(message.sourceClientId,type,'','',message.sourceClientId,(message.createDate),'',state.userId,message.msgId,gift.giftId,gift.giftImage,gift.giftName,gift.giftJiaobi)
            commit('CHANGEGETNEWMESSAGE',true)
            dispatch("getConversationList")
          }else if(message.msgType==0){//文本消息
            await util.insertOrUpdateUser(message.sourceClientId);
            let type = message.chatType;
			if(!onlyDetail){
			  util.handleWebMessageList(message.sourceClientId,type,'','',isZero?0:1,message.msgContent,(message.createDate),message.msgId,state.userId,message.sourceClientId)
			}
            util.handleWebMessage(message.sourceClientId,type,'','',message.sourceClientId,message.msgContent,(message.createDate),'',state.userId,null,null,null,message.msgId,null,null)
            commit('CHANGEGETNEWMESSAGE',true)
            dispatch("getConversationList")
          }else if(message.msgType==1){//图片消息
            let extras = JSON.parse(message.extras);
            await util.insertOrUpdateUser(message.sourceClientId);
            let type = 1;
			if(!onlyDetail){
			  util.handleWebMessageList(message.sourceClientId,type,'','',isZero?0:1,'[图片]',(message.createDate),message.msgId,state.userId,message.sourceClientId)
			}
            util.handleWebMessage(message.sourceClientId,type,'','',message.sourceClientId,null,(message.createDate),'',state.userId,null,extras.imageUrl,null,message.msgId,null,null)
            commit('CHANGEGETNEWMESSAGE',true)
            dispatch("getConversationList")
          }else if(message.msgType==2){//语音消息
            let extras = JSON.parse(message.extras);
            await util.insertOrUpdateUser(message.sourceClientId);
            let type = 1;
			if(!onlyDetail){
			  util.handleWebMessageList(message.sourceClientId,type,'','',isZero?0:1,'[语音]',(message.createDate),message.msgId,state.userId,message.sourceClientId)
			}

            util.handleWebMessage(message.sourceClientId,type,'','',message.sourceClientId,null,(message.createDate),extras.duration,state.userId,null,null,extras.voicePath,message.msgId,null,null)
            commit('CHANGEGETNEWMESSAGE',true)
            dispatch("getConversationList")
          }else if(message.msgType==6){//定位消息
            let extras = JSON.parse(message.extras);
            await util.insertOrUpdateUser(message.sourceClientId);
            let type = 1;
			if(!onlyDetail){
			  util.handleWebMessageList(message.sourceClientId,type,'','',isZero?0:1,'[地理位置]',(message.createDate),message.msgId,state.userId,message.sourceClientId)
			}

            util.handleWebMessage(message.sourceClientId,type,'','',message.sourceClientId,null,(message.createDate),null,state.userId,extras.poi,null,null,message.msgId,extras.longitude,extras.latitude)
            commit('CHANGEGETNEWMESSAGE',true)
            dispatch("getConversationList")
          }
        }else if(message.chatType==2){//群聊
          if(message.sourceClientId == state.userId){
            console.log('群聊中收到的我自己发送的消息')
            return
          }
          if(message.msgType==0) {//文本消息
            let extras = JSON.parse(message.extras);
            let type = 2;
            await util.insertOrUpdateUser(message.sourceClientId);
            let icon='',name='',activeType='',activeState='';
			//console.log((state.webMessageStorage.rongConversationList,state.webMessageStorage.rongConversationList[message.groupId]))
			//console.log("dddddddddddddd+"+db.getUnreadCountByTargetId(message.groupId,state.userId))
            if(!db.getUnreadCountByTargetId(message.groupId,state.userId)){
              let result,title='';
              if(extras.actType==6){
                result = await server.blindDatingSingle({//活动详情
                  datingDetailsId:message.groupId,
				  cacheTimeout:10,//(秒)
                });
				title=result.data.data.datingTitle;
              }else if(extras.actType){
                result = await server.getSingle({
                  datingDetailsId:message.groupId,
				  cacheTimeout:10,//(秒)
                });
				title='一起'+(result.data.data.datingThemes==1?'去旅行':result.data.data.datingThemes==2?'吃饭':result.data.data.datingThemes==3?'看电影':result.data.data.datingThemes==4?'唱歌':result.data.data.datingThemes==5?'运动':'');
              }
              if(result&&result.data&&result.data.data){
                icon=result.data.data.coverimgImages?result.data.data.coverimgImages:result.data.data.jiaoyouUser.headimgAttachmentId;
                name=title+"-"+result.data.data.jiaoyouUser.aliasName
                activeType=result.data.data.activityMethod
                activeState=result.data.data.state
              }
            }
			
            if(!onlyDetail){
              util.handleWebMessageList(message.groupId,type,icon,name,isZero?0:1,message.msgContent,(message.createDate),message.msgId,state.userId,message.sourceClientId,activeState,activeType)
            }
            util.handleWebMessage(message.groupId,type,'123','',message.sourceClientId,message.msgContent,message.createDate,'',state.userId,null,null,null,message.msgId,null,null)
            // if(message.groupId==state.currentChatRoomId){
            //   let dataChats=state.webMessageStorage[message.groupId];
            //   db.resetCount(message.groupId,state.userId);
            //   commit('CHANGECHATROOMMESSAGELIST',dataChats)
            // }
            dispatch("getConversationList")
          }else if(message.msgType==2){//语音消息
            let extras = JSON.parse(message.extras);
            await util.insertOrUpdateUser(message.sourceClientId);
            let type = 2;
            let icon='',name='',activeType='',activeState='';
            if(!db.getUnreadCountByTargetId(message.groupId,state.userId)){
              let result,title='';
              if(extras.actType==6){
                result = await server.blindDatingSingle({//活动详情
                  datingDetailsId:message.groupId,
				  cacheTimeout:10,//(秒)
                });
				title=result.data.data.datingTitle;
              }else if(extras.actType){
                result = await server.getSingle({
                  datingDetailsId:message.groupId,
				  cacheTimeout:10,//(秒)
                });
				title='一起'+(result.data.data.datingThemes==1?'去旅行':result.data.data.datingThemes==2?'吃饭':result.data.data.datingThemes==3?'看电影':result.data.data.datingThemes==4?'唱歌':result.data.data.datingThemes==5?'运动':'');
              }
              if(result&&result.data&&result.data.data){
                icon=result.data.data.coverimgImages?result.data.data.coverimgImages:result.data.data.jiaoyouUser.headimgAttachmentId;
                name=title+"-"+result.data.data.jiaoyouUser.aliasName
                activeType=result.data.data.activityMethod
                activeState=result.data.data.state
              }
            }
            if(!onlyDetail){
              util.handleWebMessageList(message.groupId,type,icon,name,isZero?0:1,'[语音]',(message.createDate),message.msgId,state.userId,message.sourceClientId,activeState,activeType)
            }
            util.handleWebMessage(message.groupId,type,'123','',message.sourceClientId,null,message.createDate,extras.duration,state.userId,null,null,extras.voicePath,message.msgId,null,null)
            // if(message.groupId==state.currentChatRoomId){
            //   let dataChats=state.webMessageStorage[message.groupId];
            //   db.resetCount(message.groupId,state.userId);
            //   commit('CHANGECHATROOMMESSAGELIST',dataChats)
            // }
            dispatch("getConversationList")
          }else if(message.msgType==7&&message.msgContent=='gift'){
            let gift = JSON.parse(message.extras);
            //收到礼物
            if(message.groupId==state.currentChatRoomId){
              commit('CHANGEGIFTOBJ',gift);
            }
          }else if(message.msgType==7&&message.msgContent=='broad'){//相亲主持人发广播
            let broad = JSON.parse(message.extras);
            //收到广播
            if(message.groupId==state.currentChatRoomId){
              commit('CHANGESENDBROAD',broad);
            }
          }
        }
      }
    }
    return Promise.resolve("");
  },
  async processingMessage({commit,state,dispatch},message){
    //处理私聊  chatType  1:私聊,2:群聊,3讨论组  msgType 0:文本消息，1:图片消息,2:语音消息,3:视频信息,4:音乐,5:图文,6定位消息，7命令消息
    console.log('接收到的socket消息'+JSON.stringify(message))
    if(message.commandCode&&message.commandCode=='SCENE_ACTIVE_INFO'){//服务端自定义消息
      let targetId ,
	  data = JSON.parse(message.msgContent);
      if(message.chatType==1){
		if(message.msgType==7&&data&&data.activityId){
			targetId = data.activityId;	
		}else{
			targetId = message.targetClientId;
		}
      }else{
        targetId = message.groupId;
      }
      if(data&&data.state){
        if(!db.getUnreadCountByTargetId(targetId,state.userId)){
          let result,title='';
          if(data.activityMethod==6){
            result = await server.blindDatingSingle({//活动详情
              datingDetailsId:targetId,
			  cacheTimeout:10,//(秒)
            });
			title=result.data.data.datingTitle;
          }else{
            result = await server.getSingle({
              datingDetailsId:targetId,
			  cacheTimeout:10,//(秒)
            });
			title='一起'+(result.data.data.datingThemes==1?'去旅行':result.data.data.datingThemes==2?'吃饭':result.data.data.datingThemes==3?'看电影':result.data.data.datingThemes==4?'唱歌':result.data.data.datingThemes==5?'运动':'');
          }
          let icon=result.data.data.coverimgImages?result.data.data.coverimgImages:result.data.data.jiaoyouUser.headimgAttachmentId;
          let name=title+"-"+result.data.data.jiaoyouUser.aliasName
          let activeType=result.data.data.activityMethod
          let activeState=result.data.data.state
          db.insertOrUpdateUnreadCountName(targetId,2,icon,name,0,'',(message.createDate),message.msgId,state.userId,'',activeState,activeType)
        }else{
          db. updateActiveState(targetId,state.userId,data.state)
        }
        dispatch("getConversationList");
      }
      if(targetId==state.currentChatRoomId){
		//data.chatType=message.chatType;
		//data.msgType=message.msgType;
        commit('CHAGECHATROOMINFO',data);
      }
    }else{
      if(message.chatType==1){//私聊
          if(message.msgType==7&&message.msgContent=='chageSingle'){//相亲现场发私聊的命令消息
            let data = JSON.parse(message.extras);
            commit('CHANGEBLINDDATESIGLEOBJ',data)
          }else if(message.msgType==7&&message.msgContent=='gift'){
          //收到礼物
          let gift = JSON.parse(message.extras);
          await util.insertOrUpdateUser(message.sourceClientId);
          let type = 1;
          db.insertOrUpdateUnreadCount(message.sourceClientId,type,'','',1,'[收到礼物]',(message.createDate),message.msgId,state.userId,message.sourceClientId)
          db.insertGift(message.sourceClientId,type,'','',message.sourceClientId,(message.createDate),'',state.userId,message.msgId,gift.giftId,gift.giftImage,gift.giftName,gift.giftJiaobi)
          if(!state.active){//弹出通知消息
            let name = db.getUserName(message.sourceClientId)
            let notificationStatus = db.getNotificationStatus(message.sourceClientId,state.userId)
            if(notificationStatus!=='0')
              window.api.notification({
                notify: {
                  title: name,
                  content: '[收到礼物]'
                }
              });
          }
          commit('CHANGEGETNEWMESSAGE',true)
          dispatch("getConversationList")
        }else if(message.msgType==0){//文本消息
          await util.insertOrUpdateUser(message.sourceClientId);
          let type = message.chatType;
          db.insertOrUpdateUnreadCount(message.sourceClientId,type,'','',1,message.msgContent,(message.createDate),message.msgId,state.userId,message.sourceClientId)
          db.insertConversation(message.sourceClientId,type,'','',message.sourceClientId,message.msgContent,(message.createDate),'',state.userId,null,null,null,message.msgId,null,null)
          if(!state.active){//弹出通知消息
            let name = db.getUserName(message.sourceClientId)
            let notificationStatus = db.getNotificationStatus(message.sourceClientId,state.userId)
            if(notificationStatus!=='0')
              window.api.notification({
                notify: {
                  title: name,
                  content: message.msgContent
                }
              });
          }
          commit('CHANGEGETNEWMESSAGE',true)
          dispatch("getConversationList")
        }else if(message.msgType==1){//图片消息
          let extras = JSON.parse(message.extras);
          await util.insertOrUpdateUser(message.sourceClientId);
          let type = 1;
          db.insertOrUpdateUnreadCount(message.sourceClientId,type,'','',1,'[图片]',(message.createDate),message.msgId,state.userId,message.sourceClientId)
          db.insertConversation(message.sourceClientId,type,'','',message.sourceClientId,null,(message.createDate),'',state.userId,null,extras.imageUrl,null,message.msgId,null,null)
          if(!state.active){//弹出通知消息
            let name = db.getUserName(message.sourceClientId)
            let notificationStatus = db.getNotificationStatus(message.sourceClientId,state.userId)
            if(notificationStatus!=='0')
              window.api.notification({
                notify: {
                  title: name,
                  content: '[图片]'
                }
              });
          }
          commit('CHANGEGETNEWMESSAGE',true)
          dispatch("getConversationList")
        }else if(message.msgType==2){//语音消息
          let extras = JSON.parse(message.extras);
          await util.insertOrUpdateUser(message.sourceClientId);
          let type = 1;
          db.insertOrUpdateUnreadCount(message.sourceClientId,type,'','',1,'[语音]',(message.createDate),message.msgId,state.userId,message.sourceClientId)
          db.insertConversation(message.sourceClientId,type,'','',message.sourceClientId,null,(message.createDate),extras.duration,state.userId,null,null,extras.voicePath,message.msgId,null,null)
          if(!state.active){//弹出通知消息
            let name = db.getUserName(message.sourceClientId)
            let notificationStatus = db.getNotificationStatus(message.sourceClientId,state.userId)
            if(notificationStatus!=='0')
              window.api.notification({
                notify: {
                  title: name,
                  content: '[语音]'
                }
              });
          }
          commit('CHANGEGETNEWMESSAGE',true)
          dispatch("getConversationList")
        }else if(message.msgType==6){//定位消息
          let extras = JSON.parse(message.extras);
          await util.insertOrUpdateUser(message.sourceClientId);
          let type = 1;
          db.insertOrUpdateUnreadCount(message.sourceClientId,type,'','',1,'[地理位置]',(message.createDate),message.msgId,state.userId,message.sourceClientId)
          db.insertConversation(message.sourceClientId,type,'','',message.sourceClientId,null,(message.createDate),null,state.userId,extras.poi,null,null,message.msgId,extras.longitude,extras.latitude)
          if(!state.active){//弹出通知消息
            let name = db.getUserName(message.sourceClientId)
            let notificationStatus = db.getNotificationStatus(message.sourceClientId,state.userId)
            if(notificationStatus!=='0')
              window.api.notification({
                notify: {
                  title: name,
                  content: '[地理位置]'
                }
              });
          }
          commit('CHANGEGETNEWMESSAGE',true)
          dispatch("getConversationList")
        }
      }else if(message.chatType==2){//群聊
        if(message.sourceClientId == state.userId){
          console.log('群聊中收到的我自己发送的消息')
          return
        }
        if(message.msgType==0) {//文本消息
          let extras = JSON.parse(message.extras);
          let type = 2;
          await util.insertOrUpdateUser(message.sourceClientId);
          let icon='',name='',activeType='',activeState='';
          if(!db.getUnreadCountByTargetId(message.groupId,state.userId)){
            let result,title='';
            if(extras.actType==6){
              result = await server.blindDatingSingle({//活动详情
                datingDetailsId:message.groupId,
				cacheTimeout:10,//(秒)
              });
			  title=result.data.data.datingTitle
            }else if(extras.actType){
              result = await server.getSingle({
                datingDetailsId:message.groupId,
				cacheTimeout:10,//(秒)
              });
			  title='一起'+(result.data.data.datingThemes==1?'去旅行':result.data.data.datingThemes==2?'吃饭':result.data.data.datingThemes==3?'看电影':result.data.data.datingThemes==4?'唱歌':result.data.data.datingThemes==5?'运动':'');
            }
            if(result&&result.data&&result.data.data){
              icon=result.data.data.coverimgImages?result.data.data.coverimgImages:result.data.data.jiaoyouUser.headimgAttachmentId;
              name=title+"-"+result.data.data.jiaoyouUser.aliasName
              activeType=result.data.data.activityMethod
              activeState=result.data.data.state
            }
          }
          db.insertOrUpdateUnreadCountName(message.groupId,type,icon,name,1,message.msgContent,(message.createDate),message.msgId,state.userId,message.sourceClientId,activeState,activeType)
          db.insertConversation(message.groupId,type,'123','',message.sourceClientId,message.msgContent,message.createDate,'',state.userId,null,null,null,message.msgId,null,null)
          if(message.groupId==state.currentChatRoomId){
            let dataChats=db.getConversation(message.groupId,state.userId,100000);
            db.resetCount(message.groupId,state.userId);
            commit('CHANGECHATROOMMESSAGELIST',dataChats)
          }
          if(!state.active){//弹出通知消息
            let name = db.getUserName(message.sourceClientId)
            let notificationStatus = db.getNotificationStatus(message.groupId,state.userId)
            if(notificationStatus!=='0'){
              window.api.notification({
                notify: {
                  title: name,
                  content: message.msgContent
                }
              });
            }
          }
          dispatch("getConversationList")
        }else if(message.msgType==2){//语音消息
          let extras = JSON.parse(message.extras);
          await util.insertOrUpdateUser(message.sourceClientId);
          let type = 2;
          let icon='',name='',activeType='',activeState='';
          if(!db.getUnreadCountByTargetId(message.groupId,state.userId)){
            let result,title='';
            if(extras.actType==6){
              result = await server.blindDatingSingle({//活动详情
                datingDetailsId:message.groupId,
				cacheTimeout:10,//(秒)
              });
			  title=result.data.data.datingTitle;
            }else if(extras.actType){
              result = await server.getSingle({
                datingDetailsId:message.groupId,
				cacheTimeout:10,//(秒)
              });
			   title='一起'+(result.data.data.datingThemes==1?'去旅行':result.data.data.datingThemes==2?'吃饭':result.data.data.datingThemes==3?'看电影':result.data.data.datingThemes==4?'唱歌':result.data.data.datingThemes==5?'运动':'');
            }
            if(result&&result.data&&result.data.data){
              icon=result.data.data.coverimgImages?result.data.data.coverimgImages:result.data.data.jiaoyouUser.headimgAttachmentId;
              name=title+"-"+result.data.data.jiaoyouUser.aliasName
              activeType=result.data.data.activityMethod
              activeState=result.data.data.state
            }
          }
          db.insertOrUpdateUnreadCountName(message.groupId,type,icon,name,1,'[语音]',(message.createDate),message.msgId,state.userId,message.sourceClientId,activeState,activeType)
          db.insertConversation(message.groupId,type,'123','',message.sourceClientId,null,message.createDate,extras.duration,state.userId,null,null,extras.voicePath,message.msgId,null,null)
          if(message.groupId==state.currentChatRoomId){
            let dataChats=db.getConversation(message.groupId,state.userId,100000);
            db.resetCount(message.groupId,state.userId);
            commit('CHANGECHATROOMMESSAGELIST',dataChats)
          }
          if(!state.active){//弹出通知消息
            let name = db.getUserName(message.sourceClientId)
            let notificationStatus = db.getNotificationStatus(message.groupId,state.userId)
            if(notificationStatus!=='0')
              window.api.notification({
                notify: {
                  title: name,
                  content: '[语音]'
                }
              });
          }
          dispatch("getConversationList")
        }else if(message.msgType==7&&message.msgContent=='gift'){
          let gift = JSON.parse(message.extras);
          //收到礼物
          if(message.groupId==state.currentChatRoomId){
            commit('CHANGEGIFTOBJ',gift);
          }
        }else if(message.msgType==7&&message.msgContent=='broad'){//相亲主持人发广播
            let broad = JSON.parse(message.extras);
            //收到广播
            if(message.groupId==state.currentChatRoomId){
              commit('CHANGESENDBROAD',broad);
            }
          }
      }else if(message.chatType==3){//讨论组
        if(message.msgType==7&&message.msgContent=='gift'){
          let gift = JSON.parse(message.extras);
          //收到礼物
          if(message.groupId==state.currentChatRoomId){
            commit('CHANGEGIFTOBJ',gift);
          }
        }
      }
    }
    return Promise.resolve("");
  },
  async conversationNotificationStatus({commit,state,dispatch},obj){
    if(obj.notificationStatus){//设置
      let code =  await new Promise((resolve,reject)=>{
        state.rongCloud&&state.rongCloud.setConversationNotificationStatus({
          conversationType: obj.conversationType,
          targetId: obj.targetId,
          notificationStatus: obj.notificationStatus
        }, function(ret, err) {
          if (ret.status == 'success')
            resolve(ret.result.code)
          else
            reject(err.code)
        })
      })
      return Promise.resolve(code);
    }else{//获取
      let code =  await new Promise((resolve,reject)=>{
        state.rongCloud&&state.rongCloud.getConversationNotificationStatus({
          conversationType: obj.conversationType,
          targetId: obj.targetId
        }, function(ret, err) {
          if (ret.status == 'success')
            resolve(ret.result.code)
          else
            reject(err.code)
        })
      })
      return Promise.resolve(code);
    }
  },
  async getConversationList({commit,state,dispatch}){//获取融云通讯会话列表
    if(state.isBrowser){
      return false;
    }
    let data = db.getUnreadCountList(state.userId);
    commit('CHANGERONGCONVERSATIONLIST',data)
    let count = db.getUnreadCount(state.userId);
    commit('CHANGEUNREADCOUNT',count)
    if(state.syncState){
      let arr=[];
      data.map(v=>{
        if(v.type=="2"&&(v.activeState=="3"||v.activeState=="6")){
          arr.push(v.targetId)
        }
      })
      let result=await server.getStatusBatch(arr)
      commit('CHANGESYNCSTATE',false)
      let resultArr = result.data.data
      if(resultArr){
        resultArr.map(v=>{
          db. updateActiveState(v.id,state.userId,v.state)
        })
        let data2 = db.getUnreadCountList(state.userId);
        commit('CHANGERONGCONVERSATIONLIST',data2)
      }
    }
  },
  //初始化消息
  initMessageCount({commit,state,dispatch}){
    db.insertUnreadCountMessage(state.userId)
  },
  //插入消息 从服务器获取新的推送消息内容
  async pollingMessage({commit,state,dispatch}){
	if(!state.isBrowser){
		return false;
	}
    dispatch("insertMessage");
  },
  async insertMessage({commit,state,dispatch}){
    let systemTime = '';
    let activeTime = '';
    state.rongConversationList.map(v=>{
      if(v.type==6){
        activeTime = v.time;
      }else if(v.type==5){
        systemTime = v.time;
      }
    })
    let systemNotice = null;
    let activeNotice = null;
    try{
      let data = await server.getMessageList({category:2});//互动消息
      // let data = await server.getMessageList({category:2,createDate:activeTime});//互动消息
      let data2 = await server.getMessageList({category:1});//系统消息
      // let data2 = await server.getMessageList({category:1,createDate:systemTime});//系统消息
      systemNotice = data2.data.data;
      activeNotice = data.data.data;
    }catch (e) {
      console.log(JSON.stringify(e))
    }finally {
      // if(state.isBrowser){
      //   setTimeout(()=>{
			// if(state.isGetMessage){//退出后不用获取
			// 	 dispatch("pollingMessage")
			// }
      //   },20000)
      // }
    }
    if(!systemNotice&&!activeNotice){
      return false;
    }
    if(state.isBrowser){
      let arr = state.rongConversationList;
      let count=0;
      if(systemNotice){
        let webSystemMessageList = state.webSystemMessageList
        let webSystemMessageDetailsList = state.webSystemMessageDetailsList
        for(let i=0;i<systemNotice.length;i++){
          arr = arr.map(v=>{
            if(v.targetId == '001'){
              v.count = parseInt(v.count)+1;
              v.text = systemNotice[i].msgContent;
              v.time = systemNotice[i].createDate;
              v.messageId = systemNotice[i].id;
            }
            return v;
          })
          //
          webSystemMessageList = webSystemMessageList.map(v=>{
            if(v.TYPE == systemNotice[i].msgType){
              v.COUNT = parseInt(v.COUNT)+1;
              v.TEXT = systemNotice[i].msgContent;
              v.time = systemNotice[i].createDate;
              v.MESSAGE_ID = systemNotice[i].id;
            }
            return v;
          })
          webSystemMessageDetailsList.push({
            "ID":systemNotice[i].id,
            "TYPE":systemNotice[i].msgType,
            "NAME":systemNotice[i].msgType==1?'用户中心':systemNotice[i].msgType==2?'活动通知':'资金中心',
            "TEXT":systemNotice[i].msgContent,
            "time":systemNotice[i].createDate,
            "URL":systemNotice[i].url,
            "CONTENT_TYPE":systemNotice[i].contentType,
            "CONSUME":"0"
          })
        }
        commit('CHANGEWEBSYSTEMMESSAGELIST',webSystemMessageList)
        commit('CHANGEWEBSYSTEMMESSAGEDETAILSLIST',webSystemMessageDetailsList)
      }
      if(activeNotice){
        let webActiveMessageList = state.webActiveMessageList
        for(let i=0;i<activeNotice.length;i++){
          arr = arr.map(v=>{
            if(v.targetId == '002'){
              v.count = parseInt(v.count)+1;
              v.text = activeNotice[i].msgContent;
              v.time = activeNotice[i].createDate;
              v.messageId = activeNotice[i].id;
            }
            return v;
          })
          webActiveMessageList.push({
            "ID":activeNotice[i].id,
            "NAME":activeNotice[i].aliasName,
            "SEX":activeNotice[i].sex,
            "AGE":activeNotice[i].age,
            "ICON":activeNotice[i].headimgAttachment,
            "TEXT":activeNotice[i].msgContent,
            "time":activeNotice[i].createDate,
            "MOMENT_TEXT":activeNotice[i].feedWords,
            "MOMENT_IMG":activeNotice[i].feedFirstImage,
            "URL":activeNotice[i].url
          })
        }
        commit('CHANGEWEBACTIVEMESSAGELIST',webActiveMessageList)
      }
      arr.map(v=>{
        count = count+parseInt(v.count);
      })
      commit('CHANGERONGCONVERSATIONLIST',arr)
      commit('CHANGEUNREADCOUNT',count)
      commit('CHANGEGETNEWNOTICE',true)//广播查找新的通知消息
      dispatch("getConversationList")
    }else{
      if(systemNotice){
        for(let i=0;i<systemNotice.length;i++){
          db.insertOrUpdateUnreadCount('001',5,'','',1,systemNotice[i].msgContent,new Date(Date.parse((systemNotice[i].createDate).replace(/-/g,"/"))).getTime(),systemNotice[i].id,state.userId,'')
          db.insertOrUpdateSystemMessage({
            type:systemNotice[i].msgType,
            name:systemNotice[i].msgType==1?'用户中心':systemNotice[i].msgType==2?'活动通知':'资金中心',
            count:1,
            text:systemNotice[i].msgContent,
            time:new Date(Date.parse((systemNotice[i].createDate).replace(/-/g,"/"))).getTime(),
            messageId:systemNotice[i].id,
          },state.userId)
          db.insertSystemMessageDetails({
            type:systemNotice[i].msgType,
            name:systemNotice[i].msgType==1?'用户中心':systemNotice[i].msgType==2?'活动通知':'资金中心',
            text:systemNotice[i].msgContent,
            time:new Date(Date.parse((systemNotice[i].createDate).replace(/-/g,"/"))).getTime(),
            url:systemNotice[i].url,
            contentType:systemNotice[i].contentType
          },state.userId)
        }
      }
      if(activeNotice){
        for(let i=0;i<activeNotice.length;i++){
          db.insertOrUpdateUnreadCount('002',6,'','',1,activeNotice[i].msgContent,new Date(Date.parse((activeNotice[i].createDate).replace(/-/g,"/"))).getTime(),activeNotice[i].id,state.userId,'')
          db.insertActiveMessage({
            sex:activeNotice[i].sex,
            name:activeNotice[i].aliasName,
            age:activeNotice[i].age,
            icon:activeNotice[i].headimgAttachment,
            text:activeNotice[i].msgContent,
            time:new Date(Date.parse((activeNotice[i].createDate).replace(/-/g,"/"))).getTime(),
            momentText:activeNotice[i].feedWords,
            momentImg:activeNotice[i].feedFirstImage,
            url:activeNotice[i].url,
          },state.userId)
        }
      }
      commit('CHANGEGETNEWNOTICE',true)//广播查找新的通知消息
      dispatch("getConversationList")
    }
  },
  async initJpush({commit,state,dispatch}){
    if(window.api){
      let ajpush  = window.api.require('ajpush');
      if(window.api.systemType != "ios"){
        await new Promise((resolve,reject)=>{
          ajpush.init(function(ret) {
            resolve(ret)
          });
        })
      }else{
        ajpush.setBadge({
          badge:0
        });
      }
      ajpush.getRegistrationId(function(ret) {
        if(ret.id){
          server. update_ajpush(ret.id)
          commit('CHANGEREGISTRATIONID',ret.id)
        }
      });
      ajpush.setListener(
        function(ret) {
          console.log("极光推送监听消息："+JSON.stringify(ret))
          if(ret.extra){
            dispatch("insertMessage")
          }
        }
      );
    }
    return Promise.resolve('success');
  },
  async updateUserInfo({commit,state,dispatch},userId){
    let userInfo = await server.getUserInfo({userId:userId});
    db.insertOrUpdateUser([{userId:userId,userName:userInfo.data.data.aliasName,userIcon:userInfo.data.data.headimgAttachmentId}],state.userId)
    return Promise.resolve('success');
  },
  async getCoordsFromName({commit,state,dispatch},city,area){
    try{
      if(!window.api){
        let obj=await new Promise((resolve,reject)=>{
          let url="http://api.map.baidu.com/geocoder/v2/?ak="+state.baiduKey+"&address="+city+area+"&output=json"
          $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: url,
            success: function (data) {
              if(data.status==0){
                resolve({
                  lon: data.result.location.lng,        //数字类型；地址所在经度
                  lat: data.result.location.lat
                })
              }else{
                reject({
                  lon: 0,        //数字类型；地址所在经度
                  lat: 0          //数字类型；地址所在纬度
                });
              }
            },
            error: function () {
              reject({
                lon: 0,        //数字类型；地址所在经度
                lat: 0          //数字类型；地址所在纬度
              });
            }
          });
        })
        return Promise.resolve(obj)
      }else{
        let map = window.api.require('bMap');
        if(window.api.systemType == "ios"){
          await new Promise((resolve,reject)=>{
            map.initMapSDK(function(ret) {
              if (ret.status) {
                resolve("success")
              }else{
                reject("failed")
              }
            });
          })
        }
        let obj=await new Promise((rs,rj)=>{
          let timer = setTimeout(()=>{
            rj("timerfailed")
          },5000)
          map.getCoordsFromName({
            city: city,
            address: city+" "+area
          }, function(ret, err) {
            clearTimeout(timer);
            if (ret.status) {
              rs(ret)
            }else{
              rj("getCoordsFromNamefailed")
            }
          });
        })
        return Promise.resolve(obj)
      }
    }catch (e) {
      return Promise.resolve({
        lon:0.00,
        lat:0.00
      })
    }
  },
  async getMylocation({state}){
    if(state.isWeixin){
      try{
        let GPS ={
          x_pi: 3.14159265358979324 * 3000.0 / 180.0,
          bd_encrypt(gcjLat, gcjLon) {
            let x = gcjLon, y = gcjLat;
            let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
            let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
            let bdLon = z * Math.cos(theta) + 0.0065;
            let bdLat = z * Math.sin(theta) + 0.006;
            return {'lat' : bdLat,'lon' : bdLon};
          }
        }
        let position=await getLocation();
        //console.log(JSON.stringify(position));
        let obj=await new Promise((resolve,reject)=>{
			let timer = setTimeout(()=>{
			  reject("timerfailed")
			},5000);
			let json = GPS.bd_encrypt(position.latitude, position.longitude);
			let bdMapObj={//应用内百度地图模块返回的值
				status: false,              //布尔型；true||false
				province: '',              //字符串类型；省份
				city: '',                  //字符串类型；城市
				district: '',              //字符串类型；县区
				streetName: '',            //字符串类型；街道名
				streetNumber: '',          //字符串类型；街道号
				country:'',                //字符串类型；国家
				countryCode:'',            //字符串类型；国家代码
				adCode:'',                 //字符串类型；行政区域编码
				businessCircle:'',         //字符串类型；商圈名称
				sematicDescription:'',     //字符串类型；结合当前位置POI的语义化结果描述
				cityCode:'',               //字符串类型；城市编码
				lon: json.lon,              //数字类型；经度
				lat: json.lat,               //数字类型；纬度
				address: '',               //字符串类型；地址信息
				poiList:[{                 //数组类型；经纬度点热点列表
				   name: '',               //字符串类型；热点名称
				   uid: '',                //字符串类型；热点id
				   address: '',            //字符串类型；热点地址
				   city: '',               //字符串类型；热点所在城市
				   phone: '',              //字符串类型；热点电话
				   postcode: '',           //字符串类型；热点邮编
				   epoitype: '',           //字符串类型；热点类型，0:普通点 1:公交站 2:公交线路 3:地铁站 4:地铁线路
				   coord: {                //JSON对象；热点坐标信息
					  lat:'' ,               //数字类型；热点纬度
					  lon:''               //数字类型；热点经度
				   }
				}]
			};
			let url="http://api.map.baidu.com/geocoder/v2/?ak="+state.baiduKey+"&callback=renderReverse&location="+json.lat+","+json.lon+"&output=json&pois=0"
			$.ajax({ 
				type: "GET", 
				dataType: "jsonp", 
				url: url, 
				success: function (data) { 
					if(data.status==0){
						bdMapObj.province=data.result.addressComponent.province;
						bdMapObj.city=data.result.addressComponent.city;
						bdMapObj.district=data.result.addressComponent.district;
						bdMapObj.streetName=data.result.addressComponent.street;
						bdMapObj.streetNumber=data.result.addressComponent.street_number;
						bdMapObj.country=data.result.addressComponent.country;
						bdMapObj.countryCode=data.result.addressComponent.country_code;
						bdMapObj.adCode=data.result.addressComponent.adcode;
						bdMapObj.businessCircle=data.result.business;
						bdMapObj.sematicDescription=data.result.sematic_description;
						bdMapObj.cityCode=data.result.cityCode;
						bdMapObj.address=data.result.formatted_address;
						//if(data.result.poiRegions.length>0){
							bdMapObj.poiList=[{                 
							   name:  data.result.poiRegions[0]&&data.result.poiRegions[0].name||data.result.addressComponent.street,               //字符串类型；热点名称
							   uid:  data.result.poiRegions[0]&&data.result.poiRegions[0].uid||123456789,                //字符串类型；热点id
							   address: data.result.formatted_address,            //字符串类型；热点地址
							   city: data.result.addressComponent.city,               //字符串类型；热点所在城市
							   phone: '',              //字符串类型；热点电话
							   postcode: '',           //字符串类型；热点邮编
							   epoitype: 0,           //字符串类型；热点类型，0:普通点 1:公交站 2:公交线路 3:地铁站 4:地铁线路
							   coord: {                //JSON对象；热点坐标信息
								  lat:json.lat ,               //数字类型；热点纬度
								  lon:json.lon               //数字类型；热点经度
							   }
							}]
						//}
						if(bdMapObj.country=="中国"){
							resolve(bdMapObj);
						}else{
							reject("failed"); 
						}
						
					}else{
						reject("failed"); 
					}
				}, 
				error: function (XMLHttpRequest, textStatus, errorThrown) { 
					reject(json.lat+","+json.lon+"地址位置获取失败"); 
				} 
			});
		});
        return Promise.resolve(obj)
      }catch(e){
		console.log("定位失败");
		return Promise.resolve({
          lon:0.00,
          lat:0.00
        });
      }
    }else{
      try{
        let map = window.api.require('bMap');
        if(window.api.systemType == "ios"){
          await new Promise((resolve,reject)=>{
            map.initMapSDK(function(ret) {
              if (ret.status) {
                resolve("success")
              }else{
                reject("failed")
              }
            });
          })
        }
        let result = await new Promise((resolve,reject)=>{
          let timer = setTimeout(()=>{
            reject("timerfailed")
          },5000)
          map.getLocation({
            accuracy: '10m',
            autoStop: true,
            filter: 1
          }, function(ret, err) {
            clearTimeout(timer);
            if (ret.status) {
              resolve(ret)
            } else {
              setTimeout(()=>{
                map.getLocation({
                  accuracy: '10m',
                  autoStop: true,
                  filter: 1
                }, function(ret, err) {
                  if (ret.status) {
                    resolve(ret)
                  } else {
                    reject("getLocationfailed")
                  }
                });
              },1000)
            }
          });
        });
        let obj=await new Promise((rs,rj)=>{
          let timer = setTimeout(()=>{
            rj("timerfailed")
          },5000)
          map.getNameFromCoords({
            lon: result.lon,
            lat: result.lat
          }, function(ret, err) {
            clearTimeout(timer);
            if (ret.status) {
				if(ret.country=="中国"){
					rs(ret)
				}else{	
					rj("getNameFromCoordsfailed")
				}
              console.log("结果："+JSON.stringify(ret))
            }else{
              rj("getNameFromCoordsfailed")
            }
          });
        })
        return Promise.resolve(obj)
      }catch (e) {
        return Promise.resolve({
          lon:0.00,
          lat:0.00
        })
      }
    }
  },
  /*async getGeolocation(
    {
      //获取地理位置
      commit,
      state
    },
    mapfrom = "pc"
  ) {
    if (!state.isGetAddress || mapfrom == "city") {
      try {
        const res = await getGeolocation(mapfrom);
        commit(GEOLOCATION, res);
        //commit(CHANGE_CITY, { name: res.city });
        return await Promise.resolve({ code: 200 }); //成功获取
      } catch (err) {
        //当await 返回reject时会触发
        console.log("locationError:" + err);
        return await Promise.resolve({ code: 500 }); //获取失败
      }
    } else {
      return await Promise.resolve({ code: 201 }); //已经获取过
    }
  },*/
  async checkLogin({commit,state},readonly) {//检查是否登录
    if(!state.isCheck) {
		try {
			const Authorization = window.$api.getStorage('Authorization');
			if(Authorization){
				readonly=readonly?{readonly:true}:{};//readonly为了不显示没登录时的提示
				const result=await server.getUserByToken({
					Authorization:"Bearer "+Authorization,
					...readonly
				});
				if(result.data.status==1){
					commit("CHECK_LOGIN",result.data);
					commit("LOGIN",result.data.data);//登录成功,获得用户信息
					commit("CHANGEACCESSTOKEN",{
						token:Authorization,
						userId:result.data.data.id
					});
					return await Promise.resolve({code:200});//成功获取
				}else{
					commit("CHECK_LOGIN",{
						status:0
					});
					return await Promise.resolve({code:500});//获取失败			
				}
			}else{
				commit("CHECK_LOGIN",{
					status:0
				});
				return await Promise.resolve({code:500});//获取失败
			}
		} catch (err) {
			console.log(err);
			commit("CHECK_LOGIN",err);
			return await Promise.resolve({ code: 500 }); //获取失败
		}
    }
    return await Promise.resolve({ code: 201 }); //已经获取过
  },
  /*[MYHISTORY]({ commit, dispatch }) {
    //刚进应用时获取一下历史记录
    dispatch("checkLogin", true).then(() => {
      commit(MYHISTORY, {});
    });
  },*/
  async [DELHISTORY]({ commit }, id) {
    commit(DELHISTORY, id);
    return await Promise.resolve({ code: 200, msg: "删除成功" }); //马上返回结果
  },
  /*async [LANGUAGE]({ commit }) {
    //刚进应用时获取一下语言
    let lan;
    if (getStore("language")) {
      lan = JSON.parse(getStore("language"));
      commit(SETLANGUAGE, lan);
      return await Promise.resolve(lan); //已经获取过
    } else {
      lan = i18n.locale;
      return await getLanguage(lan).then(language => {
        commit(SETLANGUAGE, language);
        return Promise.resolve(language); //已经获取过
      });
    }
  },*/
  [SEARCHHISTORY]({ commit }) {
    //第一次获取搜索历史
    commit(SEARCHHISTORY, {});
  },
	async [CHECKMONEY]({commit}){//查询拥有当前拥有的乾坤币
		return await server.getUserMoney().then((res)=>{
			if(res.data.data){
				commit("EDITUSERINFO",{key:"userMoney",value:res.data.data});
			}
		});
	},
	async dataLog({commit,state},data){
		try{
			await server.dataLog(data);
		}catch(e){
			console.log("提交日志出错:"+data.info+JSON.stringify(e));
		}
	}
};
