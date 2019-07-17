import http from '@/utils/http';
import {store} from '../store/index';
let server = {};
//获取基础配置信息
server. getBaseConfig=(data,config)=>{
  return	http.get("/api/apiDict/getBaseConfig",data,config);
}
//获取服务器时间
server. sysdate=(data,config)=>{
  return	http.get("/api/server/sysdate",data,config);
}
server. login=(data,config)=>{
  return	http.post("/api/account/login",data,config);
}
//快速登录接口
server. loginAndRegister=(data,config)=>{
  return	http.post("/api/account/loginAndRegister",data,config);
}
server. uploadPic=(data,config)=>{
  return	http.postImg("/api/user/upload_pic",data,config);
}
server. uploadFile=(fileUrl,fb)=>{
  return http.uploadFile("/api/user/upload_pic",fileUrl,fb)
}
server. getUserInfo=(data,config)=>{
  // const userInfo = window.$api.getStorage('userInfo');
  // if(userInfo){
  //   store.commit("LOGIN",userInfo);
  //   return Promise.resolve({
  //     data:{
  //       data:userInfo
  //     }
  //   })
  // }
  return	http.get("/api/user/profile",data,config);
}
//批量获取用户头像昵称
server. batchProfilePhoto=(data,config)=>{
  return	http.post("/api/user/batchProfilePhoto",data,config);
}
//用户主页
server. userHomePage=(data,config)=>{
  return	http.get("/api/user/userHomePage",data,config);
}
//查找娇友
server. getUserByPhoneAndName=(data,config)=>{
  return	http.get("/api/user/getUserByPhoneAndName",data,config);
}
server. get_code=(data,config)=>{
  return	http.post("/api/account/get_code",data,config);
}
server. register=(data,config)=>{
  return	http.post("/api/account/register",data,config);
}
server. getRongYunToken=(data,config)=>{
  return	http.post("/api/im/user/getToken",data,config);
}
server. update_profile=(data,config)=>{
  return	http.putForm("/api/user/update_profile",data,config);
}
//提交极光推送设备号
server. update_ajpush=(deviceId,data,config)=>{
  return	http.put("/api/user/device/"+deviceId,data,config);
}
//获取历史消息
server. getImMessageList=(data,config)=>{
  return	http.get("/im/message/list",data,config);
}
server. getImMessageListList=(data,config)=>{
  return	http.get("/im/message/message/list",data,config);
}
//获取消息数据
server. getMessageList=(data,config)=>{
  return	http.get("/api/message/getList",data,config);
}

//获取签到记录列表
server. recordSigninList=(data,config)=>{
  return	http.get("/api/signin/recordList",data,config);
}
//签到
server. signin=(data,config)=>{
  return	http.post("/api/signin/signin",data,config);
}
//拉黑
server. joinBlacklist=(beUserID,data,config)=>{
  return	http.post("/api/myFriends/blacklist/"+beUserID,data,config);
}
//解除拉黑
server. outBlacklist=(beUserID,data,config)=>{
  return	http.post("/api/myFriends/unBlacklist/"+beUserID,data,config);
}
//黑名单列表
server. getUserBlacklist=(beUserID,data,config)=>{
  return	http.get("/api/myFriends/getUserBlacklist",data,config);
}
//字典
server. apiDict=(data,config)=>{
  return	http.get("/api/apiDict",data,config);
}
//字典
server. enum=(data,config)=>{
  return	http.get("/api/apiDict/enum",data,config);
}
//忘记密码
server. forgetPwd=(data,config)=>{
    return	http.put("/api/account/forget_pwd",data,config);
}
//修改密码
server. changPwd=(data,config)=>{
  return	http.put("/api/user/changPwd",data,config);
}
//首页广告列表
server. indexAdList=(data,config)=>{
  return	http.get("/api/ad/indexAdList",data,config);
}
//活动列表
server. activityInfoList=(data,config)=>{
  return	http.get("/api/bestStar/activityInfoList",data,config);
}
//我的动态
server. getMyList=(data,config)=>{
  return	http.get("/api/feed/getMyList",data,config);
}
//查看指定某人的动态
server.getList=(data,config)=>{
  return	http.get("/api/feed/getList",data,config);
}
//删除朋友圈动态
server. delete=(data,config)=>{
  return	http.delete("/api/feed/delete",data,config);
}
//删除朋友圈动态
server.delDynamic=(id,data,config)=>{
  return	http.delete("/api/feed/delete/"+id,data,config);
}

