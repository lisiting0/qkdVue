<template>
<div class="main jy_all_top  jy_new_act jy_opacity_top">
	<Loading v-if="isloading"></Loading>
	<div class="header" :class="{backgroundColorheader:opacity>0.2}" :style="{'background-color':'rgba(255,255,255,'+opacity+')'}">
		<div class="top">
			<Back class="left" v-if="!actDatingId"><i class="iconfont">&#xe613;</i></Back>
			<a v-else class="left" @click="hiddenInfo"><i class="iconfont">&#xe613;</i></a>
			<a class="right" @click="clickShare"><i class="iconfont">&#xe679;</i></a><p>约会详情</p>
		</div>
	</div>
	<myScroller style="padding: 0 0 0rem;"  :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" :bouncing="!1" :touchmove="touchmove" ref="myScroller" :showbg="showbg">
	<div class="jy_new_act_top" v-if="datingDetail">
		<!--<ul class="jy_new_act_top_list">
			<li></li>
		</ul>-->
		<div class="swiper_container user_info_swiper" id="swiper_container">
			<swiper loop auto :show-dots="false" height="10.8rem" v-model="currIndex">
				<template v-if="coverimgAttachement&&coverimgAttachement.length>0">
				  <swiper-item v-for="item in coverimgAttachement" v-if="item" :key="item">
					<i class="backImageCover" :style="'background-image:url('+$utils.getFullPath(item)+');width:100%;padding-bottom:100% !important'"></i>
				  </swiper-item>
				</template>
			</swiper>
			<p class="swiper_count" v-if="coverimgAttachement&&coverimgAttachement.length>0">{{(currIndex+1)}} / {{coverimgAttachement.length}}</p>
			<p class="swiper_count" v-else>0 / 0</p>
		</div>
	</div>
	<div class="jy_new_act_b" v-if="datingDetail">
		<div class="jy_new_act_block">
			<div class="jy_new_act_uinfo">
				<router-link tag="i" :to="{name:'userInfo',query:{id:datingDetail.jiaoyouUser.id}}" class="jy_new_act_uinfo_img" :style="'background-image:url('+$utils.getFullPath(datingDetail.jiaoyouUser.headimgAttachmentId)+')'"></router-link>
				<h4><em> {{$utils.formarDistance(datingDetail.distance)}}</em>{{datingDetail.jiaoyouUser.aliasName}}<i class="jy_auth_age" :class="{jy_auth_age_man:datingDetail.jiaoyouUser.sex==2}">{{datingDetail.jiaoyouUser.sex==1?'&#xe64a;':'&#xe605;'}}{{datingDetail.jiaoyouUser.age}}</i></h4>
				<p class="jy_new_act_uinfo_tip">
          <span style="color:rgb(80, 203, 255);border: 1px solid rgb(80, 203, 255);" v-if="datingDetail.activityMethod==7">一对一</span>
          <span style="color:#ff706c;border: 1px solid #ff706c;" v-else-if="datingDetail.activityMethod==8">多人</span>
          <i class="jy_act_ico">
					{{datingDetail.datingThemes==1?'&#xe66d;':datingDetail.datingThemes==2?'&#xe66c;':datingDetail.datingThemes==3?'&#xe669;':datingDetail.datingThemes==4?'&#xe895;':datingDetail.datingThemes==5?'&#xee41;':'&#xe66f;'}}{{datingTitles[datingDetail.datingThemes>5?6:datingDetail.datingThemes]}}</i><i v-if="datingDetail.activityMethod!=7&&datingDetail.activityMethod!=8" :class="'jy_act_ico jy_act_ico_'+tmp[datingDetail.activityMethod]">{{jiaoyouType[datingDetail.activityMethod]}}</i><em v-if="datingDetail.activityMethod!=7&&datingDetail.activityMethod!=8" class="jy_ico_ask" @click.stop="showRule=true">&#xe682;</em></p>
			</div>
      <template >
        <p class="jy_new_act_desc" v-if="datingDetail.datingDesc">{{datingDetail.datingDesc}}</p>
      </template>
			<!--<template v-else>-->
        <!--<p class="jy_new_act_desc" v-if="datingDetail.datingTitle">{{datingDetail.datingTitle}}</p>-->
      <!--</template>-->
			<ul class="jy_new_act_gift" v-if="(datingDetail.expGift&&expGift)||(datingDetail.sendGift&&sendGift)">
				<li v-if="datingDetail.expGift&&expGift">参加有礼<em>(送给参加者)</em>：<div class="jy_new_act_gift_r"><i :style="'background-image:url('+$store.state.phpURL + '/'+ expGift.imagePath+');'"></i><p>{{expGift.name}}*{{expGift.num}}</p><p>价值:{{expGift.price}}元</p></div></li>
				<li v-if="datingDetail.sendGift&&sendGift">携礼参加<em>(送给发起者)</em>：<div class="jy_new_act_gift_r"><i :style="'background-image:url('+$store.state.phpURL + '/'+ sendGift.imagePath+');'"></i><p>{{sendGift.name}}*{{sendGift.num}}</p><p>价值:{{sendGift.price}}元</p></div></li>
			</ul>
		</div>
		<div class="jy_new_act_block">
			<template v-if="datingDetail.datingThemes==1">
				<p class="jy_new_act_p"><i>&#xe667;</i>出发时间：{{datingDetail.datingDetailsExt.extInt7==1?"不限时间":datingDetail.datingDetailsExt.extInt7==2?"平常周末":formatDate(datingDetail.datingStarttime)}}</p>
				<!--<p class="jy_new_act_p"><i>&#xe677;</i>目的地点：{{datingDetail.datingLocation}}<i @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="color:#72ACE3;">[打开地图]</i></p>-->
        <p class="jy_new_act_p" @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="display: flex;align-items: center;">
          <label style="width: 2.6rem;flex-shrink: 0;"><i>&#xe677;</i>目的地点：</label><span style="line-height: 1.5;flex-grow: 1;">{{datingDetail.datingLocation}}({{datingDetail.datingDetailsExt.extString}})</span>
          <i style="flex-shrink: 0;">&#xe702;</i>
        </p>
				<p class="jy_new_act_p"><i>&#xe657;</i>旅行周期：{{tripTimeLength[datingDetail.tripTimeLength]}}</p>
				<p class="jy_new_act_p"><i>&#xe696;</i>出行方式：{{tripMode[datingDetail.tripMode]}}</p>
			</template>
			<template v-else-if="datingDetail.datingThemes==2">
				<p class="jy_new_act_p"><i>&#xe667;</i>用餐时间：{{datingDetail.datingDetailsExt.extInt7==1?"不限时间":datingDetail.datingDetailsExt.extInt7==2?"平常周末":formatDate(datingDetail.datingStarttime)}}</p>
				<!--<p class="jy_new_act_p"><i>&#xe677;</i>用餐地点：{{datingDetail.datingLocation}}<i @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="color:#72ACE3;">[打开地图]</i></p>-->
        <p class="jy_new_act_p" @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="display: flex;align-items: center;">
          <label style="width: 2.6rem;flex-shrink: 0;"><i>&#xe677;</i>用餐地点：</label><span style="line-height: 1.5;flex-grow: 1;">{{datingDetail.datingLocation}}({{datingDetail.datingDetailsExt.extString}})</span>
          <i style="flex-shrink: 0;">&#xe702;</i>
        </p>
			</template>
			<template v-else-if="datingDetail.datingThemes==3">
				<p class="jy_new_act_p" v-if="datingDetail.datingTitle"><i>&#xe6a4;</i>影片名称：{{datingDetail.datingTitle}}</p>
				<p class="jy_new_act_p"><i>&#xe667;</i>观影时间：{{datingDetail.datingDetailsExt.extInt7==1?"不限时间":datingDetail.datingDetailsExt.extInt7==2?"平常周末":formatDate(datingDetail.datingStarttime)}}</p>
				<!--<p class="jy_new_act_p"><i>&#xe677;</i>观影地点：{{datingDetail.datingLocation}}<i @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="color:#72ACE3;">[打开地图]</i></p>-->
        <p class="jy_new_act_p" @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="display: flex;align-items: center;">
          <label style="width: 2.6rem;flex-shrink: 0;"><i>&#xe677;</i>观影地点：</label><span style="line-height: 1.5;flex-grow: 1;">{{datingDetail.datingLocation}}({{datingDetail.datingDetailsExt.extString}})</span>
          <i style="flex-shrink: 0;">&#xe702;</i>
        </p>
			</template>
			<template v-else-if="datingDetail.datingThemes==4">
				<p class="jy_new_act_p"><i>&#xe667;</i>唱歌时间：{{datingDetail.datingDetailsExt.extInt7==1?"不限时间":datingDetail.datingDetailsExt.extInt7==2?"平常周末":formatDate(datingDetail.datingStarttime)}}</p>
				<!--<p class="jy_new_act_p"><i>&#xe677;</i>唱歌地点：{{datingDetail.datingLocation}}<i @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="color:#72ACE3;">[打开地图]</i></p>-->
        <p class="jy_new_act_p" @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="display: flex;align-items: center;">
          <label style="width: 2.6rem;flex-shrink: 0;"><i>&#xe677;</i>唱歌地点：</label><span style="line-height: 1.5;flex-grow: 1;">{{datingDetail.datingLocation}}({{datingDetail.datingDetailsExt.extString}})</span>
          <i style="flex-shrink: 0;">&#xe702;</i>
        </p>
			</template>
			<template v-else-if="datingDetail.datingThemes==5">
				<p class="jy_new_act_p" v-if="datingDetail.datingTitle"><i>&#xe667;</i>运动项目：一起 {{datingDetail.datingTitle}}</p>
				<p class="jy_new_act_p"><i>&#xe667;</i>运动时间：{{datingDetail.datingDetailsExt.extInt7==1?"不限时间":datingDetail.datingDetailsExt.extInt7==2?"平常周末":formatDate(datingDetail.datingStarttime)}}</p>
				<!--<p class="jy_new_act_p"><i>&#xe677;</i>运动地点：{{datingDetail.datingLocation}}<i @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="color:#72ACE3;">[打开地图]</i></p>-->
        <p class="jy_new_act_p" @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="display: flex;align-items: center;">
          <label style="width: 2.6rem;flex-shrink: 0;"><i>&#xe677;</i>运动地点：</label><span style="line-height: 1.5;flex-grow: 1;">{{datingDetail.datingLocation}}({{datingDetail.datingDetailsExt.extString}})</span>
          <i style="flex-shrink: 0;">&#xe702;</i>
        </p>
			</template>
			<template v-else>
				<p class="jy_new_act_p" v-if="datingDetail.datingTitle"><i>&#xe6a4;</i>约会主题：一起 {{datingDetail.datingTitle}}</p>
        <p class="jy_new_act_p"><i>&#xe667;</i>约会时间：{{datingDetail.datingDetailsExt.extInt7==1?"不限时间":datingDetail.datingDetailsExt.extInt7==2?"平常周末":formatDate(datingDetail.datingStarttime)}}</p>
				<!--<p class="jy_new_act_p"><i>&#xe677;</i>约会地点：{{datingDetail.datingLocation}}<i @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="color:#72ACE3;">[打开地图]</i></p>-->
        <p class="jy_new_act_p" @click="openMap(datingDetail.longitude,datingDetail.latitude,datingDetail.datingLocation)" style="display: flex;align-items: center;">
          <label style="width: 2.6rem;flex-shrink: 0;"><i>&#xe677;</i>约会地点：</label><span style="line-height: 1.5;flex-grow: 1;">{{datingDetail.datingLocation}}({{datingDetail.datingDetailsExt.extString}})</span>
          <i style="flex-shrink: 0;">&#xe702;</i>
        </p>
			</template>
			<p class="jy_new_act_p"><i>&#xea59;</i>性别：{{expectSex[datingDetail.expectSex>2?3:datingDetail.expectSex]}}</p>
      <p class="jy_new_act_p"><i class="iconfont">&#xe6c2;</i>费用：{{payTypeText[datingDetail.payType]}}{{datingDetail.payType==0?` · 每人${datingDetail.enrollFee}元`:datingDetail.payType==3?` · 男士每人${datingDetail.enrollFee}元`:""}}<i v-if="datingDetail.datingDetailsExt&&datingDetail.datingDetailsExt.extInt==1" style="color:#ff4404;margin-left: 0.4rem;">[平台代收]</i></p>
      <p v-if="datingDetail.datingDetailsExt&&datingDetail.datingDetailsExt.extInt==1" style="font-size: 0.32rem;padding: 0 0 0 0.7rem;color:#c6c6c6;">平台代收:平台代收活动费用，报名结束后自动发放到发起人账户</p>
      <p v-if="datingDetail.datingDetailsExt&&datingDetail.datingDetailsExt.extInt==0&&(datingDetail.payType==0||datingDetail.payType==3)" style="font-size: 0.32rem;padding: 0 0 0 0.7rem;color:#c6c6c6;">发起人收取:活动发起人线下收取活动费用</p>
			<!--<p class="jy_new_act_p"><i class="icon_bi"></i>报名费用：{{datingDetail.enrollFee>0?datingDetail.enrollFee+'乾坤币':'免费'}}</p>-->
			<!--<div class="jy_new_act_p">-->
				<!--<i class="icon_bib"></i>保证金：{{datingDetail.expDepositMoney||0}}元<em @click.stop="showCash=!showCash">&#xe676;</em>-->
				<!--<p class="jy_new_act_p_a" v-if="showCash">约会完成后，若无违规，则会退回<br>至付款账户&lt;!&ndash;<a>[查看详情]</a>&ndash;&gt;</p>-->
			<!--</div>-->
		</div>
		<div v-if="datingDetail.activityMethod!=7&&datingDetail.activityMethod!=8" class="jy_new_act_block">
      <p style="font-size: 0.45rem;font-weight: 500;padding: 0.3rem 0;">活动说明</p>
			<p style="border-top: 0px solid #EBEBEB;    padding: 0.3rem 0;" class="jy_new_act_time jy_new_act_p">选择对象时间：{{formatDate(datingDetail.activityStarttime)}}</p>
      <p style="border-top: 0px solid #EBEBEB;    padding: 0.3rem 0;" class="jy_new_act_p">
        <span>活动规则：{{rule[tmp[datingDetail.activityMethod]]||""}}</span>
      </p>
		</div>
		<div class="jy_new_act_block">
      <p style="font-size: 0.45rem;font-weight: 500;padding: 0.3rem 0;">资格要求</p>
			<p class="jy_new_act_p"><i>&#xe636;</i>认证要求：<template v-if="!datingDetail.idStatus&&!datingDetail.videoStatus&&!datingDetail.carStatus&&!datingDetail.houseStatus">不限</template><template v-else><i class="jy_color_red" v-if="datingDetail.idStatus">&#xe69c;</i>　<i class="jy_color_red" v-if="datingDetail.videoStatus">&#xe697;</i>　<i class="jy_color_red jy_color_car_red" v-if="datingDetail.carStatus">&#xe69f;</i>　<i class="jy_color_red" v-if="datingDetail.houseStatus">&#xe69e;</i></template></p>
			<p class="jy_new_act_p"><i>&#xe69d;</i>年龄：{{!datingDetail.expAgeLowerLimit||datingDetail.expAgeLowerLimit==-1?'不限':datingDetail.expAgeUpperLimit==-1?datingDetail.expAgeLowerLimit+'以上':datingDetail.expAgeLowerLimit+"-"+datingDetail.expAgeUpperLimit}}</p>
			<p class="jy_new_act_p"><i>&#xe675;</i>身高：{{!datingDetail.expHeightLowerLimit||datingDetail.expHeightLowerLimit==-1?'不限':'不低于'+datingDetail.expHeightLowerLimit+'cm'}}</p>
			<p class="jy_new_act_p"><i>&#xe666;</i>学历：{{!datingDetail.expEdu||datingDetail.expEdu==-1?'不限':expEdu['e'+datingDetail.expEdu]}}</p>
      <p class="jy_new_act_p"><i>&#xe6c2;</i>收入：{{formatImcome(datingDetail.expIncomeLowerLimit,datingDetail.expIncomeUpperLimit)}}</p>
		</div>
		<div v-if="datingDetail.activityMethod!=7&&datingDetail.activityMethod!=8" class="jy_new_act_block">
			<p class="jy_new_act_p"><i>&#xe67e;</i>约会后续：<template v-for="item,index in (datingDetail.furtherAction).split(',')">{{index>0?'、':''}}{{item}}</template></p>
		</div>
		<div class="jy_new_act_block">
			<div class="jy_new_act_bmList_wrap" :class="{jy_new_act_bmList_blur:datingDetail.isCandidate!=1&&(datingDetail.jiaoyouUser.id != $store.state.userId)}">
				<p v-if="datingDetail.activityMethod!=7&&datingDetail.activityMethod!=8" class="jy_new_act_t" @click.stop="toenter('actJoinMember',id)">
          <i>&#xe702;</i>
          已报名({{enrollCount}})
          </p>
        <p v-else class="jy_new_act_t" @click.stop="toenter('actJoinMemberGl',id)">
          <i>&#xe702;</i>
          <template v-if="datingDetail.expectSex==9&&datingDetail.activityMethod==8">
            已报名({{enrollCount}}{{datingDetail.activityMethod==8?"/"+datingDetail.datingDetailsExt.extInt12:""}})
          </template>
          <template v-else>
            已报名({{enrollCount}}{{datingDetail.activityMethod==8?"/"+datingDetail.datingDetailsExt.extInt12:""}})
          </template>
        </p>
				<div class="jy_new_act_hidden">
					<ul class="jy_new_act_bmList" v-if="baomingUser">
						<template v-for="item,index in baomingUser" v-if="index<7">
							<router-link v-if="datingDetail.activityMethod!=7&&datingDetail.activityMethod!=8" tag="li" :to="{name:'actJoinMember',query:{id:id}}" ><i :style="'background-image:url('+$utils.getFullPath(item.jiaoyouUser.headimgAttachmentId)+');'"></i></router-link>
							<router-link v-else tag="li" :to="{name:'actJoinMemberGl',query:{id:id}}" ><i :style="'background-image:url('+$utils.getFullPath(item.jiaoyouUser.headimgAttachmentId)+');'"></i></router-link>	
						</template>
						<template v-if="baomingUser.length>6">
							<router-link v-if="datingDetail.activityMethod!=7&&datingDetail.activityMethod!=8" tag="li" :to="{name:'actJoinMember',query:{id:id}}" class="jy_new_act_bmList_more"><i></i></router-link>
							<router-link v-else tag="li" :to="{name:'actJoinMemberGl',query:{id:id}}" class="jy_new_act_bmList_more">
							  <i></i>
							</router-link>
						</template>
					</ul>
				</div>
			</div>
		</div>
	</div>
	</myScroller>
	<p class="identity_act" v-if="datingDetail">
		<!--活动发布者进入-->
      <template v-if="datingDetail.jiaoyouUser.id == $store.state.userId">
        <em class="grey" v-if="datingDetail.state==5">活动已结束</em>
		<router-link tag="em" :to="{name:'publishAppointment',query:{id:datingDetail.id}}" class="grey" v-else-if="datingDetail.state==2">编辑</router-link>
        <em class="orange" v-if="datingDetail.activityMethod!=7&&datingDetail.activityMethod!=8&&datingDetail.state!=2" @click="enter">进入现场</em>
      </template>
      <template v-else>
        <template v-if="datingDetail.state==5">
          <em class="grey" v-if="datingDetail.state==5">活动已结束</em>
          <em class="orange" @click="enter" v-if="(datingDetail.isCandidate==1||datingDetail.jiaoyouUser.id == $store.state.userId)&&datingDetail.activityMethod!=7&&datingDetail.activityMethod!=8&&datingDetail.state!=2">进入现场</em>
        </template>
        <template v-else>
			<template v-if="!$store.state.isLogin">
            <em class="pink" @click="candidate">我要报名</em>
            <em class="blue" @click="followActivity" >关注</em>
          </template>
          <template v-else-if="datingDetail.isCandidate==0">
            <em  class="pink"@click="candidate">我要报名</em>
            <em class="blue" @click="followActivity" v-if="datingDetail.isFollow==0">关注</em>
            <em class="blue" @click="unfollowActivity" v-if="datingDetail.isFollow==1">取消关注</em>
          </template>
          <template v-else>
            <em class="orange" @click="enter" v-if="(datingDetail.isCandidate==1||datingDetail.jiaoyouUser.id == $store.state.userId)&&datingDetail.activityMethod!=7&&datingDetail.activityMethod!=8">进入现场</em>
            <em class="pink" @click="cancelCandidate" v-if="datingDetail.isCandidate==1">退出活动</em>
			<em class="blue" @click.stop="showMsgWin=true"  v-if="datingDetail.activityMethod==7||datingDetail.activityMethod==8">联系约主</em>
          </template>
        </template>
      </template>
	</p>

  <div v-transfer-dom>
    <popup v-model="showPay" height="100%" :hide-on-blur=false position="bottom" :popup-style="{zIndex:600}" :should-scroll-top-on-show="true">
      <div class="top_userInfo" v-if="showPayWin">
        <actPay :actDatingId="id" :enrollFee="datingDetail.money||0"  @openPayWin="openPayWin" @hiddenPayWin="hiddenPayWin"></actPay>
      </div>
    </popup>
  </div>
  <div v-transfer-dom>
    <popup v-model="showMapPopup" height="100%" :hide-on-blur="false" position="bottom" :popup-style="{zIndex:596}" :should-scroll-top-on-show="true">
      <div class="top_userInfo" v-if="showMap">
        <chatWindowMap :location="datingDetail.datingLocation" :address="datingDetail.datingDetailsExt.extString" :center="centerObj" @hidden="hiddenMap"></chatWindowMap>
      </div>
    </popup>
  </div>
	<share :show="showShare" :shareTitle="shareTitle" :shareDesc="shareDesc" :shareImg="shareImg" :shareUrl="shareUrl" @changeShow="changeShow"></share>
	<div v-transfer-dom>
		<popup v-model="showDiaMsg" height="100%" :hide-on-blur=false position="bottom" :popup-style="{zIndex:595}" :should-scroll-top-on-show="true">
		<div class="top_userInfo" v-if="showMsgWin">
			<chatWindowWeb v-if="$store.state.isBrowser" @openDiaWin="openDiaWin" @hiddenDiaInfo="hiddenDiaInfo" :msgUser="msgUser"></chatWindowWeb>
			<chatWindow v-else @openDiaWin="openDiaWin" @hiddenDiaInfo="hiddenDiaInfo" :msgUser="msgUser"></chatWindow>
		</div>
		</popup>
	</div>
