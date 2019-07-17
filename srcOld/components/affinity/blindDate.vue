<template>
<div class="jy_act_scroll">
	<Loading v-if="isloading"></Loading>
	<div class="main jy_all_top jy_act jy_act_new jy_act_blind">
		<div class="page_1 page1">
			<div class="horizontalScroll_1">
				<div class="page_2 s1">
					<div class="header">
						<div class="top">
							<Back class="left"><i class="iconfont">&#xe613;</i></Back><div class="right">
								<a @click.shop="showPh=!showPh"><i class="iconfont">&#xe70d;</i></a><a><i class="iconfont">&#xe92f;</i></a><a><i class="iconfont">&#xe7de;</i></a>
							</div><p>11-21冰凌相亲活动现场</p>
						</div>
					</div>
					<div class="jy_act_top">
						<div class="jy_act_tx jy_act_tx_l">
							<i class="jy_act_tx_img" style="background-image:url(http://192.168.0.250/userfiles/20181025/8Wu42Y3p9QEU89ZC2ZnMLvlO10fEc1.jpg)" @click.stop="getUserInfo('000000000000000001')"></i>
							<p class="jy_act_tx_tit"><span>主持人</span></p>
						</div>
						<div class="jy_act_bl_r">
							<a>开始</a><a>公布</a>
						</div>
						<p class="jy_act_people">{{(chatRoomInfo&&chatRoomInfo.baoMingCount)||0}}</p>
						<p class="jy_act_bl_tip">配对总数：10， 对当前配对：等待公布结果，参加人数：100人</p>
					</div>
					<!--<div class="jy_act_user">
						<div>
							<ul v-if="onlineUser">
								<li v-for="item,index in onlineUser" :style="'background-image:url('+($store.state.imageUrl+item.headimg)+')'" @click.stop="item.userId==$store.state.userInfo.id?'':getUserInfo(item.userId)" ></li>
							</ul>
						</div>
						<a @click.shop="showPh=!showPh"></a>
					</div>-->
					<div class="jy_act_mid">
						<div class="jy_act_mid_con">
							<dl class="jy_act_lt">
								<dd>
									<ul class="jy_act_lt_list" v-if="chatList">
										<template v-for="item,index in chatList">
											<li :class="item.userId==$store.state.userInfo.id?'jy_lt_right':'jy_lt_left'">
												<i @click.stop="item.userId==$store.state.userInfo.id?'':getUserInfo(item.userId)" class="jy_lt_img" :style="'background-image:url('+$store.state.imageUrl+item.bicon+')'"><em  v-if="item.videoStatus==1" class="jy_lt_video"></em></i>
											
												<h4>{{item.bname}}<i v-if="item.userId==owner.jiaoyouUser.id" class=" jy_h_text">约主</i></h4>
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
							<ul v-if="showResultWin" class="jy_act_py_success" @click.stop="actStatusRes=true">
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
								<Prize @endPrize="endPrize" @prizeRunning="prizeRunning" :datingId="datingId" :isActEnd="isActEnd"></Prize>
								<!--<p class="jy_act_zy_b"><i><em bgImg="@images/e4.jpg"></em>看天不美   正在抽奖.....</i></p>-->
							</div>
						</div>
					</div>
				</div>
				<div class="page_2 s2">
					<div class="header">
						<div class="top">
							<div class="right">
								<a><i class="iconfont">&#xe92f;</i></a>
							</div><p>小呀小苹果</p>
						</div>
					</div>
					<div class="jy_act_top">
						<div class="jy_act_tx jy_act_tx_l">
							<i class="jy_act_tx_img" style="background-image:url(http://192.168.0.250/userfiles/20181025/8Wu42Y3p9QEU89ZC2ZnMLvlO10fEc1.jpg)" @click.stop="getUserInfo('000000000000000001')"></i>
							<p class="jy_act_bl_tit">赵敏</p>
						</div>
						<div class="jy_act_tx jy_act_tx_r">
							<i  class="jy_act_tx_img" style="background-image:url(http://192.168.0.250/userfiles/20181025/8Wu42Y3p9QEU89ZC2ZnMLvlO10fEc1.jpg)"></i>
							<p class="jy_act_tx_tit"><span>稍后揭晓</span></p>
							<p class="jy_act_bl_tit">来自火星的他</p>
						</div>
					</div>
					<p class="jy_act_bl_tit2">我中意的人</p>
					<div class="jy_act_mid">
						<div class="jy_act_mid_con">
							<ul class="jy_act_bl_list">
								<li>
									<i style="background-image:url(http://192.168.0.250/userfiles/20181025/8Wu42Y3p9QEU89ZC2ZnMLvlO10fEc1.jpg)" @click.stop="getUserInfo('000000000000000001')"></i>
									<p>来自火星的他</p>
								</li>
								<li>
									<i style="background-image:url(http://192.168.0.250/userfiles/20181025/8Wu42Y3p9QEU89ZC2ZnMLvlO10fEc1.jpg)" @click.stop="getUserInfo('000000000000000001')"></i>
									<p>来自火星的他</p>
								</li>
								<li>
									<i style="background-image:url(http://192.168.0.250/userfiles/20181025/8Wu42Y3p9QEU89ZC2ZnMLvlO10fEc1.jpg)" @click.stop="getUserInfo('000000000000000001')"></i>
									<p>来自火星的他</p>
								</li>
								<li>
									<i style="background-image:url(http://192.168.0.250/userfiles/20181025/8Wu42Y3p9QEU89ZC2ZnMLvlO10fEc1.jpg)" @click.stop="getUserInfo('000000000000000001')"></i>
									<p>来自火星的他</p>
								</li>
								<li>
									<i style="background-image:url(http://192.168.0.250/userfiles/20181025/8Wu42Y3p9QEU89ZC2ZnMLvlO10fEc1.jpg)" @click.stop="getUserInfo('000000000000000001')"></i>
									<p>来自火星的他</p>
								</li>
								
							</ul>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		
	</div>
	<div class="jy_act_bottom" v-if="!showBoard">
		<div class="jy_act_b_btn" v-if="owner&&$store.state.userInfo.id!=owner.jiaoyouUser.id">
			<template v-if="tmp=='jy'">
				<a v-if="chatRoomInfo&&chatRoomInfo.status==1&&chatRoomInfo.state!=5" class="jy_act_b_addPrice cur" @click.stop="showJp=!showJp">加价</a>
				<a v-else class="jy_act_b_addPrice">加价</a>
			</template>
			<template v-else-if="tmp=='zy'">
				<a :class="'jy_act_b_zy_btn'+(showCj&&chatRoomInfo.state==6?' cur':'')" @click.stop="canIPrize">中缘<i>{{activeDegree}}</i></a>
			</template>
			<template v-if="tmp=='qy'&&!showQy&&actStart">
				<a class="jy_act_b_qy_btn" @click.stop="showQy=true">抢缘</a>
			</template>
			<a class="jy_act_b_gift" @click.stop="showGift=true">&#xe6e0;</a>
		</div>
		<p @click.stop="showKeyBoard">说点什么吧...</p>
		<div class="jy_act_addPrice" v-if="showJp">
			<span><a @click.stop="jpPrice-=50,jpPrice<50?jpPrice=50:''">&#xe66e;</a><em>{{jpPrice}}</em><a @click.stop="jpPrice+=50">&#xe61f;</a></span>
			<i @click.shop="addPrice">提交</i>
		</div>
	</div>
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
			<!--<li data-uid="10000" fid="0" class="cur"><div><i style="background-image:url(http://192.168.0.250/userfiles/20181027/7qQ77ChT2HQJO3D79fitdQyp35DVaY.jpg);"></i><p>小明 送出</p><div class="flower" style="background-image:url(http://192.168.0.250/userfiles/20181027/7qQ77ChT2HQJO3D79fitdQyp35DVaY.jpg);background-size:100%;"><em class="cur">4</em></div></div></li>-->
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
  import myTouch from '@js/scrollpage.1.0.3.js';
  import {Popup,TransferDom,XDialog} from 'vux'

  export default {
    name: 'blindDate',
    data () {
		return {
			showInfo:false,
			showWin:false,
			datingId:null,
			userId:null,
			showJp:false,//展开竞拍按钮
			showJpPrice:false,//显示竞拍价格列表
			jpPrice:50,//竞拍价
			isloading:false,
			isActEnd:false,//竞价是否结束
			showPh:false,//显示排行榜
			showSm:false,//显示活动说明
			showQy:false,//显示抢缘倒计
			showZy:false,//显示中缘抽奖
			showCj:false,//显示抽奖按钮
			showResult:false,//显示活动结果弹窗
			tmp:'',//模版 竞缘 :'jy',配缘 :'py',抢缘 :'qy',选缘 :'xy',中缘 :'zy'
			tmpName:{
				jy:"竞缘",
				py:"配缘",
				qy:"抢缘",
				xy:"选缘",
				zy:"中缘",
			},
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
			showBoard:false,//是否显示聊天框
			actStatusRes:false,//活动结束后进入不显示结果弹窗的
			onlineUser:[],//在线用户
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
			return this.showResult&&this.chatRoomInfo&&this.chatRoomInfo.headimgAttachmentId&&!this.actStatusRes;
		},
		intoUser(){
			return this.chatRoomInfo&&this.chatRoomInfo.intoUser;
		},
		leaveUser(){
			return this.chatRoomInfo&&this.chatRoomInfo.leaveUser;
		}
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
		onlineUser(val){
			const t=this;
			console.log("在线用户:"+JSON.stringify(val));
		},
		leaveUser(val){
			const t=this;
			if(val){
				t.onlineUser.filter((item,index)=>{
					return item.userId!=val.userId;
				});
				console.log(t.$store.state.userInfo.aliasName+":"+val.userId+"离开了");
			}
		},
		intoUser(val){
			const t=this;
			if(val){
				const has=t.onlineUser.filter((item,index)=>{
					return item.userId==val.userId;
				});
				console.log(JSON.stringify(has));
				if(has.length>0){
					console.log(t.$store.state.userInfo.aliasName+":"+val.userId+"重复了");
				}else{
					console.log(t.$store.state.userInfo.aliasName+":"+val.userId+"进来了");
					t.onlineUser.push(val);
					
				}
			}
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
			}else if(t.tmp=='xy'||t.tmp=='zy'||t.tmp=='py'){
				if(t.chatRoomInfo.activityEndtime&&t.chatRoomInfo.state==6){//活动结束倒计时
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
				}else if(t.chatRoomInfo.activityStarttime&&t.chatRoomInfo.state==3){//活动开始倒计时
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
			const t=this;
			if(val){
				t.closeKeyBoard();
			}
		},
		showGift(val){
			const t=this;
			if(val){
				t.showPh=false;
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
		let myClickTouch=new myTouch({//滑屏
			wrapper:".jy_act_blind",
			durationTime:0.3,
			loop:false,//横屏是否循环滚动
			mouse:true,//竖屏是否支持鼠标滚轮滚动
			disRadio:0,//触发翻屏所需要的最小拖动距离比例
			preventDefault:true,
			horizontalClassName:".horizontalScroll_1",//水平页面顶级容器 (必须是 verticalPageName 的一代子元素)
			contentClassName:".contentScroll_1",//滚动内容的容器(必须是 verticalPageName 的一代子元素)
			verticalPageName:".page_1",//垂直页面容器 (必须是 wrapper 的一代子元素)
			horizontalPageName:".page_2",//水平页面容器(必须是 horizontalClassName 的一代子元素)
			curClassName:"cur",//当前页面
			start:function(){
				console.log("start");
			},
			moveY:function(d){
				//console.log("moveY"+this.changeY);
			},
			endY:function(){
				console.log("endY");
			},
			moveX:function(d){
				//console.log("moveX"+this.changeX);
			},
			endX:function(){
				console.log("endX");
			},
		});

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
	 // if(t.$store.state.userInfo.id!=t.owner.jiaoyouUser.id){
		/*extras= {extras:{
          titleSize: 12,
          titleColor: '#a3a3a3',
          btns: [ {
            title: '礼物',
            normalImg: 'widget://image/gift.png',
            activeImg: 'widget://image/gift.png'
          }]
        }}*/
		/*extrasBtn={
			extrasBtn:{
            normalImg: 'widget://image/act_gift.png'
          }
		}*/
	  //}
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
            t.closeKeyBoard();
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
				const height=ret.panelHeight;
				clearTimeout(t.boardTimeout);
				if(height==0){
					t.boardTimeout=setTimeout(()=>{
						t.closeKeyBoard();
					},200);
				}
			}
		});
		if(t.$store.state.userInfo.id!=t.owner.jiaoyouUser.id){
			this.UIChatBox.addEventListener({
				target: 'inputBar',
				name: 'showExtras'
			}, (ret, err)=> {
				if (ret) {
					t.closeKeyBoard();
					t.showGift=true;

				}
			});
		}
		this.UIChatBox.addEventListener({
			target: 'inputBar',
			name: 'change'
		}, (ret, err)=> {
			if (ret) {
				this.inputBarHeight = parseInt(ret.inputBarHeight);
			}
		});
		t.closeKeyBoard();
	},
    beforeDestroy () {
      this.quitChatRoom();
    },
    methods :{
		canIPrize(){
			const t=this;
			if(t.showCj&&t.chatRoomInfo.state==6){
				t.showZy=true;
			}else{
				if(t.isActEnd){
					t.$vux.toast.show({
						type:"text",
						text: "活动已结束",
						position:"bottom",
						width:"2rem",
					});
				}else if(t.chatRoomInfo.state==3){
					t.$vux.toast.show({
						type:"text",
						text: "活动准备中...",
						position:"bottom",
						width:"2rem",
					});
				}else{
					t.$vux.toast.show({
						type:"text",
						text: "活跃度不足",
						position:"bottom",
						width:"2rem",
					});
				}
			}
		},
		showKeyBoard(){
			const t=this;
			if(!t.UIChatBox){
				return false;
			}
			t.showBoard=true;
			t.showPh=false;
			t.UIChatBox.show();
			t.UIChatBox.popupKeyboard();
		},
		closeKeyBoard(){
			const t=this;
			if(!t.UIChatBox){
				return false;
			}
			t.showBoard=false;
			t.UIChatBox.hide();
			t.UIChatBox.closeBoard();
			t.UIChatBox.closeKeyboard();
		},
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
				position:"bottom",
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
			}	
		},
		async sendGift(giftObj){
			if(giftObj){
				this.giftEndlist.push(giftObj);
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
			console.log("openwin")
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
       // 
        _t.$db.insertConversation(_t.datingId,1,(_t.$store.state.userInfo.headimgAttachmentId),_t.$store.state.userInfo.aliasName,_t.$store.state.userId,text,new Date().getTime(),remark,_t.$store.state.userId,location,imgUrl,audio,messageId,lon,lat)
		
        _t.getNewMessageList();
        //_t.$store.dispatch("getConversationList")
      },
	  getNewMessageList(status){
        let _t = this;
        const dataChats=this.$db.getConversation(this.datingId,this.$store.state.userId,this.limit);
        this.$db.resetCount(this.datingId,this.$store.state.userId);
		_t.$store.commit('CHANGECHATROOMMESSAGELIST',dataChats)
		_t.$nextTick(()=>{//滚动到底部
			$(".jy_act_lt").animate({"scrollTop":$(".jy_act_lt_list").outerHeight(true)},500);
		})
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
		const t=this;
		this.$store.commit('CHANGECURRENTCHATROOMID',null);
		this.$store.commit('CHANGECHATROOMMESSAGELIST',[]);//清空聊天记录
		this.$store.state.rongCloud&&this.$store.state.rongCloud.quitChatRoom({
			chatRoomId: this.datingId
		},async function(ret, err) {
			if (ret.status == 'success'){
				api.toast({ msg: "离开活动现场" });
				try{
					const result=await t.$server.actLeave({
						datingDetailsId:t.datingId,
					});
					
				}catch(e){
					console.log(JSON.stringify(e));
				}
			}else{
				api.toast({ msg: err.code });
			}
				
		})
    },
		async actStatus(){//获取活动状态
			const t=this;
			try{
				console.log("开始请求活动状态");
				let	result = await t.$server.actStatus({
					datingDetailsId:t.datingId
				});
				console.log("请求活动状态成功:"+t.tmp+":"+JSON.stringify(result.data));
				if(t.tmp=='qy'){
					t.totalCount=result.data.data.totalCount||0;	
				}
				t.onlineUser=result.data.data.onlineUser||[];
				t.chatRoomInfo=result.data.data;
				if(result.data.data.state==5){//活动结束
					//if(t.tmp=='qy'){
					//	t.totalCount=result.data.data.totalCount||0;	
					//}
					t.isActEnd=true;
					t.actStatusRes=true;//不显示结果弹窗
				}
			}catch(e){
				console.log(JSON.stringify(e));
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
    }
  }
</script>
