<template>
	<div class="main jy_all_top jy_headline">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right" @click="showPopover=!showPopover"><i class="iconfont">&#xe679;</i></a><p>娇友头条</p>
			</div>
		</div>
		<Popover :showPopover="showPopover" @close="closePopover">
		  <router-link :to="{name:'articlePost'}" tag="li" ><i class="iconfont">&#xe64d;</i><i>发布</i></router-link>
		  <li v-if="type!='my'" @click.stop="type='my'"><i class="iconfont">&#xe618;</i><i>我的文章</i></li>
		</Popover>
		<!--<myScroller style="padding:2.14rem 0 0;" :infinite="infinite" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller">-->
		<scroll ref="scroll" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp" :ifinit="ifinit" :style="{height:myScrollerHeight+'px'}" :click="true" >
		<template v-if="artList">
			<ul class="jy_headline_top" v-if="type!='my'">
				<template v-for="item,index in artList" v-if="index===0">
				<li>
					<h4>{{item.title}}</h4>
					<i class="jy_hl_t_img" v-if="item.cover" :style="{'background-image':'url('+$store.state.imageUrl+item.cover+')'}"></i>
					<p class="jy_hl_t_p"><em class="jy_hl_t_ico jy_hl_ico_comment">{{item.commentCount}}</em><em class="jy_hl_t_ico jy_hl_ico_view">{{item.visit}}</em>优质<em>娇友头条</em></p>
				</li>
				</template>	
			</ul>
			<ul class="jy_headline_list">
				<template v-for="item,index in artList" v-if="(type=='my')||index>0&&type!='my'">
				<li>
					<i class="jy_hl_l_img" v-if="item.cover" :style="{'background-image':'url('+$store.state.imageUrl+item.cover+')'}"></i>
					<h4>{{item.title}} </h4>
					<p class="jy_hl_t_p"><em class="jy_hl_t_ico jy_hl_ico_view">{{item.visit}}</em><em class="jy_hl_t_ico jy_hl_ico_comment">{{item.commentCount}}</em></p>
				</li>
				</template>	
			</ul>
			
		</template>
		 <!--</myScroller>-->
		 </scroll>
	</div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	import myScroller from '@other/myScroller.vue';
	import Popover from '@/components/plugs/popover.vue'
	 import Scroll from '@/components/betterscroll/scroll/scroll.vue'
	export default {
	name: 'headline',
	data () {
		return {
			isloading:false,
			pageNo:1,
			isRead:false,
			isEnd:false,
			loadRefresh:true,//下拉刷新
			loadInfinite:true, //上拉加载
			isRefresh:false,
			noDataText:"",
			showPopover: false,
			type:this.$route.query.type,
			artList:null,
			
			pullDownRefresh: true,
        pullDownRefreshThreshold: 60,
        pullDownRefreshStop: 40,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
			ifinit:false,
        myScrollerHeight:0,
		}
	},
    components: {
      Loading,
	  Back,
	  myScroller,
	  Popover,
	  Scroll,
    },
	destroyed () {
		$("body").removeClass(" gray");
	},
    watch:{
		isEnd(val){
			const t=this;
			if(val){
				//t.$refs.myScroller.finishInfinite(true);
			}else{
				//t.$refs.myScroller.scrollTo(1);
				//t.$refs.myScroller.finishInfinite(false);
			}
		},
		type(){
			this.showPopover=false;
			this.getArt(true);
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
      }
    },
    mounted () {
		const t=this;
		$("body").addClass(" gray");
		 this.myScrollerHeight = document.body.clientHeight-$(".header").height()-$(".title").height()-(0.75)*parseInt(document.documentElement.style.fontSize)-3;
      this.$nextTick(function () {
          this.ifinit = true;
      })
	  this.getArt();
    },
    methods:{
		closePopover(val) {
			this.showPopover = val;
		},
		async getArt(flag){
			const t=this;
			if(t.isRead){
				return false;
			}
			t.isRead=true;
			if(t.isRefresh||flag){
				t.pageNo=1;
				this.$refs.scroll.openPullUp()
				if(flag){
					t.isloading=true;
				}
			}
			try{
				let result;
				if(t.type=="my"){//我的文章
					result=await t.$server.getMyArtList({
						page:t.pageNo,
						rows:t.$store.state.pageSize
					});
				}else{//推荐头条
					result=await t.$server.getArt({
						page:t.pageNo,
						rows:t.$store.state.pageSize
					});
				}
				if(!t.artList||t.isRefresh||flag){
					//t.$refs.myScroller.scrollTo(1);
					t.artList=[];
				}
				if(result.data.list){
					t.artList.push(...result.data.list);
				}
				this.$refs.scroll.forceUpdate()
				if(result.data.count<=t.$store.state.pageSize*t.pageNo||result.data.list.length<t.$store.state.pageSize){//判断是否最后一页
					t.isEnd=true;
					this.$refs.scroll.closePullUp()
				}else{
					t.isEnd=false;
					//t.$refs.myScroller.finishInfinite(false);
				}
				t.pageNo++;
			}catch(e){
				t.noDataText='加载异常,请重试';
				t.isEnd=true;
				console.log(e)
			}
			t.isRead=false;
			t.isloading=false;
			t.isRefresh=false;
			
		},
		infinite(done) {//上拉加载(防止初始内容不满一屏会无限加载)
			const t=this;
			if(t.isEnd){
				done(true);
				return false;
			}
			//if(t.isRead){
			//	return false;
			//}
			console.log("加载");
			t.getArt().then(()=>{
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
			t.getArt().then((res)=>{
				done();
			});
		},
		 async onPullingDown() {
			// 模拟更新数据
			console.log('下拉刷新')
			this.$refs.scroll.openPullUp()
			this.isRefresh=true;
			let totalPage = await this.getArt()
		  },
		  async onPullingUp() {
			// 更新数据
			console.log('上拉加载')
			let totalPage = await this.getArt()
		  },
    }
  }
</script>
<style scoped lang="scss">
  .main{
	.popover {
      li {
        height: 1.52rem;
        line-height: 1.52rem;
        width: 4.3rem;
        border-bottom: 1px solid #f9f9f9;
        & > i {
          margin-left: 0.46rem;
          font-size: 0.44rem;
        }
        span {
          margin-left: 0.46rem;
          display: inline-block;
          height: 1.52rem;
          line-height: 1.52rem;
          vertical-align: top;
          i {
            display: block;
            font-size: 0.44rem;
            height: 0.76rem;
            line-height: 1.08rem;
          }
          i:last-child {
            font-size: 0.3rem;
            line-height: 0.44rem;
            color: #b0b0b0;
          }
        }
        &:nth-of-type(1) .iconfont, &:nth-of-type(4) .iconfont {
          color: #f6840f;
        }
        &:nth-of-type(2) .iconfont, &:nth-of-type(3) .iconfont {
          color: #1296db;
        }
      }
    }
  }
</style>


