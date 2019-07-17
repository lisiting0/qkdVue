import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
// import VueI18n from 'vue-i18n'
Vue.use(Vuex);
// Vue.use(VueI18n);

const state = {
  setTransactionListener:false,//苹果内购是否已设置监听
  changeTransaction:false,

  baseSize:parseInt(document.documentElement.style.fontSize),
  active: true,//app是否处在前台
  handleRoute: false,//安卓返回键是否操作路由,当值为false时，操作路由，当值为true时，将值改变为false
  
 /* phpURL: 'http://192.168.0.250:86',//读取后台配置
  imageUrl: 'http://192.168.0.250/userfiles/',//读取后台配置
  imageUploadUrl: 'http://192.168.0.250',//读取后台配置
  baseURL: 'http://192.168.0.250',
  baseFrontEndURL: 'http://192.168.0.250/wx/',
  baseShopMobileURL:'http://192.168.0.250/mobile/',
  socketUrl:'http://192.168.0.250:9091',*/
  
  
  phpURL: 'http://mis.iceinfo.net:86',
  imageUrl: 'http://mis.iceinfo.net/userfiles/',
  imageUploadUrl: 'http://mis.iceinfo.net',
  baseURL: 'http://mis.iceinfo.net',
  baseFrontEndURL: 'http://mis.iceinfo.net/wx/',
  baseShopMobileURL:'http://mis.iceinfo.net/mobile/',
  socketUrl:'http://112.74.160.195:9091',
  
  //baseURL: 'http://192.168.0.177:8080/jiaoyou-web',
  
  /*phpURL: 'http://mis.iceinfo.net:86',
  imageUrl: 'http://mis.iceinfo.net/userfiles/',
  imageUploadUrl: 'http://mis.iceinfo.net',
  baseURL: 'http://mis.iceinfo.net:8083',
  baseFrontEndURL: 'http://mis.iceinfo.net/wx/',
  baseShopMobileURL:'http://mis.iceinfo.net/mobile/',
  socketUrl:'http://112.74.160.195:8084',*/
  
 /* phpURL: 'http://qkd1.iceinfo.net:86',
  imageUrl: 'http://qkd1.iceinfo.net/userfiles/',
  imageUrlMin:'http://qkd1.iceinfo.net/userfiles/',//相亲现场的小图
  imageUploadUrl: 'http://qkd1.iceinfo.net',
  baseURL: 'http://qkd1.iceinfo.net',
  baseFrontEndURL: 'http://qkd1.iceinfo.net/wx/',
  baseShopMobileURL:'http://qkd1.iceinfo.net/mobile/',
  socketUrl:'http://112.74.160.195:9091',*/
  
 
   /*phpURL: 'http://qkd.iceinfo.net',
   imageUrl: 'http://qkd.iceinfo.net/userfiles/',
   imageUrlMin:'http://qkd.iceinfo.net/userfiles/',//相亲现场的小图
   imageUploadUrl: 'http://qkd.iceinfo.net',
   baseURL: 'http://qkd.iceinfo.net',
   baseFrontEndURL: 'http://qkd.iceinfo.net/wx/',
   baseShopMobileURL:'http://qkd.iceinfo.net/mobile/',
   socketUrl:'http://120.77.41.17:9091',*/
  
//   baseURL: 'http://192.168.0.237:8080/jiaoyou-web',
   
 //baseURL:'http://192.168.0.233:8081',
  //baseURL:'http://192.168.0.237:8080/jiaoyou-web',
  // baseURL:'http://192.168.0.161:8080/jiaoyou-web',
  longpress: {
    target: null,
    pageName: null,
    press: false,
  },
  scoketConnect:'disconnect',//disconnect 连接断开  connected  已连接 connectting  正在连接
  rongYunToken: '',
  rongCloud: null,
  unreadCount: 0,//未读消息数
  rongConversationList: [],//消息列表数据
  //浏览器消息
  webActiveMessageList:[],
  webSystemMessageList:[],
  webSystemMessageDetailsList:[],
  chcheMessageArr:[],//用户web端处理聊天消息临时存储
  doMessage:true,
  webMessageStorage:{
    unreadCount:0,//未读消息数
    rongConversationList:[],//消息列表数据
    userList:{},

  },//网页版应用时存储聊天信息key为targetClientId，单聊时为对方id，群聊时为群的id
  currentPrivateId: null,
  gift: {},
  giftObj: null,//聊天室收到的礼物
  broadObj:null,//相亲主持人发广播
  blindDateSigleObj:null,//相亲现场私聊命令信息
  currentChatRoomId: null,//当前正在参加活动的聊天室id
  chatRoomMessageList: [],//聊天室消息列表
  chatRoomInfo: null,//现场活动详情
  getNewMessage: false,
  registrationId: null,//极光推送设备号
  getNewNotice: false,
  syncState: true,
  Authorization: '',
  version: '0.1.2',//当前应用版本号
  userId: null,
  userInfo: {
    id: null,
    icon: '',
  },//用户信息
  //latitude: '', // 当前位置纬度
  //longitude: '', // 当前位置经度
  //city:'',//当前所在城市
  //isGetAddress:false,//是否已经获取过地址信息
  //isToCity:false,//是否已跳转过,定位失败首页会跳转到城市页面
  //address:'',//当前详细地址
  //isOtherCity:false,//是否使用其他城市
  //selectCityName:'',//选择其他城市
  //selectCityId:'',//选择其他城市id
  isLogin:false,//是否已经登录
  isCheck:false,//是否已经检查过登录
  redirect: '',//检查登录后回调的地址(待用2018.11.28)
  //checkFrom:null,//检查是Hbuild打开还是浏览器
  //myHistory:null,//记录浏览记录的
  pageSize: 10,//列表显示的条数
  //distance:500000000,//计算距离的
  //checkInTime:'',//酒店入住时间
  //checkOutTime:'',//酒店离店时间
  //language:null,//语言
  //AccessToken:"",//记录登录会话
  // languageImg:null,//语言对应的图片
  // isfirstHome:true,//是刚打开应用
  imgMaxSize: 1048576 * 10,//上传图片最大值(待用2018.11.28)
  // minHeight:null,//app初始的页面高度
  cachelist: {},//记录页面切换缓存
  cachelistUrl: [//能页面切换缓存的url
	"/api/record/myList",
	"/api/recharge/myList",
	"/api/cashRecord/myList",
	"/api//userGift/list",
	"/api/userGift/myList",
	"/api/record/count",
	"/api/userGift/giftCount",
	"/api/userGift/myGiftCount",
	"/api/user/getLikeList",
	"/api/task/datingTaskRewardRanking",
	"/api/blindDating/getSingle",
	"/api/dating/getSingle",
  ],
  ownWxshare:["registrationActivity","qrCode","activityDetailStatic","spread","investment","ordinaryInvestment","raiders","qkdIntroduce"],//不用通用分享的页面(路由名字)
  //canLocation:true,//是否开启定位功能(app权限)
  localcache: {},//记录接口缓存
  localcacheUrl:[//能接口缓存的url
	"/api/ad/indexAdList",
	"/api/district/all"
  ],
  //localcacheStore: [],//要添加到store的localcache列表
  localcacheTimeout: 30 * 60 ,//缓存时间(30分钟)
  keepAlive: [],//决定那个页面需要缓存的
  baiduKey:"P5Kx0e4uMbYa4sjQzZ3sfGQbHx4Q4PYv",
  //sellCallTimeout:10*60*1000,//呼叫服务员的时间间隔(10分钟)
  //googleApiKey:"AIzaSyDq97v34WHAU3Illnk7woHrQeighMKmiV4",//google key
  //googleUrl:"https://maps.google.cn/",//google的地址(https://maps.googleapis.com/或https://maps.google.cn/)
  //AMapApiKey:"243af263f101f77c44ea815bdf4d57f1",//高德地图 key
  //searchList:null,//搜索历史
  //molpay:false,//正在进行molpay
  fileImg: null,
  otherLogin: {},//第三方登录临时保存的数据
  isGetMessage:false,//是否已经定时获取信息(非app内)
  gotoBlindDatepay:false,//相亲报名是否需要弹出支付
  isWeixin: false,//是否微信打开
  isBrowser: false,//是否其他浏览器打开
  isiOSApp:false,//是不是app上架
  isApp:true,//是不是app的
  redirectShop:false,//商城跳过来登录
  shopParam:null,//商城返回来的参数
  qrcode: {},//二维码携带参数
  channel:{
	  isUnion:'',//渠道
	  jyNumber:'',//乾坤号
  },
}

let status = {
  store: new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
  }),
  // i18n : new VueI18n({
  //   locale: 'zh-CN',   // 语言标识cn
  //   messages: {
  //     'zh-CN': require('../language/zh-CN'),// 中文语言包
  //     'en-US': require('../language/en-US'),
  //     'ms-MY': require('../language/ms-MY'),
  //     'th-TH': require('../language/th-TH')
  //   }
  // })
};
export const store = status.store;
// export const i18n=status.i18n;
