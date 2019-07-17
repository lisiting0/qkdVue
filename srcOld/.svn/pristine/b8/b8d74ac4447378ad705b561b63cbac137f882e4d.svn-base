<template>
    <div class="main jy_all_top">
      <Loading v-if="isloading"></Loading>
      <div class="header">
        <div class="top">
          <Back class="left"><i class="iconfont">&#xe613;</i></Back>
          <router-link v-if="$route.query.userId==$store.state.userInfo.id||!$route.query.userId" :to="{name:'addMoment'}" class="right"><i class="iconfont">&#xe61f;</i></router-link>{{($route.query.userId==$store.state.userInfo.id||!$route.query.userId)?"我的动态":"她的动态"}}
        </div>
      </div>
      <myNewScroll :style="$store.state.isBrowser?'padding:1.39rem 0 0;':'padding:2.14rem 0 0;'">
		<dl class="dy_mydt_list" v-if="artObj">
			<template v-for="yearObj,year in artObj">
			<dt class="dy_mydt_year">{{year}}</dt>
			<dd v-for="dayObj,day in yearObj">
				<i class="dy_mydt_day">{{day}}</i>
				<ul class="dy_mydt_ul">
					<router-link tag="li" :to="{name:'commentDetail',query:{id:item.id,isMy:1}}" :class="{dy_mydt_simg:item.feedAttachment&&item.feedAttachment.split(',').length==1}" v-for="item,index in dayObj.list" :key="item.id">
						<div class="dy_mydt_img" v-if="item.feedAttachment&&item.feedAttachment.split(',').length==1">
							<i class="dy_dt_img" :bgImg="$utils.getFullPath(item.feedAttachment.split(',')[0])"></i>
						</div>
						<p class="dy_mydt_con">{{item.feedContent}}</p>
						<p class="dy_mydt_tip"><em>{{item.commentLegth}}</em>{{Fn.timeFormat(item.createDate,'hh:mm')}}</p>
						<div class="dy_mydt_img" v-if="item.feedAttachment&&item.feedAttachment.split(',').length>1">	
							<i class="dy_dt_img" v-for="imgItem ,imgIndex in item.feedAttachment.split(',')" :bgImg="$utils.getFullPath(imgItem)"></i>
						</div>
					</router-link>
				</ul>
			</dd>
			</template>
		</dl>
      </myNewScroll>
    </div>
</template>