//把某条朋友圈设置为公开
server. feedOpen=(data,config)=>{
  return	http.put("/api/feed/open",data,config);
}
//修改某条朋友圈动态的私密属性
server. feedPrivate=(data,config)=>{
  return	http.put("/api/feed/private",data,config);
}
//附近的人
server. nearUser=(data,config)=>{
  return	http.get("/api/user/nearUser",data,config);
}
//发布活动
server. publish=(data,config)=>{
  return	http.post("/api/dating/publish",data,config);
}
//获取省市区
server. getDistrict=(data,config)=>{
  return	http.get("/api/district/all",data,config);
}
//娇缘活动列表
server. searchDatingList=(data,config)=>{
  return	http.get("/api/dating/searchDatingList",data,config);
}
//娇缘活动详情
server. getSingle=(data,config)=>{
  return	http.get("/api/dating/getSingle",data,config);
}
//最美娇友总榜
server. candidateVoteStatTotal=(data,config)=>{
  return	http.get("/api/bestStar/candidateVoteStatTotal",data,config);
}
//最美娇友日榜
server. candidateVoteStatDayly=(data,config)=>{
  return	http.get("/api/bestStar/candidateVoteStatDayly",data,config);
}
//最美娇友周榜
server. candidateVoteStatWeekly=(data,config)=>{
  return	http.get("/api/bestStar/candidateVoteStatWeekly",data,config);
}
//最美娇友月榜
server. candidateVoteStatMonthly=(data,config)=>{
  return	http.get("/api/bestStar/candidateVoteStatMonthly",data,config);
}
//最美娇友打赏
server. activityVotePay=(activityId,candidateId,data,config)=>{
  return	http.put("/api/bestStar/activityVotePay/"+activityId+"/"+candidateId,data,config);
}
//最美娇友投票
server. activityVote=(activityId,candidateId,data,config)=>{
  return	http.put("/api/bestStar/activityVote/"+activityId+"/"+candidateId,data,config);
}
//获取当前的活动
server.getUnderwayActivity=(data,config)=>{
  return http.get("/api/bestStar/getUnderwayActivity",data,config);
}
//活动详情
server.activityInfo=(activityId,data,config)=>{
  return http.get("/api/bestStar/activityInfo/"+activityId,data,config);
}
//活动报名选手列表
server.activityCandidateInfoList=(activityId,data,config)=>{
  return http.get("/api/bestStar/activityCandidateInfoList/"+activityId,data,config);
}
//当前用户活动报名
server.activityInfoSign=(activityId,data,config)=>{
  return http.put("/api/bestStar/activityInfoSign/"+activityId,data,config);
}
//当前用户取消活动报名
server.activityInfoSignCancel=(activityId,data,config)=>{
  return http.delete("/api/bestStar/activityInfoSignCancel/"+activityId,data,config);
}
//好友列表
server. myFriendsList=(data,config)=>{
  return	http.get("/api/myFriends/myFriendsList",data,config);
}
//关注列表
server. myFocusOnList=(data,config)=>{
  return	http.get("/api/myFriends/myFocusOnList",data,config);
}
//粉丝列表
server. myFansList=(data,config)=>{
  return	http.get("/api/myFriends/myFansList",data,config);
}
//群聊列表
server. chatGroupList=(data,config)=>{
  return	http.get("/api/chatGroup/chatGroupList",data,config);
}
//最近来访列表
server. visitor=(data,config)=>{
  return	http.get("/api/user/visitor",data,config);
}
//最近足迹列表
server. footprint=(data,config)=>{
  return	http.get("/api/user/footprint",data,config);
}
//获取礼物列表
server. getGiftList=(data,config)=>{
  return	http.get("/api/gift/list",data,config);
}
//打赏礼物
server. giveGift=(data,config)=>{
  return	http.postForm("/api/userGift/give",data,config);
}
//聊天室打赏礼物
server.chartroomGift=(data,config)=>{
  return	http.postForm("/api/userGift/chartroom_give",data,config);
}

