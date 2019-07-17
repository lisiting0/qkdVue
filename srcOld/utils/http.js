import axios from 'axios'
import Vue from 'vue'
import {store} from '@/store';
import qs from 'qs'
import router from '../routers';

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
   //console.log("interceptorsresponse:"+JSON.stringify(response))
 
  if (response.data.status != 1&&(!response.config.params||!response.config.params.readonly)) {
		//alert("接口非1:"+JSON.stringify(response));
    if (response.data.status == 1000||response.data.status == 1001) {// 表示token过期，使用缓存静默登陆
      store.commit('LOGINOUT');
     /* Vue.$vux.toast.show({
        type: "text",
        text: '请先完善资料!',
        position: "middle",
        width: "auto",
      });*/
	  Vue.$vux.loading.hide();
      router.push({
        name: 'login',
		query: store.state.otherLogin.params&&store.state.otherLogin.params.query
      })

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
  Vue.$vux.loading.hide()
  Vue.$vux.toast.show({
    type: "text",
    text: "网络错误，请稍后再试",
    position: "middle",
    width: "auto",
  });
  // console.log("responseerror",JSON.stringify(error))
  return Promise.reject(error)
});// 添加响应拦截器
let $http = {};
$http.get = function (url, params = {}, config) {
  if (!params.isRefresh) {
    const cacheUrl = url,//url.replace(new RegExp("^/"),""),
      strName = JSON.stringify(params);
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
    /*let storeData=getStore(cacheUrl+strName);
        if(storeData){//读取本地数据
            storeData=JSON.parse(storeData);
            if((new Date().getTime())-storeData.creatDate<store.state.localcacheTimeout){
                params = {
                    ...params,
                    readonly:true,//用来判断是否显示出错提示信息
                }
                callback&&callback(t.get(url, params,null,true));
                return Promise.resolve(storeData.data);
            }
        }*/
  } else {
    delete params.isRefresh;
  }

  return instance.get(store.state.baseURL + url, Object.assign({
    params: params
  }, config))
}
$http.post = function (url, data, config) {
  return instance.post(store.state.baseURL + url, data, config)
}
$http.postHttp = function (url, data, config) {
  return instance.post(url, data, config)
}
$http.getHttp = function (url, params, config) {
  return instance.get(url, Object.assign({
    params: params
  }, config))
}

$http.postForm = function (url, data, config) {
  return instance.post(store.state.baseURL + url, qs.stringify(data), Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }, config))
}
$http.postImg = function (url, data, config) {
  return instance.post(store.state.imageUploadUrl + url, data, Object.assign({
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }, config))
  // return instance.post(url,data,config)
}
$http.put = function (url, data, config) {
  return instance.put(store.state.baseURL + url, data, config)
}
$http.putForm = function (url, data, config) {
  return instance.put(store.state.baseURL + url, qs.stringify(data), Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }, config))
}
$http.delete = function (url, params, config) {
  return instance.delete(store.state.baseURL + url, Object.assign({
    params: params
  }, config))
}

$http.postFormPhp = function (url, data, config) {
  return instance.post(store.state.phpURL + url, qs.stringify(data), Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }, config))
}
$http.postFormShopPhp = function (url, data, config) {
  return instance.post(store.state.baseShopMobileURL + url, qs.stringify(data), Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }, config))
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