</div>
</template>
<script>
import Vue from 'vue';
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
import { Swiper, SwiperItem ,AlertPlugin,Popup, TransferDom} from 'vux'
import myScroller from '@other/myScroller.vue';
import Share from '@/components/home/share.vue'
import { wxShare } from '@js/wxjssdk'
import actPay from './actPay.vue';
import routerBack from '@/plus/routerBack.js';
import chatWindowMap from '../friend/chatWindowMap';
import chatWindow from '@/components/friend/chatWindow.vue';
import chatWindowWeb from '@/components/friend/chatWindowWeb.vue';
routerBack.init("act",{
	showShare:null,
  showMapPopup:{
    fn:"hiddenMap",
  },
	showDiaMsg:{
		fn:'hiddenDiaInfo'
	},
   showPay:null
})
Vue.use(AlertPlugin);
export default {
	name: 'act',
	props: ['actDatingId'],
	mixins:[routerBack],
	data () {
		return {
			  centerObj:{},
			  showMap:false,
			  showMapPopup:false,
			  showPayWin:false,
			  showPay:false,
			isloading:false,
			id:null,
			datingDetail:null,
			currIndex:0,
			coverimgAttachement:[],
			payTypeText:["AA","我请客","你买单","女士免单","视情况而定"],
			tmp:["","xy","qy","jy","zy","py","xm"],
			jiaoyouType: ["", "选缘", "抢缘", "竞缘", "中缘", "配缘", "寻觅对象"],
			datingTitles: ['','旅行', '吃饭', '电影', '唱歌', '运动', '其他'],
			datingIcon:['','&#xe66d;','&#xe66c;','&#xe669;','&#xe895;','&#xee41;','&#xe66f;'],
			tripTimeLength: ['', '一两天', '三五天', '十天半月'],
			tripMode: ['', '火车', '飞机', '动高铁', '游轮', '自驾', '大巴', '骑行'],
			expectSex:['','仅限女性','仅限男性','不限男女'],
			showCash:false,
			expGift:null,//我要送
			sendGift:null,//我要收
			expEdu:{
				"e9":"高中及以上",
				"e10":"大专及以上",
				"e11":"本科及以上",
				"e12":"硕士及以上",
				"e13":"博士及以上"	
			},
			baomingUser:null,
			opacity: 0,
			opacityTrans: 0,	
			loadRefresh:false,//下拉刷新
			loadInfinite:true, //上拉加载
			showRule:false,
			rule:{
				"xy":this.$store.state.custom_config.actRuleXy||"入场选缘开始后，发起人版主选择约会对象（可以通过聊天、送礼等来博取缘主的关注和好感哦），活动持续30分钟。",
				"qy":this.$store.state.custom_config.actRuleQy||"入场抢缘开始后，会有3轮抢点的机会，每轮间隔2分钟，三轮累计抢点次数最高者胜出，为了女神，施展你的弹指神通吧！活动持续30分钟。",
				"jy":this.$store.state.custom_config.actRuleJy||"入场竞缘开始后，通过竞价的方式来竞得本次的邀约，竞价开始后30秒内如果没有加价，则当前竞价者胜出，活动持续到竞价完成为止。",
				"zy":this.$store.state.custom_config.actRuleZy||"入场中缘开始后，通过聊天、送礼等会增加自己的活跃度，每消耗120活跃度可以进行一次抽奖，快来抽走你的女神吧！活动持续30分钟。",
				"py":this.$store.state.custom_config.actRulePy||"入场配缘开始后，系统会有30分钟内匹配一位伙伴与缘主进行约会，通过聊天、送礼等会增加自己的匹配率哦！",
			},
			enrollCount:0,//已报名人数
			showShare: false,
			shareTitle:'',
			shareDesc:'',
			shareImg:'',
			shareUrl:'',
			showbg:true,
			showDiaMsg:false,//聊天窗口
			showMsgWin:false,
			msgUser:{},
		}
	},
	components: {
		Loading,
		Back,
		Swiper,
		SwiperItem,
		myScroller,
		Share,
		actPay,
		Popup,
		chatWindowMap,
		chatWindow,
		chatWindowWeb,
	},
  directives: {
    TransferDom
  },
	watch:{	
		opacityTrans(newv) {
			//console.log(newv)
			this.opacity = newv;
		},
		showRule(val){
			const t=this;
			if(val){
				t.$vux.alert.hide();
				t.$vux.alert.show({
					title: '',
					content: t.rule[t.tmp[t.datingDetail.activityMethod]]||"",
					buttonText:"知道了",
					onShow(){
						t.showRule=false;
					}
				})
			}
		},
	},
	async mounted () {
		const t=this;
		t.id = t.$route.query.id || t.actDatingId;
		// try{
			await t.getSingle();
			// let shareTitle=t.datingDetail.datingTitle||t.datingDetail.datingDesc;
			// let shareDesc=t.datingDetail.datingTitle||t.datingDetail.datingDesc;
		let datingThemes = t.datingDetail.datingThemes
      let type = datingThemes==1?'一起旅行':datingThemes==2?'一起吃饭':datingThemes==3?'一起看电影':datingThemes==4?'一起唱歌':datingThemes==5?'一起运动':'其他';
      let shareTitle=this.Fn.dictReplace(this.$store.state.custom_config.appoinSharTitle,[type,t.datingDetail.jiaoyouUser.aliasName])
      let shareDesc=this.Fn.dictReplace(this.$store.state.custom_config.appoinSharContent,[t.datingDetail.datingDetailsExt.extInt7==1?'不限时间':t.datingDetail.datingDetailsExt.extInt7==2?'平常周末':(t.datingDetail.activityStarttime.substr(0,16)),t.datingDetail.datingLocation,type])
			let shareLink =t.$store.state.baseURL+"/api/account/publicAddressLoginUrl?state=act__id_"+t.id;
			
			if(!t.$store.state.qrcode.pid&&t.$route.query.pid&&t.$route.query.uid){
				let qrcodeData={
					pid: t.$route.query.pid,
					uid: t.$route.query.uid
				}
				t.$store.commit("QRCODE", qrcodeData);
			}
		  //console.log(shareLink)
		  if(t.$store.state.isLogin){
			shareLink = shareLink + "_pid_"+t.$store.state.userInfo.jyNumber;
			shareLink = shareLink + "_uid_"+t.$store.state.userInfo.id;
		  }
		  let otherLink=t.$route.query.otherLink||'';
			if(otherLink){
				shareLink+="_"+otherLink.split(".").join("_");
			}
			//alert(shareLink)
			t.shareTitle=shareTitle||t.$store.state.custom_config.defaultShareTile||'乾坤岛';
			t.shareDesc=shareDesc||t.$store.state.custom_config.defaultShareContent||'一个安全、纯粹、高效的婚恋交友平台';
			t.shareUrl=shareLink;


		  wxShare&&wxShare({
			  title: shareTitle, // 分享标题
			  desc: shareDesc, // 分享描述
			  link: shareLink, // 分享链接
			  imgUrl: t.$utils.getFullPath(t.datingDetail.jiaoyouUser.headimgAttachmentId)||t.$store.state.baseFrontEndURL+'static/logo.png', // 分享图标
			  debug:false
		  },{
			success(){
			//	alert("分享成功");
			},
			cancel(){
				//alert("分享失败");
			}
		  });
		// }catch(e){
		// 	console.log("错误",JSON.stringify(e));
		// }
		//$(document).bind("touchmove.act",t.scrollTop);
	},
	destroyed () {
	//	$(document).unbind("touchmove.act");
	},
	methods:{
		openDiaWin(flag){
			const t=this;
			if(!flag){
				t.showDiaMsg=true;
			}else{
				t.showMsgWin=false;
			}
		},
		hiddenDiaInfo(){
			const t=this;
			t.showDiaMsg=false;
			if(window.api){
				t.UIChatBox = window.api.require('UIChatBox');
				t.UIChatBox.hide();
				t.UIChatBox.closeBoard();
				t.UIChatBox.closeKeyboard();
			}
			setTimeout(()=>{
				t.showMsgWin=false;
			},800)
		},
    formatImcome(expIncomeLowerLimit,expIncomeUpperLimit){
      if(!expIncomeLowerLimit&&!expIncomeUpperLimit){
        return "不限"
      }
      if(!expIncomeLowerLimit){
        return "低于"+expIncomeUpperLimit;
      }
      if(!expIncomeUpperLimit){
        return "高于"+expIncomeLowerLimit;
      }
      return expIncomeLowerLimit+"~"+expIncomeUpperLimit;
    },
	  toenter(path,id){
	    if(this.datingDetail.isCandidate==1||(this.datingDetail.jiaoyouUser.id == this.$store.state.userId)){
        this.$router.push({
          path: "/"+path,
          query: {
            id: id
          }
        })
      }
    },
    openMap(lon,lat,location){
      this.centerObj={lng: lon, lat: lat}
      this.showMapPopup = true;
      this.showMap=true;
    },
    hiddenMap(){
      this.showMap=false;
      this.showMapPopup = false;
    },
		formatDate(date){
			if(date){
				let endDate=date.split(" ")[0];
				if(endDate){
					let endTime=new Date(endDate.replace(/\-/g, "/")).getTime();
					let nowTime=new Date(new Date().setHours(0, 0, 0, 0)).getTime();//今天凌晨
					let dis=(endTime-nowTime)/(24*60*60*1000);
					if(dis==0){
						return "今天 "+date.split(" ")[1]
					}else if(dis==1){
						return "明天 "+date.split(" ")[1]
					}
				}
			}
			return date;
		},
		clickShare() {
			this.showShare = !this.showShare;
		  },
		changeShow(val) {
			this.showShare = val;
		  },
		touchmove(left,top,zoom){
			this.opacity = Math.ceil(top) / 100;
		},
		scrollTop(){
			const t=this;
			t.opacity = Math.ceil($(document).scrollTop()) / 100;
		},
		hiddenInfo(){
			this.$emit('hiddenInfo');
		},
		enter() {
			this.$router.push({
				path: "/actSceneNew",
				query: {
					id: this.datingDetail.activityMethod,
					datingId: this.id
				}
			})
		},
		async getBaomingUser(){
			const t=this;
			try{
				const result =await t.$server.getDatingCandidateList({
					datingId:t.id,
					rows:7,
					page:1,
				});
				console.log(result)
				t.enrollCount=result.data.count||0;
				t.baomingUser=result.data.list||null;
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		async getSingle(type){
			const t=this;
			try{
				t.isloading=true;
        let location = await this.$store.dispatch("getMylocation");
        //console.log(location)
				let postdata={
				  datingDetailsId: t.id,
				  latitude:location.lat==0?null:location.lat,
				  longitude: location.lon==0?null:location.lon,
				}
				if(type){
          postdata={
            datingDetailsId: t.id,
            isRefresh:true,
            latitude:location.lat==0?null:location.lat,
            longitude: location.lon==0?null:location.lon,
          }
        }
				let result = await t.$server.getSingle(postdata);
				t.showbg=false;
				t.datingDetail=result.data.data;
				t.msgUser={name:t.datingDetail.jiaoyouUser.aliasName,userId:t.datingDetail.jiaoyouUser.id,img:t.datingDetail.jiaoyouUser.headimgAttachmentId}
				if(result.data.data.giftDetail){
					let giftDetail = JSON.parse(result.data.data.giftDetail);	
					for (let i = giftDetail.length; i--;) {
					  if(giftDetail[i].expGift==1){
						  t.expGift = giftDetail[i];
					  }
					  if(giftDetail[i].sendGift==1){
						t.sendGift = giftDetail[i];
					  }
					}
				}
				
				if(result.data.data.enrollCount&&result.data.data.enrollCount>0){
					t.getBaomingUser();
				}
				t.coverimgAttachement=result.data.data.showPic&&result.data.data.showPic.split(",").filter((v,i)=>{
					return v!='';
				});
				t.isloading=false;
			}catch(e){
				t.isloading=false;
				console.log(JSON.stringify(e));
			}
		},
		onSwiperItemIndexChange(){
			const t=this;
		},
		async cancelCandidate() {//取消参加活动
			let _t = this
      let text = `确定退出活动吗?`
      if(_t.datingDetail.isDeFrequency==1){
        text = _t.$store.state.custom_config.cancelActNeedTimeAgain?_t.Fn.dictReplace(_t.$store.state.custom_config.cancelActNeedTimeAgain,[_t.datingDetail.hour]):`取消参加活动后${_t.datingDetail.hour}小时内所有活动将不能报名参加，你确定要取消吗？`
      }
      let timestamp = null;
      let time = _t.datingDetail.datingDetailsExt.extInt7==3?_t.datingDetail.activityStarttime:""
      if(time){
        timestamp = (new Date(Date.parse(time.replace(/-/g,"/")))).getTime()-new Date().getTime()
      }
      if(timestamp&&timestamp<14400000&&_t.datingDetail.enrollFee>0){
        text = _t.$store.state.custom_config.cancelActNeedMoney||`取消参加此次活动将扣除20%报名费用，你确定要取消吗？`
        if(_t.datingDetail.isDeFrequency==1){
          text = _t.$store.state.custom_config.cancelActNeedMoneyAndTime?_t.Fn.dictReplace(_t.$store.state.custom_config.cancelActNeedMoneyAndTime,[_t.datingDetail.hour]):`取消参加活动后${_t.datingDetail.hour}小时内所有活动将不能再报名参加并且扣除20%报名费用，你确定要取消吗？`
        }
      }
			this.$vux.confirm.show({
			  content: text,
				cancelText:'再想一想',
			  onCancel() {
			  },
			  async onConfirm() {
				_t.$vux.loading.show()
				await _t.$server.unCandidate({id: _t.id});
				_t.datingDetail.isCandidate = 0;
				_t.getSingle();
				_t.$vux.toast.show({
				  type: 'text',
				  text: '退出成功',
				  position: 'middle',
				  width: 'auto',
				})
				_t.$vux.loading.hide();
			  }
			})
		  },
		async followActivity() { //关注活动接口
			this.$vux.loading.show()
			await this.$server.followActivity(this.id);
			this.$vux.loading.hide()
			this.showHideOnBlur = true;
			this.datingDetail.isFollow = 1;
		  },
		  async unfollowActivity() { //取消关注活动接口
			this.$vux.loading.show()
			await this.$server.unfollowActivity(this.id);
			this.$vux.loading.hide()
			this.showHideOnBlur = true;
			this.datingDetail.isFollow = 0;
		  },
    openPayWin() {
      const t = this;
      t.showPay = true;
    },
    hiddenPayWin(flag) {
      this.showPay = false;
      if (flag) {
        this.datingDetail.isCandidate = 1;
        this.getSingle(true);
      }
      setTimeout(() => {
        this.showPayWin = false;
      }, 800)
    },
		async candidate() {
			//参加活动接口
			let _t = this
			if (this.datingDetail.money != 0&&this.datingDetail.datingDetailsExt&&this.datingDetail.datingDetailsExt.extInt==1) {
        this.showPayWin = true;
			  return ;
			} else {
        try{
          _t.$vux.loading.show()
          await _t.$server.candidate({id: _t.id})
          _t.$vux.loading.hide()
          _t.datingDetail.isCandidate = 1;
          _t.getSingle(true);
        }catch (e) {
          console.log("报名异常",e)
          let content = "";
          let path = "";
          if(e.status&&e.status==110068){
            content=_t.$store.state.custom_config.actNeedAuth?_t.Fn.dictReplace(_t.$store.state.custom_config.actNeedAuth,[e.message]):`${e.message},认证通过后才可以报名参加本活动`
            path="certificationCenter"
          }else if(e.status&&e.status==110014){
            content=_t.$store.state.custom_config.actNeedIdentityAuth||`本活动有认证要求，您需要通过身份证实名认证才可以报名参加本活动`
            path="identityAuth"
          }else if(e.status&&e.status==110015){
            content=_t.$store.state.custom_config.actNeedHouseAuth||`本活动有认证要求，您需要通过房产认证才可以报名参加本活动`
            path="houseAuth"
          }else if(e.status&&e.status==110016){
            content=_t.$store.state.custom_config.actNeedCarAuth||`本活动有认证要求，您需要通过车产认证才可以报名参加本活动`
            path="carAuth"
          }else if(e.status&&e.status==110018){
            content=_t.$store.state.custom_config.actNeedVideoAuth||`本活动有认证要求，您需要通过视频认证才可以报名参加本活动`
            path="videoAuth"
          }
		  if(content){
			  _t.$vux.confirm.show({
				content:content ,
				confirmText: '去认证',
				cancelText: '再想一想',
				onCancel() {
				},
				onConfirm() {
				  _t.$router.push({
					path: path,
				  })
				}
			  })
		  }
        }



			}
		},
		
	}
}
</script>
