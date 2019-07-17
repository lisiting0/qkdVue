<template>
<div>
	<Loading v-if="isloading"></Loading>
	<div class="top">
		<a class="photo"></a><a class="add"></a>最美娇友
	</div>
	<myScroller styles="padding:2.15rem 0 1.62rem;" :infinite="infinite" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite">
	<dl class="star_list">
		<dt><a class="cur"><i>综合</i></a><a><i>人气</i></a><a><i>票数</i></a><a><i>年龄</i></a><a><i>认证</i></a></dt>
		<dd>
			<ul class="grid">
				<li class="gird_item">
					<a>
						<img :src="imgs.s1" />
						<h3>五一假期，出门去拍一个美照</h3>
						<div class="star_b">
							<i class="icon_zan">57</i>
							<i class="star_img icon_girl" :style="'background-image:url('+imgs.s1+');'"></i>
							<p>背心Queen</p>
							<i class="icon_v icon_p"></i>
						</div>
					</a>
				</li>
				<li class="gird_item">
					<a>
						<img :src="imgs.s2" />
						<h3>五一假期，出门去拍一个美照吧，寄给远方的他</h3>
						<div class="star_b">
							<i class="icon_zan cur">58</i>
							<i class="star_img icon_girl" :style="'background-image:url('+imgs.s2+');'"></i>
							<p>背心Queen</p>
							<i class="icon_v icon_p"></i>
						</div>
					</a>
				</li>
				<li class="gird_item">
					<a>
						<img :src="imgs.s3" />
						<h3>五一假期，出门去拍一个美照</h3>
						<div class="star_b">
							<i class="icon_zan">57</i>
							<i class="star_img icon_girl" :style="'background-image:url('+imgs.s3+');'"></i>
							<p>背心Queen</p>
							<i class="icon_v icon_p"></i>
						</div>
					</a>
				</li>
				<li class="gird_item">
					<a>
						<img :src="imgs.s4" />
						<h3>五一假期，出门去拍一个美照</h3>
						<div class="star_b">
							<i class="icon_zan">57</i>
							<i class="star_img icon_girl" :style="'background-image:url('+imgs.s4+');'"></i>
							<p>背心Queen</p>
							<i class="icon_v icon_p"></i>
						</div>
					</a>
				</li>
			</ul>
			<div class="gird_bottom"></div>
		</dd>
	</dl>
	</myScroller>
</div>
</template>
<script>
import s1 from '../../images/s5.jpg';
import s2 from '../../images/s6.jpg';
import s3 from '../../images/s7.jpg';
import s4 from '../../images/s8.jpg';
import Loading from '@other/loading.vue';
import myScroller from '../scroller/myScroller.vue';

const $ = require('jquery');
const jQueryBridget = require('jquery-bridget');
const Masonry = require('masonry-layout');
jQueryBridget( 'masonry', Masonry, $ );
export default {
	name: 'zmjy',
	data () {
		return {
			imgs:{s1:s1,s2:s2,s3:s3,s4:s4},
			scrollWatch:true,
			isloading:false,
			loadRefresh:true,//下拉刷新
			loadInfinite:true //上拉加载
		}
	},
	components: {
		Loading,
		myScroller
	},
	created (){
	//const _this=this;
		/*let flag=true;
		$(window).scroll(()=>{//滚动加载
			if(this.scrollWatch&&flag){
				const top=$(window).scrollTop();
				const height=$(window).height();
				const bottom=parseInt($(".gird_bottom").offset().top);
				if(top+height>=bottom){
					flag=false;
					this.getSource().then(()=>{
						flag=true
					},(error)=>{
						flag=true;
					});
				}
			}	
		});*/
	},
	destroyed () {
		$("body").removeClass("star");
		//$("body").removeClass("scroll");
		this.scrollWatch = false;
	},
	mounted () {
		$("body").addClass("star");
		this.loadImgs($(".grid img")).then(()=>{
			$(".grid").masonry({//瀑布流
				itemSelector: '.gird_item',
			 // stagger:'0.05s', // 重布局时网格并不是一起变换的，排在后面的网格比前一个延迟开始，该项设置延迟时间
			});
		},()=>{
		
		});
	},
	methods :{
		loadImgs:(imgs)=>{
			const length=imgs.length;
			let i=0;
			return new Promise((resolve, reject)=>{
				if(length>0){
					imgs.each(function(){
						const img =document.createElement("img");
						img.onload=img.onerror=()=>{// 图加载完
							i++;
							if(i==length){
								resolve();
							}
							img.onload=null;
							img.onerror=null;
						};
						img.src=this.getAttribute("src");
					});
				}else{
					reject();
				}
			});
		},
		getSource(){
			var t=this;
			return new Promise((resolve, reject)=>{
				//this.isloading=true;
				$.ajax({
					url:"./static/zmjy.html",
					type:"GET",
					data:{},
					dataType:"html",
					timeout:500,
					success(data){
						var result=$(data).find(".gird_item");
						t.loadImgs(result.find("img")).then(()=>{
							setTimeout(()=>{//模拟延迟加载数据
								//t.isloading=false;
								$(".grid").append(result);
								var $newElems = result.css({ opacity: 0 });
								$('.grid').masonry( 'appended', $newElems, true );
								$newElems.animate({ opacity: 1 });
								resolve();
							},100)
						},()=>{
							resolve();
						});
					},
					error(error){
						reject(new Error(error.statusText));
					}
				});
			});
		},
		infinite(done) {//上拉加载(初始内容不满一屏会无限加载)
			//this.$refs.myscroller.finishInfinite(2);//没有数据时的处理函数
			//this.$refs.myscroller.resize()//重置大小=>myscroller是上面ref定义的dom元素的名字
			
			this.getSource().then(()=>{
				done();
			},(error)=>{
				done(true);
			});
		},
		refresh(done) {//下拉刷新
			console.log("刷新 ");
			setTimeout(()=>{
				console.log("刷新完成");
				done();
			},1000);
		}
	}
}
</script>
