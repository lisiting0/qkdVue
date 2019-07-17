import {store} from '@/store';
import utils from './utils'

let database=undefined;
let db={};//type=1单聊2群组3聊天室4讨论组5系统6互动
let result={
  status: false,      //布尔类型；操作成功状态值，true|false
  msg: ''            //字符串类型；错误描述，仅当 status 为 false 时有值
}
let executeSqlSync=function(sql) {
  if (database == undefined) {
    database = window.api.require('db');
  }
  let retbegin = database.transactionSync({
    name: 'db',
    operation: 'begin'
  });
  if (retbegin.status) {
    let retexecute = database.executeSqlSync({
      name: 'db',
      sql: sql
    });
    if (retexecute.status) {
      let retcommit = database.transactionSync({
        name: 'db',
        operation: 'commit'
      });
      if (retcommit.status) {} else {
        let retrollback = database.transactionSync({
          name: 'db',
          operation: 'rollback'
        });
      }
      return retcommit;
    } else {
      let retrollback = database.transactionSync({
        name: 'db',
        operation: 'rollback'
      });
      return retexecute;
    }
  } else {
    return retbegin;
  }
}
db. selectSqlSync=function(sql) {
  if (database == undefined ) {
    database = window.api.require('db');
  }
  // console.log(sql)
  let retselect = database.selectSqlSync({
    name: 'db',
    sql: sql
  });
  return retselect;
}
db.insertSqlSync=function(tableName, fields, data) {
  if (fields.length != data.length) {
    result.msg = "参数长度错误";
    return result;
  }
  for (let i in data) {
    if (typeof(data[i]) == "string") {
      data[i] = "'" + data[i] + "'";
    }
    if (data[i] == null) {
      data[i] = 'null';
    }
  }
  let sql = "INSERT INTO " + tableName + " (" + fields.join(",") + ") VALUES (" +
    data.join(",") + ");";
  return executeSqlSync(sql);
}
db. updateSqlSync=function(tableName, fields, data, wheresql) {
  if (fields.length != data.length) {
    result.msg = "参数长度错误";
    return result;
  }
  let value = [];
  for (let i in data) {
    if (typeof(data[i]) == "string") {
      data[i] = "'" + data[i] + "'";
    }
    value.push(fields[i] + "=" + data[i]);
  }
  let sql = "UPDATE " + tableName + " SET " + value.join(",") + " WHERE " + wheresql + ";";
  return executeSqlSync(sql);
}
db. deleteSqlSync=function(tableName, wheresql) {
  let sql = "DELETE FROM " + tableName + " WHERE " + wheresql + ";";
  return executeSqlSync(sql);
}
db. insertOrUpdateUnreadCount=function(targetId,type,icon,name,count,text,time,messageId,ownerId,senderId){
  let sqlResult = db.selectSqlSync(`SELECT ID,COUNT FROM UNREAD_COUNT WHERE TARGET_ID='${targetId}' AND OWNER_ID='${ownerId}'`);
  let id=null;
  if(sqlResult.status&&sqlResult.data.length>0){
    id = sqlResult.data[0].ID;
  }
  let data;
  if(id){
    data = db.updateSqlSync('UNREAD_COUNT', ['COUNT','TEXT','TIME','MESSAGE_ID','SENGUSER_ID'], [parseInt(sqlResult.data[0].COUNT||0)+(count==0?0:1),text,Math.floor(time/1000),messageId,senderId], `ID=${id}`);
  }else{
    data = db.insertSqlSync('UNREAD_COUNT', ['TARGET_ID','TYPE','COUNT','TEXT','TIME','OWNER_ID','MESSAGE_ID','STICK','SENGUSER_ID'], [targetId,type,1,text,Math.floor(time/1000),ownerId,messageId,0,senderId]);
  }
  return data;
}
//活动现场群聊消息
db. getUnreadCountByTargetId=function(targetId,ownerId){
  if(store.state.isBrowser){
    let rongConversationList = store.state.webMessageStorage.rongConversationList
    if(rongConversationList&&rongConversationList.length>0){
      return rongConversationList.some(v=>{
        return v.targetId==targetId;
      })
    }else{
      return false;
    }
  }
  let sqlResult = db.selectSqlSync(`SELECT ID,COUNT FROM UNREAD_COUNT WHERE TARGET_ID='${targetId}' AND OWNER_ID='${ownerId}'`);
  if(sqlResult.status&&sqlResult.data.length>0){
    return true;
  }else{
    return false;
  }
}
db. updateActiveState=function(targetId,ownerId,activeState){
  return db.updateSqlSync('UNREAD_COUNT', ['ACTIVE_STATE'], [activeState], `TARGET_ID='${targetId}' AND OWNER_ID='${ownerId}'`)
}
db. insertOrUpdateUnreadCountName=function(targetId,type,icon,name,count,text,time,messageId,ownerId,senderId,activeState,activeType){
  let sqlResult = db.selectSqlSync(`SELECT ID,COUNT FROM UNREAD_COUNT WHERE TARGET_ID='${targetId}' AND OWNER_ID='${ownerId}'`);
  let id=null;
  if(sqlResult.status&&sqlResult.data.length>0){
    id = sqlResult.data[0].ID;
  }
  let data;
  if(id){
    data = db.updateSqlSync('UNREAD_COUNT', ['COUNT','TEXT','TIME','MESSAGE_ID','SENGUSER_ID'], [parseInt(sqlResult.data[0].COUNT||0)+(count==0?0:1),text,Math.floor(time/1000),messageId,senderId], `ID=${id}`);
  }else{
    data = db.insertSqlSync('UNREAD_COUNT', ['TARGET_ID','TYPE','ICON','NAME','COUNT','TEXT','TIME','OWNER_ID','MESSAGE_ID','STICK','ACTIVE_STATE','ACTIVE_TYPE','SENGUSER_ID'], [targetId,type,icon,name,count,text,Math.floor(time/1000),ownerId,messageId,0,activeState,activeType,senderId]);
  }
  return data;
}
db. deleteCount=function(targetId,ownerId){
  db. deleteSqlSync('UNREAD_COUNT',`TARGET_ID='${targetId}' AND OWNER_ID='${ownerId}'`)
  db. deleteSqlSync('CONVERSATION',`TARGET_ID='${targetId}' AND OWNER_ID='${ownerId}'`)
}
db. stickCount=function(targetId,ownerId,stick){//置顶
  return db.updateSqlSync('UNREAD_COUNT', ['STICK'], [stick], `TARGET_ID='${targetId}' AND OWNER_ID='${ownerId}'`);
}
db. resetCount=function(targetId,ownerId){
  if(store.state.isBrowser){
    let count = 0;
    let arr = store.state.rongConversationList.map(v=>{
      if(v.targetId == targetId){
        v.count = 0;
      }
      count = count+parseInt(v.count);
      return v;
    })
    let obj = store.state.webMessageStorage;
    let webcount = 0;
    let arr2 = obj.rongConversationList.map(v=>{
      if(v.targetId == targetId){
        v.count = 0;
      }
      webcount = webcount+parseInt(v.count);
      return v;
    })
    obj.rongConversationList = arr2
    obj.unreadCount = webcount;
    store.commit('CHANGEWEBMESSAGESTORAGE',utils.deepCopy(obj));
    store.commit('CHANGERONGCONVERSATIONLIST',arr)
    store.commit('CHANGEUNREADCOUNT',count)
    return;
  }
  return db.updateSqlSync('UNREAD_COUNT', ['COUNT'], [0], `TARGET_ID='${targetId}' AND OWNER_ID='${ownerId}'`);
}
db. updateNotificationStatus=function(targetId,ownerId,notificationStatus){
  return db.updateSqlSync('UNREAD_COUNT', ['NOTIFICATION_STATUS'], [notificationStatus], `TARGET_ID='${targetId}' AND OWNER_ID='${ownerId}'`);
}
db. insertConversation=function(targetId,type,userIcon,userName,userId,text,time,remark,ownerId,location,img,audio,messageId,lon,lat){
  let data = db.insertSqlSync('CONVERSATION', ['TARGET_ID','TYPE','USER_ICON','USER_NAME','USER_ID','TEXT','TIME','REMARK','OWNER_ID','LOCATION','IMG','AUDIO','MESSAGE_ID','LON','LAT'], [targetId,type,userIcon,userName,userId,text,Math.floor(time/1000),remark,ownerId,location,img,audio,messageId,lon,lat]);
  return data;
}
//保存礼物接口
db. insertGift=function(targetId,type,userIcon,userName,userId,time,remark,ownerId,messageId,giftId,giftImage,giftName,giftJiaobi){
  let data = db.insertSqlSync('CONVERSATION', ['TARGET_ID','TYPE','USER_ICON','USER_NAME','USER_ID','TIME','REMARK','OWNER_ID','MESSAGE_ID','GIFT_ID','GIFT_IMAGE','GIFT_NAME','GIFT_JIAOBI'], [targetId,type,userIcon,userName,userId,Math.floor(time/1000),remark,ownerId,messageId,giftId,giftImage,giftName,giftJiaobi]);
  return data;
}
db. insertOrUpdateUser=function(userArr,ownerId){
  for(let i in userArr){
    let user = userArr[i];
    let sqlResult = db.selectSqlSync(`SELECT USER_ID FROM USER WHERE USER_ID='${user.userId}'`);
    if(sqlResult.data.length > 0){
      db.updateSqlSync("USER", ['NAME','ICON'], [user.userName,user.userIcon], " USER_ID='"+user.userId+"'");
    } else {
      db.insertSqlSync("USER", ['USER_ID','NAME','ICON','OWNER_ID'], [user.userId,user.userName,user.userIcon,ownerId]);
    }
  }
}
db.getUnreadCountList=function(ownerId,text){
  let sql = 'SELECT a.TARGET_ID as targetId,a.TYPE as type,a.ICON as icon,a.NAME as name,' +
    ' a.COUNT as count,a.TEXT as text,datetime(a.[TIME], \'unixepoch\', \'localtime\') as time,a.MESSAGE_ID as messageId,a.STICK as stick,a.ACTIVE_STATE as activeState,a.ACTIVE_TYPE as activeType,a.NOTIFICATION_STATUS as notificationStatus,' +
    ' b.[ICON] as bicon,b.[NAME] as bname,c.[NAME] as cname' +
    ' FROM UNREAD_COUNT a left join USER b on a.TARGET_ID = b.[USER_ID] left join USER c on a.SENGUSER_ID = c.[USER_ID]' +
    ' where a.[OWNER_ID]=\''+ownerId+'\'' ;
  if(text){
    sql += ' and (b.[NAME] like \'%'+text+'%\' or a.NAME like \'%'+text+'%\')';
  }
  sql +=' order by a.STICK desc,a.[TIME] desc';
  let data = db.selectSqlSync(sql)
  if(data.status){
    return data.data;
  }else{
    return []
  }
}
db.getUnreadCount=function(ownerId){
  let data = db.selectSqlSync(`SELECT COALESCE(SUM(COUNT),0) AS COUNT FROM UNREAD_COUNT WHERE OWNER_ID='${ownerId}' AND (NOTIFICATION_STATUS='1' or NOTIFICATION_STATUS is null) `)
  if(data.status&&data.data.length>0){
    return data.data[0].COUNT;
  }else{
    return 0
  }
}
db. getNotificationStatus=function(targetId,ownerId){
  let data = db.selectSqlSync(`SELECT NOTIFICATION_STATUS FROM UNREAD_COUNT WHERE TARGET_ID='${targetId}' AND OWNER_ID='${ownerId}'`)
  if(data.data.length > 0){
    return data.data[0].NOTIFICATION_STATUS;
  }
  return '';
}
db.getUserIdArr=function(ownerId){
  let data = db.selectSqlSync(`SELECT TARGET_ID FROM UNREAD_COUNT WHERE TYPE=1 AND OWNER_ID='${ownerId}'`)
  return data;
}
db.getUser=function(userId){
  let data = db.selectSqlSync(`SELECT USER_ID FROM USER WHERE USER_ID='${userId}'`)
  return data.data.length > 0;
}
db.getUserName=function(userId){
  let data = db.selectSqlSync(`SELECT NAME FROM USER WHERE USER_ID='${userId}'`)
  if(data.data.length > 0){
    return data.data[0].NAME;
  }
  return '';
}
db.getConversation=function(targetId,ownerId,limit){
  let data = db.selectSqlSync(`select * from (SELECT a.[ID] as id, a.TARGET_ID as targetId,a.TYPE as type,a.USER_ICON as icon,a.USER_NAME as name, a.USER_ID as userId,a.TEXT as message,datetime(a.[TIME], 'unixepoch', 'localtime') as time,b.[ICON] as bicon,b.[NAME] as bname ,a.REMARK as remark ,a.LOCATION as location,a.LON as lon,a.LAT as lat ,a.IMG as img,a.AUDIO as audio,a.MESSAGE_ID as messageId,a.GIFT_ID as giftId,a.GIFT_IMAGE as giftImage,a.GIFT_NAME as giftName,a.GIFT_JIAOBI as giftJiaobi FROM CONVERSATION a left join USER b on a.[USER_ID] = b.[USER_ID] where a.[OWNER_ID]='${ownerId}' and a.TARGET_ID='${targetId}' order by a.[TIME] desc limit ${limit}) order by time`)
  if(data.status&&data.data.length>0){
    return data.data;
  }else{
    return []
  }
}

