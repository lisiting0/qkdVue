<template>
	<component :toUrl="toUrl" :is="currentTabComponent" @changeLoading="changeLoading"><slot></slot></component>
</template>
<script>
//import Loading from '@other/loading.vue';
import Vue from 'vue';
'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary'.split(',').forEach(val=>{
	Vue.component('myTab-'+val, {
		data () {
			return {
				isloading:false,
			}
		},
		props:['toUrl'],
		template: '<'+val+' @click="goToUrl(toUrl)"><slot></slot></'+val+'>',
		components: {
			//Loading,
		},
		watch:{
			isloading(val){
				this.$emit("changeLoading",val);
			}
		},
		methods:{
			bindEvent(){
				const t=this;
				//t.isloading=true;(暂不用)
				window.api&&window.api.addEventListener({
					name: 'closeOutLinkWin'
				}, function(ret, err) {
					t.deBindEvent();
					/*window.api&&window.api.openWin({
						name: t.$store.state.appRootName,
						animation:{
							type:'push',
							subType:'from_left',
						},
						slidBackEnabled:false,
					});*/
					window.api&&window.api.closeWin({
						name: "outLinkWin",
						animation:{
							type:'push',
							subType:'from_left',
						},
						slidBackEnabled:false,
					});
					t.isloading=false;
				});
			},
			deBindEvent(){
				window.api&&window.api.removeEventListener({
					name: 'closeOutLinkWin'
				});
			},
			goToUrl(openUrl){
				const t=this;
				if(!openUrl){
					return false;
				}
				if(!window.api){
					window.open(openUrl,"_blank");
					return false;
				}
				t.bindEvent();
				let url={
					url:openUrl+(openUrl.indexOf("?")!=-1?"&"+new Date().getTime():"?"+new Date().getTime())
				}
				window.api.openWin({
					name: 'outLinkWin',
					url: "static/outLink.html?times="+new Date().getTime(),
					animation:{
						type:'push',
						subType:'from_right',
					},
					slidBackEnabled:false,
					pageParam:{
						...url,
					}
				});
			}
		},
	})
});
export default {
	name: 'outLink',
	data () {
		return {
			//isloading:false,
			defaultTag:"li",
		}
	},
	computed:{
		currentTabComponent(){
			return 'myTab-'+(this.tag||this.defaultTag);
		}
	},
	props:['tag','toUrl'],
	methods:{
		changeLoading(val){
			this.$emit("changeLoading",val);
		}
	}
}
</script>