//充值套餐列表
server.rechargePackage=(data,config)=>{
  return	http.get("/api/rechargePackage/list",data,config);
}
//套餐生成订单
server.rechargePurchase=(data,config)=>{
  return	http.postForm("/api/recharge/purchase",data,config);
}
//支付订单
server.payOrder=(data,config)=>{
  return	http.postForm("/api/pay/payOrder",data,config);
}
//苹果支付
server.setIapCertificate=(data,config)=>{
  return	http.postForm("/api/iap/setIapCertificate",data,config);
}
//收支明细
server.getBill=(data,config)=>{
  return	http.get("/api/record/myList",data,config);
}
//用户认证
server.userCertification=(data,config)=>{
  return	http.post("/api/user/userCertification",data,config);
}
//获取认证信息
server.certificationInfo=(type,data,config)=>{
  return	http.get("/api/user/certificationInfo/"+type,data,config);
}
//获取用户信息(弃用 .使用 getUserInfo)
server.profile=(data,config)=>{
  return	http.get("/api/user/profile",data,config);
}
//获取用户新最近访问的数量、好友以及粉丝数量
server.userUnreadVisitNumer=(data,config)=>{
  return	http.get("/api/user/userUnreadVisitNumer",data,config);
}
//查询用户当前的乾坤币
server.getUserMoney=(data,config)=>{
	return	http.get("/api/user/getUserMoney",data,config);
}
//发布头条
server.postArt=(data,config)=>{
	return http.postForm("/api/article/create",data,config);
}
//推荐的文章头条
server.getArt=(data,config)=>{
	return http.get("/api/article/recommend",data,config);
}
//文章列表
server.getArtList=(data,config)=>{
	return http.get("/api//article/list",data,config);
}
//我的文章列表
server.getMyArtList=(data,config)=>{
	return http.get("/api/article/myList",data,config);
}

//文章详情
server.getArtDesc=(id,data,config)=>{
	return http.get("/api/article/get/"+id,data,config);
}
//发表评论
server.postComment=(data,config)=>{
	return http.post("/api/comment/create",data,config);
}
//参加活动接口
server. candidate=(data,config)=>{
  return http.post("/api/dating/candidate",data,config);
}
//取消参加活动接口
server. unCandidate=(data,config)=>{
  return http.post("/api/dating/unCandidate",data,config);
}
//关注活动
server. followActivity=(id,data,config)=>{
  return	http.put("/api/dating/follow/"+id,data,config);
}
//取消关注活动
server. unfollowActivity=(id,data,config)=>{
  return	http.put("/api/dating/unfollow/"+id,data,config);
}
//关注用户
server.followFriend=(id,data,config)=>{
  return http.post("/api/myFriends/follow/"+id,data,config);
}
//取消关注用户
server.unfollowFriend=(id,data,config)=>{
  return http.post("/api/myFriends/unfollow/"+id,data,config);
}
//获取汽车品牌信息
server.getCarBrandInfo=(data,config)=>{
  return	http.get("/api/user/getCarBrandInfo",data,config);
}
//根据品牌获取车类型信息
server.getCarTypeInfo=(id,data,config)=>{
  return http.get("/api/user/getCarTypeInfo/"+id,data,config);
}
//竞缘加价
server.jyAddPrice=(data,config)=>{
  return http.post("/api/scene/compete/add",data,config);
}
//竞缘活动状态
server.jyActStatus=(data,config)=>{
  return http.get("/api/scene/compete/dating_status",data,config);
}
//抢缘活动状态
server.qyActStatus=(data,config)=>{
  return http.get("/api/scene/robbing/dating_status",data,config);
}
//更新抢缘点击次数
server.robbingTime=(data,config)=>{
  return http.post("/api/scene/robbing/add_times",data,config);
}
//选缘活动状态
server.xyActStatus=(data,config)=>{
  return http.get("/api/scene/choice/dating_status",data,config);
}
//获取活动状态
server.actStatus=(data,config)=>{
  return http.get("/api/scene/dating/dating_status",data,config);
}

//选缘选择对象
server.xySelect=(data,config)=>{
  return http.post("/api/scene/choice/choice_win",data,config);
}