//消息 互动消息
db.insertActiveMessage=function(obj,ownerId){
  return db.insertSqlSync("ACTIVE_MESSAGE", ['NAME','SEX','AGE','ICON','TEXT','TIME','MOMENT_TEXT','MOMENT_IMG','URL','OWNER_ID'], [obj.name,obj.sex,obj.age,obj.icon,obj.text,Math.floor(obj.time/1000),obj.momentText,obj.momentImg,obj.url,ownerId]);
}
db.getActiveMessage=function(ownerId){
  if(store.state.isBrowser){
    return store.state.webActiveMessageList;
  }
  let data = db.selectSqlSync(`SELECT ID,NAME,SEX,AGE,ICON,TEXT,datetime(TIME, 'unixepoch', 'localtime') as time ,MOMENT_TEXT,MOMENT_IMG,URL from ACTIVE_MESSAGE where OWNER_ID='${ownerId}' order by TIME desc limit 300 `);
  if(data.status&&data.data.length>0){
    return data.data;
  }else{
    return []
  }
}

//系统消息详情
db.insertSystemMessageDetails=function(obj,ownerId){
  return db.insertSqlSync("SYSTEM_MESSAGE_DETAILS", ['TYPE','NAME','TEXT','TIME','OWNER_ID','URL','CONTENT_TYPE','CONSUME'], [obj.type,obj.name,obj.text,Math.floor(obj.time/1000),ownerId,obj.url,obj.contentType,0]);
}
db.setConsume=function(detailId,ownerId){
  if(store.state.isBrowser){
    let arr = store.state.webSystemMessageDetailsList.map(v=>{
      if(v.ID == detailId){
        v.CONSUME = 1;
      }
      return v;
    })
    store.commit('CHANGEWEBSYSTEMMESSAGEDETAILSLIST',arr)
    return;
  }
  db.updateSqlSync('SYSTEM_MESSAGE_DETAILS', ['CONSUME'], [1], `ID='${detailId}' AND OWNER_ID='${ownerId}'`);
},
db.getSystemMessageDetails=function(type,ownerId){
  if(store.state.isBrowser){
    let arr = store.state.webSystemMessageDetailsList.filter(v=>{
      return v.TYPE == type
    })
    return arr;
  }
  let data = db.selectSqlSync(`SELECT ID,TYPE,NAME,TEXT,datetime(TIME, 'unixepoch', 'localtime') as time ,OWNER_ID,URL,CONTENT_TYPE,CONSUME from SYSTEM_MESSAGE_DETAILS where OWNER_ID='${ownerId}' and TYPE='${type}'  order by TIME desc limit 300 `);
  if(data.status&&data.data.length>0){
    return data.data;
  }else{
    return []
  }
}

