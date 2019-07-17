<template>
 <!--:class="($store.state.isWeixin?'jy_isWeixin':'')+($store.state.isBrowser?' jy_isBrowser':'')"-->

<div id="app">
	<!--<keep-alive :include="$store.state.keepAlive">
	   <router-view :key="$route.params.id"></router-view>
	</keep-alive>-->
	<transition :css="false" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeleave" @leave="leave" @after-leave="afterleave">
		<keep-alive :include="$store.state.keepAlive">
			<router-view v-if="Fn.keepAliveObject[$route.name]" />
		</keep-alive>
	</transition>
	<transition :css="false" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeleave" @leave="leave" @after-leave="afterleave">
		<router-view v-if="!Fn.keepAliveObject[$route.name]" />
	</transition>
  <!--路由元信息-->
	<Routerlink v-if="$route.meta.routerlink"></Routerlink>
</div>
</template>

<script>
	import Routerlink from '@/components/routerlink.vue';
	//import { wxShare } from '@js/wxjssdk'
    export default {
        name: 'App',
        data() {
            return{
				/** 只需在js/api.js 里的keepAliveObject 里加入要缓存的页面及其下级页面即可实现缓存**/
				curKeepAlive:"",//保存最后进入的keepalive缓存页
				SPEED: 300,
				transitionType:'',
            }
        },
		components: {
			Routerlink,
		},
		mounted(){
			const t=this;
			$(".weui-toast").css('top',document.body.clientHeight/2 +'px');
			if(t.$store.state.isWeixin){
				$("body").addClass("jy_isWeixin");
			}
			if(t.$store.state.isBrowser){
				$("body").addClass("jy_isBrowser");
			}
			if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){//ios
				$(document).bind("touchmove",function(){//ios软键盘弹起,导致的兼容问题
					let tagName=document.activeElement.tagName;
					if(tagName=="INPUT"||tagName=="TEXTAREA"){
						$(document.activeElement).blur();
					}
				});
			}

			//$("html").addClass("jy_isLiuhai");
		},
		computed: {

		},
		watch: {
			'$route' (to, from) {
				const t=this;
					/**
						离开keepalive页面(需要销毁缓存页面的)
						1.不是从缓存页面到下级页面
						2.离开的页面不是缓存页面的下级页面
						3.修改城市或语言也会销毁缓存(在mutations.js里设置)
					**/
					for(let i=t.$store.state.keepAlive.length;i--;){//遍历缓存页面列表
						if(!t.Fn.isAlwaysKeep(t.$store.state.keepAlive[i])&&!t.Fn.isKeepAliveBack(t.$store.state.keepAlive[i],to.name)&&t.Fn.notKeepAliveFrom([t.$store.state.keepAlive[i]],from.name)){//离开的页面不是缓存页面的下级页面,则删除该缓存页面(缓存页面不一定是当前的缓存页)
							//console.log("离开keepalive页面,销毁缓存"+t.$store.state.keepAlive[i]);
							if(t.$store.state.keepAlive[i]==t.curKeepAlive){
								t.$store.commit("CLEARCACHE");//清除页面切换缓存
								console.log("清除页面切换缓存:"+t.curKeepAlive);
							}
							t.$store.commit("DELKEEPALIVE",i);//删除缓存页面
						}
					}
				if(t.Fn.keepAliveObject[to.name]&&!t.$store.state.keepAlive.includes(to.name)){//添加缓存页面
					t.$nextTick(()=>{//预防切换过快,当前页面缓存没销毁
						t.$store.commit("ADDKEEPALIVE",[to.name]);
					});
				}
				if(t.Fn.keepAliveObject[to.name]){
					t.curKeepAlive=to.name;//最后的缓存页面
				}
				if (to.meta.deepth && from.meta.deepth) {
					t.transitionType = to.meta.deepth > from.meta.deepth ? "slide-left" : "slide-right";
				}else{
					t.transitionType="";
				}
				//console.log("t.transitionType:"+t.transitionType)
			}
		},
		methods:{
			setTransitionCss(speed,pos){
				const transition="-webkit-transition: -webkit-transform "+speed+"ms;-ms-transition: -ms-transform "+speed+"ms;transform: translate("+pos+", 0);transition: transform "+speed+"ms;transform: translate("+pos+", 0);will-change: transform;";
				return transition;
			},
			beforeEnter(dom) {
				console.log("beforeEnter");
				const t=this;
				let x = this.transitionType === "slide-right" ? "-100%" : this.transitionType?"100%":0;
				dom.style.cssText = t.setTransitionCss(this.SPEED,x);

			},
			enter(dom, done) {
				const t=this;
				console.log("enter");
					 setTimeout(() => {
						dom.style.cssText = t.transitionType?t.setTransitionCss(this.SPEED,0):"";

						//t.transitionType?`transition: transform ${this.SPEED}ms;transform: translate(0, 0);`:'';
						//console.log(`transition: transform ${this.SPEED}ms;transform: translate(0, 0);`)
					  },0);

					//监听 transitionend 事件
					var transitionend = window.ontransitionend
					  ? "transitionend"
					  : "webkitTransitionEnd";
					dom.addEventListener(transitionend, function onEnd(e) {
						console.log("e.propertyName:"+e.propertyName)
						if(e.propertyName=="transform"){
							dom.removeEventListener(transitionend, onEnd);
							  done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
							  dom.style.cssText = "";
						}

					});
					if(!this.transitionType){
						done();
						dom.style.cssText = "";
					}

			},
			afterEnter(dom) {
				dom.style.cssText = "";
			    console.log("afterEnter");
			},
			beforeleave(dom) {

				dom.style.cssText = `transition: transform ${
				  this.SPEED
				}ms;transform: translate(0, 0);will-change: transform;`;

			  console.log("beforeleave");
			},
			leave(dom, done) {
				const t=this;
				console.log("leave");
					setTimeout(() => {
					  let slide = ["slide-left", "slide-right"].includes(
						t.transitionType
					  );
					  if (slide) {
						let x = t.transitionType === "slide-right" ? "100%" : t.transitionType?"-100%":0;
						dom.style.cssText = t.setTransitionCss(t.SPEED,x);
					  }
					},0);
					//监听 transitionend 事件
					var transitionend = window.ontransitionend
					  ? "transitionend"
					  : "webkitTransitionEnd";
					dom.addEventListener(transitionend, function onEnd(e) {
						if(e.propertyName=="transform"){
							dom.removeEventListener(transitionend, onEnd);
						    done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
						    dom.style.cssText = "";
						}

					});
				if(!t.transitionType){
					done();
					dom.style.cssText = "";
				}
			},
			afterleave(dom) {
				dom.style.cssText = "";
			  console.log("afterleave");
			}//
		}
    }
</script>
