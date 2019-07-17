let hiddenAttr={};
const routerBack={
	computed:{
		handleRoute() {
			const t=this;
			//console.log("返回触发路由:"+t.$store.state.handleRoute+" "+t.$options.name+" "+(t.$store.state.handleBackRouteName.length>0&&t.$store.state.handleBackRouteName[0].$options.name));
			if(t.$store.state.handleBackRouteName.length>0&&t.$options.name==t.$store.state.handleBackRouteName[0].$options.name){//必须为当前监听页面
				return t.$store.state.handleRoute;
			}
		},
	},
	mounted(){
		this.addPopstateListener();
		//console.log("routerBack mounted:"+this.$options.name);
		
	},
	beforeDestroy () {
		//console.log("routerBack beforeDestroy:"+this.$options.name)
		this.removePopstateListener();
    },
	activated(){//针对keepalive
		//console.log("routerBack activated:"+this.$options.name)
		this.addPopstateListener();
	},
	deactivated(){//针对keepalive
		//console.log("routerBack deactivated:"+this.$options.name)
		this.removePopstateListener();
	},
	watch:{
		handleRoute(newV) {//返回键触发
			const t=this;	
			let length=t.$store.state.handleBackRouteName.length;
			//console.log("handleRoute:"+newV+" ")
			if (!newV&&(length>0&&(t.$options.name==t.$store.state.handleBackRouteName[0].$options.name))) {//每次都从第一个监听页面开始	
			console.log("routerback当前路由:"+t.$options.name+" "+t.$store.state.handleBackRouteName[0].$options.name+" "+newV)
				let hasChangeRouteName=null;
				for(let i=0;i<length;i++){
					let curRouter=t.$store.state.handleBackRouteName[i];
					let curName=curRouter.$options.name;//当前操作的routerName
					if(!hiddenAttr[curName]){
						console.log("routerBack watch handleRoute "+curName+" 出错!");
						return false;
					}
					const len=hiddenAttr[curName].length;
					for(let i=0;i<len;i++){
						console.log("计算:"+curName+" "+hiddenAttr[curName][i].name+" "+curRouter[hiddenAttr[curName][i].name]);
						if(curRouter[hiddenAttr[curName][i].name]){//找到当前为true的监听对象
							if(!hiddenAttr[curName][i].value.fn){//不用自定义方法
								curRouter[hiddenAttr[curName][i].name]=false;//监听对象变成false
							}else{//调用自定义方法
								curRouter[hiddenAttr[curName][i].value.fn]&&curRouter[hiddenAttr[curName][i].value.fn]();
							}
							console.log("handleRoute Back "+hiddenAttr[curName][i].name+":"+t.$store.state.handleRoute +" "+curName)
							hasChangeRouteName=curName;
							break;//找到第一个为true的监听对象即可退出
						}
					}
					if(hasChangeRouteName){
						break;//找到第一个为true的监听对象即可退出
					}
				}
			}
		},
	},
	methods:{
		removePopstateListener(){
			const t=this;
			const curRouter=hiddenAttr[t.$options.name];
			//console.log(t.$options.name)
			//console.log(t.$store.state.keepAlive)
			//if(t.$store.state.keepAlive.includes(t.$options.name)){
				let length=curRouter.length;
				for(let i=0;i<length;i++){
					console.log("检查:"+curRouter[i].name+":"+t[curRouter[i].name]);
					if(t[curRouter[i].name]&&curRouter[i].name!="showBack"){
						t[curRouter[i].name]=false;
						t.$store.commit("CHANGESTORE",{name:"forbidBack",value:false});
						t.$store.commit("CHANGEHANDLEROUTE",false);
						curRouter[i].value.fn&&t[curRouter[i].value.fn]();
						break;
					}						
					//
				}
		//	}
			
			t.$store.dispatch("changeHandleBackRouteName",{type:"del",routerName:t});
			if(t.$store.state.isBrowser&&t.isListener){
				t.isListener=false;
				console.log(t.$options.name+" 移除监听routerBack")
				
				window.removeEventListener('popstate', t.forbidBack, false);
			}
		},
		addPopstateListener(){
			const t=this;
			// 监听手机物理返回键时禁止返回之前的路由
			t.$store.dispatch("changeHandleBackRouteName",{type:"add",routerName:t});
			if (window.history && window.history.pushState&&t.$store.state.isBrowser&&!t.isListener) {
				console.log(t.$options.name+" 添加监听routerBack")
				window.addEventListener('popstate', t.forbidBack, false);
				t.isListener=true;
				//t.forbidBack() 
			}
		},
		forbidBack (e) {
			const t=this;
			//console.log(window.history)
			if(t.$options.name==t.$store.state.handleBackRouteName[0].$options.name){//必须为当前监听页面
				//setTimeout(()=>{
					console.log("forbidBack:"+t.$options.name);
					//window.history.pushState('forward', null, window.location.href);//不在这里插入历史防止不点返回跳转多出一个记录
					//window.history.forward(1);
					if(e&&e.type=="popstate"){//点击返回
						console.log("routerback返回:"+t.$options.name+" "+t.$store.state.handleRoute)
						
						if(t.$store.state.handleRoute){
							t.$store.commit("CHANGESTORE",{name:"forbidBack",value:true});
							t.$store.commit("CHANGEHANDLEROUTE",false);
						}else{
							//console.log("3333333333"+t.$route.fullPath+window.history.length)
							//if(window.history.length<=2){
								
							//	window.history.pushState('forward', null, "#"+t.$route.fullPath);
							//}
							//window.removeEventListener('popstate', t.forbidBack, false);
							//t.removePopstateListener();
							//window.history.back();
							//t.$router.back(-1);
						}
					}
					
				//},0);
			}
        },
	},
	init(routerName,opt){//每个组件引用的都是共用的所以要删除旧数据
		console.log("监听 routerback:"+routerName)
		if(hiddenAttr[routerName]){
			console.log("routerback "+routerName+" 已存在")
			return hiddenAttr;
		}
		hiddenAttr[routerName]=[];
		//console.log(this.watch)
		/*for(let item in this.watch){
			console.log("检查监听:" +item)
			if(item!="handleRoute"){
				delete this.watch[item];
			}
		}*/
		//console.log("所有对象:"+routerName,this);
		for(let att in opt){
			//console.log("绑定监听:"+routerName+" "+att+" "+JSON.stringify(this.watch));
			this.watch[att]=function(val){
				const t=this;
				let length=t.$store.state.handleBackRouteName.length;
				if(length>0){
					let flag=val;
					let curRouter=t;
					let curName=curRouter.$options.name;//当前操作的routerName
					console.log("flag:"+val+" "+t.$options.name)
					if(!flag){
						for(let j=0;j<length;j++){
							curRouter=t.$store.state.handleBackRouteName[j];
							curName=curRouter.$options.name;//当前操作的routerName
							if(!hiddenAttr[curName]){
								console.log("routerBack watch "+curName+" 出错!");
								return false;
							}
							const len=hiddenAttr[curName].length;
							//console.log("读取"+curName+" "+len);
							if(!flag){
								for(let i=0;i<len;i++){
									console.log("检测:"+curName+" "+hiddenAttr[curName][i].name+":"+curRouter[hiddenAttr[curName][i].name])
									if(curRouter[hiddenAttr[curName][i].name]){
										flag=true;
										break;
									}
								}
							}
							if(flag){
								break;
							}
						}
					}	
					console.log("handleRoute Change "+att+":"+flag+" "+curName);
					t.$store.commit("CHANGEHANDLEROUTE", flag);
					if(opt[att]&&opt[att].change){
						curRouter[opt[att].change]&&curRouter[opt[att].change](val);
					}
				}
			}
			console.log("handleRoute watch "+att+" : "+JSON.stringify(opt[att]||{})+" " +routerName);
			hiddenAttr[routerName].push({name:att,value:opt[att]||{}});
		}
		return hiddenAttr;
	}
}
export default routerBack
export {
	hiddenAttr
}