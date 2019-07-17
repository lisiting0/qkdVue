<template>
  <div :class="'main jy_all_top '+((blindDateSingle.state==3&&blindDateSingle.isCandidate==0)?'active':((blindDateSingle.state==3&&blindDateSingle.isCandidate==1)||blindDateSingle.state==6)?'live':'end')">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left" :backOne="backOne"><i class="iconfont">&#xe613;</i></Back><a v-if="!$store.state.isBrowser" class="right" @click="clickShare"><i class="iconfont">&#xe679;</i></a>
        <p>活动详情</p>
      </div>
    </div>
    <template v-if="blindDateSingle">
      <div class="at_img at_img_auto" v-if="blindDateSingle.datingDetailsExt">
        <img class="at_i_img" :src="getFullPath(blindDateSingle.datingDetailsExt.extString)"/>
        <!--<div class="at_zc">{{specialType[blindDateSingle.datingDetailsExt.extInt5]}}专场</div>-->
      </div>
      <div class="at_desc" v-if="blindDateSingle.id">
        <div class="at_title">{{blindDateSingle.datingTitle}}</div>
        <div class="at_count"><i class="iconfont">&#xe642;</i><span :class="{active:blindDateSingle.state==3&&blindDateSingle.isCandidate==0}">{{blindDateSingle.followCount?parseInt(blindDateSingle.followCount)+parseInt(actContent?actContent.followCount||0:0):0}}</span>人关注<i class="iconfont" style="margin-left: 1rem">&#xe612;</i><span :class="{active:blindDateSingle.state==3&&blindDateSingle.isCandidate==0}">{{Math.min(blindDateSingle.enrollCount,blindDateSingle.datingDetailsExt.extInt4)}}</span>人报名
        </div>
      </div>
      <div class="at_con"><i class="iconfont">&#xe6b6;</i>{{blindDateSingle.activityStarttime}}</div>
      <!--<router-link tag="div" :to="{name:'addressMap',query:{city:blindDateSingle.cityName,address:blindDateSingle.datingLocation}}" class="at_con at_address"><i class="iconfont">&#xe62c;</i><span>{{blindDateSingle.datingLocation}}</span><i class="iconfont">&#xe702;</i></router-link>-->
      <div class="at_con at_address"><i class="iconfont">&#xe62c;</i><span>{{blindDateSingle.datingLocation}}</span></div>

	 <div class="at_con" v-if="blindDateSingle.enrollFee!=undefined"><i class="iconfont">&#xe6e1;</i>
		<template v-if="channel.money!=blindDateSingle.enrollFee">
		<del >{{Fn.toFixed(blindDateSingle.enrollFee||0)}}元</del>，</template>
		<em>{{Fn.toFixed(channel.money||0)}}</em> 元<template v-if="channel.money!=blindDateSingle.enrollFee">{{channel.name?channel.money==0?'('+channel.name+"免费 )":'('+channel.name+"优惠 "+Fn.toFixed(blindDateSingle.enrollFee-channel.money)+"元)":''}}</template>
	 </div>
     <!-- <div class="at_con" v-if="blindDateSingle.datingDetailsExt"><i class="iconfont">&#xe651;</i>{{specialType[blindDateSingle.datingDetailsExt.extInt5]}}专场
      </div>-->
     <div class="ybm_list" v-if="blindDateSingle.state!=5&&blindDateSingle.candidateList&&blindDateSingle.candidateList.length>0">
       <div v-if="((isLogin&&blindDateSingle.isCandidate !=1) || !isLogin)&&!isManage&&!isAdmin" class="ac_list_fix">
		<div class="at_con at_con_bm">
          <i class="iconfont">&#xe668;</i>已报名人员{{enrollPepple.maxBoy!=undefined?'(男: '+enrollPepple.boy+'/'+enrollPepple.maxBoy+' 女: '+enrollPepple.girl+'/'+enrollPepple.maxGirl+')':blindDateSingle.enrollCount+'(男:'+enrollPepple.boy+',女:'+enrollPepple.girl+')/'+blindDateSingle.datingDetailsExt.extInt4}}
        </div>
        <ul class="ybm_user_list tips">
          <li v-for="(item,index) in blindDateSingle.candidateList" :key="item.id" v-if="index<7">
            <a :style="'background-image:url('+getFullPath(item.jiaoyouUser.headimgAttachmentId)+');'">
              <i class="iconfont heart" v-if="item.jiaoyouUser.isGood==0&&$store.state.userInfo.sex!=item.candidateSex&&!isManage&&!isAdmin">&#xe79d;</i>
              <i class="iconfont heart" style="color: #ff0000;font-size: 0.8rem;top: -0.1rem;" v-if="item.jiaoyouUser.isGood==1&&$store.state.userInfo.sex!=item.candidateSex&&!isManage&&!isAdmin">&#xe612;</i>
              <div class="bottom_info"><span>{{item.jiaoyouUser.aliasName}}</span><em :style="item.candidateSex==2?'background-color: #00b4ff;':'background-color: #ff3883'"><i class="iconfont" v-if="item.candidateSex==2">&#xe605;</i><i class="iconfont" v-if="item.candidateSex==1">&#xe64a;</i>{{item.jiaoyouUser.age }}</em></div>
            </a>
          </li>
          <li style="width:2.28rem;height:2.28rem;background-color: #fd5359;border-radius: 0.2rem;color: #ffffff;line-height: 2.28rem;" v-if="blindDateSingle.candidateList.length>=7">更多</li>
        </ul>
      </div>
       <div v-else>
         <router-link tag="div" class="at_con at_con_bm" :to="{name:'registrationStaff',query:{id:id}}" v-if="blindDateSingle.candidateList">
          <i class="iconfont">&#xe668;</i>已报名人员{{enrollPepple.maxBoy!=undefined?'(男: '+enrollPepple.boy+'/'+enrollPepple.maxBoy+' 女: '+enrollPepple.girl+'/'+enrollPepple.maxGirl+')':blindDateSingle.enrollCount+'(男:'+enrollPepple.boy+',女:'+enrollPepple.girl+')/'+blindDateSingle.datingDetailsExt.extInt4}}
           <i class="iconfont right">&#xe702;</i>
         </router-link>
         <ul class="ybm_user_list">
           <li @click="toLink('userInfo',item.jiaoyouUser.id,item.id,item.jiaoyouUser.silentState)" v-for="(item,index) in blindDateSingle.candidateList" :key="item.id" v-if="index<7">
             <a :style="'background-image:url('+getFullPath(item.jiaoyouUser.headimgAttachmentId)+');'">
               <i class="iconfont heart" v-if="item.jiaoyouUser.isGood==0&&$store.state.userInfo.sex!=item.candidateSex&&!isManage&&!isAdmin" @click.stop="addGood(item.jiaoyouUser.id,index)">&#xe79d;</i>
               <i class="iconfont heart" style="color: #ff0000;font-size: 0.68rem;top: -0.1rem;" v-if="item.jiaoyouUser.isGood==1&&$store.state.userInfo.sex!=item.candidateSex&&!isManage&&!isAdmin" @click.stop="delGood(item.jiaoyouUser.id,index)">&#xe612;</i>
               <div class="bottom_info"><span>{{item.jiaoyouUser.aliasName}}</span><em :style="item.candidateSex==2?'background-color: #00b4ff;':'background-color: #ff3883'"><i class="iconfont" v-if="item.candidateSex==2">&#xe605;</i><i class="iconfont" v-if="item.candidateSex==1">&#xe64a;</i>{{item.jiaoyouUser.age }}</em></div>
             </a>
           </li>
           <li style="width:2.28rem;height:2.28rem;background-color: #fd5359;border-radius: 0.2rem;color: #ffffff;line-height: 2.28rem;" @click="toLink('registrationStaff',id)" v-if="blindDateSingle.candidateList.length>=7">更多</li>
         </ul>
       </div>
      </div>
	  <ul class="jy_act_staticContent" v-if="actContent" :style="actContent.styles">
		<template v-if="actContent.content.pic">
		<li v-for="item,index in actContent.content.pic" :style="actContent.content.styles">
			<img v-if="item.src" class="jy_act_staticContent_img" :src="item.src">
			<template v-if="actContent.content.imgs&&actContent.content.imgs[item.id]">
				<img v-for="imgs in actContent.content.imgs[item.id]" class="jy_act_staticContent_imgs" :src="imgs.src" :style="imgs.styles">
			</template>
			<div v-if="(actContent.content.gifs&&actContent.content.gifs[item.id])||(actContent.content.routerLink&&actContent.content.routerLink[item.id])||(actContent.content.aLink&&actContent.content.aLink[item.id])" class="jy_act_staticContent_pos" :style="item.styles">
				<template v-if="actContent.content.gifs&&actContent.content.gifs[item.id]">
					<img v-for="gif in actContent.content.gifs[item.id]" class="jy_act_staticContent_gif" :style="gif.styles" :src="gif.src"/>
				</template>
				<template v-if="actContent.content.routerLink&&actContent.content.routerLink[item.id]">
					<router-link class="jy_act_staticContent_link" v-for="routerLink,ind in actContent.content.routerLink[item.id]" :key="ind" :style="routerLink.styles" :to="{name:routerLink.name,query:routerLink.query}"></router-link>
				</template>
				<template v-if="actContent.content.aLink&&actContent.content.aLink[item.id]">
					<a class="jy_act_staticContent_link" v-for="aLink in actContent.content.aLink[item.id]" :style="aLink.styles" :href="aLink.href" :target="aLink.target"></a>
				</template>
			</div>	
		</li>
		</template>
	  </ul>
	    <p class="identity_act" v-if="blindDateSingle.id">
		<em  v-if="blindDateSingle.isFollow == 1" @click="unfollowBlindDating" class="blue">取消关注</em>
        <em  v-else @click="followBlindDating" class="blue">关注活动</em>
		<!-- 主持人 什么时候都能进-->
		<router-link v-if="isManage||isAdmin" tag="em" :to="{name:'blindDateNew',query:{id:id}}" class="orange">进入现场</router-link>
		<!-- 报名没开始 -->
		<em  v-else-if="blindDateSingle.isStartEnroll==0||sTime" class="pink" :class="{ac_once:sTime}">即将开始<i v-if="sTime">{{sTime}}</i></em>
		<!-- 没登录 -->
		<template v-else-if="!isLogin">
			<!-- 能报名 -->
			<em  v-if="canEnroll" @click="bmBlindDating" class="pink">立即报名</em>
			<!-- 活动已结束 -->
			<em v-else-if="blindDateSingle.state==5"  class="pink">活动结束</em>
			<!-- 不能报名 -->
			<em v-else  class="pink">报名截止</em>
		</template>
		<!-- 登录 -->
		<template v-else-if="isLogin">
			<!-- 没报名 -->
			<template v-if="blindDateSingle.isCandidate !=1">
				<!-- 能报名 -->
				<em  v-if="blindDateSingle.isAbsent==1" class="grey">已登记缺席</em>
				<em  v-else-if="canEnroll" @click="bmBlindDating" class="pink">立即报名</em>
				<!-- 活动已结束 -->
				<em v-else-if="blindDateSingle.state==5"  class="pink">活动结束</em>
				<!-- 不能报名 -->
				<em v-else  class="pink">报名截止</em>
			</template>
			<!-- 已报名 -->
			<template  v-else>
				<!-- 可以报名 -->
				<em v-if="canEnroll"  @click="unbmBlindDating" class="pink">缺席登记</em>
				<!-- 活动已结束 -->
				<router-link v-if="blindDateSingle.state==5" tag="em" :to="{name:'blindDateNew',query:{id:id}}" class="orange">活动结束</router-link>
				<!-- 活动没结束 -->
				<router-link v-else tag="em" :to="{name:'blindDateNew',query:{id:id}}" class="orange">进入现场</router-link>
			</template>
		</template>
      </p>
    </template>
    <div v-transfer-dom>
      <popup v-model="showPay" height="100%" :hide-on-blur=false position="bottom" :popup-style="{zIndex:600}" :should-scroll-top-on-show="true">
        <div class="top_userInfo" v-if="showPayWin">
          <blindDatePay :actDatingId="id" :enrollFee="channel.money||0"  @openPayWin="openPayWin" @hiddenPayWin="hiddenPayWin"></blindDatePay>
        </div>
      </popup>
    </div>
	<share :show="showShare" :shareTitle="shareTitle" :shareDesc="shareDesc" :shareImg="shareImg" :shareUrl="shareUrl" @changeShow="changeShow"></share>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import blindDatePay from './blindDatePay.vue';
  import {Popup, TransferDom} from 'vux'