//系统消息列表
db.insertOrUpdateSystemMessage=function(obj,ownerId){
  let sqlResult = db.selectSqlSync(`SELECT ID,COUNT FROM SYSTEM_MESSAGE WHERE TYPE='${obj.type}' AND OWNER_ID='${ownerId}'`);
  let id=null;
  if(sqlResult.status&&sqlResult.data.length>0){
    id = sqlResult.data[0].ID;
  }
  let data;
  if(id){
    data = db.updateSqlSync('SYSTEM_MESSAGE', ['COUNT','TEXT','TIME','MESSAGE_ID'], [parseInt(sqlResult.data[0].COUNT||0)+(obj.count==0?0:1),obj.text,Math.floor(obj.time/1000),obj.messageId], `ID=${id}`);
  }else{
    data = db.insertSqlSync("SYSTEM_MESSAGE", ['TYPE','NAME','COUNT','TEXT','TIME','OWNER_ID','MESSAGE_ID'], [obj.type,obj.name,obj.count,obj.text,Math.floor(obj.time/1000),ownerId,obj.messageId]);
  }
  return data;
}
db.getSystemMessage=function(ownerId){
  if(store.state.isBrowser){
    return store.state.webSystemMessageList;
  }
  let data = db.selectSqlSync(`SELECT ID,TYPE,NAME,COUNT,TEXT,datetime(TIME, 'unixepoch', 'localtime') as time ,OWNER_ID,MESSAGE_ID from SYSTEM_MESSAGE where OWNER_ID='${ownerId}'  order by TIME desc`);
  if(data.status&&data.data.length>0){
    return data.data;
  }else{
    return []
  }
}
//全标已读
db. resetSystemMessage=function(ownerId,type){
  if(store.state.isBrowser){
    let arr = store.state.webSystemMessageList.map(v=>{
      if(v.TYPE == type){
        v.COUNT = 0;
      }
      return v;
    })
    store.commit('CHANGEWEBSYSTEMMESSAGELIST',arr)
    return;
  }
  if(type){
    db.updateSqlSync('SYSTEM_MESSAGE', ['COUNT'], [0], `type='${type}' AND OWNER_ID='${ownerId}'`);
  }else{
    db.updateSqlSync('SYSTEM_MESSAGE', ['COUNT'], [0], `OWNER_ID='${ownerId}'`);
  }
}

