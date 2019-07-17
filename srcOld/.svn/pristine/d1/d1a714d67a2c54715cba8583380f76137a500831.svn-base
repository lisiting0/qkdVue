<template>
  <div class="main jy_state_pop jy_nearby">
    <Loading v-if="isloading"></Loading>
	<template v-if="showTop">
		<div class="header">
		  <div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"></a>{{title}}
		  </div>
		</div>
		<div class="title">
		  <div>{{place}}</div>
		  <div><span @click="showFilter" :class="{active:showPopover}">筛选</span><i class="iconfont" @click="changeLayout">&#xe615;</i></div>
		</div>
	</template>
    <filtercpt :showPopover="showPopover" :location="location"  @changeLocation="changeLocation"  @changePlace="changePlace" @close="showPopover=false" @makesure="makesure"></filtercpt>
	<div class="jy_nearby_scroll" v-if="layoutType==4&&nearArr.length>0">
		<div class="jy_scroll_content">
			<div class="jy_nearPeople_scroll">
				<template v-if="nearArr.length>0">
					<div class="page_1" v-for="item,index in nearArr" :class="{['page'+(index+1)]:true,on:index==curPage-1||index==curPage+1||index==curPage,sAni:aniPage==index,cur:aniPage==index,noTime:firstIn}">
						<div class="horizontalScroll_1" :class="{marT:(index==curPage-1&&showMar)||(index==curPage&&curAni),marTarn:showMarTran&&index==curPage-1,marCurTarn:index==curPage&&curAni}">
							<div class="page_2 s1">
								<template v-if="!showTop&&index==curPage">
									<div class="header">
									  <div class="top">
										<Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"></a>{{title}}
									  </div>
									</div>
									<div class="title">
									  <div>{{place}}</div>
									  <div><span @click="showFilter" :class="{active:showPopover}">筛选</span><i class="iconfont" @click="changeLayout">&#xe615;</i></div>
									</div>
								</template>
								<div class="jy_nearby_img">
									<i :style="{'background-image':'url('+$utils.getFullPath(item.coverimgAttachementId?item.coverimgAttachementId.split(',')[0]:item.headimgAttachmentId,720)+')'}"></i>
								</div>
								<div class="jy_nearby_text">
									<div class="jy_nearby_text_c">
										<h3>{{item.aliasName}}
											<i v-if="item.idStatus==1">&#xe69c;</i>
											<i v-if="item.videoStatus==1">&#xe697;</i>
											<i v-if="item.carStatus==1">&#xe69f;</i>
											<i v-if="item.houseStatus==1">&#xe69e;</i>
										</h3>
										<p class="jy_nearby_tip">{{item.sex==1?'女':'男'}} , {{item.age}}{{item.userExt&&item.userExt.constellation?' , '+item.userExt.constellation:''}}</p>
										<p class="jy_nearby_pos" v-if="item.userExt&&(item.userExt.liveCityName||item.userExt.liveAreaName)">{{item.userExt.liveCityName||''}} {{item.userExt.liveAreaName||''}} <template v-if="item.distance">· {{item.distance<1000?Fn.toFixed(item.distance)+'m':Fn.toFixed(item.distance/1000)+'km'}}</template></p>
										<div class="jy_nearby_btn">
											<i class="jy_nb_fl" :class="{cur:item.isFollow==1}" @click.stop="changeFollow(index)">&#xe612;</i><i class="jy_nb_com" @click.stop="intoChat(item.id,item.aliasName)">&#xe644;</i>
										</div>
									</div>
								</div>
							</div>
							<div class="page_2 s2" v-if="$store.state.isLogin&&$store.state.userInfo.idStatus==1&&$store.state.userInfo.silentState==0&&item.silentState==0&&index==curPage">
								<div class="contentScroll_1">
									<userInfo v-if="index==curPage" :userId="item.id" :from="'nearbyPeople'" @curUserInfo="curUserInfo" @changeFollowStatus="changeFollowStatus" :curIndex="index" ref="userInfo"></userInfo>
								</div>
							</div>
						</div>
					</div>
				</template>
				<div v-else class="page_1 page0 on myscoll">
					<div class="no-data">暂无数据</div>
				</div>
			</div>
		</div>
	</div>
    <div class="myscoll" v-else>
      <scroll ref="scroll" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp" :ifinit="ifinit" :style="{height:myScrollerHeight+'px'}" :click="true" >
        <template v-if="nearArr">
          <template v-if="nearArr.length>0">
            <div v-if="layoutType===1" class="content">
              <div v-for="item in nearArr" :key="item.id" v-if="item.id!=$store.state.userInfo.id">
                <p @click="toUserInfo(item.id)" :style="{'background-image':'url('+getFullPath(item.headimgAttachmentId)+')'}"></p>
                <div><img @touchend.stop="openVideo(getFullPath(item.videoUrl))" v-if="item.videoStatus==1" src="../../../images/video.png"/></div>
                <p><span>{{item.aliasName}}</span><span><i v-if="item.distance">{{item.distance<1000?Fn.toFixed(item.distance)+'m':Fn.toFixed(item.distance/1000)+'km'}}</i></span></p>
              </div>
            </div>
            <div v-if="layoutType===2" class="content1">
              <div>
                <div v-for="item ,index in nearArr" v-if="index%2==0&&item.id!=$store.state.userInfo.id" :key="item.id">
                    <img @click="toUserInfo(item.id)" :src="getFullPath(item.headimgAttachmentId)"/>
                  <div><img @touchend.stop="openVideo(getFullPath(item.videoUrl))" v-if="item.videoStatus==1" src="../../../images/video.png"/></div>
                    <p><span>{{item.aliasName}}</span><span><i v-if="item.distance">{{item.distance<1000?Fn.toFixed(item.distance)+'m':Fn.toFixed(item.distance/1000)+'km'}}</i></span></p>
                </div>
              </div>
              <div>
                <div v-for="item ,index in nearArr" v-if="index%2==1&&item.id!=$store.state.userInfo.id" :key="item.id">
                    <img @click="toUserInfo(item.id)" :src="getFullPath(item.headimgAttachmentId)"/>
                  <div><img @touchend.stop="openVideo(getFullPath(item.videoUrl))" v-if="item.videoStatus==1" src="../../../images/video.png"/></div>
                    <p><span>{{item.aliasName}}</span><span><i v-if="item.distance">{{item.distance<1000?Fn.toFixed(item.distance)+'m':Fn.toFixed(item.distance/1000)+'km'}}</i></span></p>
                </div>
              </div>
            </div>
            <div v-if="layoutType===3" class="content2">
          <div>
            <div v-for="item ,index in nearArr" v-if="index%3==0&&item.id!=$store.state.userInfo.id" :key="item.id" @click="toUserInfo(item.id,item.silentState)">
              <div :style="{'background-image':'url('+getFullPath(item.headimgAttachmentId)+')'}"><img @touchend.stop="openVideo(getFullPath(item.videoUrl))" v-if="item.videoStatus==1" src="../../../images/video.png"/></div>
              <p><span>{{item.aliasName}}</span><span><i v-if="item.distance">{{item.distance<1000?Fn.toFixed(item.distance)+'m':Fn.toFixed(item.distance/1000)+'km'}}</i></span></p>
            </div>
          </div>
          <div>
            <div v-for="item ,index in nearArr" v-if="index%3==1&&item.id!=$store.state.userInfo.id" :key="item.id" @click="toUserInfo(item.id,item.silentState)">
              <div :style="{'background-image':'url('+getFullPath(item.headimgAttachmentId)+')'}"><img @touchend.stop="openVideo(getFullPath(item.videoUrl))" v-if="item.videoStatus==1" src="../../../images/video.png"/></div>
              <p><span>{{item.aliasName}}</span><span><i v-if="item.distance">{{item.distance<1000?Fn.toFixed(item.distance)+'m':Fn.toFixed(item.distance/1000)+'km'}}</i></span></p>
            </div>
          </div>
          <div>
            <div v-for="item ,index in nearArr" v-if="index%3==2&&item.id!=$store.state.userInfo.id" :key="item.id" @click="toUserInfo(item.id,item.silentState)">
              <div :style="{'background-image':'url('+getFullPath(item.headimgAttachmentId)+')'}"><img @touchend.stop="openVideo(getFullPath(item.videoUrl))" v-if="item.videoStatus==1" src="../../../images/video.png"/></div>
              <p><span>{{item.aliasName}}</span><span><i v-if="item.distance">{{item.distance<1000?Fn.toFixed(item.distance)+'m':Fn.toFixed(item.distance/1000)+'km'}}</i></span></p>
            </div>
          </div>
        </div>
          </template>
          <template v-else>
            <div class="no-data">暂无数据</div>
          </template>
        </template>
      </scroll>
    </div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
  import Scroll from '@/components/betterscroll/scroll/scroll.vue'
  import Filtercpt from './filtercpt'
	import myTouch from '@js/scrollpage.2.0.1.js';
	import userInfo from '../../user/userInfo.vue';
  let fontsize = parseInt(document.documentElement.style.fontSize);
  export default {
    name: 'nearbyPeople',
    data () {
      return {
        isloading:false,
        layoutType:1,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 60,
        pullDownRefreshStop: 40,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        ifinit:false,
        myScrollerHeight:0,
        showPopover:false,
        title:'',
        place: '',
        searchData: {},
        nearArr:[],
        //分页参数
        page:1,
        rows:20,
		curPage:-1,
		aniPage:-1,
		curAni:false,
		curUser:null,
		isEnd:false,
		isRead:false,
		showTop:true,
		showMar:false,
		showMarTran:false,
		firstIn:true,
		location:"",
        selectArea:[],
      }
	  
    },
    computed: {
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold)
        } : false
      },
      handleRoute(){
        return this.$store.state.handleRoute;
      },
    },
    watch:{
      handleRoute(newV){
        if(!newV){
          this.showPopover=false;
        }
      },
      showPopover(newV){
        let status = this.showPopover
        this.$store.commit("CHANGEHANDLEROUTE",status)
      },
	  curPage(val){
			const t=this;
			t.curUser=null;
			if(!t.nearArr[val]){
				return;
			}
			let length=t.nearArr.length;
			const id=t.nearArr[val].id;
			if(!t.isEnd&&val>=length-2){
				t.getList(t.layoutType,t.searchData);
			}	
		},
		nearArr(val){
			const t=this;
			if(val.length<=0){
				t.myClickTouch=null;
				t.showTop=true;
			}else{
				if(this.layoutType==4){
					//t.myClickTouch&&t.myClickTouch.gotoPageY(0);
					t.$nextTick(()=>{
						//console.log(t.page);
						//t.page比当前页大1的				
						if(t.page==2&&t.curPage>0){//筛选时跳到第一页
							t.curPage=0;
							t.aniPage=0;
							t.myClickTouch&&t.myClickTouch.gotoPageY(0);
						}
						t.initTouch();
						t.myClickTouch&&t.myClickTouch.refresh();
					})
				}
			}
			
			
		},
		layoutType(val){
			const t=this;
			t.$nextTick(()=>{
				if(val==4){
					//$(document).bind("touchmove.nearbyPeople",{passive: false},t.touchHandlerDummy);
					document.addEventListener("touchmove",t.touchHandlerDummy,{passive: false});
					t.showTop=false;
					if(t.nearArr.length>0&&t.curPage==-1){
						t.curPage=0;//读取第一个个人信息
						t.aniPage=0;
					}
					t.initTouch();
				}else{
					t.myClickTouch=null;
					t.showTop=true;
					//$(document).unbind("touchmove.nearbyPeople");
					document.removeEventListener("touchmove",t.touchHandlerDummy);
					t.$refs.scroll&&t.$refs.scroll.refresh();
				}
			  
			  t.isloading=false;
			})
		}
    },
    components: {
		Loading,
		Scroll,
		Filtercpt,
	    Back,
		userInfo,
    },
    created (){

    },
    destroyed () {
    },
	beforeRouteLeave (to, from, next) {
		//$(document).unbind("touchmove.nearbyPeople");
		const t=this;
		document.removeEventListener("touchmove",t.touchHandlerDummy);
		next();
	},
    mounted () {
		const t=this;
      this.title=this.$route.query.title;
      this.getList(4);
      this.myScrollerHeight = document.body.clientHeight-$(".header").height()-$(".title").height()-(0.75)*parseInt(document.documentElement.style.fontSize)-3;
      this.$nextTick(function () {
          this.ifinit = true;
      })
    },
    methods :{
		initTouch(){
			const t=this;
			if(t.myClickTouch)return;
			console.log("初始化滚动");
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
					t.firstIn=false;
				},
				moveY:function(d){
					//console.log("moveY"+this.changeY);
					const _t=this;
					t.showTop=true;
				},
				endY:function(){
					const _t=this;
					//_t.gotoPageY(0);
					//console.log("endY:"+_t.index)
					t.curPage=_t.index;
					if(_t.index_x==0){
						t.showTop=true;
					}else{
						t.showTop=false;
					}
					
					t.showMar=true;
					t.showMarTran=false;
					t.curAni=false;
				},
				moveX:function(d){
					//console.log("moveX"+this.changeX);
					t.showTop=false;
					t.showMar=false;
					t.showMarTran=false;
				},
				endX:function(){
					//console.log("endX");
					const _t=this;
					if(_t.index_x==0){
						t.showTop=true;
						t.showMar=true;
						t.showMarTran=false;
						//$(document).bind("touchmove.nearbyPeople",{passive: false},t.touchHandlerDummy);
						document.addEventListener("touchmove",t.touchHandlerDummy,{passive: false});
					}else{
						t.showTop=false;
					//$(document).unbind("touchmove.nearbyPeople");
						document.removeEventListener("touchmove",t.touchHandlerDummy);
					}
				},
				beforeEndY:function(){
					const _t=this;
					if(t.aniPage!=_t.index){
						t.aniPage=_t.index;
						if(_t.mY<0){
							t.showMarTran=true;
							t.showMar=false;	
						}else{
							t.curAni=true;
						}		
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
			if(t.curPage>0){
				t.myClickTouch.gotoPageY(t.curPage);
				t.showTop=true;
			}
		},
		changeLocation(val){
			this.location=val;
		},
		changePlace(val){
			//if(val){
			this.place=val;
			//}
		},
		touchHandlerDummy(e){
			const t=this;
			if(!e.cancelable){
				return;
			}
			if ( e && e.preventDefault ){
			   e.preventDefault();
			}else{
			   e.returnValue = false;
			}
			return false;
		},
		changeFollowStatus(val){
			const t=this;
			if(t.nearArr[t.curPage]){
				t.nearArr[t.curPage].isFollow=val;
			}
		},
		async changeFollow(index){
			const t=this;
			let item=t.nearArr[index];
			if(t.$store.state.isLogin&&t.$store.state.userInfo.idStatus==1&&t.$store.state.userInfo.silentState==0&&item.silentState==0){
				if(!t.$refs.userInfo){
					return false;
				}
				if(!item.isFollow){
					try{
						await t.$refs.userInfo[0].followFriend(item.id);
					}catch(e){
						console.log(JSON.stringify(e))
					}
				}else{
					try{
						await t.$refs.userInfo[0].unfollowFriend(item.id);
					}catch(e){
						console.log(JSON.stringify(e))
					}	
				}
			}else{
				if(!item.isFollow){
					t.followFriend(index);
				}else{
					t.unfollowFriend(index);
				}
			}
		},
		async followFriend(index) { //关注好友接口
			const t=this;
			let item=t.nearArr[index];
			try{
				await t.$server.followFriend(item.id);			
				t.$vux.toast.show({
				  type: 'text',
				  text: '关注成功',
				  position: 'middle',
				  width: 'auto',
				})
				item.isFollow = 1;
			}catch(e){
				console.log(JSON.stringify(e));
			}
		  },
		async unfollowFriend(index) { //取消关注好友接口
			const t=this;
			let item=t.nearArr[index];
			try{
				await t.$server.unfollowFriend(item.id);
				t.$vux.toast.show({
					type: 'text',
					text: '取消关注成功',
					position: 'middle',
					width: 'auto',
				})
				item.isFollow = 0;
			}catch(e){
				
			}
		},
		intoChat(id, name) {
			if(window.api){
			  this.$router.push({
				path: "/chatWindow",
				query:{
				  id:id,
				  name:name,
				}
			  })
			}else{
			  this.$router.push({
				path: "/chatWindowWeb",
				query:{
				  id:id,
				  name:name,
				}
			  })
			}
		  },
		curUserInfo(info){
			const t=this;
			t.curUser=info;
		},
      openVideo(path){
        if(path){
          this.$utils.moviePlay(path)
        }
      },
      getFullPath (path) {
        return this.$utils.getFullPath(path)
      },
      toUserInfo(id, silentState){
        this.$router.push({
          path: "userInfo",
          query: {
            id: id,
            silentState: silentState
          }
        })
      },
      changeLayout(){
		const t=this;
        t.isloading=true;
        t.layoutType++;
        if(t.layoutType>4){
          t.layoutType=1;
        }
      },
      routerTo(link){
        console.log(link)
      },
      showFilter(){
        this.showPopover = !this.showPopover;
      },
      makesure(data){
        //console.log(JSON.stringify(sex))
        //console.log(JSON.stringify(authentication))
        this.searchData = {
          sex:data.sex,
          idStatus:data.idcard,
          houseStatus:data.house,
          carStatus:data.car,
          healthyStatus:data.health,
          videoStatus:data.video,
		  minAge:data.minAge,
		  maxAge:data.maxAge,
		 'userExt.liveAreaId':data.liveAreaId,
        }
		this.location = data.location;
		/*if(this.layoutType==4){
			this.myClickTouch&&this.myClickTouch.gotoPageY(0);
		}*/
        this.getList(this.layoutType,this.searchData,true);
        this.showPopover = false;
      },
      async onPullingDown() {
        // 模拟更新数据
		const t=this;
        console.log('下拉刷新')
        this.$refs.scroll&&this.$refs.scroll.openPullUp();
		t.curPage=0;
		t.aniPage=0;
        let totalPage = await this.getList(this.layoutType,this.searchData,true)
      },
      async onPullingUp() {
        // 更新数据
        console.log('上拉加载')
        let totalPage = await this.getList(this.layoutType,this.searchData)
      },
      refresh(done) {//下拉刷新
        console.log("刷新 ");
        setTimeout(()=>{
          console.log("刷新完成");
          done();
        },1000);
      },
      infinite(done){
        console.log("加载 ");
        setTimeout(()=>{
          console.log("加载完成");
          done(true);
        },1000);
      },
      clickShare() {
        this.showShare = !this.showShare;
      },
      async getList(layoutType,search,PullingDown) {
		const t=this;
		if(t.isRead){
			return false;
		}
		t.isRead=true;
        try{
          if(t.layoutType!=layoutType){
            t.page = 1;
            t.nearArr=[];
			if(layoutType!=4){
				t.$refs.scroll&&t.$refs.scroll.openPullUp()
			}
            console.log("打开上拉加载")
          }
          if(PullingDown){
            t.page = 1;
          }
          
          t.$vux.loading.show();
          let loc = await t.$store.dispatch("getMylocation");
          if(this.location!=1){
            if(loc.province&&loc.city){
              t.place= loc.province.substring(0,2) + ' ' + loc.city.substring(0,2)
            }
          }
          let data = Object.assign({
            latitude:loc.lat||'',
            longitude: loc.lon||'',
            page:t.page,
            rows:t.rows
          },search)
          let result = await t.$server.nearUser(data);
          t.page++
          if(PullingDown){
            t.nearArr=[];
          }
          if(result.data.list){
            t.nearArr.push(...result.data.list);
          }
		  t.layoutType = layoutType;
          t.$vux.loading.hide()
          t.$refs.scroll&&t.$refs.scroll.forceUpdate()
		  if(result.data.count<=t.rows*t.page||result.data.list.length<t.rows){//判断是否最后一页						
				t.isEnd=true;
			}else{
				t.isEnd=false;
			}
          if(t.page>result.data.totalPage){
         //   console.log("关闭上拉加载")
            t.$refs.scroll&&t.$refs.scroll.closePullUp()
          }
         // return Promise.resolve(result.data.totalPage)
        }catch (e) {
          console.log(e)
         // return Promise.reject("error")
        }
		t.isRead=false;
      },
    }
  }