import { wxShare } from '@js/wxjssdk'
import Share from '@/components/home/share.vue'
 import {actContent} from './actStatic.data.js'

  export default {
    name: "activityDetailStatic",//静态详情页面
    components: {
      Loading,
      Back,
      blindDatePay,
      Popup,
	  Share,
    },
    directives: {
      TransferDom
    },
    data() {
      return {
       // showBack:false,
        isloading: false,
        id: null,
        //specialType: null,//专场类型
        arrImg: [],
        blindDateSingle: {},
        showPayWin: false,
        showPay: false,
        lineType: {"1": "线上", "2": "线下"},
        isManage:false,//是否主持人
		isAdmin:false,//是否管理员
        isLogin:false,//是否已经登录
        canEnroll:false,//是否能报名
		timeout:'',
		sTime:'',
		isUnion:'',//工会渠道
		unionFrom:'',
		manCount:-1,//男性人数
		showShare: false,
		shareTitle:'',
		shareDesc:'',
		shareImg:'',
		shareUrl:'',
		backOne:false,
		actContent:null,
		channel:{//报名费
			money:0,
		},
		enrollPepple:{},//报名人数
      }
    },
    watch: {
		async '$route' (to, from) {
			const t=this;
			if(to.name==from.name){
				t.id = t.$route.query.id;
				
				t.backOne=true;
				  t.isLogin=t.$store.state.userInfo.id?true:false;
				  try{
					await t.getManCount();
					await t.getBlindDateSingle();
					t.actContent=actContent[t.id];
				  }catch(e){
					t.actContent=actContent[t.id];
					console.log("出错:"+JSON.stringify(e));
				  }
				  $("body").addClass("gray");
					if(sessionStorage){
					  t.isUnion = sessionStorage.getItem('isUnion');
					   t.unionFrom=sessionStorage.getItem('unionFrom');
					}
					t.$store.commit("CHANGESTORE",{name:"gotoBlindDatepay",value:false});//先设置不去支付
			let shareTitle=t.actContent.shareTitle||t.actContent.name;
			let shareDesc=t.actContent.shareDesc||t.actContent.name;
			let shareLink =this.$store.state.baseURL+"/api/account/publicAddressLoginUrl?state=activityDetailStatic__id_"+t.id;
			if(this.blindDateSingle.isUnion){
				shareLink+="_isUnion_"+this.blindDateSingle.isUnion;
			}
			/*if(this.blindDateSingle.jyNumber){
				shareLink+="_jyNumber_"+this.blindDateSingle.jyNumber;
			}*/
			if(t.isLogin){
				shareLink = shareLink + "_pid_"+this.$store.state.userInfo.jyNumber;
				if(t.actContent.taskId){
					shareLink = shareLink + "_taskId_"+t.actContent.taskId;
				}
			}
			let otherLink=t.$route.query.otherLink||'';
			if(otherLink){
				shareLink+="_"+otherLink.split(".").join("_");
			}
			shareTitle=this.blindDateSingle.datingDetailsExt.extString7||shareTitle;
			shareDesc=this.blindDateSingle.datingDetailsExt.extString8||shareDesc;
			t.shareTitle=shareTitle;
			t.shareDesc=shareDesc;
			t.shareUrl=shareLink;
			  wxShare&&wxShare({
				  title: shareTitle, // 分享标题
				  desc: shareDesc, // 分享描述
				  link: shareLink, // 分享链接
				  imgUrl: t.$store.state.baseFrontEndURL+'static/logo.png', // 分享图标
				  debug:false
			  },{
				success(){
				//	alert("分享成功");
				},
				cancel(){
					//alert("分享失败");
				}
			  });
			}
		},
		handleRoute(newV) {//返回键触发
			const t=this;
			if (!newV) {
				if(t.showShare){
					t.showShare=false;
				}
			}
		},
		showShare(val){
			const t=this;
			let status = val;
			t.$store.commit("CHANGEHANDLEROUTE", status);
		},
	},
    computed: {
      contentCpt() {
        const t = this;
        if (this.blindDateSingle.datingDetailsExt) {
          let content = t.blindDateSingle.datingDetailsExt.extString2;
          const imgReg = /<img.*?(?:>|\/>)/gi;
          const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          const arr = t.blindDateSingle.datingDetailsExt.extString2.match(imgReg);
          if (arr) {
            let arrImg = [];
            arr.forEach((v, i) => {
              const src = v.match(srcReg)[1];
              arrImg.push({
                id: i,
                src
              });
              let reg = new RegExp('<img src=\"' + src + '\"', 'g');
              content = content.replace(reg, '<img data-id="' + i + '" src="' + t.$utils.getFullPath(src) + '"');
            });
            t.arrImg = arrImg;
          }
          return content;
        }
      },
      activityProcessHtml() {
        const t = this;
        if (this.blindDateSingle.datingDetailsExt) {
          let content = t.blindDateSingle.datingDetailsExt.extString3;
          const imgReg = /<img.*?(?:>|\/>)/gi;
          const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          const arr = t.blindDateSingle.datingDetailsExt.extString3.match(imgReg);
          if (arr) {
            let arrImg = [];
            arr.forEach((v, i) => {
              const src = v.match(srcReg)[1];
              arrImg.push({
                id: i,
                src
              });
              let reg = new RegExp('<img src=\"' + src + '\"', 'g');
              content = content.replace(reg, '<img data-id="' + i + '" src="' + t.$utils.getFullPath(src) + '"');
            });
            t.arrImg = arrImg;
          }
          return content;
        }
      },
      tipsHtml() {
        const t = this;
        if (this.blindDateSingle.datingDetailsExt) {
          let content = t.blindDateSingle.datingDetailsExt.extString5;
          const imgReg = /<img.*?(?:>|\/>)/gi;
          const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          const arr = t.blindDateSingle.datingDetailsExt.extString5.match(imgReg);
          if (arr) {
            let arrImg = [];
            arr.forEach((v, i) => {
              const src = v.match(srcReg)[1];
              arrImg.push({
                id: i,
                src
              });
              let reg = new RegExp('<img src=\"' + src + '\"', 'g');
              content = content.replace(reg, '<img data-id="' + i + '" src="' + t.$utils.getFullPath(src) + '"');
            });
            t.arrImg = arrImg;
          }
          return content;
        }
      },
	  handleRoute() {//返回键
			return this.$store.state.handleRoute;
		},
    },
    async mounted() {
      const t = this;
      //this.showBack = t.$route.query.showBack
	   $("body").addClass("gray");
      t.id = t.$route.query.id;
	 
	  t.isLogin=t.$store.state.userInfo.id?true:false;

    //  t.getSpecialType();
		  try{
			await t.getManCount();
			await t.getBlindDateSingle();
			 t.actContent=actContent[t.id];
		  }catch(e){
			t.actContent=actContent[t.id];
			console.log("出错:"+JSON.stringify(e));
		  }
		if(sessionStorage){
		  t.isUnion = sessionStorage.getItem('isUnion');
		  t.unionFrom=sessionStorage.getItem('unionFrom');

		}
		t.$store.commit("CHANGESTORE",{name:"gotoBlindDatepay",value:false});//先设置不去支付
		let shareTitle=t.actContent.shareTitle||t.actContent.name;
		let shareDesc=t.actContent.shareDesc||t.actContent.name;
		let shareLink =this.$store.state.baseURL+"/api/account/publicAddressLoginUrl?state=activityDetailStatic__id_"+t.id;
		if(this.blindDateSingle.isUnion){
			shareLink+="_isUnion_"+this.blindDateSingle.isUnion;
		}
		/*if(this.blindDateSingle.jyNumber){
			shareLink+="_jyNumber_"+this.blindDateSingle.jyNumber;
		}*/

	  //console.log(shareLink)
      if(t.isLogin){
        shareLink = shareLink + "_pid_"+this.$store.state.userInfo.jyNumber
		if(t.actContent.taskId){
			shareLink = shareLink + "_taskId_"+t.actContent.taskId;
		}
      }
	  let otherLink=t.$route.query.otherLink||'';
		if(otherLink){
			shareLink+="_"+otherLink.split(".").join("_");
		}
		//alert(shareLink)
		shareTitle=this.blindDateSingle.datingDetailsExt.extString7||shareTitle;
		shareDesc=this.blindDateSingle.datingDetailsExt.extString8||shareDesc;
		t.shareTitle=shareTitle;
		t.shareDesc=shareDesc;
		t.shareUrl=shareLink;
	  wxShare&&wxShare({
		  title: shareTitle, // 分享标题
		  desc: shareDesc, // 分享描述
		  link: shareLink, // 分享链接
		  imgUrl: t.$store.state.baseFrontEndURL+'static/logo.png', // 分享图标
		  debug:false
	  },{
		success(){
		//	alert("分享成功");
		},
		cancel(){
			//alert("分享失败");
		}
	  });

    },
    destroyed() {
      $("body").removeClass("gray");
    },
    methods: {
		clickShare() {
			this.showShare = !this.showShare;
		  },
		  changeShow(val) {
        this.showShare = val;
      },
		async getManCount(){//活动男的数量
			const t=this;
			try{
				const result = await t.$server.blindDatingBaoming({
					datingId: t.id,
					candidateSex:2,
					page: 1,
					rows: 1,
				});
				t.manCount=result.data.count;
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		 toLink(link,id,activeId,silentState){
			this.$router.push({
			  path: link,
			  query:{
				  id: id,
		          activityId: activeId,
		          silentState: silentState
			  }
			})
		  },
      openPayWin() {
        const t = this;
        t.showPay = true;
      },
      hiddenPayWin(flag) {
        this.showPay = false;
        if (flag) {
          this.$set(this.blindDateSingle, "isCandidate", 1);
		  let enrollCount=parseInt(this.blindDateSingle.enrollCount)+1;//实时更新报名人数
		  this.$set(this.blindDateSingle, "enrollCount", enrollCount);
        }
        setTimeout(() => {
          this.showPayWin = false;
        }, 800)
      },
      async getSpecialType() {
        const t = this;
        try {
          const apiDict = await this.$server.apiDict({type: "blind_dating_special_type"});
          let item = apiDict.data.data;
          for (let i = 0; i < item.length; i++) {
            if (!t.specialType) {
              t.specialType = {};
            }
            t.specialType[item[i].value] = item[i].label;
          }
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      },
      getFullPath(path) {
        return this.$utils.getFullPath(path)
      },
      async getBlindDateSingle() {
        const _this = this;
        const result = await _this.$server.blindDatingSingle({
          datingDetailsId: _this.id,
		  isUnion:_this.$store.state.channel.isUnion,
		 // jyNumber:_this.$store.state.channel.jyNumber
        });
        _this.blindDateSingle = result.data.data;

		//报名费用统计
		let channelInfo={};

		if(_this.$store.state.channel.isUnion&&_this.blindDateSingle.datingDetailsExt){//有渠道
			 let channel=null;
			 if(_this.blindDateSingle.isUnionCorrect&&_this.blindDateSingle.datingDetailsExt.extString6){
				try{
					let channelObj=_this.blindDateSingle.datingDetailsExt.extString6.replace(/(?:\s*['"]*)?([a-zA-Z0-9]+)(?:['"]*\s*)?:/g, '"$1":');
					let d=JSON.parse(channelObj||{});
					channel=d[_this.blindDateSingle.isUnionCorrect];
				 }catch(e){
					console.log("渠道格式错误:"+JSON.stringify(e));
				 }
			 }
			 
			if(channel){//渠道信息附加表
				if(_this.$store.state.userInfo.sex==1&&channel.girlFee!=undefined){
					channelInfo.money=channel.girlFee;
				}else if(_this.$store.state.userInfo.sex==2&&channel.boyFee!=undefined){
					channelInfo.money=channel.boyFee;
				}else if(channel.fee!=undefined){
					channelInfo.money=channel.fee;
				}else if(_this.$store.state.userInfo.sex==1&&_this.blindDateSingle.datingDetailsExt.extDouble2!=undefined){//女
					channelInfo.money=_this.blindDateSingle.datingDetailsExt.extDouble2
				}else if(_this.$store.state.userInfo.sex==2&&_this.blindDateSingle.datingDetailsExt.extDouble!=undefined){//男
					channelInfo.money=_this.blindDateSingle.datingDetailsExt.extDouble
				}else{
					channelInfo.money=_this.blindDateSingle.enrollFee;
				}
				channelInfo.name=channel.name;
			}else{//没渠道(限男女)
				if(_this.$store.state.userInfo.sex==1&&_this.blindDateSingle.datingDetailsExt.extDouble2!=undefined){//女
					channelInfo.money=_this.blindDateSingle.datingDetailsExt.extDouble2;
					channelInfo.name="女生";
				}else if(_this.$store.state.userInfo.sex==2&&_this.blindDateSingle.datingDetailsExt.extDouble!=undefined){//男
					channelInfo.money=_this.blindDateSingle.datingDetailsExt.extDouble;
					channelInfo.name="男生";
				}else{
					channelInfo.money=_this.blindDateSingle.enrollFee;
				}
			}
		}else{//没渠道的
			if(_this.$store.state.userInfo.sex==1&&_this.blindDateSingle.datingDetailsExt.extDouble2!=undefined){//女
				channelInfo.money=_this.blindDateSingle.datingDetailsExt.extDouble2;
				channelInfo.name="女生";
			}else if(_this.$store.state.userInfo.sex==2&&_this.blindDateSingle.datingDetailsExt.extDouble!=undefined){//男
				channelInfo.money=_this.blindDateSingle.datingDetailsExt.extDouble;
				channelInfo.name="男生";
			}else{
				channelInfo.money=_this.blindDateSingle.enrollFee;
			}
		}
		_this.channel=channelInfo;
		if(_this.$store.state.channel.isUnion&&channelInfo.name){
			_this.$store.commit("CHANGESTORE",{name:"channel",value:{
				isUnion:_this.$store.state.channel.isUnion,
			//	jyNumber:_this.$store.state.channel.jyNumber,
				name:channelInfo.name
			}});
		}
		//报名人数统计
		let enrollPepple={};
		if(_this.blindDateSingle.datingDetailsExt){
			if(_this.blindDateSingle.datingDetailsExt.extInt8!=undefined&&_this.blindDateSingle.datingDetailsExt.extInt9!=	undefined){//限制男/女
				enrollPepple={
					maxBoy:_this.blindDateSingle.datingDetailsExt.extInt8,
					maxGirl:_this.blindDateSingle.datingDetailsExt.extInt9,
				}
				if(_this.manCount!=-1){
					enrollPepple={
						maxBoy:_this.blindDateSingle.datingDetailsExt.extInt8,
						maxGirl:_this.blindDateSingle.datingDetailsExt.extInt9,
						boy:_this.manCount,
						girl:_this.blindDateSingle.enrollCount-_this.manCount,
					}
				}
			}else if(_this.blindDateSingle.datingDetailsExt.extInt8!=undefined){//限制男
				enrollPepple={
					maxBoy:_this.blindDateSingle.datingDetailsExt.extInt8,
					maxGirl:_this.blindDateSingle.datingDetailsExt.extInt4,
				}
				if(_this.manCount!=-1){
					let girlNum=_this.blindDateSingle.enrollCount-_this.manCount;//女生已报名人数
					let canBoyNum=_this.blindDateSingle.datingDetailsExt.extInt4-girlNum;//男生最大可报名人数
					let maxBoy=Math.min(_this.blindDateSingle.datingDetailsExt.extInt8,canBoyNum);//男生实际可报名人数
					let maxGirl=_this.blindDateSingle.datingDetailsExt.extInt4-_this.manCount;//女生实际可报名人数
					enrollPepple={
						maxBoy:maxBoy,
						maxGirl:maxGirl,
						boy:_this.manCount,
						girl:_this.blindDateSingle.enrollCount-_this.manCount,
					}
				}
			}else if(_this.blindDateSingle.datingDetailsExt.extInt9!=undefined){//限制女
				enrollPepple={
					maxBoy:_this.blindDateSingle.datingDetailsExt.extInt4,
					maxGirl:_this.blindDateSingle.datingDetailsExt.extInt9,
				}
				if(_this.manCount!=-1){
					let girlNum=_this.blindDateSingle.enrollCount-_this.manCount;//女生已报名人数
					let canGirlNum=_this.blindDateSingle.datingDetailsExt.extInt4-_this.manCount;//女生最大可报名人数
					let maxGirl=Math.min(_this.blindDateSingle.datingDetailsExt.extInt9,canGirlNum);//女生实际可报名人数
					let maxBoy=_this.blindDateSingle.datingDetailsExt.extInt4-_this.girlNum;//男生实际可报名人数
					enrollPepple={
						maxBoy:maxBoy,
						maxGirl:maxGirl,
						boy:_this.manCount,
						girl:_this.blindDateSingle.enrollCount-_this.manCount,
					}
				}
			}else{//都不限
				enrollPepple={
					boy:_this.manCount,
					girl:_this.blindDateSingle.enrollCount-_this.manCount,
				}
			}
		}
		_this.enrollPepple=enrollPepple;

		if(_this.blindDateSingle.isStartEnroll==1&&_this.blindDateSingle.isStopEnroll==0){
			_this.canEnroll=true;//是否能报名
		}
		if(_this.isLogin){//是否主持人登录
			_this.isManage=_this.blindDateSingle.jiaoyouUser.id==_this.$store.state.userInfo.id?true:false;
			if(_this.blindDateSingle.adminList&&_this.blindDateSingle.adminList.length>0){
				let isAdmin=_this.blindDateSingle.adminList.filter((val)=>{
					return val.userId==_this.$store.state.userInfo.id;
				});
				if(isAdmin.length>0){
					_this.isAdmin=true;
				}
			}
		}

		//333a3f3f6b944b5ca271e72ebd7efdf5 (单身旅行)
		//0fe7d9dbc1414c58850e97ccd9d806db (单身聚会)
		/*if(_this.id=='333a3f3f6b944b5ca271e72ebd7efdf5'||_this.id=='0fe7d9dbc1414c58850e97ccd9d806db'){
			let endTime="2018-12-30 00:00:00"||_this.blindDateSingle.datingDetailsExt.extDatetime;
			if(_this.id=='333a3f3f6b944b5ca271e72ebd7efdf5'){
				endTime="2019-01-01 00:00:00"||_this.blindDateSingle.datingDetailsExt.extDatetime;
			}
			endTime=endTime.replace(/\-/g, "/");
			let endDate=new Date(endTime).getTime();
			const sdis=Math.round((endDate-new Date().getTime())/1000);
			if(sdis>0){
				(function time(){
					const dis=Math.round((endDate-new Date().getTime())/1000);
					if(dis>0){
						let day=Math.floor(dis/60/60/24);
						let hour=Math.floor(dis/60/60)%24;
						let min =Math.floor(dis/60)%60;
						let sec=dis%60;
						_this.sTime=(day>0?day+'天 ':'')+(hour>0?(hour<10?'0'+hour:hour+''):'00')+":"+(min<10?"0"+min:min+"")+":"+(sec<10?"0"+sec:sec+"");
						_this.timeout= setTimeout(() => {
							time();
						},1000);
					}else{
						//_this.getBlindDateSingle();
						_this.sTime="";
					}
				}());
			}
		}*/

		//if(_this.$store.state.gotoBlindDatepay){
		//	_this.showPayWin=true;
		//	store.commit("CHANGESTORE",{name:"gotoBlindDatepay",value:false});//是否需要弹出支付
		//}
		/*if(_this.blindDateSingle.isCandidate==1){//已经报名
			//_this.$router.push({name:'registrationStaff',query:{id:_this.id}});
		}else if(_this.blindDateSingle.jiaoyouUser.id!=_this.$store.state.userInfo.id){
			_this.showPayWin=true;
		}*/
      },
      showBigImg(e) {
        if (e.target.nodeName == 'IMG') {
          this.showPhoto(e.target.src)
        }
      },
      async followBlindDating() { //关注活动接口
       // this.$vux.loading.show()
	    this.$store.commit("CHANGESTORE",{name:"gotoBlindDatepay",value:"guanzhu"});//是否需要弹出支付
        await this.$server.followBlindDating(this.id);
      //  this.$vux.loading.hide()
        /*this.$vux.toast.show({
          type: 'text',
          text: '关注成功',
          position: 'middle',
          width: 'auto',
        })*/
        this.$set(this.blindDateSingle, "isFollow", 1);//动态改变数量
		let followCount=parseInt(this.blindDateSingle.followCount)+1;
		this.$set(this.blindDateSingle, "followCount", followCount);
      },
      async unfollowBlindDating() { //取消关注活动接口
        this.$vux.loading.show()
        await this.$server.unfollowBlindDating(this.id);
        this.$vux.loading.hide()
        /*this.$vux.toast.show({
          type: 'text',
          text: '取消关注成功',
          position: 'middle',
          width: 'auto',
        })*/
        this.$set(this.blindDateSingle, "isFollow", 0);
		let followCount=this.blindDateSingle.followCount-1;//动态改变数量
		this.$set(this.blindDateSingle, "followCount", followCount<0?0:followCount);

      },
      bmBlindDating() { //参加活动接口
        const t = this;
        // t.$router.push({name:'blindDatePay',query:{id:t.id}});
		t.$store.commit("CHANGESTORE",{name:"gotoBlindDatepay",value:"baoming"});//是否需要弹出支付
        t.showPayWin = true;
      },
      async unbmBlindDating() { //取消参加活动接口
		  const t=this;
		  t.$vux.confirm.show({
			content: "登记缺席报名费无法退回,并且不能再参与本活动!",
			confirmText:"确认",
			cancelText:"取消",
			onCancel () {
			},
			async onConfirm () {
				try{
					t.isloading=true;
					await t.$server.unCandidateBlindDating({id:t.id});
					t.isloading=false;
					let candidateList=t.blindDateSingle.candidateList.filter(v=>{
						return v.jiaoyouUser.id!=t.$store.state.userInfo.id;
					})
					t.$set(t.blindDateSingle, "candidateList",candidateList);
          //t.blindDateSingle.enrollCount = parseInt(t.blindDateSingle.enrollCount - 1);
					t.$set(t.blindDateSingle, "isCandidate", 0)
					t.$set(t.blindDateSingle, "isAbsent", 1);
					let enrollCount=parseInt(t.blindDateSingle.enrollCount)-1;//实时更新报名人数
					t.$set(t.blindDateSingle, "enrollCount", enrollCount<0?0:enrollCount);
				}catch(e){
					t.$vux.toast.show({
						type: 'cancel',
						text: e.message,
						position: 'middle',
						width: 'auto',
					});
					t.isloading=false;
				}
			}
		});
      },
      async addGood(userId,index) { //添加好感好友接口
        this.$vux.loading.show()
        await this.$server.addGood({
          likingUserId: userId,
        });
        /*this.$vux.toast.show({
          type: 'text',
          text: '已好感',
          position: 'middle',
          width: 'auto',
        })*/
        this.$vux.loading.hide();
        this.$set(this.blindDateSingle.candidateList[index].jiaoyouUser,"isGood",1)
      },
      async delGood(userId,index) { //取消好感好友接口
        this.$vux.loading.show()
        await this.$server.deleteGood({
          likingUserId: userId,
        });
       /* this.$vux.toast.show({
          type: 'text',
          text: '取消好感',
          position: 'middle',
          width: 'auto',
        })*/
        this.$vux.loading.hide();
        this.$set(this.blindDateSingle.candidateList[index].jiaoyouUser,"isGood",0)
      },
    }
  }
</script>

<style scoped lang="scss">
  .jy_isBrowser{
    .main{
      padding-top: 1.39rem!important;
    }
  }
  .active .at_img .at_zc {
    background-color: #ff0000!important;
  }
  .active .at_desc .at_count i {
    color:#b2b2b2;
  }
  .active .at_con i, .active .at_con em {
    color: #ff0000;
  }
  .at_con{
   i.right{
     color:#b2b2b2;
     position: absolute;
     right: 0;
   }
  }
  .at_con_last{
    border-bottom: none;
  }
  .image_div{
    font-size: 0;
    overflow: hidden;
    background-color: #FFF;
    div{
      background-position: center;
      background-size: 100% 100%;
      text-align: center;
    }
	.jy_act_n_link{
		overflow:hidden;
		a{
			display:block;width:50%;margin-top:1.5rem;float:left;height:5rem;
		}
	}
	.jy_act_n_link_third{
		overflow:hidden;
		a{
			display:block;width:33.3333%;margin-top:1.5rem;float:left;height:4rem;
		}
	}
	.jy_act_n_link_four{
		overflow:hidden;padding-top:1rem;
		a{
			display:block;width:50%;margin-top:0.5rem;float:left;height:4rem;
		}
	}
  }

</style>
