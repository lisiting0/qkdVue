<template>
	<div :class="'main jy_all_top jy_act'+(' jy_act_'+tmp)">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><router-link :to="{name:'actInfo',query:{id:datingId}}" class="right"><i class="iconfont">&#xe679;</i></router-link><p>{{tmp=='jy'?'竞缘':tmp=='py'?'配缘':tmp=='qy'?'抢缘':tmp=='xy'?'选缘':tmp=='zy'?'中缘':''}}-{{owner&&owner.datingTitle}}-{{owner&&owner.jiaoyouUser.aliasName}}<!--{{chatRoomInfo&&(chatRoomInfo.state==5?'（已结束）':(chatRoomInfo.status==1||chatRoomInfo.state==6)?'(进行中)':chatRoomInfo.state==3?'(待开始)':'')}}--></p>
			</div>
		</div>
		<div :class="'jy_act_top'+(!prizeRun&&isActEnd&&chatRoomInfo&&chatRoomInfo.headimgAttachmentId?' jy_act_end':'')">
			<div class="jy_act_tx jy_act_tx_l">
				<i class="jy_act_tx_img" :style="owner?'background-image:url('+($store.state.imageUrl+owner.jiaoyouUser.headimgAttachmentId)+')':''"></i>
				<!--<span v-if="tmp=='jy'||tmp=='py'||tmp=='qy'" class="jy_act_tx_tit"><em bgImg="@images/f4.jpg"></em>风风火火dkdkd</span>
				<span v-else-if="tmp=='xy'||tmp=='zy'" class="jy_act_tx_tit"><i>320<em class="iconfont">&#xe60a;</em></i><i>410<em class="iconfont">&#xe62d;</em></i></span>-->
			</div>
			<div :class="'jy_act_tx jy_act_tx_r'+(!prizeRun&&isActEnd&&chatRoomInfo&&chatRoomInfo.headimgAttachmentId?'':' jy_act_nobody')">
				<i v-if="tmp=='zy'" class="jy_act_tx_img" :style="!prizeRun&&chatRoomInfo&&chatRoomInfo.headimgAttachmentId?'background-image:url('+($store.state.imageUrl+chatRoomInfo.headimgAttachmentId)+')':''"></i>
				<i v-else class="jy_act_tx_img" :style="chatRoomInfo&&chatRoomInfo.headimgAttachmentId?'background-image:url('+($store.state.imageUrl+chatRoomInfo.headimgAttachmentId)+')':''"></i>
				<!--<span v-if="tmp=='jy'||tmp=='py'||tmp=='qy'" class="jy_act_tx_tit"><em bgImg="@images/f3.jpg"></em>风风火火dkdkd</span>-->
			</div>
			<div class="jy_act_t_mid ">
				<p class="jy_act_price" v-if="tmp=='jy'&&chatRoomInfo"><i>{{isActEnd?'最终竞价':'当前竞价'}}</i><em data-t="乾坤币">{{chatRoomInfo.currentBidding||0}}</em></p>
				<p class="jy_act_time" v-if="tmp=='jy'&&((chatRoomInfo&&chatRoomInfo.status==1)||isActEnd)">{{isActEnd?'竞缘结束':actTime+"'"}}</p>
			</div>
			<ul class="jy_act_num" v-if="chatRoomInfo">
				<li>现场<i>{{chatRoomInfo.onlineCount}}人</i></li>
				<li>报名<i>{{chatRoomInfo.baoMingCount}}人</i></li>
				<li>旁观<i>{{chatRoomInfo.lookOnCount}}人</i></li>
			</ul>
			<p class="jy_act_sm" @click.shop="showSm=!showSm">{{tmp=='jy'?'竞缘':tmp=='py'?'配缘':tmp=='qy'?'抢缘':tmp=='xy'?'选缘':tmp=='zy'?'中缘':''}}说明</p>
			<p class="jy_act_ph" @click.shop="showPh=!showPh">
				<em>排行</em>
				<i v-if="(tmp=='qy'||tmp=='xy'||tmp=='zy')&&owner&&(owner.jiaoyouUser.id!=$store.state.userInfo.id)">{{tmp=='qy'?'累抢':'活跃'}}：{{tmp=='qy'?(chatRoomInfo&&totalCount)||0:activeDegree}}{{tmp=='qy'?'次':''}}</i>
			</p>
		</div>
		<div class="jy_act_mid">
			<div class="jy_act_mid_con">
				<div v-if="tmp=='jy'&&chatRoomInfo&&chatRoomInfo.status==1&&owner&&(owner.jiaoyouUser.id!=$store.state.userInfo.id)&&chatRoomInfo.state!=5" :class="'jy_act_jp'+(showJp?' cur':'')+(showJpPrice?' show':'')" >
					<i class="jy_act_jp_bj" @click.stop="showJp=true"></i>
					<div class="jy_act_jp_p">
						<em class="jy_act_jp_s" @click.shop="showJpPrice=!showJpPrice">{{jpPrice}}</em><i class="jy_act_add" @click.shop="addPrice">加价</i>
					</div>
					<i class="jy_act_jp_close" @click.stop="showJp=false,showJpPrice=false">&#xe622;</i>
					<ul class="jy_act_jp_list">
						<li v-for="item in [50,100,150,200]" @click.shop="jpPrice=item,showJpPrice=false">{{item}}</li>
					</ul>
				</div>
				<div v-else-if="showTime&&!isActEnd" class="jy_act_py_time" :data-num="chatRoomInfo&&chatRoomInfo.nextSession||0"><!-- 活动右下角倒计 -->
					<i v-if="reverseTime">{{reverseTime}}</i>
				</div>
				<div v-else-if="tmp=='qy'&&actStart" class="jy_act_qy_num" :data-num="chatRoomInfo&&chatRoomInfo.nextSession||0"  @click.shop="owner&&(owner.jiaoyouUser.id!=$store.state.userInfo.id)?showQy=true:''">
					<i>抢缘中</i>
				</div>
				<div v-else-if="tmp=='zy'&&showCj" class="jy_act_zy_ing"  @click.shop="showZy=true">
					<i>抽奖中</i>
				</div>
				<dl class="jy_act_lt">
					<!--<dt>2018-08-29 16:20:34</dt>-->
					<dd>
						<ul class="jy_act_lt_list" v-if="chatList">
							<template v-for="item,index in chatList">
								<li :class="item.userId==$store.state.userInfo.id?'jy_lt_right':'jy_lt_left'">
									<i @click.stop="getUserInfo(item.userId)" class="jy_lt_img" :style="'background-image:url('+$store.state.imageUrl+item.bicon+')'"><em  v-if="item.videoStatus==1" class="jy_lt_video"></em></i>
									<!--<i v-else class="jy_lt_img" :style="'background-image:url('+$store.state.imageUrl+item.bicon+')'"><em  v-if="item.videoStatus==1" class="jy_lt_video"></em></i>-->
									<div class="jy_lt_ico" v-if="owner&&(owner.jiaoyouUser.id==item.userId)">
										<em class="jy_icon_vip" v-if="owner.jiaoyouUser.cashDepositLevel"></em><em class="jy_icon_car" v-if="owner.jiaoyouUser.carStatus"></em><em class="jy_icon_identity" v-if="owner.jiaoyouUser.idStatus"></em><em class="jy_icon_healthy" v-if="owner.jiaoyouUser.healthyStatus"></em><em class="jy_icon_house" v-if="owner.jiaoyouUser.houseStatus"></em>
									</div>
									<h4>{{item.name}}<!--<i class="jy_h_img_xin"></i><i class="jy_h_img_xin2"></i><i class=" jy_h_img_q"></i><i class=" jy_h_img_v3"></i>--><i v-if="item.userId==owner.jiaoyouUser.id" class=" jy_h_text">群主</i></h4>
									<div class="jy_lt_msg" v-html="getExpContent(item.message)"></div>
								</li>
							</template>
						</ul>
					</dd>
				</dl>
				<dl class="jy_act_ph_list" v-if="showPh">
					<dt><i>活跃度排名</i></dt>
					<dd>
						<ul class="jy_ph_list">
							<li v-for="item,index in phList" :data-sort="index+1">
							
								<i class="jy_lt_img" :style="'background-image:url('+$store.state.imageUrl+item.jiaoyouUser.headimgAttachmentId+')'"><em v-if="item.jiaoyouUser.videoStatus==1" class="jy_lt_video"></em></i>
								<h4>{{item.jiaoyouUser.aliasName}}</h4>
								<div class="jy_ph_ico">
									<i class=" jy_h_img_v3"></i><i class=" jy_h_img_q"></i>
								</div>
								<em class="jy_ph_num">{{item.activeDegree}}</em>
							</li>
							
						</ul>
					</dd>
				</dl>
				<ul v-if="showResultWin" class="jy_act_py_success" @click.stop="showResult=false">
					<li>
						<i :style="owner?'background-image:url('+($store.state.imageUrl+owner.jiaoyouUser.headimgAttachmentId)+')':''"></i>
						{{owner&&owner.jiaoyouUser.aliasName}}
					</li>
					<li>
						<i :style="chatRoomInfo?'background-image:url('+($store.state.imageUrl+chatRoomInfo.headimgAttachmentId)+')':''"></i>
						{{chatRoomInfo&&chatRoomInfo.userName}}
					</li>
				</ul>
				<div v-if="tmp=='qy'&&showQy&&owner&&$store.state.userInfo.id!=owner.jiaoyouUser.id" class="jy_act_qy_start">
					<p class="jy_act_qy_t">
						<i v-if="actEndTime>=0">00:00:{{actEndTime<10?"0"+actEndTime:actEndTime}}</i>
						<em class="jy_act_qy_close" @click.shop="showQy=false">&#xe622;</em>
					</p>
					<i :class="'jy_act_qy_btn'+(qyClick?' cur':'')" @touchstart="touchStart($event)" @touchend="touchEnd($event)"></i>
					<p class="jy_act_qy_b">
						<i>抢缘次数：{{qynum}}</i>
						<!--<i>实时抢缘排名：2</i>-->
					</p>
				</div>
				<div v-if="tmp=='zy'&&showZy" class="jy_act_zy_prize">
					<p class="jy_act_qy_t">
						<!--<i>00:00:15</i>-->
						<em class="jy_act_qy_close" @click.shop="showZy=false">&#xe622;</em>
					</p>
					<Prize @endPrize="endPrize" @prizeRunning="prizeRunning" :datingId="datingId"></Prize>
					<!--<p class="jy_act_zy_b"><i><em bgImg="@images/e4.jpg"></em>看天不美   正在抽奖.....</i></p>-->
				</div>
			</div>
		</div>
		<!--<div class="jy_act_comment"></div>-->
		<div v-transfer-dom>
			<popup v-model="showWin" height="100%" :hide-on-blur=false position="bottom" :popup-style="{zIndex:596}" :should-scroll-top-on-show="true">
			<div class="top_userInfo" v-if="showInfo">
				<userInfo :actDatingId="datingId" :select="select" @openWin="openWin" @hiddenInfo="hiddenInfo" :userId="userId"></userInfo>
			</div>
			</popup>
		</div>
		<transition enter-active-class="slideInUp" leave-active-class="slideOutUp">
		  <gift v-show="showGift" :showAnimate="false"  @sendGift="sendGift" :name="title" @close="sendGift" :list="giftList"></gift>
		</transition>
		<div v-transfer-dom>
		  <x-dialog v-model="showSm" :hide-on-blur=true>
			<div class="jy_act_smDesc">
				<h4>{{tmp=='jy'?'竞缘':tmp=='py'?'配缘':tmp=='qy'?'抢缘':tmp=='xy'?'选缘':tmp=='zy'?'中缘':''}}说明</h4>
				<p v-if="tmp=='xy'">入场选缘开始后，发起人版主选择约会对象（可以通过聊天、送礼等来博取缘主的关注和好感哦），活动持续30分钟</p>
				<p v-if="tmp=='qy'"> 入场抢缘开始后，会有3轮抢点的机会，每轮间隔2分钟，三轮累计抢点次数最高者胜出，为了女神，施展你的弹指神通吧！活动持续30分钟</p>
				<p v-if="tmp=='py'">入场配缘开始后，系统会有30分钟内匹配一位伙伴与缘主进行约会，通过聊天、送礼等会增加自己的匹配率哦！</p>
				<p v-if="tmp=='zy'">入场中缘开始后，通过聊天、送礼等会增加自己的活跃度，每消耗120活跃度可以进行一次抽奖，快来抽走你的女神吧！活动持续30分钟</p>
				<p v-if="tmp=='jy'">入场竞缘开始后，通过竞价的方式来竞得本次的邀约，竞价开始后30秒内如果没有加价，则当前竞价者胜出，活动持续到竞价完成为止。</p>
			</div>
		  </x-dialog>
		</div>
		<div class="ds_flower">
			<!--<div class="flower"></div>-->
			<ul>
				<!--<li><div><i style="background-image:url(images/p2.jpg);"></i>琪琪zara<div class="flower"><em>8</em></div></div></li>-->
			</ul>
		</div>
	</div>	
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import Prize from './prize.vue';
  import userInfo from '../user/userInfo.vue';
  import emotion from '@/assets/emotion/emotion';
  import gift from '../plugs/gift';
   import myApi from '@js/flower.js';
  import {Popup,TransferDom,XDialog} from 'vux'

  let fontsize = parseInt(document.documentElement.style.fontSize);
  export default {
    name: 'actScene',
    data () {
		return {
			showInfo:false,
			showWin:false,
			datingId:null,
			userId:null,
			showJp:false,//展开竞拍按钮
			showJpPrice:false,//显示竞拍价格列表
			jpPrice:100,//竞拍价
			isloading:false,
			isActEnd:false,//竞价是否结束
			showPh:false,//显示排行榜
			showSm:false,//显示活动说明
			showQy:false,//显示抢缘倒计
			showZy:false,//显示中缘抽奖
			showCj:false,//显示抽奖按钮
			showResult:false,//显示活动结果弹窗
			tmp:'',//模版 竞缘 :'jy',配缘 :'py',抢缘 :'qy',选缘 :'xy',中缘 :'zy'
			dataChats:[],
			UIChatBox:null,
			chatRoomInfo:null,//活动信息
			inputBarHeight:0,
			limit:1000,//读取的聊天条数
			chatList:null,//聊天信息
			jytimeout:null,//竞缘活动倒计
			timeout:null,//定时器
			actTime:"00:00",//竞缘活动剩余时间
			phList:[],//排行榜列表
			owner:null,
			qynum:0,//抢缘次数
			actStart:false,//活动是否开始
			showTime:false,//显示倒计
			reverseTime:"00:00",
			actEndTime:0,//活动结束倒计
			totalCount:0,//抢缘累抢次数
			qyClick:false,//抢缘时按钮点击动画
			showGift:false,
			giftList:[],
			giftEndlist:[],
			title:'',
			flower:{},
			activeDegree:0,//活跃度
			prizeRun:false,//抽奖转盘是否在转动
			select:false,//选缘查看用户信息可以选择用户
		}
    },
    computed: {
      listenChatRoomMessageList() {
        return this.$store.state.chatRoomMessageList;
      },
	  listenChatRoomFlower(){
		return this.$store.state.giftObj;
	  },
	  chatRoomInfoMsg() {
        return this.$store.state.chatRoomInfo;
      },
	  showResultWin(){
		return this.showResult&&this.chatRoomInfo&&this.chatRoomInfo.headimgAttachmentId;
	  }
    },
    components: {
      Loading,
	  Prize,
	  Back,
	  userInfo,
	  Popup,
	  gift,
	  XDialog,
    },
	directives: {
      TransferDom
    },
    watch:{
		listenChatRoomFlower(gift){
			//console.log("收到花:"+JSON.stringify(gift));
			const t=this;
			t.flower.putFlower(gift.userName,1,gift.userImage,gift.giftId,gift.giftImage);
		},
      listenChatRoomMessageList(newList){
        //消息列表，用于展示
       console.log('聊天室新消息：'+JSON.stringify(newList))
		this.chatList=newList;
		this.$nextTick(()=>{//滚动到底部
			//$(".jy_act_lt")[0].scrollTop=$(".jy_act_lt_list").outerHeight(true);
			$(".jy_act_lt").animate({"scrollTop":$(".jy_act_lt_list").outerHeight(true)},500);
		})
      },
	  chatRoomInfoMsg(val){//活动信息更新
			const t=this;
			t.chatRoomInfo=val;
			if(t.tmp=='jy'){
				if(t.chatRoomInfo.remainingTime){//竞价倒计时
					clearInterval(t.jytimeout);
					t.jytimeout=setInterval(()=>{
						t.chatRoomInfo.remainingTime--;
						if(t.chatRoomInfo.remainingTime>0){
							let min =Math.floor(t.chatRoomInfo.remainingTime/60);
							let sec=t.chatRoomInfo.remainingTime%60;
							t.actTime=(min<10?"0"+min:min+"")+":"+(sec<10?"0"+sec:sec+"");
						}else{
							t.actTime="00:00";
							clearInterval(t.jytimeout);
						}	
					},1000);
				}
				if(t.chatRoomInfo.activityStarttime){//活动开始倒计时
					clearInterval(t.timeout);
					t.showTime=true
					let startTime=Math.round((t.chatRoomInfo.activityStarttime-t.chatRoomInfo.systemTime)/1000);
					if(startTime>0){
						t.timeout=setInterval(()=>{
							startTime--;
							if(startTime>0){
								let hour=Math.floor(startTime/60/60);
								let min =Math.floor(startTime/60)%60;
								let sec=startTime%60;
								t.reverseTime=(hour>0?(hour<10?'0'+hour:hour+''):'')+":"+(min<10?"0"+min:min+"")+":"+(sec<10?"0"+sec:sec+"");
							}else{
								t.reverseTime="00:00";
								t.showTime=false;
								clearInterval(t.timeout);
							}	
						},1000);
					}
				}
				
			}else if(t.tmp=='qy'){
				if(t.chatRoomInfo.status==1){//抢缘活动开始
					t.actStart=true;
					t.actEndTime=t.chatRoomInfo.remainingTime;//离抢缘结束时间
					clearInterval(t.timeout);
					t.timeout=setInterval(()=>{
						t.actEndTime--;
						if(t.actEndTime<0){//倒计结束
							clearInterval(t.timeout);
							t.actStart=false;
							t.actEndTime=0;
						}
					},1000);
				}
				if(t.chatRoomInfo.activityStarttime&&t.chatRoomInfo.activityStarttime>=0&&!t.actStart&&!t.chatRoomInfo.nextStartTime&&t.chatRoomInfo.state==3){//活动开始前倒计
					clearInterval(t.timeout);
					t.showTime=true
					let startTime=Math.round((t.chatRoomInfo.activityStarttime-t.chatRoomInfo.systemTime)/1000);
					if(startTime>0){
						t.timeout=setInterval(()=>{
							startTime--;
							if(startTime>0){
								let hour=Math.floor(startTime/60/60);
								let min =Math.floor(startTime/60)%60;
								let sec=startTime%60;
								t.reverseTime=(hour>0?(hour<10?'0'+hour:hour+''):'')+":"+(min<10?"0"+min:min+"")+":"+(sec<10?"0"+sec:sec+"");
							}else{
								t.reverseTime="00:00";
								t.showTime=false;
								clearInterval(t.timeout);
							}	
						},1000);
					}
				}else if(t.chatRoomInfo.nextStartTime&&t.chatRoomInfo.nextStartTime>=0&&!t.actStart){//下一轮倒计
					t.showTime=true
					let endTime=t.chatRoomInfo.nextStartTime;
					clearInterval(t.timeout);
					t.timeout=setInterval(()=>{
						endTime--;
						if(endTime>0){
							let hour=Math.floor(endTime/60/60);
							let min =Math.floor(endTime/60)%60;
							let sec=endTime%60;
							t.reverseTime=(hour>0?(hour<10?'0'+hour:hour+''):'')+":"+(min<10?"0"+min:min+"")+":"+(sec<10?"0"+sec:sec+"");
						}else{
							t.reverseTime="00:00";
							clearInterval(t.timeout);
							t.showTime=false;
						}	
					},1000);
				}
			}else if(t.tmp=='xy'){
				if(t.chatRoomInfo.activityEndtime){//活动结束倒计时
					clearInterval(t.timeout);
					t.showTime=true
					let endTime=Math.round((t.chatRoomInfo.activityEndtime-t.chatRoomInfo.systemTime)/1000);//活动结束时间
					//console.log("结束时间:"+endTime);
					if(endTime>0){
						t.timeout=setInterval(()=>{
							endTime--;
							if(endTime>0){
								let hour=Math.floor(endTime/60/60);
								let min =Math.floor(endTime/60)%60;
								let sec=endTime%60;
								t.reverseTime=(hour>0?(hour<10?'0'+hour:hour+''):'')+":"+(min<10?"0"+min:min+"")+":"+(sec<10?"0"+sec:sec+"");
							}else{
								t.reverseTime="00:00";
								clearInterval(t.timeout);
							}	
						},1000);
					}
				}
			}
			//console.log("活跃度:"+JSON.stringify(t.chatRoomInfo.activeDegreeList));
			if(t.chatRoomInfo.activeDegreeList){
				for(let i=t.chatRoomInfo.activeDegreeList.length||0;i--;){
					if(t.chatRoomInfo.activeDegreeList[i].userId==t.$store.state.userInfo.id){
						t.activeDegree=t.chatRoomInfo.activeDegreeList[i].activeDegree;
						if(t.tmp=="zy"){//中缘
							if(t.chatRoomInfo.activeDegreeList[i].status==1&&!t.isActEnd){
								t.showCj=true;
							}else{
								t.showCj=false;
							}
						}
						break;
					}
				}
			}
			if(t.chatRoomInfo.state==5){//活动结束
				t.isActEnd=true;
			}
		},
		isActEnd(val){
			const t=this;
			if(val){//活动结束
				if(t.tmp=='zy'){//中缘要等转盘完了后才显示结果
					t.showCj=false;//中缘抽奖
					if(!t.prizeRun){
						t.showResult=true;//活动结果弹窗
						t.showZy=false;//隐藏抽奖奖盘
					}
				}else{
					t.showResult=true;//活动结果弹窗
				}	
			}
		},
		actStart(val){//活动是否开始
			const t=this;
			if(val){
				if(t.tmp=='qy'){//抢缘
					t.showQy=true;//显示抢缘按钮
					t.showTime=false;//隐藏开始时间倒计
				}
			}else{
				if(t.tmp=='qy'){//抢缘结束
					t.showQy=false;//隐藏抢缘按钮
					let time=5;
					
					;(async function updata(){
						if(t.owner.jiaoyouUser.id==t.$store.state.userInfo.id){//自己的活动不更新次数
							return false;
						}
						try{
							time--;
							const result=await t.$server.robbingTime({
								datingActivityId:t.datingId,
								clickCount:t.qynum
							});
							t.qynum=0;
							t.totalCount=result.data.data.totalCount;
							console.log("更新次数成功:"+JSON.stringify(result));
						}catch(e){
							if(time>0){
								setTimeout(()=>{
									updata();
								},1000);
							}	
						}
					}())
				}
			}
		},
		async showPh(val){
			const t=this;
			if(val){
				try{
					const result= await t.$server.getDatingCandidateList({
						datingId:t.datingId,
						page:1,
						rows:t.$store.state.pageSize
					});
					console.log("排行:"+JSON.stringify(result.data.list));
					t.phList=result.data.list;
				}catch(e){
				
				}
			}
		},
		showZy(val){
			const t=this;
			if(!val){
				t.prizeRun=false;
			}
		},
		showWin(val){
			if(val){
				this.UIChatBox&&this.UIChatBox.hide()
			}else{
				this.UIChatBox&&this.UIChatBox.show()
			}
		}
    },
	 beforeRouteLeave (to, from, next) {
		const t=this;
		clearInterval(t.jytimeout)
		clearInterval(t.timeout)
		
      this.UIChatBox&&this.UIChatBox.close();
      next();
    },
    async mounted () {
		const t=this;
		const id=t.$route.query.id;
		t.datingId = t.$route.query.datingId;
		t.tmp=id==1?'xy':id==2?'qy':id==3?'jy':id==4?'zy':id==5?'py':'';
		console.log("活动ID:"+t.datingId);
		
		t.flower=new myApi(function(gift){
			t.giftAniEnd(gift)
		});
		await t.getSingle();//获取活动详情
		if(!window.api){
			t.actStatus();//获取活动状态
			return false;
		}
		this.joinChatRoom();
      this.UIChatBox = window.api.require('UIChatBox');
	  let extras={},extrasBtn={};
	  if(t.$store.state.userInfo.id!=t.owner.jiaoyouUser.id){
		extras= {extras:{
          titleSize: 12,
          titleColor: '#a3a3a3',
          btns: [ {
            title: '礼物',
            normalImg: 'widget://image/gift.png',
            activeImg: 'widget://image/gift.png'
          }]
        }}
		extrasBtn={
			extrasBtn:{
            normalImg: 'widget://image/act_gift.png'
          }
		}
	  }
      this.UIChatBox.open({
        placeholder: '',
        maxRows: 4,
        emotionPath: 'widget://image/emotion',
        texts: {
         /* recordBtn: {
            normalTitle: '按住 说话',
            activeTitle: '松开 结束'
          },*/
          sendBtn: {
            title: '发送'
          }
        },
        styles: {
          inputBar: {
            borderColor: '#d9d9d9',
            bgColor: '#f2f2f2'
          },
          inputBox: {
            borderColor: '#B3B3B3',
            bgColor: '#FFFFFF'
          },
          emotionBtn: {
            normalImg: 'widget://image/face.png',
          },
		  ...extrasBtn,
          keyboardBtn: {                      //JSON对象；键盘按钮样式
            normalImg: 'widget://image/keyboard.png'
          },
          /*speechBtn: {
            normalImg: 'widget://image/voice.png',
            activeImg: 'widget://image/keyboard.png'
          },*/
         /* recordBtn: {
            normalBg: '#c6c6c6',
            activeBg: '#999999',
            color: '#000',
            size: 14
          },*/
          indicator: {
            target: 'both',
            color: '#c4c4c4',
            activeColor: '#9e9e9e'
          },
          sendBtn: {
            titleColor: '#4cc518',
            bg: '#f2f2f2',
            activeBg: '#46a91e',
            titleSize: 14
          }
        },
		...extras,
      }, function(ret, err) {
        if(ret.eventType=="send"){
          if(!ret.msg.trim()){
            return false;
          }
          /*t.dataChats.push({
            id:t.dataChats.length+1,
            icon:t.$store.state.userInfo.icon,
            userId:t.$store.state.userInfo.id,
            name:t.$store.state.userInfo.aliasName,
            message:ret.msg,
            video:null,
            img:null,
            audio:null,
            datetime:t.$utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
            showTime:true,
          })*/
         t.setMessage(3,ret.msg,null,null,null)
        }else if(ret.eventType=='clickExtras'){
          if(ret.index==0){
            t.UIChatBox.hide();
			t.UIChatBox.closeBoard();
			t.UIChatBox.closeKeyboard();
            t.showGift=true;
          }
        }
      });
	  /*监听事件*/
	  this.UIChatBox.addEventListener({
        target: 'inputBar',
        name: 'move'
      }, (ret, err)=> {
        if (ret) {
          this.panelHeight = parseInt(ret.panelHeight)
        }
      });
	  if(t.$store.state.userInfo.id!=t.owner.jiaoyouUser.id){
		   this.UIChatBox.addEventListener({
		   target: 'inputBar',
		   name: 'showExtras'
		 }, (ret, err)=> {
		   if (ret) {
			 console.log(JSON.stringify(ret))
			 
			t.UIChatBox.hide();
			t.UIChatBox.closeBoard();
			t.UIChatBox.closeKeyboard();
			t.showGift=true;
		
		   }
		 });
	 }
      this.UIChatBox.addEventListener({
        target: 'inputBar',
        name: 'change'
      }, (ret, err)=> {
        if (ret) {
          console.log(!$api.getStorage('UIChatBoxHeight'))
          if(!$api.getStorage('UIChatBoxHeight')){
            console.log(this.myScrollerHeight)
            $api.setStorage('UIChatBoxHeight',ret.inputBarHeight);
            console.log(this.myScrollerHeight)
            this.myScrollerHeight = document.body.clientHeight-$(".header").height()-(0.75)*fontsize-3-ret.inputBarHeight;
            console.log(this.myScrollerHeight)
            this.$nextTick(()=>{
              this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight-this.myScrollerHeight;
              this.oldScrollHeight = this.$refs.scroll.scrollHeight;
            })
          }
          this.inputBarHeight = parseInt(ret.inputBarHeight);
        }
      });
	  
    },
    beforeDestroy () {
      this.quitChatRoom();
    },
    methods :{
		getUserInfo(userId){
			const t=this;
			if(t.tmp=='xy'&&t.$store.state.userInfo.id==t.owner.jiaoyouUser.id&&!t.isActEnd){
				t.select=true;
			}else{
				t.select=false;
			}
			t.showInfo=true;
			t.userId=userId;
		},
		prizeRunning(val){//抽奖转盘是否在转动
			const t=this;
			t.prizeRun=val;
		},
		endPrize(index){//抽奖结束
			const t=this;
			const msg=index==0?'美丽约会':(index==1||index==4)?'谢谢参与':index==2?'150 乾坤币':index==3?'100 乾坤币':index==5?'50 乾坤币':'';
			t.$vux.toast.show({
				type:"text",
				text: msg,
				position:"middle",
				width:"2rem",
			});
			if(!t.showCj){
				t.showZy=false;//隐藏抽奖奖盘
			}
			t.prizeRun=false;
			//if(!t.showCj||t.isActEnd){
			if(t.isActEnd){
				//setTimeout(()=>{
					t.showResult=true;//活动结果弹窗
					t.showZy=false;//隐藏抽奖奖盘
					t.showCj=false;
				//},1000);
			}
		},
		giftAniEnd(gift){//把礼物发到服务器
			const t=this;
			if(gift){
				console.log("连点结束:"+JSON.stringify(gift));
				if(gift.sendobj){//自己发的
					try{
						t.$server.chartroomGift({
							"objectId":t.datingId,
							giftId:gift.sendobj.giftId,
							amount:gift.num
						}).then((res)=>{
							console.log("送花结果:"+JSON.stringify(res));
							t.activeDegree=res.data.data.activeDegree;
							if(t.tmp=="zy"){//中缘
								if(res.data.data.status==1&&!t.isActEnd){
									t.showCj=true;
								}else{
									t.showCj=false;
								}
							}
						});
					}catch(e){
						console.log(e);
					}	
				}
			}else{//旧的(弃用)
				let giftEndlist=t.$utils.deepCopy(t.giftEndlist);
				t.giftEndlist=[];
				let giftEndObj={};
				for(let i=giftEndlist.length;i--;){
					if(!giftEndObj[giftEndlist[i].id]){
						giftEndObj[giftEndlist[i].id]=0;
					}
					giftEndObj[giftEndlist[i].id]++;
				}
				Object.keys(giftEndObj).forEach(id => {
					t.$server.chartroomGift({
					 "objectId":t.owner.jiaoyouUser.id,
					 giftId:id,
					 amount:giftEndObj[id]
				   }).then((res)=>{
					console.log(JSON.stringify(res));
				   });
				   
				});
			}	
		},
		async sendGift(giftObj){
        //this.showGift=false;
        //this.panelHeight=0;
        //this.UIChatBox.show();
		
        if(giftObj){
			this.giftEndlist.push(giftObj);
          /*//this.$vux.loading.show();
           await this.$server.chartroomGift({
             "objectId":this.owner.jiaoyouUser.id,
             giftId:giftObj.id,
             amount:1
           })
          this.$vux.loading.hide();*/
         /* this.dataChats.push({
            id:new Date().getTime(),
            messageId:null,
            time:this.$utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
            type:1,
            userId:this.$store.state.userId,
            remark:'发送中',
            giftId:giftObj.id,
            giftImage:this.$utils.getFullPath(giftObj.giftImage),
            giftName:giftObj.giftName,
            giftJiaobi:giftObj.jiaobi,
            bname:this.$store.state.userInfo.aliasName,
            bicon:this.$store.state.userInfo.headimgAttachmentId,
            targetId:this.targetId
          })*/
          let sendobj={};
          sendobj.giftId = giftObj.id
          sendobj.giftImage = this.$utils.getFullPath(giftObj.giftImage)
          sendobj.giftName = giftObj.giftName
          sendobj.giftJiaobi = giftObj.jiaobi
		  sendobj.userName=this.$store.state.userInfo.aliasName;
		  sendobj.userId=this.$store.state.userInfo.id;
		  sendobj.userImage=this.$store.state.imageUrl+this.$store.state.userInfo.headimgAttachmentId;
		  this.flower.putFlower(sendobj.userName,1,sendobj.userImage,sendobj.giftId,sendobj.giftImage,sendobj);
          this.$store.state.rongCloud.sendCommandMessage({
            conversationType: 'CHATROOM',
            targetId: this.datingId,
            name: 'gift',
            data: JSON.stringify(sendobj)
          },(ret, err)=> {
            if (ret.status == 'prepare') {
              console.log(JSON.stringify(ret.result.message));
            }else if (ret.status == 'success') {
              console.log(ret.result.message.messageId);
              //this.saveMessage(1,null,null,null,null,'','[送出礼物]',ret.result.message.messageId,null,null,sendobj)
            }else if (ret.status == 'error'){
              let remark='发送失败';
              if(err.code=='30014'){
                remark='发送处理失败'
              }else if(err.code=='31009'){
                remark='您被对方屏蔽'
              }else if(err.code=='405'){
                remark='您被对方加入黑名单'
              }
              console.log(JSON.stringify(err))
             // this.saveMessage(1,null,null,null,null,remark,'[送出礼物]',new Date().getTime(),null,null,sendobj)
            }
          })
        }else{
			this.showGift=false;
			this.UIChatBox.show();
			this.UIChatBox.closeBoard();
		}
      },
      async getGift(){
        let list = await this.$server.getGiftList()
        this.giftList = list.data.data||[];
      },
		touchStart(e){
			const t=this;
			t.qyClick=true;
			console.log("t.actStart:"+t.actStart);
			if(t.actStart){
				t.qynum++;
			}else{
				t.$vux.toast.show({
					type:"text",
					text: "活动没开始",
					position:"bottom",
					width:"auto",
				});
			}
		},
		touchEnd(e){
			this.qyClick=false;
		},
		openWin(){
			this.showWin=true;
		},
		hiddenInfo(){
			this.showWin=false;
			setTimeout(()=>{
				this.showInfo=false;
			},800)
		},
		async getSingle(){//获取活动详情
			const t=this;
			try{
				const result =await t.$server.getSingle({
					datingDetailsId:t.datingId
				});
				t.owner=result.data.data;
				t.title=t.owner.jiaoyouUser.aliasName;
				console.log("活动详情:"+JSON.stringify(result.data));
			}catch(e){
				console.log(e);
			}
		},
		getExpContent(content){
			const t=this;
			let imgArr2=content.match(/\[.+?\]/g);
			if(imgArr2){
				imgArr2.map(item1=>{
					emotion.map(emo=>{
						if(emo.text==item1){
							content = content.replace(item1,'<img class="imgcontent" src="static/emotion/'+emo.name+'.png"/>');
						}
					})
				})
			}
			return content;
		},
		setMessage(type,text,imgUrl,audio,location,duration){
        const _t = this;
        //发送消息
        const tp = type==1?"PRIVATE":type==2?"GROUP":type==3?"CHATROOM":type==4?"DISCUSSION":"SYSTEM ";//1单聊2群组3聊天室4讨论组5系统
        let sendObj={}
        if(text){
          sendObj={
            conversationType: tp,
            targetId: _t.datingId,
            text: text,
            extra: ''
          }
          this.$store.state.rongCloud.sendTextMessage(sendObj, function(ret, err) {
            if (ret.status == 'prepare') {
              console.log("prepare:",{msg: JSON.stringify(ret.result.message)});
            }else if (ret.status == 'success') {
              console.log("success:",{msg: ret.result.message.messageId});
              _t.saveMessage(type,text,imgUrl,audio,location,'',text,ret.result.message.messageId,null,null)
            }else if (ret.status == 'error'){
              let remark='发送失败';
              if(err.code=='30014'){
                remark='发送处理失败'
              }else if(err.code=='31009'){
                remark='您被对方屏蔽'
              }else if(err.code=='405'){
                remark='您被对方加入黑名单'
              }
			  console.log("remark:",remark)
              _t.saveMessage(type,text,imgUrl,audio,location,remark,text,new Date().getTime(),null,null)
            }
          });
        }else if(audio){
          sendObj={
            conversationType: tp,
            targetId: _t.datingId,
            voicePath: audio,
            duration: duration,
            extra: ''
          }
          this.$store.state.rongCloud.sendVoiceMessage(sendObj, function(ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
            if (ret.status == 'prepare') {
              console.log(JSON.stringify(ret.result.message));
            }else if (ret.status == 'success') {
              console.log(ret.result.message.messageId);
              _t.saveMessage(type,text,imgUrl,audio,location,duration,'[语音]',ret.result.message.messageId,null,null)
            }else if (ret.status == 'error'){
              let remark='发送失败';
              if(err.code=='30014'){
                remark='发送处理失败'
              }else if(err.code=='31009'){
                remark='您被对方屏蔽'
              }else if(err.code=='405'){
                remark='您被对方加入黑名单'
              }
              _t.saveMessage(type,text,imgUrl,audio,location,remark,'[语音]',new Date().getTime(),null,null)
            }
          });
        }
      },
      saveMessage(type,text,imgUrl,audio,location,status,tip,messageId,lon,lat){
        //保存消息到本地
        let _t= this;
        let remark = status;
       // _t.$db.insertOrUpdateUnreadCount(_t.datingId,3,(_t.$store.state.userInfo.headimgAttachmentId),_t.$store.state.userInfo.aliasName,0,text,new Date().getTime(),messageId,_t.$store.state.userId,_t.$store.state.userId)
       //  this.$store.dispatch("getConversationList")
        _t.$db.insertConversation(_t.datingId,1,(_t.$store.state.userInfo.headimgAttachmentId),_t.$store.state.userInfo.aliasName,_t.$store.state.userId,text,new Date().getTime(),remark,_t.$store.state.userId,location,imgUrl,audio,messageId,lon,lat)
		
        _t.getNewMessageList();
        //_t.$store.dispatch("getConversationList")
      },
	  getNewMessageList(status){
        let _t = this;
        const dataChats=this.$db.getConversation(this.datingId,this.$store.state.userId,this.limit);
        //if(this.dataChats.length<this.limit){
        //  this.getMoreList = false
        //}
        this.$db.resetCount(this.datingId,this.$store.state.userId);
		_t.$store.commit('CHANGECHATROOMMESSAGELIST',dataChats)
		_t.$nextTick(()=>{//滚动到底部
			//$(".jy_act_lt")[0].scrollTop=$(".jy_act_lt_list").outerHeight(true);
			$(".jy_act_lt").animate({"scrollTop":$(".jy_act_lt_list").outerHeight(true)},500);
		})
       // this.$store.dispatch('getConversationList')
        /*if(status==true){
          _t.$nextTick(()=>{
            _t.$refs.scroll.scrollTop = _t.$refs.scroll.scrollHeight-_t.oldScrollHeight;
            _t.oldScrollHeight = _t.$refs.scroll.scrollHeight;
          })
        }else{
          _t.$nextTick(()=>{
            if(_t.$refs.scroll.scrollHeight>_t.myScrollerHeight){
              _t.$refs.scroll.scrollTop = _t.$refs.scroll.scrollHeight-_t.myScrollerHeight;
              _t.oldScrollHeight = _t.$refs.scroll.scrollHeight;
            }else{
              _t.marginTop = -(parseInt(_t.inputBarHeight)+parseInt(_t.panelHeight)-$api.getStorage('UIChatBoxHeight')-_t.myScrollerHeight+_t.$refs.scroll.scrollHeight)
              _t.marginTop=_t.marginTop>0?0:_t.marginTop;
            }
          })
        }*/
        // console.log("this.dataChats:"+JSON.stringify(this.dataChats))
      },
     joinChatRoom(){
		const t=this;
		t.isloading=true;
      this.$store.commit('CHANGECURRENTCHATROOMID',this.datingId)
	  this.getNewMessageList();
	  if(!this.$store.state.rongCloud){
		console.log("融云初始化失败");
		return false;
	  }
	  // let name = (this.tmp=='jy'?'竞缘':this.tmp=='py'?'配缘':this.tmp=='qy'?'抢缘':this.tmp=='xy'?'选缘':this.tmp=='zy'?'中缘':'')+'-'+(this.owner&&this.owner.datingTitle)+'-'+(this.owner&&this.owner.jiaoyouUser.aliasName);
	  // console.log(name);
    //    this.$db.insertOrUpdateUnreadCountName(this.datingId,3,this.owner.coverimgImages?this.owner.coverimgImages:this.owner.jiaoyouUser.headimgAttachmentId,name,new Date().getTime(),this.$store.state.userId,this.owner.state==3?'待开始':this.owner.state==5?'已结束':this.owner.state==6?'进行中':'')
    //    this.$store.dispatch("getConversationList")
      this.$store.state.rongCloud.joinChatRoom({
        chatRoomId: this.datingId,
        defMessageCount: -1
      }, async (ret, err)=> {
		//alert(ret.status)
        if (ret.status == 'success'){
        //  api.toast({ msg: JSON.stringify(ret.status) });
          this.$store.state.rongCloud.setConversationNotificationStatus({
            conversationType: 'CHATROOM',
            targetId: this.datingId,
            notificationStatus: 'DO_NOT_DISTURB'
          }, function(ret, err) {
            console.log('设置免打扰结果：'+JSON.stringify(ret))
          })
		  t.getGift();//获取礼物列表
		  await t.actStatus();//获取活动状态
			
			t.isloading=false;
        } else
			t.isloading=false;
			
         // api.toast({ msg: err.code });
      })
    },
    quitChatRoom(){
      this.$store.commit('CHANGECURRENTCHATROOMID',null);
	  this.$store.commit('CHANGECHATROOMMESSAGELIST',[]);//清空聊天记录
      this.$store.state.rongCloud&&this.$store.state.rongCloud.quitChatRoom({
        chatRoomId: this.datingId
      }, function(ret, err) {
        if (ret.status == 'success')
          api.toast({ msg: "离开活动现场" });
        else
          api.toast({ msg: err.code });
      })
    },
		async actStatus(){//获取活动状态
			const t=this;
			try{
				let	result = await t.$server.actStatus({
					datingDetailsId:t.datingId
				});
				console.log("请求活动状态成功:"+t.tmp+":"+JSON.stringify(result.data));
				if(result.data.data.state==5){//活动结束
					t.chatRoomInfo=result.data.data;
					if(t.tmp=='qy'){
						t.totalCount=result.data.data.totalCount||0;	
					}
					t.isActEnd=true;
				}
			}catch(e){
				
			}
		},
		async addPrice(){//竞缘加价
			const t=this;
			t.showJpPrice=false;
			//t.isActEnd=true;
			console.log("竞拍id:"+t.datingId);
			//let result={data:""};
			t.isloading=true;
			try{
				console.log("竞拍价:"+(parseInt(t.chatRoomInfo.currentBidding)+t.jpPrice))
				const result = await t.$server.jyAddPrice({
					jiaobi:parseInt(t.chatRoomInfo.currentBidding)+t.jpPrice,
					datingActivityId:t.datingId
				});
				t.$vux.toast.show({
					type:"success",
					text: "加价成功",
					position:"middle",
					width:"auto",
				});
			}catch(e){
				console.log("异常:"+JSON.stringify(e));
				t.$vux.toast.show({
					type:"cancel",
					text: e,
					position:"middle",
					width:"auto",
				});
			}
			t.isloading=false;
		},
      async takePhotos(){
        let _t = this;
        let url = await takePhoto();
        if(!url){
          _t.dataChats.push({
            id:_t.dataChats.length+1,
            icon:_t.$store.state.userInfo.icon,
            userId:_t.$store.state.userInfo.id,
            name:'小萝莉',
            message:null,
            video:null,
            img:url,
            audio:null,
            datetime:_t.$utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
            showTime:true,
          })
          _t.$nextTick(()=>{
            if(_t.$refs.scroll.scrollHeight>_t.myScrollerHeight){
              _t.$refs.scroll.scrollTop = _t.$refs.scroll.scrollHeight-_t.myScrollerHeight;
              _t.oldScrollHeight = _t.$refs.scroll.scrollHeight;
            }else{
              _t.marginTop = -(parseInt(_t.inputBarHeight)+parseInt(_t.panelHeight)-$api.getStorage('UIChatBoxHeight')-_t.myScrollerHeight+_t.$refs.scroll.scrollHeight)
              _t.marginTop=_t.marginTop>0?0:_t.marginTop;
            }
          })
        }
      },
      async getImages(){
        let _t = this;
        let result = await getImage(3);
        result.list.map(item=>{
          if(!/\./.test(item.thumbPath)){
            item.thumbPath += '.jpg'
          }
          _t.dataChats.push({
            id:_t.dataChats.length+1,
            icon:_t.$store.state.userInfo.icon,
            userId:_t.$store.state.userInfo.id,
            name:'小萝莉',
            message:null,
            video:null,
            img:item.thumbPath,
            audio:null,
            datetime:_t.$utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
            showTime:true,
          })
          _t.$nextTick(()=>{
            if(_t.$refs.scroll.scrollHeight>_t.myScrollerHeight){
              _t.$refs.scroll.scrollTop = _t.$refs.scroll.scrollHeight-_t.myScrollerHeight;
              _t.oldScrollHeight = _t.$refs.scroll.scrollHeight;
            }else{
              _t.marginTop = -(parseInt(_t.inputBarHeight)+parseInt(_t.panelHeight)-$api.getStorage('UIChatBoxHeight')-_t.myScrollerHeight+_t.$refs.scroll.scrollHeight)
              _t.marginTop=_t.marginTop>0?0:_t.marginTop;
            }
          })
        })
      },
    }
  }
</script>
