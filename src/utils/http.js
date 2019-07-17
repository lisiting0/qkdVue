import axios from 'axios'
import Vue from 'vue'
import {store} from '@/store';
import qs from 'qs'
import router from '../routers';
import server from '@/server/getData';
import {setStore, getStore} from '@/config/mUtils'
let instance = axios.create({
  // baseURL:store.state.baseURL,
  // baseURL:'http://192.168.0.26:8080/jiaoyou-web',
  timeout: 10000,
  //withCredentials:true,
});

instance.interceptors.request.use(config => {// 添加请求拦截器
  // config.data=JSON.stringify(config.data);
  // console.log(JSON.stringify(config))
  if (!config.headers['Content-Type'] && (config.method == 'post' || config.method == 'put')) {
    config.headers = {
      'Content-Type': 'application/json'
    };
  }
  if (store.state.Authorization != "") {
    config.headers.Authorization = "Bearer " + store.state.Authorization; //携带权限参数
  }
  //config.headers.appVersion = store.state.version; //携带权限参数
  // console.log("interceptorsrequest",JSON.stringify(config))
  return config;
}, error => {
  Vue.$vux.loading.hide()
  Vue.$vux.toast.show({
    type: "text",
    text: "网络错误，请稍后再试",
    position: "middle",
    width: "auto",
  });
  // console.log("requesterror",JSON.stringify(error))
  return Promise.reject(error)
})
instance.interceptors.response.use((response) => {
   // console.log("interceptorsresponse:",(response))

  if (response.data.status != 1&&(!response.config.params||!response.config.params.readonly)) {
    if (response.data.status == 1000||response.data.status == 1001||response.data.status == 1002||response.data.status == 1003) {// 表示token过期，使用缓存静默登陆
		//if(!store.state.isLogin){//防止多次进入
		//	return Promise.reject('登陆状态失效，请重新登陆');
		//}
      store.dispatch("disconnectSocket");
      store.commit('LOGINOUT');
		/* Vue.$vux.toast.show({
        type: "text",
        text: '请先完善资料!',
        position: "middle",
        width: "auto",
      });*/
	store.dispatch("cancelRequest","跳转取消请求");//可能有几个接口都报登录失效
	  Vue.$vux.loading.hide();
     setTimeout(()=>{ 
		router.push({
			name: 'login',
			query: store.state.otherLogin.params&&store.state.otherLogin.params.query
		})
	 },0)
      return Promise.reject('登陆状态失效，请重新登陆');
    }
    console.log("接口返回非1:" + JSON.stringify(response));
    Vue.$vux.loading.hide();
    if(response.data.status == 110029){
		//if(!store.state.isiOSApp){
			/*Vue.$vux.confirm.show({
				content: '账号乾坤币余额不足，可通过做任务或充值获得乾坤币。',
				confirmText:'充值',
				cancelText:'做任务',
				onCancel () {
					router.push({
						path: "/earnCoin",
					  })	
				},
				onConfirm () {
				  router.push({
					path: "/recharge",
				  })
				}
			});*/
		/*}else{
			Vue.$vux.toast.show({
				type: "text",
				text: "乾坤币不足",
				position: "middle",
				width: "auto",
			});	
		}*/
    }else if(response.data.status == 140026){//微信重复code不提示
	}else if(response.data.status == 110014||response.data.status == 110015||response.data.status == 110016||response.data.status == 110018||response.data.status == 110068){//报名活动约会认证

    }else{
      response.data.message&&Vue.$vux.toast.show({
        type: "text",
        text: response.data.message,
        position: "middle",
        width: "auto",
      });
    }
		//出错有缓存则返回缓存
		const cacheUrl =  response.config.url.replace(store.state.baseURL, ""),
			strName = response.config.params;
		// console.log("缓存地址:"+cacheUrl+":"+strName)
		if (store.state.localcache[cacheUrl] && store.state.localcache[cacheUrl][strName] && Object.keys(store.state.localcache[cacheUrl][strName]).length > 0) {//先读缓存
		  const data = store.state.localcache[cacheUrl][strName];  
			  console.log(url+"读取缓存的(接口出错-1)")
			return Promise.resolve(data.data);
		 
		} else if (store.state.cachelist[cacheUrl] && store.state.cachelist[cacheUrl][strName] && Object.keys(store.state.cachelist[cacheUrl][strName]).length > 0) {//页面缓存
		  const data = store.state.cachelist[cacheUrl][strName];
			console.log(url+"读取页面缓存的(接口出错-1)")
			return Promise.resolve(data.data);
		}
    return Promise.reject(response.data)
  }
  if(response.headers&&response.headers.authorization){
    console.log("更新token："+response.headers.authorization)
    store.commit("CHANGEACCESSTOKEN",{
      token:response.headers.authorization,
      userId:store.state.userId
    })
  }
  if (response.config) {
    if (response.config.method == "get") {
      let url = response.config.url.replace(store.state.baseURL, ""),
        data = response.config.params;
      if (store.state.localcacheUrl.includes(url)) {
        store.commit("ADDLOCALCACHE", {url, name: data, data: response,timeout:response.config.params.cacheTimeout});//添加到缓存中
      } else if (store.state.cachelistUrl.includes(url)) {
        store.commit("ADDCACHE", {url, name: data, data: response,timeout:response.config.params.cacheTimeout});//添加到当前页面缓存中
      }
    }
  }
  return response;
}, error => {
  Vue.$vux.loading.hide();
  let showErr=true;
  if(error.config){
	if(error.config.params&&error.config.params.readonly){
	  showErr=false;
	}else if(error.config.data&&JSON.parse(error.config.data).readonly){
		showErr=false;
	}
  }else if((error+"").indexOf("Cancel")!=-1){
	  showErr=false;
  }
  
  if(showErr){
	  Vue.$vux.toast.show({
		type: "text",
		text: "网络错误，请稍后再试",
		position: "middle",
		width: "auto",
	  });
  }
  // console.log("responseerror",JSON.stringify(error))
  return Promise.reject(error)
});// 添加响应拦截器
let $http = {};
let gettingConfigUrl=false;
let gettingCustomConfig=false;
$http.get = async function (url, params = {}, config) {
	if(!store.state.isGetConfigUrl&&url!="/api/apiDict/getBaseConfig"&&!gettingConfigUrl){//先读配置
		try{
			gettingConfigUrl=true;
			await server.getBaseConfig({readonly:true}).then((res)=>{
				gettingConfigUrl=false;
				if(res.data.data){
					store.commit("CHANGEIMAGEURL",res.data.data)
				}
			});
		}catch(e){
			gettingConfigUrl=false;
			console.log("获取配置url出错:"+JSON.stringify(e));
		}
		
	}
	if(!store.state.isGetCustomConfig&&url!="/api/apiDict/valueToKey"&&!gettingCustomConfig){//读取公共字典
		try{
			gettingCustomConfig=true;
			server.apiDictObject({type:"custom_config",readonly:true}).then((res)=>{
				gettingCustomConfig=false;
				if(res.data.data){
					store.commit("CHANGESTORE",{name:"custom_config",value:res.data.data});//字典共用配置
					store.commit("CHANGESTORE",{name:"isGetCustomConfig",value:true});//成功获取字典共用配置
				}
			});
		}catch(e){
			gettingCustomConfig=false;
			console.log("获取字典共用配置出错:"+JSON.stringify(e));
		}
	}
  if (!params.isRefresh) {
    const cacheUrl = url;//url.replace(new RegExp("^/"),""),
	const callback=params.callback;
	delete params.callback;
    const strName = JSON.stringify(params);
	  
    // console.log("缓存地址:"+cacheUrl+":"+strName)
    if (store.state.localcache[cacheUrl] && store.state.localcache[cacheUrl][strName] && Object.keys(store.state.localcache[cacheUrl][strName]).length > 0) {//先读缓存
      const data = store.state.localcache[cacheUrl][strName];
	  let cacheTimeout=data.timeout||store.state.localcacheTimeout;
      if ((new Date().getTime()) - data.creatDate < cacheTimeout*1000) {
		  console.log(url+"读取缓存的")
        return Promise.resolve(data.data);
      }
    } else if (store.state.cachelist[cacheUrl] && store.state.cachelist[cacheUrl][strName] && Object.keys(store.state.cachelist[cacheUrl][strName]).length > 0) {//页面缓存
      const data = store.state.cachelist[cacheUrl][strName];
	  let cacheTimeout=data.timeout||store.state.localcacheTimeout;
      if ((new Date().getTime()) - data.creatDate < cacheTimeout*1000) {
		console.log(url+"读取页面缓存的")
        return Promise.resolve(data.data);
      }
    }
    let storeData=getStore(cacheUrl+strName);
	if(storeData){//读取本地数据
		storeData=JSON.parse(storeData);
		let cacheTimeout=storeData.timeout||store.state.localcacheTimeout;
		if((new Date().getTime())-storeData.creatDate<cacheTimeout*1000){
			console.log("读取本地数据:"+(cacheUrl+strName));
			store.commit("ADDLOCALCACHE", {url:cacheUrl, name: params, data: storeData.data,timeout:storeData.timeout});
			if(callback){
				callback(storeData.data);
			}else{
				return Promise.resolve(storeData.data);
			}
		}
	}
  } else {
    delete params.isRefresh;
	delete params.callback;
  }

  return instance.get(store.state.baseURL + url, Object.assign({
    params: params
  }, {...config,cancelToken: store.state.axiosCancelSource.token}))
}
$http.post = function (url, data, config) {
  return instance.post(store.state.baseURL + url, data, {...config,cancelToken: store.state.axiosCancelSource.token})
}
$http.postHttp = function (url, data, config) {
  return instance.post(url, data, {...config,cancelToken: store.state.axiosCancelSource.token})
}
$http.getHttp = function (url, params, config) {
  return instance.get(url, Object.assign({
    params: params
  }, {...config,cancelToken: store.state.axiosCancelSource.token}))
}

