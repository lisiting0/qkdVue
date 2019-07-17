import Vue from 'vue';
import VueRouter from 'vue-router';
import {store} from './store/index';
import server from '@/server/getData';
import {Fn} from '@js/api';
import { wxShare,hideOptionMenu,showOptionMenu } from '@js/wxjssdk';
import { Confirm } from 'vux'
/*按需加载js*/
const Home = r => require.ensure([], () => r(require('./components/home/home.vue')), 'home');
const User = r => require.ensure([], () => r(require('./components/user/user.vue')), 'user');
const SafeHouse = r => require.ensure([], () => r(require('./components/user/safeHouse')), 'safeHouse');
const SignOn = r => require.ensure([], () => r(require('./components/user/signOn')), 'signOn');
const RecentVisit = r => require.ensure([], () => r(require('./components/user/recentVisit')), 'recentVisit');
const Friend = r => require.ensure([], () => r(require('./components/friend/friend.vue')), 'friend');
const ChatWindow = r => require.ensure([], () => r(require('./components/friend/chatWindow')), 'chatWindow');
const ChatWindowWeb = r => require.ensure([], () => r(require('./components/friend/chatWindowWeb')), 'chatWindowWeb');
const Love = r => require.ensure([], () => r(require('./components/affinity/love.vue')), 'love');
const Love_old = r => require.ensure([], () => r(require('./components/affinity/love_old.vue')), 'love_old');
const SetSort = r => require.ensure([], () => r(require('./components/affinity/setSort.vue')), 'setSort');//筛选
const LoveList = r => require.ensure([], () => r(require('./components/affinity/loveList')), 'loveList');
const Search = r => require.ensure([], () => r(require('./components/search/search.vue')), 'search');
//const Jyjw = r => require.ensure([], () => r(require('./components/jyjw.vue')), 'jyjw');
const SendGift = r => require.ensure([], () => r(require('./components/user/sendGift.vue')), 'sendGift');
//const Star = r => require.ensure([], () => r(require('./components/star.vue')), 'star');
//const Zmjy = r => require.ensure([], () => r(require('./components/home/zmjy.vue')), 'zmjy');
const Act = r => require.ensure([], () => r(require('./components/affinity/act.vue')), 'act');
const ActJoinMember = r => require.ensure([], () => r(require('./components/affinity/actJoinMember.vue')), 'actJoinMember');//约会报名人员列表
const ActOld = r => require.ensure([], () => r(require('./components/affinity/act_old.vue')), 'actold');
const ActScene = r => require.ensure([], () => r(require('./components/affinity/actScene.vue')), 'actScene');//活动现场
const ActSceneNew = r => require.ensure([], () => r(require('./components/affinity/actSceneNew.vue')), 'actSceneNew');//活动现场(新版)
const BlindDate = r => require.ensure([], () => r(require('./components/blindDate/blindDate.vue')), 'blindDate');//相亲
const BlindDateNew = r => require.ensure([], () => r(require('./components/blindDate/blindDateNew.vue')), 'blindDateNew');//相亲(新版)
const Friendlist = r => require.ensure([], () => r(require('./components/friend/friendlist.vue')), 'friendlist');
const FansList = r => require.ensure([], () => r(require('./components/friend/fansList.vue')), 'fansList');
const Message = r => require.ensure([], () => r(require('./components/friend/message.vue')), 'message');
const MessageDetail = r => require.ensure([], () => r(require('./components/friend/messageDetail.vue')), 'messageDetail');
//const Lable = r => require.ensure([], () => r(require('./components/friend/lable.vue')), 'lable');
const GroupChat = r => require.ensure([], () => r(require('./components/friend/groupChat.vue')), 'groupChat');
const Login = r => require.ensure([], () => r(require('./components/login/login.vue')), 'login');
const ShareEnter = r => require.ensure([], () => r(require('./components/login/shareEnter.vue')), 'shareEnter');
const Share = r => require.ensure([], () => r(require('./components/login/share.vue')), 'share');
const LoginApp = r => require.ensure([], () => r(require('./components/login/loginApp.vue')), 'loginApp');
const Registered = r => require.ensure([], () => r(require('./components/login/registered.vue')), 'registered');
const FillInUserInfo = r => require.ensure([], () => r(require('./components/login/fillInUserInfo')), 'fillInUserInfo');
const RankingList = r => require.ensure([], () => r(require('./components/home/rankingList')), 'rankingList');
const RankingSignUp = r => require.ensure([], () => r(require('./components/home/rankingSignUp')), 'rankingSignUp');
const Publish = r => require.ensure([], () => r(require('./components/publish/publish')), 'publish');
const Travel = r => require.ensure([], () => r(require('./components/publish/travel')), 'travel');
const Other = r => require.ensure([], () => r(require('./components/publish/other')), 'other');
const Movie = r => require.ensure([], () => r(require('./components/publish/movie')), 'movie');
const UserDetail = r => require.ensure([], () => r(require('./components/user/userDetail')), 'userDetail');
const NearbyPeople = r => require.ensure([], () => r(require('./components/search/nearby/nearbyPeople')), 'nearbyPeople');
const NearbyPeopleNew = r => require.ensure([], () => r(require('./components/search/nearby/nearbyPeopleNew')), 'nearbyPeople');
const Nearbydate = r => require.ensure([], () => r(require('./components/search/nearby/nearbydate')), 'nearbydate');
const Topline = r => require.ensure([], () => r(require('./components/search/topline/topline')), 'topline');
const Headline = r => require.ensure([], () => r(require('./components/search/topline/headline')), 'headline');//娇友头条
const Headline2 = r => require.ensure([], () => r(require('./components/search/topline/headline2')), 'headline2');//娇友头条2
const ToplineDetail = r => require.ensure([], () => r(require('./components/search/topline/toplineDetail')), 'toplineDetail');
const Moments = r => require.ensure([], () => r(require('./components/search/moments/moments')), 'moments');
const SquareMoments = r => require.ensure([], () => r(require('./components/search/moments/squareMoments')), 'squareMoments');//广场动态
const Comments = r => require.ensure([], () => r(require('./components/search/topline/comments')), 'comments');
const UserComment = r => require.ensure([], () => r(require('./components/search/topline/userComment')), 'userComment');
const ForgetPassword = r => require.ensure([], () => r(require('./components/login/forgetPassword')), 'forgetPassword');
const ModifyPassword = r => require.ensure([], () => r(require('./components/login/modifyPassword')), 'modifyPassword');//修改密码
const MyFocus = r => require.ensure([], () => r(require('./components/user/myFocus')), 'myFocus');
const AddFriend = r => require.ensure([], () => r(require('./components/user/addFriend')), 'addFriend');
const MyComments = r => require.ensure([], () => r(require('./components/user/myComments')), 'myComments');
const MyNewComments = r => require.ensure([], () => r(require('./components/user/myNewComments')), 'myNewComments');//我的动态
const CommentDetail = r => require.ensure([], () => r(require('./components/user/commentDetail')), 'commentDetail');
const MyOffer = r => require.ensure([], () => r(require('./components/user/myOffer')), 'myOffer');
const MyEvaluation = r => require.ensure([], () => r(require('./components/user/myEvaluation')), 'myEvaluation');
const PopularActivity = r => require.ensure([], () => r(require('./components/user/popularActivity')), 'popularActivity');//人气活动
const AccountLevel = r => require.ensure([], () => r(require('./components/user/accountLevel')), 'accountLevel');//账号等级
const GrowthValue = r => require.ensure([], () => r(require('./components/user/growthValue')), 'growthValue');//昨日成长值
const LevelPrivilege = r => require.ensure([], () => r(require('./components/user/levelPrivilege')), 'levelPrivilege');//等级特权
const CertificationCenter = r => require.ensure([], () => r(require('./components/user/certificationCenter')), 'certificationCenter');//认证中心
const LevelDescription = r => require.ensure([], () => r(require('./components/user/levelDescription')), 'levelDescription');//等级说明
const MembershipGrowthSystem = r => require.ensure([], () => r(require('./components/user/membershipGrowthSystem')), 'membershipGrowthSystem');//会员成长体系
const IdentityAuth = r => require.ensure([], () => r(require('./components/user/identityAuth')), 'identityAuth');//身份认证
const VideoAuth = r => require.ensure([], () => r(require('./components/user/videoAuth')), 'videoAuth');//视频认证
const HouseAuth = r => require.ensure([], () => r(require('./components/user/houseAuth')), 'houseAuth');//房产认证
const CarAuth = r => require.ensure([], () => r(require('./components/user/carAuth')), 'carAuth');//车辆认证
const HealthyAuth = r => require.ensure([], () => r(require('./components/user/healthyAuth')), 'healthyAuth');//健康认证
const Recharge = r => require.ensure([], () => r(require('./components/user/recharge')), 'recharge');//充值
const UserInfo = r => require.ensure([], () => r(require('./components/user/userInfo')), 'userInfo');//个人信息查看
const ActInfo = r => require.ensure([], () => r(require('./components/affinity/actInfo')), 'actInfo');//群信息
const ActInfoEdit = r => require.ensure([], () => r(require('./components/affinity/actInfoEdit')), 'actInfoEdit');//编辑资料
const ActMember = r => require.ensure([], () => r(require('./components/affinity/actMember')), 'actMember');//群成员
const PrizeDraw = r => require.ensure([], () => r(require('./components/home/prizeDraw')), 'prizeDraw');//抽奖
const UserCenter = r => require.ensure([], () => r(require('./components/user/userCenter')), 'userCenter');//会员中心
const EarnCoin = r => require.ensure([], () => r(require('./components/user/earnCoin')), 'earnCoin');//赚乾坤币
const Bill = r => require.ensure([], () => r(require('./components/user/bill')), 'bill');//账单
const Transaction = r => require.ensure([], () => r(require('./components/user/transaction')), 'transaction');//账单2
const PrizeSelect = r => require.ensure([], () => r(require('./components/home/prizeSelect')), 'prizeSelect');//奖池选择
const ArticlePost = r => require.ensure([], () => r(require('./components/user/articlePost')), 'articlePost');//发布文章
const Setting = r => require.ensure([], () => r(require('./components/user/setting')), 'setting');//设置
const About = r => require.ensure([], () => r(require('./components/login/about')), 'about');//设置
const Notice = r => require.ensure([], () => r(require('./components/user/notice')), 'notice');//通知
const AccountSecurity = r => require.ensure([], () => r(require('./components/user/accountSecurity')), 'accountSecurity');//账号安全
const Privacy = r => require.ensure([], () => r(require('./components/user/privacy')), 'privacy');//隐私
const Bond = r => require.ensure([], () => r(require('./components/user/bond')), 'bond');//保证金
const Blacklist = r => require.ensure([], () => r(require('./components/user/blacklist')), 'blacklist');//黑名单
const Gift = r => require.ensure([], () => r(require('./components/user/gift')), 'gift');//我的礼物
const ModifyData = r => require.ensure([], () => r(require('./components/user/modifyData')), 'modifyData');//资料完善
const AddMoment = r => require.ensure([], () => r(require('./components/user/addMoment')), 'addMoment');//发朋友圈
const AddSquareMoment = r => require.ensure([], () => r(require('./components/user/addSquareMoment')), 'addSquareMoment');//发广场动态
const BindLogin = r => require.ensure([], () => r(require('./components/user/bindLogin')), 'bindLogin');//绑定/解绑第三方登录
const Shop = r => require.ensure([], () => r(require('./components/home/shop')), 'shop');//商城
const BindPhone = r => require.ensure([], () => r(require('./components/user/bindPhone')), 'bindPhone');//换绑手机
const MyPrize = r => require.ensure([], () => r(require('./components/home/myPrize')), 'myPrize');//我的奖品
const MyBlindDate = r => require.ensure([], () => r(require('./components/blindDate/myBlindDate')), 'myBlindDate');//我的相亲
const RegistrationActivity = r => require.ensure([], () => r(require('./components/blindDate/registrationActivity')), 'registrationActivity');//相亲活动
const ActivityDetail = r => require.ensure([], () => r(require('./components/blindDate/activityDetail')), 'activityDetail');//相亲活详情
const ActivityDetailStatic = r => require.ensure([], () => r(require('./components/blindDate/activityDetailStatic')), 'activityDetailStatic');//相亲活详情静态页面
const RegistrationStaff = r => require.ensure([], () => r(require('./components/blindDate/registrationStaff')), 'registrationStaff');//报名人员
const PublishBlindDate = r => require.ensure([], () => r(require('./components/blindDate/publishBlindDate')), 'publishBlindDate');//发布相亲活动
const Preview = r => require.ensure([], () => r(require('./components/blindDate/preview')), 'preview');//预览相亲活动
const Putforward = r => require.ensure([], () => r(require('./components/user/putforward')), 'putforward');//提现
const BlindDatePay = r => require.ensure([], () => r(require('./components/blindDate/blindDatePay')), 'blindDatePay');//相亲支付
const AddressMap = r => require.ensure([], () => r(require('./components/blindDate/addressMap')), 'addressMap');//地图
const Sign = r => require.ensure([], () => r(require('./components/blindDate/sign')), 'sign');//相亲签到
const AdminManage = r => require.ensure([], () => r(require('./components/blindDate/adminManage')), 'adminManage');//管理员设置
const VideoList = r => require.ensure([], () => r(require('./components/video/videoList')), 'videoList');//视频
const Agent = r => require.ensure([], () => r(require('./components/user/agent')), 'agent');//代理商
const Spread = r => require.ensure([], () => r(require('./components/user/spread')), 'spread');//合伙人
const SpreadPayList = r => require.ensure([], () => r(require('./components/user/spreadPayList')), 'spreadPayList');//商品列表
const QrCode = r => require.ensure([], () => r(require('./components/user/qrCode')), 'qrCode');//推广二维码
const IncomeDetail = r => require.ensure([], () => r(require('./components/user/incomeDetail')), 'incomeDetail');//明细
const QkdIntroduce = r => require.ensure([], () => r(require('./components/user/qkdIntroduce')), 'qkdIntroduce');//乾坤岛介绍
const BMap = r => require.ensure([], () => r(require('./components/other/bMap')), 'bMap');//百度地图
const Help = r => require.ensure([], () => r(require('./components/user/help')), 'help');//帮助与反馈
const QA = r => require.ensure([], () => r(require('./components/user/QA')), 'QA');//帮助与反馈
const PublishAppointment = r => require.ensure([], () => r(require('./components/publish/publishAppointment')), 'publishAppointment');//发布约会
const Store = r => require.ensure([], () => r(require('./components/publish/store')), 'store');//指定餐厅
const Apply = r => require.ensure([], () => r(require('./components/user/apply')), 'apply');//申请查看更多信息列表
const Favor = r => require.ensure([], () => r(require('./components/user/favor')), 'favor');//好感
const Feedback = r => require.ensure([], () => r(require('./components/extend/feedback')), 'feedback');//红娘
const EnergyRanking = r => require.ensure([], () => r(require('./components/user/energyRanking')), 'feedback');//排行榜
const Investment = r => require.ensure([], () => r(require('./components/recruit/investment')), 'investment');//招商新
const Raiders = r => require.ensure([], () => r(require('./components/recruit/raiders')), 'raiders');//赚钱攻略
const OrdinaryInvestment = r => require.ensure([], () => r(require('./components/recruit/ordinaryInvestment')), 'ordinaryInvestment');//普通与合伙人招商
const MyRedirect = r => require.ensure([], () => r(require('./components/home/myRedirect')), 'myRedirect');//跳转
const IntroduceList = r => require.ensure([], () => r(require('./components/home/introduceList')), 'introduceList');//介绍列表
const Zhiyin = r => require.ensure([], () => r(require('./components/home/zhiyin')), 'zhiyin');//指引