<script>
  import payfor from '../../images/payfor.png'
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import myNewScroll from '@other/myNewScroll.vue';
  import {Previewer, Popup, TransferDom} from 'vux'
  import replayComment from './replayComment';
  import selectPhoto from '../plugs/selectPhoto'
	let fontsize = parseInt(document.documentElement.style.fontSize)
  export default {
    name: 'myComments',
    directives: {
      TransferDom
    },
    components: {
      Loading,
      myNewScroll,
      Previewer,
      Back,
      selectPhoto,
      Popup,
      replayComment,
    },
    data() {
		return {
			isloading: false,
			showSel: false,
			artList: null,
			artObj: null,
			//分页参数
			pageNo: 1,
			isRead: false,
			isEnd: false,
			loadRefresh:true,//下拉刷新
			loadInfinite:true, //上拉加载
			noDataText:'',
			jqList:[],
		}
	},
	async mounted() {
		const t=this;
		this.getData();
		if(this.$route.query.to=="photo"){
			for (let i = t.$store.state.fileImg.length; i--;) {
				let param = new FormData() //创建form对象
				param.append('file', t.$store.state.fileImg[i], t.$store.state.fileImg[i].name) //单个图片 ，多个用循环 append 添加
				try {
					const result = await t.$server.uploadPic(param);
					console.log(JSON.stringify(result.data));
					t.feedImg.push(result.data.data.path);
				} catch (e) {
					console.log(e);
				}
			}
		}
		//t.offsetTop=$(".myscroller ._v-container").offset().top;
	},
    watch: {
      isEnd(val) {
        const t=this;
        if(val){
         // t.$refs.myScroller.finishInfinite(true);
        }else{
         // t.$refs.myScroller.finishInfinite(false);
        }
      },
	  artList(val){
		const t=this;
		let artObj={};
		if(!val){
			return false;
		}
		let nowYear=t.Fn.timeFormat(new Date(),"yyyy")+"年";
		let nowDay=t.Fn.timeFormat(new Date(),"MM-dd");
		for(let i=0;i<val.length;i++){
			let year=t.Fn.timeFormat(val[i].createDate,"yyyy")+"年";
			let day=t.Fn.timeFormat(val[i].createDate,"MM-dd");
			if(year==nowYear){
				year="今年"
			}
			if(day==nowDay){
				day="今天"
			}
			if(!artObj[year]){
				artObj[year]={}
			}
			if(!artObj[year][day]){
				artObj[year][day]={list:val};
			}
		}
		t.artObj=artObj;
		t.$nextTick(()=>{
			let top=$(".dy_mydt_list").offset().top;
			t.jqList=[];
			$(".dy_dt_img:not(.cur)").each(function(index,item){
				const _t=$(this);
				let _top=_t.parent().offset().top;
				t.jqList.push({top:_top-top,obj:_t,src:_t.attr("bgImg")});
			})
		})
	  }
    },
    methods: {
		touchmove(left,top,zoom,height){
			const t=this;
			//console.log(top,height);
			const length=t.jqList.length;
		//	console.log(length)
			
			for(let i=0;i<length;i++){
				if(!t.jqList[i]){
					break;
				}
				if(t.jqList[i].top>top){
					//let img=new Image();
						//img.setAttribute('crossOrigin','anonymous');
					//img.onload=function(){//图片先加载,再显示
					//console.log(i)
						t.jqList[i].obj.css({backgroundImage:"url("+t.jqList[i].src+")"});
					//	img.onload=null;
					//}
					//img.src=t.jqList[i].src;
					t.jqList[i].obj.addClass("cur");
					//t.jqList.splice(i,1);
				}
				if(t.jqList[i].top>top+height){
					console.log(i)
					break;
				}
				
			}
			return false;
			clearTimeout(t.imgTimeout);
			t.imgTimeout=setTimeout(()=>{
				$(".dy_dt_img:not(.cur)").each(function(index,item){
					const _t=$(this);
					let top=_t.parent().offset().top;
					if(top>0&&top<=height+t.offsetTop){
						let img=new Image(),
							maxWidth=640;
						//img.setAttribute('crossOrigin','anonymous');
						img.onload=function(){//图片先加载,再显示
							/*let canvasId = 'canvasBase64Imgid',  //图片远程不能使用画布
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
							console.log(this)							
							let base64 = canvas.toDataURL('image/jpeg',0.7);*/
							
							_t.css({backgroundImage:"url("+this.src+")"});
							img.onload=null;
						}
						img.src=_t.attr("bgImg");
						_t.addClass("cur");
					}
				})
			},300);
		},
		async getData() {
			const t = this
			if (t.isRead) {
				return false;
			}
			t.isRead = true;
			t.noDataText='正在加载...';
			if (t.isRefresh) {
				t.pageNo = 1;
			}
			try {
				let result;
				let isRefresh={};
				if(t.isRefresh){
					isRefresh={isRefresh:true};
				}
				if (t.$route.query.userId == t.$store.state.userInfo.id || !t.$route.query.userId) {
					result = await t.$server.getMyList({
						...isRefresh,
						page: t.pageNo,
						rows: t.$store.state.pageSize
					})
				} else {
					result = await t.$server.getList({
						...isRefresh,
						page: t.pageNo,
						rows: t.$store.state.pageSize,
						userId: t.$route.query.userId
					})
				}
				if (!t.artList || t.pageNo==1) {
					//t.$refs.myScroller.scrollTo(1);
					t.artList = [];
				}
				if (result.data.list) {
					let artList=result.data.list;
					for(let i=artList.length;i--;){//递归统计评论数量
						artList[i].commentLegth=0;
						if(artList[i].comments){
							(function getCount(comments,index){
								for(let i=comments.length;i--;){
									if(comments[i].comments){
										getCount(comments[i].comments,index);
									}
								}
								artList[index].commentLegth+=comments.length;
							}(artList[i].comments,i));
						}
					}
					t.artList.push(...result.data.list);
				}
				if (result.data.count <= t.$store.state.pageSize * t.pageNo || result.data.list.length < t.$store.state.pageSize) {//判断是否最后一页
					t.noDataText='已加载全部数据';
					t.isEnd = true;
				} else {
					t.isEnd = false;
					//t.$refs.myScroller.finishInfinite(false);
				}
				t.pageNo++;
			} catch (e) {
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
			console.log("加载");
			t.getData().then(()=>{
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
			t.getData().then((res)=>{
				done();
			});
		},
	}
}
</script>