db. deleteNotice=function(ownerId,type){
  db. deleteSqlSync('SYSTEM_MESSAGE_DETAILS',`OWNER_ID='${ownerId}' and TYPE='${type}'`)
  db. resetSystemMessage(ownerId,type)
  db.insertOrUpdateSystemMessage({
    type:type,
    name:type==1?'用户中心':type==2?'活动通知':'资金中心',
    count:0,
    text:'暂无新消息',
    time:new Date().getTime(),
    messageId:'000001',
  },ownerId)
  let sqlResult = db.selectSqlSync(`SELECT ID,TEXT FROM SYSTEM_MESSAGE WHERE TYPE!='${type}' AND OWNER_ID='${ownerId}' order by TIME desc `);
  if(sqlResult.status&&sqlResult.data.length>0){
    let text = sqlResult.data[0].TEXT;
    db.insertOrUpdateUnreadCount('001',5,'','',0,text,new Date().getTime(),'000001',ownerId,'')
  }
}

//初始化消息
db. insertUnreadCountMessage=function(ownerId){
  if(store.state.isBrowser){
    let arr = [{"targetId":"001","type":"5","icon":"","name":"","count":"0","text":"暂无系统消息","time":utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),"messageId":"","stick":"2","activeState":"","activeType":"","notificationStatus":"","bicon":"","bname":"","cname":""},{"targetId":"002","type":"6","icon":"","name":"","count":"0","text":"暂无互动消息","time":utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),"messageId":"","stick":"2","activeState":"","activeType":"","notificationStatus":"","bicon":"","bname":"","cname":""}]
    let arr2 = [{"ID":"1","TYPE":"1","NAME":"用户中心","COUNT":"0","TEXT":"暂无新消息","time":utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),"MESSAGE_ID":"000001"},{"ID":"2","TYPE":"2","NAME":"活动通知","COUNT":"0","TEXT":"暂无新消息","time":utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),"MESSAGE_ID":""},{"ID":"3","TYPE":"3","NAME":"资金中心","COUNT":"0","TEXT":"暂无新消息","time":utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),"MESSAGE_ID":""}]
    store.commit('CHANGERONGCONVERSATIONLIST',arr)
    store.commit('CHANGEWEBSYSTEMMESSAGELIST',arr2)
    store.commit('CHANGEUNREADCOUNT',0)
    return false;
  }
  let sqlResult = db.selectSqlSync(`SELECT ID,COUNT FROM UNREAD_COUNT WHERE type='5' AND OWNER_ID='${ownerId}'`);
  if(sqlResult.status&&sqlResult.data.length>0){
  }else{
    db.insertSqlSync('UNREAD_COUNT', ['TARGET_ID','TYPE','COUNT','TEXT','TIME','OWNER_ID','STICK'], ['001',5,0,'暂无系统消息',Math.floor(new Date().getTime()/1000),ownerId,2]);
  }
  let sqlResult1 = db.selectSqlSync(`SELECT ID,COUNT FROM UNREAD_COUNT WHERE type='6' AND OWNER_ID='${ownerId}'`);
  if(sqlResult1.status&&sqlResult1.data.length>0){
  }else{
    db.insertSqlSync('UNREAD_COUNT', ['TARGET_ID','TYPE','COUNT','TEXT','TIME','OWNER_ID','STICK'], ['002',6,0,'暂无互动消息',Math.floor(new Date().getTime()/1000),ownerId,2]);
  }
  let sqlResult2 = db.selectSqlSync(`SELECT ID FROM SYSTEM_MESSAGE WHERE type='1' AND OWNER_ID='${ownerId}'`);
  if(sqlResult2.status&&sqlResult2.data.length>0){
  }else{
    db.insertSqlSync('SYSTEM_MESSAGE', ['TYPE','NAME','COUNT','TEXT','TIME','OWNER_ID'], [1,'用户中心',0,'暂无新消息',Math.floor(new Date().getTime()/1000),ownerId]);
  }
  let sqlResult3 = db.selectSqlSync(`SELECT ID FROM SYSTEM_MESSAGE WHERE type='2' AND OWNER_ID='${ownerId}'`);
  if(sqlResult3.status&&sqlResult3.data.length>0){
  }else{
    db.insertSqlSync('SYSTEM_MESSAGE', ['TYPE','NAME','COUNT','TEXT','TIME','OWNER_ID'], [2,'活动通知',0,'暂无新消息',Math.floor(new Date().getTime()/1000),ownerId]);
  }
  let sqlResult4 = db.selectSqlSync(`SELECT ID FROM SYSTEM_MESSAGE WHERE type='3' AND OWNER_ID='${ownerId}'`);
  if(sqlResult4.status&&sqlResult4.data.length>0){
  }else{
    db.insertSqlSync('SYSTEM_MESSAGE', ['TYPE','NAME','COUNT','TEXT','TIME','OWNER_ID'], [3,'资金中心',0,'暂无新消息',Math.floor(new Date().getTime()/1000),ownerId]);
  }
}
export default db;