</script>
<style scoped lang="scss">
  .main{
    padding-bottom:0;
    &:before{
      background-color:#3a3845 ;
    }
    .header{
      position: fixed;
      width: 100%;
      z-index: 10;
      .top{
        background-color:#3a3845 ;
        color:#FFF;
        font-size: 0.52rem;
        position: relative;
        i{
          font-size: 0.52rem;
        }
        a{
          position:absolute;
          padding:3px;
        }
        .left{
          left:0.325rem;
        }
        .right{
          right:0.325rem;
        }
      }
    }
    .title{
      font-size: 0.4rem;
      margin-top: 1.39rem;
      padding:0 0.4rem;
      height: 1rem;
      line-height: 1rem;
      background-color: #fff;
      position: relative;
      border-bottom: 1px solid #f2f2f2;
      div{
        display: inline-block;
        color:#4c7ffe;
        i{
          position: relative;
          font-size: 0.35rem;
          padding:0 0.4rem;
          margin-left: 0.3rem;
          display: inline-block;
          height: 100%;
          &::before{
            position: absolute;
            content:"";
            display:inline-block;
            z-index:99;
            left:0;
            top:0.2rem;
            width:1px;
            height:0.6rem;
            background-color:#eaeaea;
          }
        }
      }
      div:last-child{
        position: absolute;
        right: 0;
        span{
          display: inline-block;
          height: 100%;
          padding:0 0.2rem;
        }
        span.active{
          color:#4c7ffe;
        }
      }
    }
    .myscoll{
      background-color: #f8f8fc;
      .content{
        display: flex;
        flex-wrap:wrap;
        &>div{
          width: 20%;
          margin:0.2rem 2.45% 0;
          position:relative;
          p:first-child{
            border-radius: 4px;
            width: 100%;
            padding-bottom: 100%;
            background-size: cover;
            background-position:center;
            background-repeat:no-repeat;
          }
          img{
            position: absolute;
            width: 0.75rem;
            height: 0.75rem;
            right:0rem;
            bottom: 0.7rem;
          }
          p:last-child{
            position: relative;
            height: 0.7rem;
            line-height: 0.7rem;
            span:first-child{
              display: inline-block;
              width: 50%;
              font-size: 0.28rem;
              overflow: hidden;
              white-space: nowrap;/*不换行*/
              text-overflow:ellipsis;/*超出部分文字以...显示*/
            }
            span:last-child{
              position: absolute;
              right: 0;
              font-size: 0.24rem;
              color:#FFF;
              i{
                width: auto;
                height: 0.3rem;
                line-height: 0.3rem;
                background-color: #ff84ac;
                border-radius: 3px;
                vertical-align: middle;
                padding: 0.05rem;
              }
            }
          }
        }
      }
      .content1{
        padding:0.3rem 0.175rem 0;
        display: flex;
        justify-content: space-between;
        &>div{
          width: 5.1rem;
          &>div{
            background-color: #f2f2f2;
            border-radius: 5px;
            margin-bottom: 0.2rem;
            overflow: hidden;
            position: relative;
            &>img:first-child{
              width: 100%;
            }
            div{
              img{
                position: absolute;
                width: 0.75rem;
                height: 0.75rem;
                right:0rem;
                bottom: 1.6rem;
              }
            }
            p{
              padding:0 0.15rem;
              height: 1.4rem;
              line-height: 1.4rem;
              display: flex;
              justify-content: space-between;
              span{
                overflow: hidden;
                white-space: nowrap;/*不换行*/
                text-overflow:ellipsis;/*超出部分文字以...显示*/
                font-size: 0.36rem;
              }
              span:first-child{
                width: 50%;
              }
              i{
                color:#ff03a9;
              }
            }
          }
        }
      }
      .content2{
        padding:0.32rem 0.33rem 0;
        display: flex;
        justify-content: space-between;
        &>div{
          width: 2.92rem;
          &:first-child,&:last-child{
            margin-top: 1.62rem;
          }
          &>div{
            margin-bottom: 0.2rem;
            overflow: hidden;
            div{
              position: relative;
              width: 2.92rem;
              height: 2.92rem;
              border-radius: 50%;
              background-size: cover;
              background-position: center;
              img{
                width: 0.75rem;
                position:absolute;
                bottom:0;
                right: 0;
              }
            }
            p{
              padding:0 0.15rem;
              height: 1.4rem;
              line-height: 1.4rem;
              display: flex;
              justify-content: space-between;
              span{
                overflow: hidden;
                white-space: nowrap;/*不换行*/
                text-overflow:ellipsis;/*超出部分文字以...显示*/
                font-size: 0.36rem;
              }
              span:first-child{
                width: 50%;
              }
              i{
                color:#ff03a9;
              }
            }
          }
        }
      }
    }
  }
</style>

