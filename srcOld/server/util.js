import {store} from '@/store';
import server from './getData'
import db from '../utils/db'
import utils from '../utils/utils'
import Vue from 'vue';

let util={};

util.handleWebMessageList = function (targetId,type,icon,name,count,text,time,messageId,ownerId,senderId,activeState,activeType){
  let obj = store.state.webMessageStorage;
  let webcount=0;
  let insert = obj.rongConversationList.some(v=>{
    if(v.targetId == targetId){
      let targetUser = obj.userList[targetId];
      let senderUser = obj.userList[senderId];
      if(targetUser){
        v.targetId = targetId;
        v.name = name||v.name;
        v.bicon = targetUser.userIcon;
        v.bname = targetUser.userName;
        v.text = text;
        v.type = type;
        v.time = utils.format(new Date(time),"yyyy-MM-dd hh:mm:ss");
        v.count = parseInt(v.count||0) + parseInt(count);
        v.messageId = messageId;
      }else if(senderUser){
        v.targetId = targetId;
        v.name = name||v.name;
        v.cname = senderUser.userName;
        v.text = text;
        v.type = type;
        v.time = utils.format(new Date(time),"yyyy-MM-dd hh:mm:ss");
        v.count = parseInt(v.count||0) + parseInt(count);
        v.icon = icon||v.icon;
        v.activeType = activeType||v.activeType;
        v.activeState = activeState||v.activeState;
      }
    }
    webcount = parseInt(webcount) + parseInt(v.count||0);
    return v.targetId == targetId;
  })
  if(!insert){
    let v={};
    let targetUser = obj.userList[targetId];
    let senderUser = obj.userList[senderId];
    if(targetUser){
      v.targetId = targetId;
      v.name = name;
      v.bicon = targetUser.userIcon;
      v.bname = targetUser.userName;
      v.text = text;
      v.type = type;
      v.time = utils.format(new Date(time),"yyyy-MM-dd hh:mm:ss");
      v.count = parseInt(count);
      v.messageId = messageId;
    }else if(senderUser){
      v.targetId = targetId;
      v.name = name;
      v.cname = senderUser.userName;
      v.text = text;
      v.type = type;
      v.time = utils.format(new Date(time),"yyyy-MM-dd hh:mm:ss");
      v.count = parseInt(v.count||0) + parseInt(count);
      v.icon = icon;
      v.activeType = activeType;
      v.activeState = activeState;
    }
    obj.rongConversationList.push(v);
    webcount = parseInt(webcount) +parseInt(v.count||0);
  }
  obj.unreadCount = webcount;
  console.log("消息",utils.deepCopy(obj))
  store.commit('CHANGEWEBMESSAGESTORAGE',utils.deepCopy(obj));
}

util.handleWebMessage = function(targetId,type,userIcon,userName,userId,text,time,remark,ownerId,location,img,audio,messageId,lon,lat){
  let obj = store.state.webMessageStorage;
  let user = obj.userList[userId];
  if(!user){
	  return false;
  }
  //time=parseInt(time);
  let messageobj= {
    "id": new Date().getTime()+""+Math.floor(Math.random()*1000),
    "targetId": targetId,
    "type": type,
    "icon": user.userIcon,
    "name": user.userName,
    "userId": userId,
    "message": text,
    "time": utils.format(new Date(time),"yyyy-MM-dd hh:mm:ss"),
    "bicon": user.userIcon,
    "bname": user.userName,
    "remark": remark,
    "location": location,
    "lon": lon,
    "lat": lat,
    "img": img,
    "audio": audio,
    "messageId": messageId,
    "giftId": "",
    "giftImage": "",
    "giftName": "",
    "giftJiaobi": ""
  }
  let arr = obj[targetId];
  if(arr){
		let has=false;
	  for(let i=arr.length;i--;){//排除列表中的重复聊天记录
		  if(arr[i].messageId==messageId){
			  console.log("聊天重复了，messageId："+messageId+",text:"+text);
			    has=true;
				break;
		  }
	  }
    if(!has){
		arr.push(messageobj);
	}
  }else{
    arr=[messageobj]
  }
  obj[targetId]=arr;
  store.commit('CHANGEWEBMESSAGESTORAGE',utils.deepCopy(obj));
}