//活动活跃度排行榜(报名人员列表)
server.getDatingCandidateList=(data,config)=>{
  return http.get("/api/dating/getDatingCandidateList",data,config);
}
//我参加的活动接口（我的邀约：已参加）
server.getMyCandidateDating=(data,config)=>{
  return	http.get("/api/dating/getMyCandidateDating",data,config);
}
//我关注的活动（我的邀约：已关注）
server.getMyFollowDating=(data,config)=>{
  return	http.get("/api/dating/getMyFollowDating",data,config);
}
//我发布的活动（我的邀约：已发起）
server.getMyPublishDating=(data,config)=>{
  return	http.get("/api/dating/getMyPublishDating",data,config);
}
//我的待评价的活动（我的邀约：待评价）
server.get2CommentDating=(data,config)=>{
  return	http.get("/api/dating/get2CommentDating",data,config);
}
//获取所有的保证金等级
server.bondList=(data,config)=>{
  return http.get("/api//bond/list",data,config);
}
//可提现余额的 收支明细
server.myRechargeList=(data,config)=>{
  return http.get("/api/recharge/myList",data,config);
}
//充值套餐或者保证金的记录
server.cashRecordList=(data,config)=>{
  return http.get("/api/cashRecord/myList",data,config);
}
//保证金生成订单
server.rechargeBond=(data,config)=>{
  return	http.postForm("/api/recharge/bond",data,config);
}
//发布朋友圈
server.feedPublish=(data,config)=>{
  return http.postForm("/api/feed/publish",data,config);
}
//查看我的朋友圈
server.getDynamic=(data,config)=>{
  return http.get("/api/feed/getDynamic",data,config);
}
//公开点赞的接口
server.fabulousPublic=(data,config)=>{
  return http.postForm("/api/fabulous/createPublic",data,config);
}
//私密点赞接口
server.fabulousPrivate=(data,config)=>{
  return http.postForm("/api/fabulous/createPrivate",data,config);
}
//取消点赞接口
server.delFabulous=(id,data,config)=>{
  return http.post("/api/fabulous/delete/"+id,data,config);
}
//评论列表
server.commentList=(data,config)=>{
  return http.get("/api/comment/list",data,config);
}
//评论详情
server.commentDetail=(id,data,config)=>{
  return http.get("/api/comment/detail/"+id,data,config);
}
//查看动态详情
server.getFeedInfo=(id,data,config)=>{
  return http.get("/api/feed/get/"+id,data,config);
}
//查询今日收益
server.getDayCount=(data,config)=>{
  return http.get("/api/cashRecord/dayCount",data,config);
}
//查询用户可提现的余额
server.getUserIncome=(data,config)=>{
  return http.get("/api/user/getUserIncome",data,config);
}
//置顶约会活动
server. toTop=(id,data,config)=>{
  return	http.put("/api/dating/toTop/"+id,data,config);
}
//取消置顶约会活动
server. unToTop=(id,data,config)=>{
  return	http.put("/api/dating/unToTop/"+id,data,config);
}
//取消邀约（删除邀约）
server. unPublish=(data,config)=>{
  return	http.post("/api/dating/unPublish",data,config);
}
//中缘抽奖
server.prize=(data,config)=>{
  return http.post("/api/scene/win/prize",data,config);
}
//查询赠送给我的礼物列表
server.getUserGift=(data,config)=>{
  return http.get("/api/userGift/list",data,config);
}
//查询我的赠送的礼物列表
server.getUserMyGift=(data,config)=>{
  return http.get("/api/userGift/myList",data,config);
}
//我收到礼物的数量
server.giftCount=(data,config)=>{
  return http.get("/api/userGift/giftCount",data,config);
}
//获取我赠送礼物的总数量
server.myGiftCount=(data,config)=>{
  return http.get("/api/userGift/myGiftCount",data,config);
}
//获取最近开始的活动时间
server.closestActivityTime=(data,config)=>{
  return http.get("/api/dating/closestActivityTime",data,config);
}
//统计某月的收入支出统计
server.recordCount=(data,config)=>{
  return	http.get("/api/record/count",data,config);
}
//查询是否有新的动态
server.getNewFeed=(data,config)=>{
  return	http.get("/api/feed/getNewFeed",data,config);
}
//我报名的活动列表（人气活动（已报名列表））
server.myActivityInfoList=(data,config)=>{
  return http.get("/api/bestStar/myActivityInfoList",data,config);
}
//微信登录
server.wxLogin=(data,config)=>{
  return	http.postForm("/api/account/weiXinLogin",data,config);
}
//QQ登录
server. qqLogin=(data,config)=>{
  return	http.postForm("/api/account/qqLogin",data,config);
}
//用户绑定QQ登录
server. bindqq=(data,config)=>{
  return	http.postForm("/api/user/bindingQq",data,config);
}
//解除微信绑定
server. untiewechat=(data,config)=>{
  return	http.postForm("/api/user/untieWx",data,config);
}
//解除QQ绑定
server. untieqq=(data,config)=>{
  return	http.postForm("/api/user/untieQq",data,config);
}
//绑定微信
server. bindwx=(data,config)=>{
  return	http.postForm("/api/user/bindingWx",data,config);
}
//注册后完善资料的接口
server. update_register=(data,config)=>{
  return	http.put("/api/user/update_register",data,config);
}
//版本检查更新
server.appVersion=(data,config)=>{
  return http.get("/api/appVersion/getMyList",data,config);
}
//换绑手机
server.updatePhone=(data,config)=>{
  return http.postForm("/api/user/updatePhone",data,config);
}
//离开活动
server. actLeave=(data,config)=>{
  return	http.postForm("/api/scene/dating/leave",data,config);
}
//抽奖（试试娇气）
server.jqPrize=(data,config)=>{
  return http.post("/api/prize/prize",data,config);
}
//获取奖品列表(试试娇气奖品)
server.recordAllList=(data,config)=>{
  return http.get("/api/prize/recordAllList",data,config);
}
//获取我的奖品(试试娇气奖品)
server.recordList=(data,config)=>{
  return http.get("/api/prize/recordList",data,config);
}
//微信公众号登录
server.WxCheckLogin=(data,config)=>{
  return http.postForm("/api/account/publicAddressLogin",data,config);
}
//微信公众号的绑定接口
server.WxMpbind=(data,config)=>{
  return http.postForm("/api/user/bindingPublic",data,config);
}
//批量获取活动状态
server.getStatusBatch=(data,config)=>{
  return http.post("/api/dating/getStatusBatch",data,config);
}
//关注最美娇友活动
server. followZMJYActivity=(id,data,config)=>{
  return	http.put("/api/bestStar/follow/"+id,data,config);
}
//取消关注最美娇友活动
server. unfollowZMJYActivity=(id,data,config)=>{
  return	http.put("/api/bestStar/unfollow/"+id,data,config);
}
//我关注的娇友活动
server.myFollowActivityInfoList=(data,config)=>{
  return http.get("/api/bestStar/myFollowActivityInfoList",data,config);
}
//微信分享的令牌
server.wxSharesign=(data,config)=>{
  return http.get("/api/account/signature",data,config);
}
//绑定支付宝信息
server.aliBinding=(data,config)=>{
  return http.get("/api/ali/aliBinding",data,config);
}
//提现接口
server.extract=(data,config)=>{
  return http.postForm("/api/ali/extract",data,config);
}
//相亲活动列表
server.blindDatingList=(data,config)=>{
  return http.get("/api/blindDating/searchDatingList",data,config);
}
//获取相亲渠道信息
server.channelList=(data,config)=>{
  return http.get("/api/channel/list",data,config);
}
//发布相亲活动
server. publishBlindDate=(data,config)=>{
  return	http.post("/api/blindDating/publish",data,config);
}
//修改已发布的相亲活动
server. modifyBlindDate=(data,config)=>{
  return	http.post("/api/blindDating/modify",data,config);
}

