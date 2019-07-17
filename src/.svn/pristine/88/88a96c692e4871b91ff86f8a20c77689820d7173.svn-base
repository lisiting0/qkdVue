<template>
<div class="main jy_all_top jy_gift ">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>我的礼物</p>
		</div>
	</div>
	<dl class="jy_gift_list">
		<dt><em id="menu_bar"></em><i v-for="item,index in menu" @click.stop="tabMenu($event,index)">{{item}}</i></dt>
		<dd>
			<myScroller :style="$store.state.isBrowser?'padding:2.75rem 0 0;':'padding:3.65rem 0 0;'" :infinite="infinite" :noDataText="noDataText" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller" :showbg="showbg">
			
			<!--<div class="jy_gift_s">-->
				<!--<h4>{{tabIndex==0?'收到':'送出'}}的礼物</h4>-->
				<!--<p>共{{tabIndex==0?'收到':'送出'}}{{count}}个礼物</p>-->
			<!--</div>-->
			<ul class="jy_gift_ul"  v-if="transList">
				<template v-if="tabIndex==0">
					<li v-for="item,index in transList">
						<div class="jy_gift_user">
							<i class="jy_gift_img" :style="{'background-image':'url('+$utils.getFullPath(item.user.headimgAttachmentId)+')'}"></i>
							<h4>{{item.user.aliasName}}</h4>
							<p><em class="jy_auth_age" :class="{jy_auth_age_man:item.user.sex==2}">{{item.user.sex==1?'&#xe64a;':'&#xe605;'}}{{item.user.age}}</em></p>
						</div>
						<div class="jy_gift_time">
							<p>送给你</p>
							<p>{{item.giftTime}}</p>
						</div>
						<i class="jy_gift_g" :style="{'background-image':'url('+$utils.getFullPath(item.img)+')'}"><em v-if="item.amount>0">X{{item.amount}}</em></i>
					</li>
				</template>
				<template v-else>
					<li v-for="item,index in transList">
						<div class="jy_gift_time">
							<p>你送给</p>
							<p>{{item.giftTime}}</p>
						</div>
						<div class="jy_gift_user">
							<i class="jy_gift_img" :style="{'background-image':'url('+$utils.getFullPath(item.receiverUser.headimgAttachmentId)+')'}"></i>
							<h4>{{item.receiverUser.aliasName}}</h4>
							<p><em class="jy_auth_age" :class="{jy_auth_age_man:item.receiverUser.sex==2}">{{item.receiverUser.sex==1?'&#xe64a;':'&#xe605;'}}{{item.receiverUser.age}}</em></p>
						</div>
						<i class="jy_gift_g" :style="{'background-image':'url('+$utils.getFullPath(item.img)+')'}"><em v-if="item.amount>0">X{{item.amount}}</em></i>
					</li>
				</template>
			</ul>
			</myScroller>
		</dd>
	</dl>
</div>
</template>
<script>
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
import myScroller from '@other/myScroller.vue';
export default {
	name: 'gift',
	data () {
		return {
			pagerouter:'main',
			isloading:false,
			menu:["收到","送出"],
			pageNo:1,
			transList:null,
			isRead:false,
			isEnd:false,
			count:0,
			loadRefresh:true,//下拉刷新
			loadInfinite:true, //上拉加载
			isRefresh:false,
			tabIndex:-1,
			noDataText:"",
			showbg:true,
		}
	},
	components: {
		Loading,
		Back,
		myScroller,
	},
	watch:{
		isEnd(val){
			const t=this;
			if(val){
				t.$refs.myScroller.finishInfinite(true);
			}else{
				//t.$refs.myScroller.scrollTo(1);
				t.$refs.myScroller.finishInfinite(false);
			}
		},
		async tabIndex(val){
			const t=this;
			let result;
			let isRefresh={};
			if(t.isRefresh){
				isRefresh={isRefresh:true};
			}
			if(val==0){
				result =await t.$server.giftCount({...isRefresh});
			}else{
				result =await t.$server.myGiftCount({...isRefresh});
			}
			t.count=result.data.data;
		},
	},
	mounted () {
		const t=this;
		$("body").addClass("gray");
		t.tabIndex=0;
		t.tabMenu($("#menu_bar").siblings("i").eq(0)[0],t.tabIndex);
	},
	destroyed () {
		$("body").removeClass("gray");
	},
	methods:{
		tabMenu(e,index){
			const t=this;
			if(t.isRead){
				return false;
			}
			let target=e.target||e;
			let menu_bar=document.getElementById("menu_bar");
			menu_bar.style.cssText="transform:translateX("+(target.offsetLeft+target.offsetWidth/2)+"px);"+(e.target?"transition-duration:500ms":"transition-duration:0ms");
			if(e.target&&t.tabIndex!=index){
				t.getMyRechargeList(index);
			}
		},
		async getMyRechargeList(index){
			const t=this;
			if(t.isRead){
				return false;
			}
			t.isRead=true;
			t.noDataText='正在加载...';
			if(t.isRefresh||t.tabIndex!=index){
				if(t.tabIndex!=index){//切换
					t.transList=null;
					t.isEnd=false;//必需,要不然在切换时不显示加载效果
					t.$refs.myScroller.scrollTo(1);
				}
				t.pageNo=1;
				t.tabIndex=index;		
			}
			try{
				let result;
				let isRefresh={};
				if(t.isRefresh){
					isRefresh={isRefresh:true};
				}
				if(t.tabIndex==0){
					result=await t.$server.getUserGift({
						...isRefresh,
						page:t.pageNo,
						rows:t.$store.state.pageSize,
						//type:parseInt(t.type[0]),
					});
				}else{
					result=await t.$server.getUserMyGift({
						...isRefresh,
						page:t.pageNo,
						rows:t.$store.state.pageSize,
					//	type:parseInt(t.type[0]),
					});
				}
				if(!t.transList||t.pageNo==1){
					t.transList=[];
				}
				if(result.data.list){
					t.showbg=false;
					t.transList.push(...result.data.list);
				}
				//t.count=result.data.count;
				if(result.data.count<=t.$store.state.pageSize*t.pageNo||result.data.list.length<t.$store.state.pageSize){//判断是否最后一页
					t.noDataText='已加载全部数据';
					t.isEnd=true;
				}else{
					t.isEnd=false;
					t.$refs.myScroller.finishInfinite(false);
				}
				t.pageNo++;
			}catch(e){
				t.noDataText='加载异常,请重试';
				t.isEnd=true;
			}
			t.isRead=false;
			//t.isloading=false;
			t.isRefresh=false;
		},
		infinite(done) {//上拉加载(防止初始内容不满一屏会无限加载)
			const t=this;
			if(t.isEnd){
				done(true);
				return false;
			}
			if(t.isRead){//必需,要不然在切换时不显示加载效果
				return false;
			}
			console.log("加载");
			t.getMyRechargeList(t.tabIndex).then(()=>{
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
			t.getMyRechargeList(t.tabIndex).then((res)=>{
				done&&done();
			});
		},
	}
}
</script>