$http.postForm = function (url, data, config) {
  return instance.post(store.state.baseURL + url, qs.stringify(data), Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }, {...config,cancelToken: store.state.axiosCancelSource.token}))
}
$http.postImg = function (url, data, config) {
  return instance.post(store.state.imageUploadUrl + url, data, Object.assign({
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }, {...config,cancelToken: store.state.axiosCancelSource.token}))
  // return instance.post(url,data,config)
}
$http.put = function (url, data, config) {
  return instance.put(store.state.baseURL + url, data, {...config,cancelToken: store.state.axiosCancelSource.token})
}
$http.putForm = function (url, data, config) {
  return instance.put(store.state.baseURL + url, qs.stringify(data), Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }, {...config,cancelToken: store.state.axiosCancelSource.token}))
}
$http.delete = function (url, params, config) {
  return instance.delete(store.state.baseURL + url, Object.assign({
    params: params
  }, {...config,cancelToken: store.state.axiosCancelSource.token}))
}

$http.postFormPhp = function (url, data, config) {
  return instance.post(store.state.phpURL + url, qs.stringify(data), Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }, {...config,cancelToken: store.state.axiosCancelSource.token}))
}
$http.postFormShopPhp = function (url, data, config) {
  return instance.post(store.state.baseShopMobileURL + url, qs.stringify(data), Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }, {...config,cancelToken: store.state.axiosCancelSource.token}))
}
$http.uploadFile = function (url,fileUrl,fb) {
  api.ajax({
    url: store.state.baseURL + url,
    method: 'post',
    report:true,
    data: {
      files: {
        file: fileUrl
      }
    }
  }, function(ret, err) {
    if (ret) {
      fb(ret)
      Vue.$vux.loading.hide();
      if(ret.body){
        if (ret.body.status == 1000||ret.body.status == 1001) {// 表示token过期，使用缓存静默登陆
          store.commit('LOGINOUT');
          router.push({
            name: 'login',
            query: store.state.otherLogin.params&&store.state.otherLogin.params.query
          })
        }else if(ret.body.status != 1){
          ret.body.message&&Vue.$vux.toast.show({
            type: "text",
            text: ret.body.message,
            position: "middle",
            width: "auto",
          });
        }
      }
    } else {
      Vue.$vux.loading.hide();
      fb(err)
    }
  });
}
export default $http;