//主持人活动按钮,点击就会下个环节
server.marriageBtn=(data,config)=>{
  return http.postForm("/api/scene/marriage2/dating_button",data,config);
}
//同意选择对方
server.marriageAgree=(data,config)=>{
  return http.post("/api/scene/marriage2/agree_like",data,config);
}
//相亲活动报名用户列表
server.blindDatingBaoming=(data,config)=>{
  return http.get("/api/blindDating/getDatingCandidateList",data,config);
}
server.blindDatingBaoming2=(data,config)=>{
  return http.get("/api/blindDating/getDatingUserList",data,config);
}


//保存我中意的接口
server.marriageLove=(data,config)=>{
  return http.post("/api/scene/marriage2/save_like",data,config);
}
//添加对某个人的好感度
server.addGood=(data,config)=>{
  return http.post("/api/scene/marriage2/add_good",data,config);
}
//取消对某个用户的好感度
server.deleteGood=(data,config)=>{
  return http.post("/api/scene/marriage2/delete_good",data,config);
}
//获取相亲活动详情
server.blindDatingSingle=(data,config)=>{
  return http.get("/api/blindDating/getSingle",data,config);
}
//关注相亲活动
server. followBlindDating=(id,data,config)=>{
  return	http.put("/api/blindDating/follow/"+id,data,config);
}
//取消关注相亲活动
server. unfollowBlindDating=(id,data,config)=>{
  return	http.put("/api/blindDating/unfollow/"+id,data,config);
}
//报名相亲活动
server. candidateBlindDating=(data,config)=>{
  return	http.post("/api/blindDating/candidate",data,config);
}
//取消报名相亲活动
server. unCandidateBlindDating=(data,config)=>{
  return	http.post("/api/blindDating/unCandidate",data,config);
}
//申请查看用户私密资料
server. applySeeUserPrivatedata=(id,data,config)=>{
  return	http.putForm("/api/user/applySeeUserPrivatedata/"+id,data,config);
}
//接受查看用户资料申请
server. acceptUserApply=(id,data,config)=>{
  return	http.put("/api/user/acceptUserApply/"+id,data,config);
}
//拒绝查看用户资料申请
server. refuseUserApply=(id,data,config)=>{
  return	http.put("/api/user/refuseUserApply/"+id,data,config);
}

