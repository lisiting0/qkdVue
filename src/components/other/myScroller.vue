<template>
<div class="myscroller">
<div :style="styles" :class="{showbg:showbg}">
	<scroller v-if="loadInfinite&&loadRefresh" 
		ref="myscroller" 	
		:on-refresh="refresh" 
		:on-infinite="infinite" 
		:onTouchMove="touchmove" 
		:refreshText="refreshText||scroller.refreshText" 
		:noDataText="noDataText||scroller.noDataText" 
		:width="scroller.width" 
		:keepText="keepText"
		:height="scroller.height" 
		:napping="scroller.napping" 
		:snapWidth="scroller.snapWidth" 
		:snapHeight="scroller.snapHeight" 
		:animating="scroller.animating" 
		:animationDuration="scroller.animationDuration" 
		:bouncing="bouncing" 
		:refreshLayerColor="scroller.refreshLayerColor" 
		:loadingLayerColor="scroller.loadingLayerColor" 
		:cssClass="scroller.cssClass" 
		:minContentHeight="scroller.minContentHeight">
		<i class="spinner myScroller_loading" slot="refresh-spinner"></i>
		<!--<svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
			<g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>-->
		<slot></slot>
		<!--<svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
			<g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>-->
			<i class="spinner myScroller_loading" slot="infinite-spinner"></i>
	</scroller>
	<scroller v-else-if="loadRefresh" 
		ref="myscroller" 
		:on-refresh="refresh" 
		:onTouchMove="touchmove" 
		:refreshText="refreshText||scroller.refreshText"
		:noDataText="noDataText||scroller.noDataText" 
		:width="scroller.width" 
		:keepText="keepText"
		:height="scroller.height" 
		:napping="scroller.napping" 
		:snapWidth="scroller.snapWidth" 
		:snapHeight="scroller.snapHeight" 
		:animating="scroller.animating" 
		:animationDuration="scroller.animationDuration" 
		:bouncing="bouncing" 
		:refreshLayerColor="scroller.refreshLayerColor" 
		:loadingLayerColor="scroller.loadingLayerColor" 
		:cssClass="scroller.cssClass" 
		:minContentHeight="scroller.minContentHeight">
		<!--<svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
			<g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>-->
			<i class="spinner myScroller_loading" slot="refresh-spinner"></i>
		<slot></slot>
	</scroller>
	<scroller v-else-if="loadInfinite"
		ref="myscroller" 
		:on-infinite="infinite" 
		:onTouchMove="touchmove" 
		:refreshText="refreshText||scroller.refreshText" 
		:noDataText="noDataText||scroller.noDataText" 
		:width="scroller.width" 
		:keepText="keepText"
		:height="scroller.height" 
		:napping="scroller.napping" 
		:snapWidth="scroller.snapWidth" 
		:snapHeight="scroller.snapHeight" 
		:animating="scroller.animating" 
		:animationDuration="scroller.animationDuration" 
		:bouncing="bouncing" 
		:refreshLayerColor="scroller.refreshLayerColor" 
		:loadingLayerColor="scroller.loadingLayerColor" 
		:cssClass="scroller.cssClass" 
		:minContentHeight="scroller.minContentHeight">
		<slot></slot>
		<!--<svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
			<g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>-->
			<i class="spinner myScroller_loading" slot="infinite-spinner"></i>
	</scroller>
	<div v-else>
		<slot></slot>
	</div>
</div>
</div>
</template>

<script>
import Vue from 'vue';
import VueScroller from '@/plus/vueScroller/index.js';
Vue.use(VueScroller);
export default {
	name: 'myScroller',
	data () {
		return {
			scroller:{
				refreshText:"下拉刷新",
				noDataText:"已加载全部数据",
				width:"100%",//容器宽度
				height:"100%",//容器高度
				napping:!1,
				snapWidth:100,
				snapHeight:100,
				animating:!0,
				animationDuration:250,
				touchmove:Function,
				bouncing:!0,//弹性拉动
				refreshLayerColor:"#aaa", //下拉刷新字体颜色
				loadingLayerColor:"#aaa", //上拉加载字体颜色
				cssClass:"",
				minContentHeight:0//内容容器的最少高度(大于这个才显示加载标签,否则不显示,可以弄静默加载)
			},
			//scrollHeight:"100%",
		}
	},
	props: ['refreshText','noDataText','refresh','infinite','loadRefresh','loadInfinite','styles','scrollHeight','touchmove','bouncing','keepText','showbg'],
	mounted (){
		//const height=$(".main .myscroller > div").height();
		//$(".main .myscroller").addClass("highscroll");
		//this.scrollHeight=height+"px";
		
	},
	watch:{
		//scrollTo(height){
			
		//}
	},
	methods:{
		scrollTo(height){
			if(height==1){
				//setTimeout( () =>{
				  this.$refs.myscroller&&this.$refs.myscroller.scrollTo(0,0, false);
				//},0)
			}/*else if(height=="bottom"){
				//console.log(this.$refs.myscroller)
				//console.log("bottom:"+this.$refs.myscroller.scroller.__maxScrollTop)
				this.$nextTick(()=>{
					this.$refs.myscroller&&this.$refs.myscroller.scrollTo(0,this.$refs.myscroller.scroller.__maxScrollTop , false);
				})
			}*/else{
				this.$refs.myscroller&&this.$refs.myscroller.scrollTo(0,height-0.01 , false);
			}
		},
		finishInfinite(flag){
			this.$refs.myscroller&&this.$refs.myscroller.finishInfinite(flag);
		},
		getPosition(){
			return this.$refs.myscroller&&this.$refs.myscroller.getPosition();
		},
		resize(){
			this.$refs.myscroller&&this.$refs.myscroller.resize();
		}
	}
}
</script>
