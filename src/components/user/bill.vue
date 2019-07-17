<template>
	<div class="main jy_all_top jy_bill">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right" @click="showSel=!showSel"><i class="iconfont">&#xe64d;</i></a><p>账单</p>
			</div>
		</div>
		<dl class="jy_gift_list">
			<dt><em id="menu_bar"></em><i v-for="item,index in menu" :style="'width:'+(100/menu.length).toFixed(4)+'%'" @click.stop="tabMenu($event,index)">{{item}}</i></dt>
			<dd>
				<!--<ul class="jy_bill_t" v-if="tabIndex==0">
					
					<li :class="showSel?'cur':''" @click="showSel=!showSel">筛选</li>
					
				</ul>-->
				<myScroller :style="$store.state.isBrowser?'padding:2.6rem 0 0;':'padding:3.5rem 0 0;'" :noDataText="noDataText" :infinite="infinite" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller" :showbg="showbg">
					<ul class="jy_transaction_list" v-if="transObj">
						<template v-for="item,index in transObj">
							<li class="jy_tran_date">
								<h4>{{index==month?'本月':index}}</h4>
								<p>支出 <!--<span :class="{jy_tran_bi:tabIndex==1,jy_tran_bib:tabIndex==0}"></span>-->{{tabIndex==0?'￥'+Fn.toFixed(item.out||0):item.out}}　　收入 <!--<span :class="{jy_tran_bi:tabIndex==1,jy_tran_bib:tabIndex==0}"></span>-->{{tabIndex==0?'￥'+Fn.toFixed(item.in||0):item.in}}</p>
							</li>
							<li v-for="val in item.list">
								<i :class="tabIndex==1?(val.channel==1?'jy_tran_gift':val.channel==11?'jy_tran_renwu':val.channel==10?'jy_tran_luck':val.channel==12?'jy_tran_love':val.channel==7?'jy_tran_buy':val.channel==4?'jy_tran_recharge':''):(val.channel==0?'jy_tran_gift':val.channel==1?'jy_tran_cash':val.channel==5?'jy_tran_act':val.channel==4?'jy_tran_act':val.channel==3?'jy_tran_tg':'')"></i>
								<h4>{{val.remark}}</h4>
								<p class="jy_transaction_tip">{{val.channelName}}</p>
								<p class="jy_transaction_date">{{val.createDate}}</p>
								<em :class="{off:val.operate==2}">{{val.operate==1?'+':val.operate==2?'-':''}}{{tabIndex==0?val.amount:val.jiaobiAmount}}</em>
							</li>	
						</template>
					</ul>
				<!--</template>
				<template v-else>
					<div class="jy_scroll">
						<ul class="jy_bill_list" v-if="billObj">
							<template v-for="item,index in billObj">
							<li class="jy_bill_date">
								<h4>{{index==month?'本月':index}}</h4>
								<p>支出 ￥{{Fn.toFixed(item.out||0)}}　　收入 ￥{{Fn.toFixed(item.in||0)}}</p>
							</li>
							<li v-for="val in item.list">
								<h4><em :class="{off:val.operate==2}">{{val.operate==1?'+':'-'}}{{val.jiaobiAmount}}</em>{{val.channel!=11?typeList[val.channel]:objList[val.objectId]}}</h4>
								<p>{{val.createDate}}</p>
							</li>
							</template>
						</ul>
					</div>
				</template>-->
				</myScroller>
			</dd>
		</dl>
		<div v-transfer-dom>
			<popup v-model="showSel" position="top" :popup-style="{zIndex:596,paddingTop:$store.state.isBrowser?'2.6rem':'3.35rem'}" :should-scroll-top-on-show="true" @on-hide="hiddenFilter">
				<div class="jy_bill_sel">
					<p class="jy_bill_sel_tit">快捷筛选</p>
					<ul class="jy_bill_sel_list">
						<li :class="typeIndex==-1?'cur':''" @click.stop="typeIndex=-1">全部</li>
						<li v-for="item,index in enumList[tabIndex==0?'record_type_money':'record_type_jiaobi']" :class="item.key==typeIndex?'cur':''" @click.stop="typeIndex=item.key">{{item.name}}</li>
					</ul>
					<!--<p class="jy_bill_sel_tit">金额</p>
					<div class="jy_bill_sel_input">
						<input type="number" autofocus @blur="blur($event)" @focus="focus($event)" v-model="minPrice" placeholder="最低">
						<input type="number" autofocus @blur="blur($event)" @focus="focus($event)" v-model="maxPrice" placeholder="最高">
					</div>-->
					<a class="jy_bill_sel_btn" @click="showSel=false">完成</a>
				</div>
			</popup>
		</div>
	</div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	import myScroller from '@other/myScroller.vue';
	import {Popup,TransferDom} from 'vux';
	import routerBack from '@/plus/routerBack.js';
	routerBack.init("bill",{
		showSel:null,
	});
	
	
	export default {
	name: 'bill',
	mixins:[routerBack],
	data () {
		return {
			isloading:false,
			showSel:false,
			pageNo:1,
			//billList:null,
			//billObj:null,
			//typeList:{"0":"全部","1":"打赏","2":"签到","3":"推广","4":"充值","5":"中奖","6":"活动消耗","7":"购物","8":"活动置顶","9":"活动报名","10":"抽奖","11":"任务"},
			
			//objList:{"2":"每日签到","11":"每日首充","16":"每日商城首购","32":"每日首次送礼","25":"完善资料","20":"第一次充值奖励","17":"缴纳保证金","31":"认证资料","33":"分享乾坤岛介绍","34":"分享相亲广场","35":"邀请好友注册","36":"分享乾坤有爱,玲珑相约","37":"分享乾坤有爱,旅途有情","38":"分享合伙人介绍","39":"分享区域合伙人招募","40":"分享用户赚钱攻略","41":"分享乾坤有爱•月老在线（青年专场）","42":"分享乾坤有爱--月老在线（大龄专场）","43":"分享乾坤有爱--月老在线（二度缘专场）","44":"分享乾坤有爱•情牵常春藤","45":"分享乾坤有爱•眉目传情（三高专场）","46":"分享乾坤有爱•眉目传情（二度缘专场）","47":"分享普通合伙人招募"},
			typeIndex:-1,
			month:new Date().getMonth()+1+"月",//本月
			isRead:false,
			isEnd:false,
			loadRefresh:true,//下拉刷新
			loadInfinite:true, //上拉加载
			isRefresh:false,
			minPrice:'',
			curMinPrice:'',
			maxPrice:'',
			curMaxPrice:'',
			noDataText:"",
			//menu:["乾坤币","收益","支出"],
			menu:["现金","乾坤币"],
			transList:null,
			transObj:null,
			tabIndex:0,
			enumList:{},
			showbg:true,
		}
	},
	directives: {
		TransferDom,
	},
    components: {
      Loading,
	  Back,
	  myScroller,
	  Popup,
    },
	destroyed () {
		$("body").removeClass(" fullscreen");
	},
    computed:{

    },
    watch:{
  
	  tabIndex(val){
		const t=this;
		if(val){
			t.getEnum("record_type_jiaobi");
		}else{
			t.getEnum("record_type_money");
		}
	  },
		/*async billList(val){//计算收入/支出
			const t=this;
			let billObj={};
			if(!val){
				return false;
			}
			for(let i=0;i<val.length;i++){
				let month=t.Fn.timeFormat(val[i].createDate,"MM")+"月";
				if(!t.billObj||!t.billObj[month]){
					t.billObj={}
					t.billObj[month]={list:[]};
					t.billObj[month]["list"]=val;
				}
				if(!billObj[month]){
					billObj[month]={list:[],in:v.incomeCount||0,out:v.payCount||0};
				}

				billObj[month].list.push(val[i]);
			}
			t.billObj=billObj;	
			t.isRefresh=false;	
		},*/
		isEnd(val){
			const t=this;
			if(val){
				t.$refs.myScroller.finishInfinite(true);
			}else{
				//t.$refs.myScroller.scrollTo(1);
				t.$refs.myScroller.finishInfinite(false);
			}
		},
		maxPrice(val){
			if(val&&typeof val=='string'){
				if(val.match(/^0\d+/)&&val.match(/^0\d+/)[0]){//先排除0开头不跟小数点的
					console.log("sdf")
					this.maxPrice = val.match(/^0\d*/)[0].split("")[1];
				}else{
					this.maxPrice = val.match(/^\d+\.?\d*/)&&val.match(/^\d+\.?\d*/)[0];
				}  
			}
		},
		minPrice(val){
			if(val&&typeof val=='string'){
				if(val.match(/^0\d+/)&&val.match(/^0\d+/)[0]){//先排除0开头不跟小数点的
					console.log("sdf")
					this.minPrice = val.match(/^0\d*/)[0].split("")[1];
				}else{
					this.minPrice = val.match(/^\d+\.?\d*/)&&val.match(/^\d+\.?\d*/)[0];
				}
			}
		},
		transList(val){//计算收入/支出
			const t=this;
			let transObj=t.transObj&&t.$utils.deepCopy(t.transObj)||{};
			if(!val){
				return false;
			}
			let curYear=new Date().getFullYear();
			val.forEach((v,i)=>{
				let year=t.Fn.timeFormat(v.createDate,"yyyy");
				let month=t.Fn.timeFormat(v.createDate,"MM月");
				if(year!=curYear){
					month=t.Fn.timeFormat(v.createDate,"yyyy年MM月");
				}
				if(!transObj[month]){
					transObj[month]={list:[],in:v.incomeCount||0,out:v.payCount||0};
				}
				transObj[month].list.push(v);
			});
			t.showbg=false;
			t.transObj=transObj;
		},
    },
    mounted () {
		const t=this;
		$("body").addClass(" fullscreen");
		t.tabIndex=t.$route.query.type||0;
		t.tabMenu($("#menu_bar").siblings("i").eq(t.tabIndex)[0],t.tabIndex);
		t.getEnum("record_type_money");
    },
    methods:{
		hiddenFilter(){
			const t=this;
			t.getData(t.tabIndex,true);
		},
		async getEnum(type){
			const t=this;
			if(t.enumList[type]){
				return false;
			}
			try{
				const result =await t.$server.findParentList({
					type
				});
				t.enumList[type]=result.data.data;
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		focus(e){
			e.target.setAttribute("type","text");
		},
		blur(e){
			e.target.setAttribute("type","number");
		},
		tabMenu(e,index){
			const t=this;
			if(t.isRead){
				return false;
			}
			
			let target=e.target||e;
			let menu_bar=document.getElementById("menu_bar");
			menu_bar.style.cssText="transform:translateX("+(target.offsetLeft+target.offsetWidth/2)+"px);"+(e.target?"transition-duration:500ms":"transition-duration:0ms");
			if(e.target&&t.tabIndex!=index){
				t.typeIndex=-1;
				t.getData(index);
			}
		},
		getData(index,flag){
			const t=this;
			t.showSel=false;
			console.log(index);
			//if(index==0){
				return t.getMyRechargeList(index,flag);//现金
			//}else{
				//return t.getBill(index);//乾坤币
			//}
		},
		async getMyRechargeList(index,flag){
			const t=this;
			if(t.isRead){
				return false;
			}
			t.isRead=true;
			t.noDataText='正在加载...';
			if(t.isRefresh||t.tabIndex!=index||flag){
				if(t.tabIndex!=index){//切换
					t.transList=null;
					t.transObj=null;
					t.isEnd=false;//必需,要不然在切换时不显示加载效果
					t.$refs.myScroller.scrollTo(1);
				}
				if(flag){
					t.$refs.myScroller.scrollTo(1);
					//t.isloading=true;
					//t.curMinPrice=t.minPrice;
					//t.curMaxPrice=t.maxPrice;
				}
				t.pageNo=1;
				t.tabIndex=index;		
			}
			let price={},type={};
			/*if(t.curMinPrice!=''){//最低
				price["beginJiaobiAmount"]=t.curMinPrice;
			}
			if(t.curMaxPrice!=''){//最高
				price["endJiaobiAmount"]=t.curMaxPrice;
			}*/
			if(t.typeIndex!=-1){
				type["channel"]=t.typeIndex;
			}
			try{
				let result;
				let isRefresh={};
				if(t.isRefresh){
					isRefresh={isRefresh:true};
				}
				if(t.tabIndex==1){
					result=await t.$server.getBill({
					...type,
					//...price,
					...isRefresh,
					page:t.pageNo,
					rows:t.$store.state.pageSize
				});
				}else{
					result=await t.$server.cashRecordList({
						...type,
						...isRefresh,
						page:t.pageNo,
						rows:t.$store.state.pageSize,
					});
				}
				if(!t.transList||t.pageNo==1){
					t.transList=[];
					t.transObj={};
				}
				if(result.data.list){
					t.transList=result.data.list;//不能用push
				}

				if(result.data.totalPage==t.pageNo||result.data.list.length<t.$store.state.pageSize){//判断是否最后一页
					t.noDataText='已加载全部数据';
					t.isEnd=true;
				}else{
					t.isEnd=false;
					//t.$refs.myScroller.finishInfinite(false);
				}
				t.pageNo++;
			}catch(e){
				t.noDataText='加载异常,请重试';
				t.isEnd=true;
			}
			//console.log("ddddddddddddddddd")
			t.isRead=false;
			//t.isloading=false;
			t.isRefresh=false;
		},
		/*async getBill(index,flag){
			const t=this;
			if(t.isRead){
				return false;
			}
			t.isRead=true;
			t.noDataText='正在加载...';
			if(t.isRefresh||flag||t.tabIndex!=index){
				if(t.tabIndex!=index){//切换
					//t.transList=null;
					//t.transObj=null;
					t.billList=null;
					t.billObj=null;
					t.isEnd=false;//必需,要不然在切换时不显示加载效果
					t.$refs.myScroller.scrollTo(1);
				}
				if(flag){
					t.$refs.myScroller.scrollTo(1);
					t.isloading=true;
					t.curMinPrice=t.minPrice;
					t.curMaxPrice=t.maxPrice;
				}
				t.pageNo=1;
				t.tabIndex=index;
			}
			let price={},type={};
			if(t.curMinPrice!=''){//最低
				price["beginJiaobiAmount"]=t.curMinPrice;
			}
			if(t.curMaxPrice!=''){//最高
				price["endJiaobiAmount"]=t.curMaxPrice;
			}
			if(t.typeIndex!=0){
				type["channel"]=t.typeIndex;
			}
			try{
				let isRefresh={};
				if(t.isRefresh){
					isRefresh={isRefresh:true};
				}
				const result=await t.$server.getBill({
					...type,
					...price,
					...isRefresh,
					page:t.pageNo,
					rows:t.$store.state.pageSize
				});
				if(!t.billList||t.isRefresh||flag||t.pageNo==1){
					t.billList=[];
					t.billObj=null;
				}
				if(result.data.list){
					t.billList.push(...result.data.list);	
				}
				if(result.data.count<=t.$store.state.pageSize*t.pageNo||result.data.list.length<t.$store.state.pageSize){//判断是否最后一页
					t.noDataText='已加载全部数据';
					t.isEnd=true;
				}else{
					t.isEnd=false;
					//t.$refs.myScroller.finishInfinite(false);
				}
				t.pageNo++;
			}catch(e){
				t.noDataText="加载异常,请重试";
				t.isEnd=true;
				t.isRefresh=false;	
				console.log(e)
			}
			t.isRead=false;
			t.isloading=false;	
		},*/
		infinite(done) {//上拉加载(防止初始内容不满一屏会无限加载)
			const t=this;
			console.log(t.isEnd,t.isRead);
			if(t.isEnd){
				done(true);
				return false;
			}
			if(t.isRead){
				done(true);
				return false;
			}
			console.log("加载");
			t.getData(t.tabIndex).then(()=>{
				if(t.isEnd){
					done(true);
				}else{
					done();
				}
			});
		},
		refresh(done) {//下拉刷新
			const t=this;
			console.log("刷新");
			t.isRefresh=true;
			t.getData(t.tabIndex).then((res)=>{
				done();
			});
		},
    }
  }
</script>

