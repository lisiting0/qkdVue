<template>
	<div class="main jy_all_top jy_headline">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right" @click="showPopover=!showPopover"><i class="iconfont">&#xe679;</i></a><p>{{type=='my'?'我的文章':'娇友头条'}}</p>
			</div>
		</div>
		<Popover :showPopover="showPopover" @close="closePopover">
		  <router-link :to="{name:'articlePost'}" tag="li" ><i class="iconfont">&#xe64d;</i><i>发布</i></router-link>
		  <li v-if="type!='my'" @click.stop="type='my'"><i class="iconfont">&#xe618;</i><i>我的文章</i></li>
		</Popover>
		<myScroller :style="$store.state.isBrowser?'padding:1.39rem 0 0;':'padding:2.29rem 0 0;'" :touchmove="touchmove" :infinite="infinite" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller" :showbg="showbg">
		<template v-if="artList">
			<ul class="jy_headline_top" v-if="type!='my'">
				<template v-for="item,index in artList" v-if="index===0">
				<router-link :to="{path:'/toplineDetail/detail',query:{id:item.id}}" tag="li">
					<h4>{{item.title}}</h4>
					<i class="jy_hl_img" v-if="item.cover" :bgImg="$utils.getFullPath(item.cover)"></i>
					<p class="jy_hl_t_p"><em class="jy_hl_t_ico jy_hl_ico_comment">{{item.commentCount}}</em><em class="jy_hl_t_ico jy_hl_ico_view">{{item.visit}}</em>优质<em>娇友头条</em></p>
				</router-link>
				</template>
			</ul>
			<ul class="jy_headline_list">
				<template v-for="item,index in artList" v-if="(type=='my')||index>0&&type!='my'">
				<router-link :to="{path:'/toplineDetail/detail',query:{id:item.id}}" tag="li">
					<i class="jy_hl_img" v-if="item.cover" :bgImg="$utils.getFullPath(item.cover)"></i>
					<h4>{{item.title}} </h4>
					<p class="jy_hl_t_p"><em class="jy_hl_t_ico jy_hl_ico_view">{{item.visit}}</em><em class="jy_hl_t_ico jy_hl_ico_comment">{{item.commentCount}}</em></p>
				</router-link>
				</template>
			</ul>

		</template>
		 </myScroller>
	</div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	import myScroller from '@other/myScroller.vue';
	import Popover from '@/components/plugs/popover.vue'
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
			offsetTop:0,
			imgTimeout:null,
			showbg:true,
		}
	},
    components: {
    Loading,
    Back,
    myScroller,
    Popover,
  },
	destroyed () {
		$("body").removeClass(" gray");
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
		type(){
			this.showPopover=false;
			this.getArt(true);
		}
    },
    mounted () {
		const t=this;
		$("body").addClass(" gray");
		t.offsetTop=$(".myscroller ._v-container").offset().top;
    },
    methods:{
		touchmove(left,mtop,zoom,height){
			const t=this;
			clearTimeout(t.imgTimeout);
			t.isMove=true;
			t.imgTimeout=setTimeout(()=>{
			//	for(let i=0;i<length;i++){
					if($(".jy_hl_img").length==0){
						return false;
					}
					let top=$(".jy_hl_img").parent().offset().top;
					t.jqList=[];
					$(".jy_hl_img:not(.imgloading)").each(function(index,item){
						const _t=$(this);
						let _top=_t.parent().offset().top;
						t.jqList.push({top:_top-top,obj:_t,src:_t.attr("bgImg")});
					});
					//console.log("长度:"+t.jqList.length);
					t.isMove=false;
					;(function loadImg(list,i){
						//console.log(list,t.isMove,i,t.jqList[i])
						if(!list||t.isMove){
							return false;
						}

						if(list.top>=mtop){
							list.obj.addClass("imgloading");
							let img=new Image(),
								maxWidth=1080*window.FS/100;
							img.setAttribute('crossOrigin','anonymous');
							img.onload=function(){//图片先加载,再显示
								let canvasId = 'canvasBase64Imgid',  //图片远程不能使用画布
									canvas = document.getElementById(canvasId);
								if(canvas!=null){document.body.removeChild(canvas);}
								canvas = document.createElement("canvas");
								canvas.innerHTML = 'New Canvas';
								canvas.setAttribute("id", canvasId);
								canvas.style.display='none';
								document.body.appendChild(canvas);
								canvas.width = this.width;
								canvas.height = this.height;
								let imageWidth = this.width,
									imageHeight = this.height;
								if (this.width > maxWidth){
									imageWidth = maxWidth;
									imageHeight = this.height * maxWidth/this.width;
									canvas.width = imageWidth;
									canvas.height = imageHeight;
								}
								let context = canvas.getContext('2d');
								context.clearRect(0, 0, imageWidth, imageHeight);
								context.drawImage(this, 0, 0, imageWidth, imageHeight);
								//console.log(this)
								let base64 = canvas.toDataURL('image/jpeg',0.7);

								list.obj.css({backgroundImage:"url("+base64+")"});
								list.obj.addClass("cur");
								//t.jqList.shift();//删除第一个
								img.onload=null;
								if(list.top<=mtop+height){
									i++;
									loadImg(t.jqList[i],i);
								}
							}
							img.onerror=function(){
								//t.jqList.shift();//删除第一个
								img.onerror=null;

								list.obj.removeClass("imgloading");
								if(list.top<=mtop+height){
									i++;
									loadImg(t.jqList[i],i);
								}

							}
							//console.log(list.src)
							img.src=list.src+"?t="+t.Fn.timeFormat(new Date(),'yyyyMMddhh');
							//t.jqList.splice(i,1);
						}else{
							i++;
							loadImg(t.jqList[i],i);
						}

					}(t.jqList[0],0));
				//}
			},150);
		},
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
					t.$refs.myScroller.scrollTo(1);
					t.artList=[];
				}
				if(result.data.list){
					t.showbg=false;
					t.artList.push(...result.data.list);
				}
				if(result.data.count<=t.$store.state.pageSize*t.pageNo||result.data.list.length<t.$store.state.pageSize){//判断是否最后一页
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