util.handleWebGift = function(targetId,type,userIcon,userName,userId,time,remark,ownerId,messageId,giftId,giftImage,giftName,giftJiaobi){
  let obj = store.state.webMessageStorage;
  let user = obj.userList[userId]
  let messageobj= {
    "id": new Date().getTime()+""+Math.floor(Math.random()*1000),
    "targetId": targetId,
    "type": type,
    "icon": user.userIcon,
    "name": user.userName,
    "userId": userId,
    "message": '',
    "time": utils.format(new Date(time),"yyyy-MM-dd hh:mm:ss"),
    "bicon": user.userIcon,
    "bname": user.userName,
    "remark": remark,
    "messageId": messageId,
    "giftId": giftId,
    "giftImage": giftImage,
    "giftName": giftName,
    "giftJiaobi": giftJiaobi
  }
  let arr = obj[targetId]
  if(arr){
    arr.push(messageobj)
  }else{
    arr=[messageobj]
  }
  obj[targetId]=arr;
  store.commit('CHANGEWEBMESSAGESTORAGE',utils.deepCopy(obj));
}


util.insertOrUpdateUser = async function (userId){
  if(window.api){
    if(!db.getUser(userId)){
      let userInfo = await server.getUserInfo({userId:userId,readonly:true});
      db.insertOrUpdateUser([{userId:userId,userName:userInfo.data.data.aliasName,userIcon:userInfo.data.data.headimgAttachmentId}],store.state.userId)
    }
  }else{
    let obj = store.state.webMessageStorage;
    if(!obj.userList[userId]){
		try{
			 let userInfo = await server.getUserInfo({userId:userId,readonly:true});
			  obj.userList[userId] = {
				userId: userId,
				userName: userInfo.data.data.aliasName,
				userIcon: userInfo.data.data.headimgAttachmentId
			  }
			  store.commit('CHANGEWEBMESSAGESTORAGE',utils.deepCopy(obj));
		}catch(e){
			console.log(JSON.stringify(e));
		}
    }
  }
  return Promise.resolve('success')
}

util.sendSocket = function(messageObject,fb){
  if(messageObject.extras&&(messageObject.extras.imageUrl||messageObject.extras.voicePath)){
    let path = messageObject.extras.imageUrl||messageObject.extras.voicePath
    server.uploadFile([path],function(ret){
      console.log("上传回调："+JSON.stringify(ret))
      if(ret.status==1){
        if(messageObject.extras.imageUrl){
          messageObject.extras.imageUrl = utils.getFullPath(ret.body.data.path)
        }else if(messageObject.extras.voicePath){
          messageObject.extras.voicePath = utils.getFullPath(ret.body.data.path)
        }
        messageObject.extras = JSON.stringify(messageObject.extras)
        Vue.prototype.$socket.emit('talk', messageObject,function(data){
          if(data.status==1){
            fb(data)
          }else{
            fb(null,data)
          }
        });
      }else if(ret.status==0){
        fb(null,null,ret.progress)
      }else{
        fb(null,{
          message:'发送失败'
        })
      }
    })
  }else{
    messageObject.extras = JSON.stringify(messageObject.extras)
    Vue.prototype.$socket.emit('talk', messageObject,function(data){
      if(data.status==1){
        fb(data)
      }else{
        fb(null,data)
      }
    });
  }
}

util.sendSocketImgWechat=async function(messageObject,fb){
  if(messageObject.extras&&messageObject.extras.imageUrl){
    try{
      let path = messageObject.extras.imageUrl
      let result = await server.wxMpMedia({
        mediaId:path
      })
      let url = result.data.data&&result.data.data.path;
      messageObject.extras.imageUrl = utils.getFullPath(url)
      messageObject.extras = JSON.stringify(messageObject.extras)
      Vue.prototype.$socket.emit('talk', messageObject,function(data){
        if(data.status==1){
          fb(data)
        }else{
          fb(null,data)
        }
      });
    }catch (e) {
      fb(null,{
        message:'发送失败'
      })
    }
  }else{
    fb(null,{
      message:'发送失败'
    })
  }
}


export default util;
