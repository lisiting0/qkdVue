<template>
	<component :giftUserId="giftUserId" :toUrl="toUrl" :giftUserName="giftUserName" :is="currentTabComponent" @changeLoading="changeLoading"><slot></slot></component>
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
		props:['giftUserId','giftUserName','toUrl'],
		template: '<'+val+' @click="goToShop(toUrl)"><slot></slot></'+val+'>',
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
					name: 'closeShopWin'
				}, function(ret, err) {
					t.deBindEvent();
					if(ret.value.to){
						t.$router.push({name:ret.value.to});
						if(ret.value.to=="login"){
							t.$store.commit("CHANGESTORE",{name:"redirectShop",value:ret.value.redirectUrl||true});
						}else{
							t.$store.commit("CHANGESTORE",{name:"redirectShop",value:false});
						}
					}
					t.$store.commit("CHANGESTORE",{name:"shopParam",value:ret.value});
					window.api&&window.api.openWin({
						name: 'main',
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
					name: 'closeShopWin'
				});
			},
			goToShop(openUrl){
				const t=this;
				if(!window.api){
					window.location.href=openUrl||t.$store.state.baseShopMobileURL+'?'+new Date().getTime();
					return false;
					t.$vux.toast.show({
						type:"cancel",
						text: "请在app端打开商城",
						position:"middle",
						width:"2rem",
					})
					return false;
				}
				t.bindEvent();
				let url={};
				if(openUrl){
					url={
						url:openUrl+(openUrl.indexOf("?")!=-1?"&"+new Date().getTime():"?"+new Date().getTime())
					}
				}
				window.api.openWin({
					name: 'mobileShop',
					url: t.$store.state.phpURL+'/jiaoyouDist/mobileShop.html?'+new Date().getTime(),//'mobileShop.html',
					animation:{
						type:'push',
						subType:'from_right',
					},
					slidBackEnabled:false,
					pageParam:{
						userId:t.giftUserId,
						userName:t.giftUserName,
						...url,
						Authorization:"Bearer " + t.$store.state.Authorization,
					}
				});
			}
		},
	})
});
export default {
	name: 'shop',
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
	props:['tag','giftUserId','giftUserName','toUrl'],
	methods:{
		changeLoading(val){
			this.$emit("changeLoading",val);
		}
	}
}
</script>
