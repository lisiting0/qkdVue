<template>
	<div class="jy_all_top jy_nearPeople">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>附近的人</p>
			</div>
		</div>
		<div class="jy_nearPeople_scroll">
			<template v-if="nearArr.length>0">
				<div class="page_1" v-for="item,index in nearArr" :class="'page'+(index+1)+((index==curPage-1||index==curPage+1||index==curPage)?' on':'')">
					<div class="horizontalScroll_1">
						<div class="page_2 s1" :style="{'background-image':'url('+$utils.getFullPath(item.coverimgAttachementId?item.coverimgAttachementId.split(',')[0]:item.headimgAttachmentId,720)+')'}">	
						<p>{{item.aliasName}}：{{item.selfLabel?item.selfLabel:'愿得一人心,白首不相离'}}</p>
						</div>
						<div class="page_2 s2" v-if="$store.state.isLogin&&$store.state.userInfo.idStatus==1&&$store.state.userInfo.silentState==0&&item.silentState==0">
							<div class="contentScroll_1">
								<userInfo v-if="index==curPage" :userId="item.id" :from="'nearbyPeople'"></userInfo>
							</div>
						</div>
					</div>
				</div>
			</template>
			<div v-else class="page_1 page0 on">
				暂无数据
			</div>
		</div>
		
	</div>
 
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	import myTouch from '@js/scrollpage.2.0.1.js';
	import userInfo from '../../user/userInfo.vue';
	export default {
		name: 'nearbyPeopleNew',
		data () {
			return {
				isloading:false,
				pageNo:1,
				pageSize:5,
				nearArr:[],
				curPage:-1,
				curUser:null,
				isEnd:false,
				isRead:false,
			}
		},
		
		components: {
			Loading,
			Back,
			userInfo,
		},
		created (){

		},
		destroyed (){
			
		},
		computed: {
		 
		},
		watch:{
			curPage(val){
				const t=this;
				t.curUser=null;
				if(!t.nearArr[val]){
					return;
				}
				let length=t.nearArr.length;
				const id=t.nearArr[val].id;
				//t.getUserInfo(id);
				
				/*if(val>0&&val<length-1){
					t.$nextTick(()=>{
						t.myClickTouch&&t.myClickTouch.refresh();
						t.myClickTouch&&t.myClickTouch.gotoPageY(val-1);
					})
				}*/
				//t.$nextTick(()=>{
					if(!t.isEnd&&val>=length-2){
						t.getList();
					}
				//})
				/*if(val%t.pageSize==0&&length>t.pageSize){//删除一些没用的列表数据,预防数据太多造成卡
					t.nearArr.splice(0,t.pageSize);
					t.myClickTouch&&t.myClickTouch.gotoPageY(0);
				}*/
				
			},
			nearArr(val){
				const t=this;
				t.$nextTick(()=>{
					t.myClickTouch&&t.myClickTouch.refresh();
				})
			}
		},
		async mounted () {
			const t=this;
			await t.getList();
			if(t.nearArr.length>0){
				t.curPage=0;//读取第一个个人信息
			}
			t.myClickTouch=new myTouch({//滑屏
				wrapper:".jy_nearPeople_scroll",
				durationTime:0.3,
				loop:false,//横屏是否循环滚动
				mouse:false,//竖屏是否支持鼠标滚轮滚动
				disRadio:0,//触发翻屏所需要的最小拖动距离比例
				lock:true,
				preventDefault:true,
				horizontalClassName:".horizontalScroll_1",//水平页面顶级容器 (必须是 verticalPageName 的一代子元素)
				contentClassName:".contentScroll_1",//滚动内容的容器(必须是 verticalPageName 的一代子元素)
				verticalPageName:".page_1",//垂直页面容器 (必须是 wrapper 的一代子元素)
				horizontalPageName:".page_2",//水平页面容器(必须是 horizontalClassName 的一代子元素)
				curClassName:"cur",//当前页面
				horizontalToVertical:true,//横屏滚动后能否垂直滚动
				start:function(){
					//console.log("start");
				},
				moveY:function(d){
					//console.log("moveY"+this.changeY);
				},
				endY:function(){
					const _t=this;
					//_t.gotoPageY(0);
					console.log("endY:"+_t.index)
					t.curPage=_t.index;
				},
				moveX:function(d){
					//console.log("moveX"+this.changeX);
					$(".header").hide();
				},
				endX:function(){
					//console.log("endX");
					const _t=this;
					if(_t.index_x==1){
						$(".header").hide();
					}else{
						$(".header").show();
					}
				},
				moveTopOrBottom:function(changeY){
					const _t=this;
					if(_t.mY>0&&t.isEnd){
						t.$vux.toast.show({
							type:"text",
							text: "没有了",
							position:"bottom",
							width:"2rem",
						});
					}else if(_t.mY<0){
						console.log("第一页")
					}
					if(t.isRead){
						t.$vux.toast.show({
							type:"text",
							text: "努力加载中,请稍后!",
							position:"bottom",
							width:"2rem",
						});
					}
				}
			});
		},
		methods :{
			async getList() {
				const t = this;
				if(t.isRead){
					return false;
				}
				t.isRead=true;
				try{
					let loc = await t.$store.dispatch("getMylocation");
					let result = await t.$server.nearUser({
						latitude:loc.lat||'',
						longitude: loc.lon||'',
						page:t.pageNo,
						rows:t.pageSize
					});
					t.pageNo++
					if(result.data.list){
						t.nearArr.push(...result.data.list);
					}
					if(result.data.count<=t.pageSize*t.pageNo||result.data.list.length<t.pageSize){//判断是否最后一页						
						t.isEnd=true;
					}else{
						t.isEnd=false;
					}
				}catch (e) {
					console.log(e)
				}
				t.isRead=false;
			},
			async getUserInfo(id) {
				const t = this;
				try{
					let result = await t.$server.getUserInfo({userId:id});
					t.curUser = result.data.data;
				}catch(e){
					console.log(JSON.stringify(e));
				}
			},
		}
	}
</script>