//获取现场异性的人员
server.sceneCandi=(data,config)=>{
  return http.get("/api/scene/marriage2/scene_candidate",data,config);
}
//获取我好感的人
server.getGood=(data,config)=>{
  return http.get("/api/scene/marriage2/get_good",data,config);
}
//获取活动中对我好感的列表
server.getGoodList=(data,config)=>{
  return http.get("/api/scene/marriage2/get_goodList",data,config);
}
//相亲签到
server.blindDateSignIn=(data,config)=>{
  return http.post("/api/blindDating/sign_in",data,config);
}
//查询举办单位
server.getOrganizerList=(data,config)=>{
  return http.get("/api/host/list",data,config);
}
//同意抽奖
server.agreePrize=(data,config)=>{
  return http.post("/api/scene/marriage2/agree_prize",data,config);
}
//查询任务列表
server.getRewardEventList=(data,config)=>{
  return http.get("/api/rewardEvent/myList",data,config);
}
//完成分享任务
server.taskFinish=(data,config)=>{
  return http.postForm("/api/task/taskFinish",data,config);
}
//获取我的任务列表
server.myTask=(data,config)=>{
  return http.get("/api/rewardEvent/myList",data,config);
}
//从商城获取用户收货地址
server. getAppAddressList=(data,config)=>{
  return	http.postFormPhp("/mobile/user.php",data,config);
}
//从商城获取省,市，区
server. getRegion=(data,config)=>{
  return	http.postFormPhp("/mobile/region.php",data,config);
}
//从商城保存地址
server. saveAddress=(data,config)=>{
  return	http.postFormPhp("/mobile/user.php",data,config);
}
//接受，拒绝，折现
server. doGift=(data,config)=>{
  return	http.postFormPhp("/mobile/user.php",data,config);
}
//绑定微信公众号的openid
server.publicBindingOpenid=(data,config)=>{
  return http.get("/api/user/publicBindingOpenid",data,config);
}
//定时请求相亲
server.timeoutdatingStatus=(data,config)=>{//暂时弃用
  return http.get("/api/scene/marriage2/dating_status",data,config);
}
//
server.wxMpMedia=(data,config)=>{
  return http.get("/api/user/wx_mp_media",data,config);
}
//查询媒体
server.searchMedia=(data,config)=>{
  return http.postForm("/api/media/searchMedia",data,config);
}
//每次抽到一个用户
server.prizeUser=(data,config)=>{
  return http.postForm("/api/scene/marriage2/prize_user",data,config);
}
//抽奖
server.prePrize=(data,config)=>{
  return http.get("/api/prize/prePrize",data,config);
}
server.prizeNew=(data,config)=>{
  return http.postForm("/api/prize/prizeNew",data,config);
}
//微信注册完善资料接口
server.fillingData=(data,config)=>{
  return http.post("/api/account/fillingData",data,config);
}
//我的下级代理
server.lowerAgent=(data,config)=>{
  return http.postForm("/api/agent/lowerAgent",data,config);
}
//申请成为代理
server.applyAgent=(data,config)=>{
  return http.postForm("/api/ordAgent/apply",data,config);
}