Vue.use(VueRouter);
Vue.use(Confirm);
const NotFoundComponent={
  template:'<h1 style="text-align:center;">NotFound</h1>'
}
/**
路由meta属性说明:
meta{
	requireAuth:true,//是否需要登录才能进入路由
	title:"页面标题",//页面的标题(暂弃用)
	redirect:true,//需要登录时,登录后是否需要跳回来.

	shareTitle:"分享标题",//分享路由时分享的标题(可选)
	shareDesc:"分享描述",//分享路由时分享的描述(可选)
	shareUrl:"分享链接",//分享路由时分享的链接(这是完整链接,带http的)(可选)
	shareRoute:"home",//当shareUrl为空时会选择这个为分享的链接(可选)
	shareImg:"分享的图片",//完整路径,带http的(可选)


	hideWxMenu:true,//是否隐藏微信右上角的功能按钮
}

**/
const routers = [
  {path: '/home',name: 'home',component: Home,meta:{title:"相约乾坤岛"}},//首页
  {path: '/rankingList',name: 'rankingList',component: RankingList,meta:{title:"最美娇友"}},//最美娇友
  {path: '/rankingSignUp',name: 'rankingSignUp',component: RankingSignUp,meta:{title:"最美娇友"}},//最美娇友
  {path: '/publish/:pagerouter',name: 'publish',component: Publish,meta:{title:"最美娇友",requireAuth:true,hideWxMenu:true}},//发布活动
  {path: '/travel/:pagerouter',name: 'travel',component: Travel,meta:{title:"最美娇友",requireAuth:true,hideWxMenu:true}},//最美娇友
  {path: '/other/:pagerouter',name: 'other',component: Other,meta:{title:"最美娇友",requireAuth:true,hideWxMenu:true}},//最美娇友
  {path: '/movie/:pagerouter',name: 'movie',component: Movie,meta:{title:"最美娇友",requireAuth:true,hideWxMenu:true}},//最美娇友
  {path: '/user',name: 'user',component: User,meta:{title:"我的",redirect:true,hideWxMenu:true}},//我的
  {path: '/safeHouse',name: 'safeHouse',component: SafeHouse,meta:{title:"娇友金屋",requireAuth:true,hideWxMenu:true}},//娇友金屋
  {path: '/signOn',name: 'signOn',component: SignOn,meta:{title:"签到",requireAuth:true,hideWxMenu:true}},//签到
  {path: '/recentVisit',name: 'recentVisit',component: RecentVisit,meta:{title:"最近来访",requireAuth:true,hideWxMenu:true}},//最近来访
  {path: '/userDetail',name: 'userDetail',component: UserDetail,meta:{title:"我的",requireAuth:true,hideWxMenu:true}},//我的
  {path: '/friend',name: 'friend',component: Friend,meta:{title:"娇友",requireAuth:true,hideWxMenu:true}},//娇友
  {path: '/chatWindow',name: 'chatWindow',component: ChatWindow,meta:{title:"聊天窗口",requireAuth:true,hideWxMenu:true}},//聊天窗口
  {path: '/chatWindowWeb',name: 'chatWindowWeb',component: ChatWindowWeb,meta:{title:"聊天窗口",requireAuth:true,hideWxMenu:true}},//web端聊天窗口
  {path: '/love',name: 'love',component: Love,meta:{title:"邀约"}},//娇缘
  {path: '/love_old',name: 'love_old',component: Love_old,meta:{title:"邀约"}},//娇缘
   {path: '/setSort',name: 'setSort',component: SetSort,meta:{title:"筛选"}},//筛选
  {path: '/loveList',name: 'loveList',component: LoveList,meta:{title:"选缘"}},//选缘
  {path: '/actScene',name: 'actScene',component: ActScene,meta:{title:"活动现场",requireAuth:true,hideWxMenu:true}},//活动现场
  {path: '/actSceneNew',name: 'actSceneNew',component: ActSceneNew,meta:{title:"活动现场",requireAuth:true,hideWxMenu:true}},//活动现场(新版)
  {path: '/blindDate',name: 'blindDate',component: BlindDate,meta:{title:"相亲",requireAuth:true,hideWxMenu:true}},//相亲
  {path: '/blindDateNew',name: 'blindDateNew',component: BlindDateNew,meta:{title:"相亲",requireAuth:true,hideWxMenu:true}},//相亲(新版)
  {path: '/search',name: 'search',component: Search,meta:{title:"发现"}},//发现
  {path: '/nearbyPeople',name: 'nearbyPeople',component: NearbyPeople,meta:{title:"附近的人",hideWxMenu:true}},//附近的人
   {path: '/nearbyPeopleNew',name: 'nearbyPeopleNew',component: NearbyPeopleNew,meta:{title:"附近的人",hideWxMenu:true}},//附近的人(新版)
  {path: '/nearbydate',name: 'nearbydate',component: Nearbydate,meta:{title:"我的",hideWxMenu:true}},//附近的约会
  {path: '/topline',name: 'topline',component: Topline,meta:{title:"娇友头条"}},//娇友头条
  {path: '/headline',name: 'headline',component: Headline,meta:{title:"娇友头条"}},//娇友头条
  {path: '/headline2',name: 'headline2',component: Headline2,meta:{title:"娇友头条"}},//娇友头条2
  {path: '/toplineDetail/:pagerouter',name: 'toplineDetail',component: ToplineDetail,meta:{title:"娇友头条详情页"}},//娇友头条详情页
  {path: '/comments/:pagerouter',name: 'comments',component: Comments,meta:{title:"娇友头条评论",requireAuth:true,hideWxMenu:true}},//娇友头条详情评论
  {path: '/userComment/:pagerouter',name: 'userComment',component: UserComment,meta:{title:"娇友头条评论",requireAuth:true,hideWxMenu:true}},//娇友头条详情评论详情
  {path: '/moments',name: 'moments',component: Moments,meta:{title:"娇友动态"}},//娇友动态
  {path: '/squareMoments',name: 'squareMoments',component: SquareMoments,meta:{title:"广场动态"}},//广场动态
  //{path: '/jyjw',name: 'jyjw',component: Jyjw,meta:{title:"娇友金屋"}},//娇友金屋
  {path: '/sendGift/:pagerouter',name: 'sendGift',component: SendGift,meta:{title:"购买礼物",requireAuth:true,hideWxMenu:true}},//送礼
  //{path: '/star',name: 'star',component: Star,meta:{title:"约会明星"}},//约会明星
 // {path: '/zmjy',name: 'zmjy',component: Zmjy,meta:{title:"最美娇友"}},//最美娇友
  {path: '/act',name: 'act',component: Act,meta:{title:"邀约详情",redirect:true}},//活动详情
  {path: '/actJoinMember',name: 'actJoinMember',component: ActJoinMember,meta:{title:"邀约人员",redirect:true}},//活动详情
  {path: '/actold',name: 'actold',component: ActOld,meta:{title:"邀约详情",redirect:true}},//活动详情
  {path: '/actInfo',name: 'actInfo',component: ActInfo,meta:{title:"群信息",requireAuth:true,hideWxMenu:true}},//群信息
  {path: '/actInfoEdit',name: 'actInfoEdit',component: ActInfoEdit,meta:{title:"编辑资料",requireAuth:true,hideWxMenu:true}},//编辑资料
  {path: '/actMember',name: 'actMember',component: ActMember,meta:{title:"群成员",requireAuth:true,hideWxMenu:true}},//群成员
  {path: '/friendlist',name: 'friendlist',component: Friendlist,meta:{title:"娇友列表",requireAuth:true,hideWxMenu:true}},//娇友列表
  {path: '/fansList',name: 'fansList',component: FansList,meta:{title:"娇友列表",requireAuth:true,hideWxMenu:true}},//娇友列表
  {path: '/message',name: 'message',component: Message,meta:{title:"消息列表",requireAuth:true,hideWxMenu:true}},//消息列表
  {path: '/messageDetail',name: 'messageDetail',component: MessageDetail,meta:{title:"消息列表",requireAuth:true,hideWxMenu:true}},//消息列表
  //{path: '/lable',name: 'lable',component: Lable,meta:{title:"标签"}},//标签
  {path: '/groupChat',name: 'groupChat',component: GroupChat,meta:{title:"群聊",requireAuth:true,hideWxMenu:true}},//群聊
  {path: '/login',name: 'login',component: Login,meta:{title:"登录",hideWxMenu:true}},//登录
  {path: '/shareEnter',name: 'shareEnter',component: ShareEnter,meta:{title:"邀请好友",hideWxMenu:true}},//邀请登录
  {path: '/share',name: 'share',component: Share,meta:{title:"邀请好友",hideWxMenu:true,requireAuth:true,}},//邀请登录
  {path: '/loginApp',name: 'loginApp',component: LoginApp,meta:{title:"登录",hideWxMenu:true}},//登录(app用)
  {path: '/registered',name: 'registered',component: Registered,meta:{title:"注册",hideWxMenu:true}},//注册
  {path: '/fillInUserInfo',name: 'fillInUserInfo',component: FillInUserInfo,meta:{title:"个人信息",hideWxMenu:true}},//个人信息(不需要登录)
  {path: '/forgetPassword',name: 'forgetPassword',component: ForgetPassword,meta:{title:"忘记密码",hideWxMenu:true}},//忘记密码
  {path: '/modifyPassword',name: 'modifyPassword',component: ModifyPassword,meta:{title:"修改密码",requireAuth:true,hideWxMenu:true}},//修改密码
  {path: '/myFocus',name: 'myFocus',component: MyFocus,meta:{title:"我的关注",requireAuth:true,hideWxMenu:true}},//我的关注
  {path: '/addFriend',name: 'addFriend',component: AddFriend,meta:{title:"添加娇友",requireAuth:true,hideWxMenu:true}},//添加好友
  {path: '/myComments',name: 'myComments',component: MyComments,meta:{title:"我的动态",requireAuth:true,hideWxMenu:true}},//我的动态
  {path: '/myNewComments',name: 'myNewComments',component: MyNewComments,meta:{title:"我的动态",requireAuth:true,hideWxMenu:true}},//我的动态(测试)
  {path: '/commentDetail',name: 'commentDetail',component: CommentDetail,meta:{title:"我的动态"}},//我的动态(详情)
  {path: '/myOffer',name: 'myOffer',component: MyOffer,meta:{title:"我的邀约",requireAuth:true,hideWxMenu:true}},//我的邀约
  {path: '/myEvaluation',name: 'myEvaluation',component: MyEvaluation,meta:{title:"我的评价",requireAuth:true,hideWxMenu:true}},//我的评价
  {path: '/popularActivity',name: 'popularActivity',component: PopularActivity,meta:{title:"人气活动"}},//人气活动
  {path: '/accountLevel',name: 'accountLevel',component: AccountLevel,meta:{title:"账号等级",requireAuth:true,hideWxMenu:true}},//账号等级
  {path: '/growthValue',name: 'growthValue',component: GrowthValue,meta:{title:"昨日成长值",requireAuth:true,hideWxMenu:true}},//昨日成长值
  {path: '/levelPrivilege',name: 'levelPrivilege',component: LevelPrivilege,meta:{title:"等级特权",requireAuth:true,hideWxMenu:true}},//等级特权
  {path: '/certificationCenter',name: 'certificationCenter',component: CertificationCenter,meta:{title:"认证中心",requireAuth:true,hideWxMenu:true}},//认证中心
  {path: '/levelDescription',name: 'levelDescription',component: LevelDescription,meta:{title:"等级说明",hideWxMenu:true}},//等级说明
  {path: '/membershipGrowthSystem',name: 'membershipGrowthSystem',component: MembershipGrowthSystem,meta:{title:"会员成长体系",requireAuth:true,hideWxMenu:true}},//会员成长体系
  {path: '/identityAuth',name: 'identityAuth',component: IdentityAuth,meta:{title:"身份认证",requireAuth:true,hideWxMenu:true}},//身份认证
  {path: '/videoAuth',name: 'videoAuth',component: VideoAuth,meta:{title:"视频认证",requireAuth:true,hideWxMenu:true}},//视频认证
  {path: '/healthyAuth',name: 'healthyAuth',component: HealthyAuth,meta:{title:"健康认证",requireAuth:true,hideWxMenu:true}},//健康认证
  {path: '/carAuth',name: 'carAuth',component: CarAuth,meta:{title:"车辆认证",requireAuth:true,hideWxMenu:true}},//车辆认证
  {path: '/houseAuth',name: 'houseAuth',component: HouseAuth,meta:{title:"房产认证",requireAuth:true,hideWxMenu:true}},//房产认证
  {path: '/recharge',name: 'recharge',component: Recharge,meta:{title:"充值",requireAuth:true,hideWxMenu:true}},//充值
  {path: '/userInfo',name: 'userInfo',component: UserInfo,meta:{title:"个人信息查看"}},//个人信息查看
  {path: '/prizeDraw/:pagerouter',name: 'prizeDraw',component: PrizeDraw,meta:{redirect:true,title:"抽奖"}},//抽奖
  {path: '/prizeSelect',name: 'prizeSelect',component: PrizeSelect,meta:{title:"奖池选择",hideWxMenu:true}},//奖池选择
  {path: '/userCenter',name: 'userCenter',component: UserCenter,meta:{title:"会员中心",requireAuth:true,hideWxMenu:true}},//会员中心
  {path: '/earnCoin',name: 'earnCoin',component: EarnCoin,meta:{title:"赚乾坤币"}},//赚乾坤币
  {path: '/bill',name: 'bill',component: Bill,meta:{title:"账单",requireAuth:true,hideWxMenu:true}},//账单
  {path: '/transaction',name: 'transaction',component: Transaction,meta:{title:"账单",requireAuth:true,hideWxMenu:true}},//账单2
  {path: '/articlePost',name: 'articlePost',component: ArticlePost,meta:{title:"发布文章",requireAuth:true,hideWxMenu:true}},//发布文章
  {path: '/setting',name: 'setting',component: Setting,meta:{title:"设置",requireAuth:true,notRedirect:true,hideWxMenu:true}},//设置
  {path: '/about',name: 'about',component: About,meta:{title:"关于",requireAuth:true,hideWxMenu:true}},//设置
  {path: '/blacklist',name: 'blacklist',component: Blacklist,meta:{title:"黑名单",requireAuth:true,hideWxMenu:true}},//黑名单
  {path: '/notice',name: 'notice',component: Notice,meta:{title:"通知",requireAuth:true,hideWxMenu:true}},//通知
  {path: '/accountSecurity',name: 'accountSecurity',component: AccountSecurity,meta:{title:"账号安全",requireAuth:true,hideWxMenu:true}},//账号安全
  {path: '/privacy',name: 'privacy',component: Privacy,meta:{title:"隐私",requireAuth:true,hideWxMenu:true}},//隐私
  {path: '/bond',name: 'bond',component: Bond,meta:{title:"保证金",requireAuth:true,hideWxMenu:true}},//保证金
  {path: '/gift/:pagerouter',name: 'gift',component: Gift,meta:{title:"我的礼物",requireAuth:true,hideWxMenu:true}},//我的礼物
  {path: '/modifyData',name: 'modifyData',component: ModifyData,meta:{title:"资料完善",requireAuth:true,hideWxMenu:true}},//资料完善
  {path: '/addMoment',name: 'addMoment',component: AddMoment,meta:{title:"发朋友圈",requireAuth:true,hideWxMenu:true}},//发朋友圈
  {path: '/addSquareMoment',name: 'addSquareMoment',component: AddSquareMoment,meta:{title:"发广场动态",requireAuth:true,hideWxMenu:true}},//发广场动态
  {path: '/bindLogin',name: 'bindLogin',component: BindLogin,meta:{title:"绑定/解绑第三方登录",hideWxMenu:true}},//绑定/解绑第三方登录
  {path: '/shop',name: 'shop',component: Shop,meta:{title:"商城"}},//商城
  {path: '/bindPhone',name: 'bindPhone',component: BindPhone,meta:{title:"换绑手机",requireAuth:true,hideWxMenu:true}},//换绑手机
  {path: '/myPrize',name: 'myPrize',component: MyPrize,meta:{title:"换绑手机",requireAuth:true,hideWxMenu:true}},//换绑手机
  {path: '/myBlindDate',name: 'myBlindDate',component: MyBlindDate,meta:{title:"我的相亲",requireAuth:true,hideWxMenu:true}},//我的相亲
  {path: '/registrationActivity',name: 'registrationActivity',component: RegistrationActivity,meta:{title:"相亲活动"}},//相亲活动
  {path: '/activityDetail',name: 'activityDetail',component: ActivityDetail,meta:{title:"相亲活动详情",redirect:true}},//相亲活动详情
  {path: '/activityDetailStatic',name: 'activityDetailStatic',component: ActivityDetailStatic,meta:{title:"相亲活动详情",redirect:true}},//相亲活动详情静态页面
  {path: '/registrationStaff',name: 'registrationStaff',component: RegistrationStaff,meta:{title:"报名人员",requireAuth:true,hideWxMenu:true}},//报名人员
  {path: '/publishBlindDate',name: 'publishBlindDate',component: PublishBlindDate,meta:{title:"发布相亲活动",requireAuth:true,hideWxMenu:true}},//发布相亲活动
  {path: '/preview',name: 'preview',component: Preview,meta:{title:"预览相亲活动",hideWxMenu:true}},//视频
  {path: '/putforward',name: 'putforward',component: Putforward,meta:{title:"提现",requireAuth:true,hideWxMenu:true}},//提现
  {path: '/blindDatePay',name: 'blindDatePay',component: BlindDatePay,meta:{title:"相亲支付",requireAuth:true,hideWxMenu:true}},//相亲支付
  {path: '/addressMap',name: 'addressMap',component: AddressMap,meta:{title:"收货地址",requireAuth:true,hideWxMenu:true}},//收货地址
  {path: '/sign',name: 'sign',component: Sign,meta:{title:"签到",requireAuth:true,hideWxMenu:true}},//签到
  {path: '/adminManage',name: 'adminManage',component: AdminManage,meta:{title:"管理员设置",requireAuth:true,hideWxMenu:true}},//管理员设置
  {path: '/videoList',name: 'videoList',component: VideoList,meta:{title:"视频",hideWxMenu:true}},//视频
  {path: '/agent',name: 'agent',component: Agent,meta:{title:"代理商",requireAuth:true,hideWxMenu:true}},//代理商
  {path: '/spread',name: 'spread',component: Spread,meta:{title:"合伙人"}},//合伙人
  {path: '/spreadPayList',name: 'spreadPayList',component: SpreadPayList,meta:{title:"大礼包",requireAuth:true,hideWxMenu:true}},//商品列表
  {path: '/qrCode',name: 'qrCode',component: QrCode,meta:{title:"推广二维码",requireAuth:true,hideWxMenu:true}},//推广二维码
  {path: '/qkdIntroduce',name: 'qkdIntroduce',component: QkdIntroduce,meta:{title:"乾坤岛介绍"}},//乾坤岛介绍
  {path: '/incomeDetail',name: 'incomeDetail',component: IncomeDetail ,meta:{title:"明细",requireAuth:true,hideWxMenu:true}},//明细
  {path: '/bMap',name: 'bMap',component: BMap ,meta:{title:"百度地图"}},//百度地图
	{path: '/help',name: 'help',component: Help ,meta:{title:"帮助与反馈"}},//帮助与反馈
	{path: '/QA',name: 'QA',component: QA ,meta:{title:"帮助与反馈"}},//帮助与反馈
  {path: '/publishAppointment',name: 'publishAppointment',component: PublishAppointment ,meta:{title:"发布约会",requireAuth:true,hideWxMenu:true}},//发布约会
  {path: '/store',name: 'store',component: Store ,meta:{title:"指定餐厅"}},//指定餐厅
  {path: '/apply',name: 'apply',component: Apply ,meta:{title:"申请查看更多信息列表",requireAuth:true,hideWxMenu:true}},//申请查看更多信息列表
  {path: '/favor',name: 'favor',component: Favor ,meta:{title:"好感",requireAuth:true,hideWxMenu:true}},//好感
  {path: '/feedback',name: 'feedback',component: Feedback ,meta:{title:"红娘服务"}},//红娘服务
  {path: '/energyRanking',name: 'energyRanking',component: EnergyRanking,meta:{title:"排行榜"}},//排行榜
  {path: '/investment',name: 'investment',component: Investment,meta:{title:"招商新"}},//招商新
  {path: '/raiders',name: 'raiders',component: Raiders,meta:{title:"赚钱攻略"}},//赚钱攻略
  {path: '/ordinaryInvestment',name: 'ordinaryInvestment',component: OrdinaryInvestment,meta:{title:"普通与合伙人招商"}},//普通与合伙人招商
  {path: '/myRedirect',name: 'myRedirect',component: MyRedirect,meta:{title:"跳转",hideWxMenu:true}},//跳转
  {path: '/introduceList',name: 'introduceList',component: IntroduceList,meta:{title:"介绍列表"}},//介绍列表
  {path: '/zhiyin',name: 'zhiyin',component: Zhiyin,meta:{title:"指引"}},//指引


	{path: '*', component: NotFoundComponent ,title:'相约乾坤岛'},//404
	{path: '/',redirect: '/home',title:'相约乾坤岛'},//跳到首页
	{path: '/index.html',redirect: '/home',title:'相约乾坤岛'}//跳到首页
];
const basepath=window.location.pathname.replace("HBuild.html","").replace("index.html","");
const router = new VueRouter({
	// mode: 'history',
	linkActiveClass: 'cur',
	linkExactActiveClass: 'cur',
	//base: '/storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/www/',//HBuilder打包配置
	//base:'/webpackVue/dist/',//本地打包配置
	base:basepath,//HB打包apk需要
	routes: routers,
	scrollBehavior (to, from, savedPosition) {//滚动到顶部
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
})
//const wxsdkArr=["act"];
router.beforeEach(async (to,from,next)=>{
	/*if(to.meta.requireAuth){//需要验证登录
		store.dispatch("checkLogin").then((res)=>{
			next()
		});
	}else{
		store.dispatch("checkLogin",true).then((res)=>{
			next()
		});
	}*/
	 Vue.$vux.confirm.hide();
	 next();
});
router.beforeResolve(async (to,from,next)=>{
  console.log("触发全局前置路由守卫:"+to.name)
  // window.$api.clearStorage();
  // 检查是否登陆
	/*if(to.meta.title){
		document.title = to.meta.title;
	}else{
		document.title = "相约乾坤岛";
	}*/
	//window.backTimeout&&clearTimeout(window.backTimeout);//微信按返回,清除返回首页

  //未登录，从登陆页面跳转至设置页面改为再跳转至设置页面的上一页我的页面
  //Vue.nextTick(() => {//为获取正确的params
	  if(!store.state.isLogin){
		if(to.name=="setting" && from.name=="loginApp"){
		  next();
		  return false;
		}
	  }
		if(to.name=='myRedirect'){//外部跳转用的
			next();
			return false;
		}
		let params={};//移到beforeResolve

		if(from.name){
			params=Fn.toWxUrl("#"+to.fullPath);
		}else{
			params=Fn.toWxUrl(window.location.href);
		}
		console.log("params:"+JSON.stringify(params));
		if(to.meta.hideWxMenu){//移到beforeResolve
			hideOptionMenu&&hideOptionMenu();//微信隐藏菜单功能
		}else{
			showOptionMenu&&showOptionMenu();//微信显示菜单功能
		}
		if(store.state.isWeixin&&!store.state.ownWxshare.includes(to.name)){//移到beforeResolve
			let obj={
				title : to.meta.shareTitle||'乾坤岛',
				desc : to.meta.shareDesc||'一个安全、纯粹、高效的婚恋交友平台',
				link:to.meta.shareUrl||store.state.baseURL+"/api/account/publicAddressLoginUrl?state="+(to.meta.shareRoute||params.str),
				imgUrl : to.meta.shareImg||store.state.baseFrontEndURL+'static/logo.png?'+new Date().getTime(),
			}

			wxShare&&wxShare({//微信分享设置
				...obj,
				debug:false
			},{
				success(){
					//alert("分享成功");
				},
				cancel(){
					//alert("分享失败");
				}
			});
		}
		if(!store.state.isWeixin&&to.name=="login"){//app的登录跳到loginApp//移到beforeResolve
			next({
				path: '/loginApp',
				query: store.state.otherLogin.params&&store.state.otherLogin.params.query
			});
			return false;
		}
		if(window.api){
			window.api.setStatusBarStyle({
				style: 'dark'
			});
		}

		if(params&&params.query&&params.query.unionkey&&params.query.unionkey=='zzrbPWC'&&sessionStorage){//移到beforeResolve
			sessionStorage.setItem('isUnion',params.query.unionkey);
			if(params.query.unionFrom){
				sessionStorage.setItem('unionFrom',params.query.unionFrom);
			}
		}
		if(params.query.isUnion){//记录渠道号
			store.commit("CHANGESTORE",{name:"channel",value:{
				isUnion:params.query.isUnion,
				//jyNumber:params.query.jyNumber,
			}});
		}
		if(params&&params.query&&params.query.pid&&params.query.taskId){
			console.log("完成任务")
			try{
				server.taskFinish({qkh:params.query.pid,taskNumber:params.query.taskId});
			}catch (e) {
			}
		}
		if(params.query&&params.query.redirectUrl){//商城来的地址
			let paramsPHP=Fn.toWxUrl("#/?state="+params.query.redirectUrl,":");
			let url=paramsPHP.name+".php";
			if(paramsPHP.query){
				Object.keys(paramsPHP.query).forEach(attr => {
					if(url.indexOf("?")!=-1){
						url+='&'+attr+"="+paramsPHP.query[attr];
					}else{
						url+='?'+attr+"="+paramsPHP.query[attr];
					}
				});
			}
			window.location.href=store.state.phpURL+"/mobile/"+url;
			return false;
		}
		/**取消登录验证从这里开始***/
		if(to.meta.redirect){//不需要登录但需要登录后跳回的页面
			store.commit('REDIRECT',to.fullPath);
		}
		const checkWxLogin=async (flag)=>{
			if(store.state.otherLogin.isBind){
				//alert("第三方isBind");
				if(to.name=="login"||to.name=="registered"||to.name=="forgetPassword"||to.name=="loginApp"){
					next();
				}else{
					//next('/login');
					if(!flag){
						next({name: "login", query: store.state.otherLogin.params&&store.state.otherLogin.params.query});
					}else{
						next();
					}
				}
				return;
			}else{
				//params=Fn.toWxUrl(window.location.href);
				//alert("params:"+JSON.stringify(params));
				try{
					if(params.query&&params.query.code){
						let result = await server.WxCheckLogin({
							code:params.query.code,
						});
						//alert("WxCheckLogin"+JSON.stringify(result.data.data)+sessionStorage);
						if(sessionStorage){
						  sessionStorage.setItem('checkwxCode',params.query.code);
						  sessionStorage.setItem('checkwxResultData',JSON.stringify(result.data.data));
						}
						store.commit("CHANGEACCESSTOKEN",result.data.data);
						try{
							let userInfo = await server.getUserInfo({userId:result.data.data.userId});
							store.commit("LOGIN",userInfo.data.data);
						}catch(e){
							console.log("登录获取用户失败:"+JSON.stringify(e));
						}
						if(window.history&&window.history.replaceState){
							var url = params.query?window.location.href.replace("?code="+params.query.code,"?"):window.location.href;
							url = url.replace("&state="+params.str,'');
							window.history.replaceState({}, 0, url);//url去掉多余参数
						}
						if(params.query.redirectUrl){//商城来的地址
							let paramsPHP=Fn.toWxUrl("#/?state="+params.query.redirectUrl,":");
							let url=paramsPHP.name+".php";
							if(paramsPHP.query){
								Object.keys(paramsPHP.query).forEach(attr => {
									if(url.indexOf("?")!=-1){
										url+='&'+attr+"="+paramsPHP.query[attr];
									}else{
										url+='?'+attr+"="+paramsPHP.query[attr];
									}
								});
							}
							window.location.href=store.state.phpURL+"/mobile/"+url;
							return false;
						}
						//console.log("next222:"+params.name);
						let pagerouter={};
						if(params.params){
							pagerouter={
								pagerouter:params.params.pagerouter
							}
						}
						next({name: params.name||to.name, query: params.query,params:pagerouter});
						return;
					}else{
						let str=to.name;
						if(Object.keys(to.query).length>0){
							str+="_"
						}
						for(let v in to.query){
							str+="_"+v+"_"+to.query[v];
						}
						//alert("str:"+str);
						window.location.href=store.state.baseURL+"/api/account/publicAddressLoginUrl?&state="+str;
						return false;
					}
				}catch(e){
					//alert("微信:"+JSON.stringify(e));
					console.log("微信:"+JSON.stringify(e));
					if(e.status==140017){//没有绑定账号
						// alert("绑定微信:"+to.name)
						 if(window.history&&window.history.replaceState){
							var url = params.query?window.location.href.replace("?code="+params.query.code,"?"):window.location.href;
							url = url.replace("&state="+params.str,'');
							window.history.replaceState({}, 0, url);//url去掉多余参数
						}
						store.commit("CHANGEOTHERLOGIN",{
							unionid:e.data.unionid,
							openid:e.data.openid,
							unionkey:params.query&&params.query.unionkey,
							nominateUserId:params.query&&params.query.nominateUserId,
							isBind:true,
							type:'wxmp',
							params:params,
						});
						if(flag){
							next();
						}else{
							next({name: "login", query: params.query});
						}
						return false;
					}else if(e.status==500){//特殊处理500的
						//500
					}else{//再次获取code//http://192.168.0.50:8082/#/activityDetail?code=081X9aKn0glQDk1z3bKn0bHWJn0X9aKL&times=1545662543047&id=1583029e21d24ed4931537cf7fec302e&unionkey=zzrbPWC  返回了undefined
						if(sessionStorage){
						  let checkwxCode=sessionStorage.getItem('checkwxCode');
						  let checkwxResultData=sessionStorage.getItem('checkwxResultData');
						//alert("checkwxCode:"+checkwxCode+"====="+params.query.code+"===="+checkwxResultData)
						  if(checkwxCode==params.query.code&&checkwxResultData){//code重复
							checkwxResultData=JSON.parse(checkwxResultData);
							  store.commit("CHANGEACCESSTOKEN",checkwxResultData);
								try{
									let userInfo = await server.getUserInfo({userId:checkwxResultData.userId});
									store.commit("LOGIN",userInfo.data.data);
								}catch(e){
									//alert("checkwxResultData:"+JSON.stringify(e));
								}
								if(window.history&&window.history.replaceState){
									var url = params.query?window.location.href.replace("?code="+params.query.code,"?"):window.location.href;
									url = url.replace("&state="+params.str,'');
									window.history.replaceState({}, 0, url);//url去掉多余参数
								}
								if(params.query.redirectUrl){//商城来的地址
									let paramsPHP=Fn.toWxUrl("#/?state="+params.query.redirectUrl,":");
									let url=paramsPHP.name+".php";
									if(paramsPHP.query){
										Object.keys(paramsPHP.query).forEach(attr => {
											if(url.indexOf("?")!=-1){
												url+='&'+attr+"="+paramsPHP.query[attr];
											}else{
												url+='?'+attr+"="+paramsPHP.query[attr];
											}
										});
									}
									window.location.href=store.state.phpURL+"/mobile/"+url;
									return false;
								}
								//console.log("next222:"+params.name);
								let pagerouter={};
								if(params.params){
									pagerouter={
										pagerouter:params.params.pagerouter
									}
								}
								next({name: params.name||to.name, query: params.query,params:pagerouter});
								//next({name: params.name||to.name, query: params.query});
								return;
						  }
						}
						window.location.href=store.state.baseURL+"/api/account/publicAddressLoginUrl?&state="+params.str;
						return false;
					}
				}
			}
		}
		const checkLogin=async (flag)=>{
			//alert("store.state.isLogin:"+store.state.isLogin)
			console.log("检查登录:"+flag);
			store.dispatch("initSocket");
			if(to.name=="userInfo"&&((store.state.isLogin&& to.query.id != store.state.userInfo.id && (store.state.userInfo.idStatus!=1 ||  store.state.userInfo.silentState==1))||!store.state.isLogin)){
				if(store.state.isLogin){
				  if(store.state.userInfo.silentState==1){
					Vue.$vux.confirm.show({
					  title: '温馨提示',
					  theme: 'android',
					  content: '你已经开启了不允许别人看我,同时也不能查看其它用户的信息,需要关闭后才可以看其他用户的信息.',
					  confirmText: '去关闭',
					  onCancel () {
						if(!from.name){
						next({
						  path: '/home'
						});
						}
					  },
					  onConfirm () {
						next({
						path: '/setting'
						});
					  }
					})
				  }else{
					Vue.$vux.confirm.show({
					title: '温馨提示',
					theme: 'android',
					content: '只有通过实名认证之后，才能查看其他用户的信息。',
					confirmText: '去实名认证',
					onCancel () {
					  if(!from.name){
					  next({
						path: '/home'
					  });
					  }
					},
					onConfirm () {
					  next({
					  path: '/identityAuth'
					  });
					}
					})
				  }
				}else{
					Vue.$vux.confirm.show({
					  title: '温馨提示',
					  theme: 'android',
					  content: '登录后才能查看个人信息',
					  confirmText: '去登录',
					  onCancel () {
						if(!from.name){
							next({
							  path: '/home'
							});
						}
					  },
					  onConfirm () {
						  next({name: "login", query: store.state.otherLogin.params&&store.state.otherLogin.params.query});
					  }
					})
				}
				return;
      }
	 
        // silentState 0关 1开
        if(to.name=="userInfo"&&to.query.silentState!=0&&(!store.state.isLogin||to.query.id!=store.state.userInfo.id)){
            if(to.query.silentState==1){
              Vue.$vux.toast.show({
                type: "text",
                text: "对方已设置不允许查看Ta的个人信息",
                position: "middle",
                width: "auto",
              });
              return;
            }else{
              try{
                let res = await server.getUserInfo({userId: to.query.id});
                if(res.data.data.silentState==1){
                  Vue.$vux.toast.show({
                    type: "text",
                    text: "对方已设置不允许查看Ta的个人信息",
                    position: "middle",
                    width: "auto",
                  });
                  return;
                }else{
                  next();
                }
              }catch (e) {
              }
            }
        }
			if(to.fullPath!=from.fullPath){//日志统计
				let channel={};//渠道
				if(params.query.isUnion||params.query.unionkey){
					channel={
						channel:params.query.isUnion||params.query.unionkey
					};
				}
				let jyNumber={};//合伙人人(乾坤号)
				/*if(params.query.jyNumber){
					jyNumber={
						jyNumber:params.query.jyNumber
					}
				}*/
				let taskId={};//任务ID
				if(params.query.taskId){
					taskId={
						taskId:params.query.taskId
					}
				}
				let pid={};//分享人(乾坤号)
				if(params.query.pid){
					pid={
						pid:params.query.pid
					}
				}
				let userInfo={};
				if(store.state.userInfo.id){
					userInfo={
						userId:store.state.userInfo.id,
						userName:store.state.userInfo.aliasName,
						sex:store.state.userInfo.sex,
						age:store.state.userInfo.age,
					}
				}
				store.dispatch("dataLog",{
					userId:store.state.userInfo.id||"匿名",
					action:to.name,
					source:store.state.isiOSApp?4:store.state.isApp?3:store.state.isWeixin?1:2,
					title:to.meta.title,
					info:JSON.stringify({...channel,...jyNumber,"URL":to.fullPath,...taskId,...pid,"sourceType":from.name?'站内':'站外',"source":from.name?from.fullPath:document.referrer?document.referrer:"直接访问","params":params,...userInfo}),
					readonly:true
				});
			}
			if(store.state.isLogin){//已经登录
				//alert("islogin:"+store.state.isLogin+"to.name:"+to.name)
				if(store.state.userInfo.sex==0){//需要补充资料
					if(to.name=="fillInUserInfo"){
						next();
					}else{
						next('/fillInUserInfo');
					}
					return false;
				}
				if(to.name=="login"||to.name=="registered"||to.name=="loginApp"||to.name=="fillInUserInfo"){
					next('/home');
					return false;
				}
				//console.log(store.state.userInfo)
				//alert("store.state.isWeixin:"+store.state.isWeixin+"===="+store.state.userInfo.openid)
				if(store.state.isWeixin&&!store.state.userInfo.openid){//微信打开且没有绑定微信
					//alert("微信打开")
					checkWxLogin(flag);
					return;
				}
				if(!store.state.isGetMessage){//临时修改,第一次进入需要获取的东西
					store.dispatch("pollingMessage");
					store.commit("CHANGESTORE",{name:"isGetMessage",value:true});//是否已经定时获取信息
				}

				next();
				return false;
			}else{
				if(store.state.isWeixin){//微信打开
					//alert("微信打开")
					checkWxLogin(flag);
					return;
				}
				if(!flag){
					next({name: "login", query: store.state.otherLogin.params&&store.state.otherLogin.params.query});
				}else{
					next();
				}
				return false;
			}
		}
		if(to.meta.requireAuth){//需要验证登录
			if(!to.meta.notRedirect){//主要针对setting设置页面
				store.commit('REDIRECT',to.fullPath);
			}
			store.dispatch("checkLogin").then((res)=>{
				checkLogin();
			});
		}else{
			store.dispatch("checkLogin",true).then((res)=>{
				checkLogin(true);
			});
		}
	//});
	//next();
	/**取消登录验证从这里结束***/
})
//router.beforeResolve(async (to,from,next)=>{
//	console.log("53333335");
//	next();
//});
//router.beforeResolve(async (to,from,next)=>{
	//store.dispatch("initSocket");
	/*if(window.api){
		window.api.setStatusBarStyle({
			style: 'dark'
		});
	}
	if(to.meta.hideWxMenu){
		hideOptionMenu&&hideOptionMenu();//微信隐藏菜单功能
	}else{
		showOptionMenu&&showOptionMenu();//微信显示菜单功能
	}
	Vue.nextTick(() => {//为获取正确的params
		//未登录，从登陆页面跳转至设置页面改为再跳转至设置页面的上一页我的页面
		if(!store.state.isLogin){
			if(to.name=="setting" && from.name=="loginApp"){
				next();
				return false;
			}
		}
		if(to.name=='myRedirect'){//外部跳转用的
			next();
			return false;
		}
		let params={};
		params=Fn.toWxUrl(window.location.href);
		//console.log("beforeResolve:"+JSON.stringify(params));
		if(store.state.isWeixin&&!store.state.ownWxshare.includes(to.name)){
			let obj={
				title : to.meta.shareTitle||'乾坤岛',
				desc : to.meta.shareDesc||'一个安全、纯粹、高效的婚恋交友平台',
				link:to.meta.shareUrl||store.state.baseURL+"/api/account/publicAddressLoginUrl?state="+(to.meta.shareRoute||params.str),
				imgUrl : to.meta.shareImg||store.state.baseFrontEndURL+'static/logo.png?'+new Date().getTime(),
			}

			wxShare&&wxShare({//微信分享设置
				...obj,
				debug:false
			},{
				success(){
					//alert("分享成功");
				},
				cancel(){
					//alert("分享失败");
				}
			});
		}
		if(!store.state.isWeixin&&to.name=="login"){//app的登录跳到loginApp
			next({
				path: '/loginApp',
				query: store.state.otherLogin.params&&store.state.otherLogin.params.query
			});
			return false;
		}
		if(params&&params.query&&params.query.unionkey&&params.query.unionkey=='zzrbPWC'&&sessionStorage){
			sessionStorage.setItem('isUnion',params.query.unionkey);
			if(params.query.unionFrom){
				sessionStorage.setItem('unionFrom',params.query.unionFrom);
			}
		}
		if(params.query.isUnion){//记录渠道号
			store.commit("CHANGESTORE",{name:"channel",value:{
				isUnion:params.query.isUnion,
				jyNumber:params.query.jyNumber,
			}});
		}
		if(params&&params.query&&params.query.pid&&params.query.taskId){
			console.log("完成任务")
			try{
				server.taskFinish({qkh:params.query.pid,taskNumber:params.query.taskId});
			}catch (e) {
			}
		}
		if(params.query&&params.query.redirectUrl){//商城来的地址
			let paramsPHP=Fn.toWxUrl("#/?state="+params.query.redirectUrl,":");
			let url=paramsPHP.name+".php";
			if(paramsPHP.query){
				Object.keys(paramsPHP.query).forEach(attr => {
					if(url.indexOf("?")!=-1){
						url+='&'+attr+"="+paramsPHP.query[attr];
					}else{
						url+='?'+attr+"="+paramsPHP.query[attr];
					}
				});
			}
			window.location.href=store.state.phpURL+"/mobile/"+url;
			return false;
		}
		if(to.meta.redirect){//不需要登录但需要登录后跳回的页面
			store.commit('REDIRECT',to.fullPath);
		}
		const checkWxLogin=async (flag)=>{
			if(store.state.otherLogin.isBind){
				//alert("第三方isBind");
				if(to.name=="login"||to.name=="registered"||to.name=="forgetPassword"||to.name=="loginApp"){
					next();
				}else{
					//next('/login');
					if(!flag){
						next({name: "login", query: store.state.otherLogin.params&&store.state.otherLogin.params.query});
					}else{
						next();
					}
				}
				return;
			}else{
				//params=Fn.toWxUrl(window.location.href);
				//alert("params:"+JSON.stringify(params));
				try{
					if(params.query&&params.query.code){
						let result = await server.WxCheckLogin({
							code:params.query.code,
						});
						//alert("WxCheckLogin"+JSON.stringify(result.data.data)+sessionStorage);
						if(sessionStorage){
						  sessionStorage.setItem('checkwxCode',params.query.code);
						  sessionStorage.setItem('checkwxResultData',JSON.stringify(result.data.data));
						}
						store.commit("CHANGEACCESSTOKEN",result.data.data);
						try{
							let userInfo = await server.getUserInfo({userId:result.data.data.userId});
							store.commit("LOGIN",userInfo.data.data);
						}catch(e){
							console.log("登录获取用户失败:"+JSON.stringify(e));
						}
						if(window.history&&window.history.replaceState){
							var url = params.query?window.location.href.replace("?code="+params.query.code,"?"):window.location.href;
							url = url.replace("&state="+params.str,'');
							window.history.replaceState({}, 0, url);//url去掉多余参数
						}
						if(params.query.redirectUrl){//商城来的地址
							let paramsPHP=Fn.toWxUrl("#/?state="+params.query.redirectUrl,":");
							let url=paramsPHP.name+".php";
							if(paramsPHP.query){
								Object.keys(paramsPHP.query).forEach(attr => {
									if(url.indexOf("?")!=-1){
										url+='&'+attr+"="+paramsPHP.query[attr];
									}else{
										url+='?'+attr+"="+paramsPHP.query[attr];
									}
								});
							}
							window.location.href=store.state.phpURL+"/mobile/"+url;
							return false;
						}
						//console.log("next222:"+params.name);
						let pagerouter={};
						if(params.params){
							pagerouter={
								pagerouter:params.params.pagerouter
							}
						}
						next({name: params.name||to.name, query: params.query,params:pagerouter});
						return;
					}else{
						let str=to.name;
						if(Object.keys(to.query).length>0){
							str+="_"
						}
						for(let v in to.query){
							str+="_"+v+"_"+to.query[v];
						}
						//alert("str:"+str);
						window.location.href=store.state.baseURL+"/api/account/publicAddressLoginUrl?&state="+str;
						return false;
					}
				}catch(e){
					//alert("微信:"+JSON.stringify(e));
					console.log("微信:"+JSON.stringify(e));
					if(e.status==140017){//没有绑定账号
						// alert("绑定微信:"+to.name)
						 if(window.history&&window.history.replaceState){
							var url = params.query?window.location.href.replace("?code="+params.query.code,"?"):window.location.href;
							url = url.replace("&state="+params.str,'');
							window.history.replaceState({}, 0, url);//url去掉多余参数
						}
						store.commit("CHANGEOTHERLOGIN",{
							unionid:e.data.unionid,
							openid:e.data.openid,
							unionkey:params.query&&params.query.unionkey,
							nominateUserId:params.query&&params.query.nominateUserId,
							isBind:true,
							type:'wxmp',
							params:params,
						});
						if(flag){
							next();
						}else{
							next({name: "login", query: params.query});
						}
						return false;
					}else if(e.status==500){//特殊处理500的
						//500
					}else{//再次获取code//http://192.168.0.50:8082/#/activityDetail?code=081X9aKn0glQDk1z3bKn0bHWJn0X9aKL&times=1545662543047&id=1583029e21d24ed4931537cf7fec302e&unionkey=zzrbPWC  返回了undefined
						if(sessionStorage){
						  let checkwxCode=sessionStorage.getItem('checkwxCode');
						  let checkwxResultData=sessionStorage.getItem('checkwxResultData');
						//alert("checkwxCode:"+checkwxCode+"====="+params.query.code+"===="+checkwxResultData)
						  if(checkwxCode==params.query.code&&checkwxResultData){//code重复
							checkwxResultData=JSON.parse(checkwxResultData);
							  store.commit("CHANGEACCESSTOKEN",checkwxResultData);
								try{
									let userInfo = await server.getUserInfo({userId:checkwxResultData.userId});
									store.commit("LOGIN",userInfo.data.data);
								}catch(e){
									//alert("checkwxResultData:"+JSON.stringify(e));
								}
								if(window.history&&window.history.replaceState){
									var url = params.query?window.location.href.replace("?code="+params.query.code,"?"):window.location.href;
									url = url.replace("&state="+params.str,'');
									window.history.replaceState({}, 0, url);//url去掉多余参数
								}
								if(params.query.redirectUrl){//商城来的地址
									let paramsPHP=Fn.toWxUrl("#/?state="+params.query.redirectUrl,":");
									let url=paramsPHP.name+".php";
									if(paramsPHP.query){
										Object.keys(paramsPHP.query).forEach(attr => {
											if(url.indexOf("?")!=-1){
												url+='&'+attr+"="+paramsPHP.query[attr];
											}else{
												url+='?'+attr+"="+paramsPHP.query[attr];
											}
										});
									}
									window.location.href=store.state.phpURL+"/mobile/"+url;
									return false;
								}
								//console.log("next222:"+params.name);
								let pagerouter={};
								if(params.params){
									pagerouter={
										pagerouter:params.params.pagerouter
									}
								}
								next({name: params.name||to.name, query: params.query,params:pagerouter});
								//next({name: params.name||to.name, query: params.query});
								return;
						  }
						}
						window.location.href=store.state.baseURL+"/api/account/publicAddressLoginUrl?&state="+params.str;
						return false;
					}
				}
			}
		}
		const checkLogin=async (flag)=>{
			//alert("store.state.isLogin:"+store.state.isLogin)
			console.log("检查登录:"+flag);
			if(to.name=="userInfo"&&((store.state.isLogin&& to.query.id != store.state.userInfo.id && (store.state.userInfo.idStatus!=1 ||  store.state.userInfo.silentState==1))||!store.state.isLogin)){
				if(store.state.isLogin){
				  if(store.state.userInfo.silentState==1){
			  Vue.$vux.confirm.show({
				title: '温馨提示',
				theme: 'android',
				content: '需要关闭静默开关才能查看其它用户信息',
				confirmText: '去关闭',
				onCancel () {
				  if(!from.name){
					next({
					  path: '/home'
					});
				  }
				},
				onConfirm () {
				  next({
					path: '/setting'
				  });
				}
			  })
			}else{
			  Vue.$vux.confirm.show({
				title: '温馨提示',
				theme: 'android',
				content: '为了让TA人更好的认识您，您需要花几分钟时间完成实名认证，并通过平台审核通过才能访问！',
				confirmText: '去完成',
				onCancel () {
				  if(!from.name){
					next({
					  path: '/home'
					});
				  }
				},
				onConfirm () {
				  next({
					path: '/identityAuth'
				  });
				}
			  })
			}
				}else{
					Vue.$vux.confirm.show({
					  title: '温馨提示',
					  theme: 'android',
					  content: '登录后才能查看个人信息',
					  confirmText: '去登录',
					  onCancel () {
						if(!from.name){
							next({
							  path: '/home'
							});
						}
					  },
					  onConfirm () {
						next({name: "login", query: store.state.otherLogin.params&&store.state.otherLogin.params.query});
					  }
					})
				}
				return;
			  }
			if(to.fullPath!=from.fullPath){//日志统计
				//let logParams={};
				//if(from.name){
				//	logParams=Fn.toWxUrl("#"+to.fullPath);
				//}else{
				//	logParams=Fn.toWxUrl(window.location.href);
				//}

				store.dispatch("dataLog",{
					userId:store.state.userInfo.id||"匿名",
					action:to.name,
					source:store.state.isiOSApp?4:store.state.isApp?3:store.state.isWeixin?1:2,
					title:to.meta.title,
					info:JSON.stringify({"渠道":params.query.unionkey,"URL":to.fullPath,"任务ID":params.query.taskId,"分享人":params.query.pid,"sourceType":from.name?'站内':'站外',"params":params})
				});
			}
			if(store.state.isLogin){//已经登录
				//alert("islogin:"+store.state.isLogin+"to.name:"+to.name)
				if(store.state.userInfo.sex==0){//需要补充资料
					if(to.name=="fillInUserInfo"){
						next();
					}else{
						next('/fillInUserInfo');
					}
					return false;
				}
				if(to.name=="login"||to.name=="registered"||to.name=="loginApp"||to.name=="fillInUserInfo"){
					next('/home');
					return false;
				}
				//console.log(store.state.userInfo)
				//alert("store.state.isWeixin:"+store.state.isWeixin+"===="+store.state.userInfo.openid)
				if(store.state.isWeixin&&!store.state.userInfo.openid){//微信打开且没有绑定微信
					//alert("微信打开")
					checkWxLogin(flag);
					return;
				}
				if(!store.state.isGetMessage){//临时修改,第一次进入需要获取的东西
					store.dispatch("pollingMessage");
					store.commit("CHANGESTORE",{name:"isGetMessage",value:true});//是否已经定时获取信息
				}
				next();
				return false;
			}else{
				if(store.state.isWeixin){//微信打开
					//alert("微信打开")
					checkWxLogin(flag);
					return;
				}
				if(!flag){
					next({name: "login", query: store.state.otherLogin.params&&store.state.otherLogin.params.query});
				}else{
					next();
				}
				return false;
			}
		}
		if(to.meta.requireAuth){//需要验证登录
			if(!to.meta.notRedirect){//主要针对setting设置页面
				store.commit('REDIRECT',to.fullPath);
			}
			store.dispatch("checkLogin").then((res)=>{
				checkLogin();
			});
		}else{
			store.dispatch("checkLogin",true).then((res)=>{
				checkLogin(true);
			});
		}
	});*/
//	next();//next必须,而且在下面,否则params不正确
//});
//router.afterEach(async (to,from)=>{
	//Vue.nextTick(() => {
		//let params={};
		//params=Fn.toWxUrl(window.location.href);
	//	console.log("当前页面params:"+JSON.stringify(params));

   // })
//});
export default router;