//获取配置文件(相亲)(暂不用,在详情里返回了)
server.marriageConfig=(data,config)=>{
  return http.get("/api/scene/marriage2/config",data,config);
}
//保存单个意中人
server.saveSingleLike=(data,config)=>{
  return http.post("/api/scene/marriage2/save_single_like",data,config);
}
//取消保存中意的用户
server.cancelLike=(data,config)=>{
  return http.post("/api/scene/marriage2/cancel_like",data,config);
}

//活动进行前端手动按钮
server.datingStepButton=(data,config)=>{
  return http.postForm("/api/scene/marriage2/dating_step_button",data,config);
}
//公布匹配结果
server.publishMatch=(data,config)=>{
  return http.post("/api/scene/marriage2/publish_match",data,config);
}
//获取留言信息
server.getReceiverList=(data,config)=>{
  return http.get("/api/messageBoard/getReceiverList",data,config);
}
//发送广播留言
server.sendBroad=(data,config)=>{
  return http.post("/api/messageBoard/sendBroad",data,config);
}
//发送私聊留言
server.sendMessage=(data,config)=>{
  return http.post("/api/messageBoard/sendMessage",data,config);
}
//数量排名
server.getLikeList=(data,config)=>{
  return http.get("/api/user/getLikeList",data,config);
}

//更新是否加入奖池和是否公开资料
server.saveCandidateExt=(data,config)=>{
  return http.put("/api/scene/marriage2/save_candidate_ext",data,config);
}
//相亲人气排行
server.datingTaskRewardRanking=(data,config)=>{
  return http.get("/api/task/datingTaskRewardRanking",data,config);
}
//广场动态
server.feedNearby=(data,config)=>{
  return http.get("/api/feed/nearby",data,config);
}
//根据token拿用户信息(检查token是否过期)
server.getUserByToken=(data,config)=>{
  return http.get("/api/account/getUserByToken",data,config);
}
//查询店铺类型
server.shopType=(data,config)=>{
  return http.post("/api/shopInfo/typeList",data,config);
}
//根据类型查询店铺
server.shopInfoList=(data,config)=>{
  return http.post("/api/shopInfo/list",data,config);
}
//根据类型查询店铺F
server.shopInfoList=(data,config)=>{
  return http.post("/api/shopInfo/list",data,config);
}
//获取申请查看私密的资料的列表
server.findApply=(data,config)=>{
  return http.get("/api/user/findApply",data,config);
}
//取消同意的
server.cancelAgree=(data,config)=>{
  return http.post("/api/scene/marriage2/cancel_agree",data,config);
}
//红娘
server.matchingRequest=(data,config)=>{
  return http.post("/api/matchingRequest/commit",data,config);
}
//能量排名
server.monthlyTaskRewardRanking=(data,config)=>{
  return http.get("/api/task/monthlyTaskRewardRanking",data,config);
}
//招商
server.zsCcommit=(data,config)=>{
  return http.post("/api/matchingRequest/commit",data,config);
}
//获取商城礼物
server.getshopgift=(queryString,data,config)=>{
  return http.postFormPhp("/mobile/category.php?"+queryString,data,config);
}
//静默开关
server.updateSilentState=(data,config)=>{
  return http.post("/api/user/updateSilentState",data,config);
}
//获取数据日志
server.dataLog=(data,config)=>{
  return http.post("/api/data/dataLog",data,config);
}
//获取管理员和好友列表
server.blindDatingGetAdmin=(data,config)=>{
  return http.get("/api//blindDating/getAdmin",data,config);
}
//主持人在活动中设置管理员
server.blindDatingAddAdmin=(data,config)=>{
  return http.post("/api//blindDating/addAdmin",data,config);
}
//删除活动管理员
server.blindDatingDeleteAdmin=(data,config)=>{
  return http.post("/api//blindDating/deleteAdmin",data,config);
}
//获取我邀请的好友列表
server.userFromMe=(data,config)=>{
  return http.get("/api/user/userFromMe",data,config);
}
//邀请注册页面展示他的单身好友

export default server;
