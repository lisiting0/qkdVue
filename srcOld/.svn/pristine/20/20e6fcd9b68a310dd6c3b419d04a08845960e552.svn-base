<template>
  <div v-transfer-dom>
    <popup v-model="showShare" position="bottom" height="20%" :popup-style="{zIndex:5002,backgroundColor:'#fff',borderTopLeftRadius:'0.4rem',borderTopRightRadius:'0.4rem'}" :should-scroll-top-on-show="true" :hide-on-blur=true>
      <div>
        <div class="sharePopup" @click.stop>
          <ul>
          <!--  <li class="friends-icon">
              <router-link :to="{name:'home'}">好友/群组</router-link>
            </li>-->
            <li class="circle-icon">
              <a @click.stop="shareWebpage('timeline')">朋友圈</a>
            </li>
            <li class="wxFriends-icon">
              <a @click.stop="shareWebpage('session')">微信好友</a>
            </li>
            <li class="qq-icon">
              <a @click.stop="shareNews('QFriend')">QQ好友</a>
            </li>
            <li class="qqSpace-icon">
              <a @click.stop="shareNews('QZone')">QQ空间</a>
            </li>
            <!--<li class="report-icon">
              <router-link :to="{name:'home'}">举报</router-link>
            </li>
            <li class="notInterested-icon">
              <router-link :to="{name:'home'}">不感兴趣</router-link>
            </li>-->
          </ul>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import {TransferDom,Popup} from 'vux'

  export default {
    name: "share",
    directives: {
      TransferDom,
    },
    components: {
      Popup,
    },
    props:['show','shareTitle','shareDesc','shareImg','shareUrl'],
    data() {
      return {
        showShare:false
      }
    },
    watch:{
      show(val){
		const t=this;
		if(window.api){
			t.showShare=val;
		}else if(t.$store.state.isWeixin){
			t.$vux.toast.show({
				type:"text",
				text: "请点击右上角分享",
				position:"bottom",
				width:"auto",
			});
		}else{
			t.$vux.toast.show({
				type:"text",
				text: "当前环境不支持该功能",
				position:"bottom",
				width:"auto",
			});
		}
      },
      showShare(val){
        this.$emit("changeShow",val);
      },
    },
    mounted() {
		const t=this;
    },
    methods: {
		shareWebpage(Vscene){//分享到微信
			const t=this;
			if(!t.wx){
				t.wx=window.api.require('wx');
			}
			t.wx.isInstalled(function(ret, err) {
				if (ret.installed) {
					let	params=t.Fn.toWxUrl(t.$store.state.baseFrontEndURL+"jiaoyou.html#"+t.$route.fullPath);
					let obj={
						title : t.shareTitle||t.$route.meta.shareTitle||'乾坤岛',
						description : t.shareDesc||t.$route.meta.shareDesc||'一个安全、纯粹、高效的婚恋交友平台',
						contentUrl:t.shareUrl||t.$route.meta.shareUrl||t.$store.state.baseURL+"/api/account/publicAddressLoginUrl?state="+(t.$route.meta.shareRoute||params.str),
						thumb : t.shareImg||t.$route.meta.shareImg||t.$store.state.baseFrontEndURL+'static/logo.png?'+new Date().getTime(),
					}
					t.wx&&t.wx.shareWebpage({
						scene : Vscene,
						...obj,
					}, function(ret, err) {
						if (ret.status) {
							//alert(JSON.stringify(ret))
						} else {
							//alert(JSON.stringify(err))
						}
					});
				} else {
					t.$vux.toast.show({
						type:"text",
						text: "当前设备未安装微信客户端",
						position:"bottom",
						width:"auto",
					});
				}
			});
			
		},
		shareNews(type){//分享到QQ
			const t=this;
			if(!t.qq){
				t.qq=window.api.require('QQPlus');
			}
			t.qq.installed(function(ret, err) {
				if (ret.status) {
					let	link=t.$store.state.baseFrontEndURL+"jiaoyou.html#"+t.$route.fullPath;
					let staticLink=null
					if(t.shareUrl||t.$route.meta.shareUrl){
						let params=Fn.toWxUrl(t.shareUrl||t.$route.meta.shareUrl);
						if(params.str){
							staticLink=t.$store.state.baseFrontEndURL+"jiaoyou.html#/"+params.str.replace(/_{1}([a-z0-9A-Z]+)_{0,1}([a-z0-9A-Z\u4e00-\u9fa5]*)/g,"&$1=$2").replace("_&","?");
						}
					}
					if(!staticLink&&t.$route.meta.shareRoute){
						staticLink=t.$store.state.baseFrontEndURL+"jiaoyou.html#/"+t.$route.meta.shareRoute.replace(/_{1}([a-z0-9A-Z]+)_{0,1}([a-z0-9A-Z\u4e00-\u9fa5]*)/g,"&$1=$2").replace("_&","?");
					}
					let obj={
						title : t.shareTitle||t.$route.meta.shareTitle||'乾坤岛',
						description : t.shareDesc||t.$route.meta.shareDesc||'一个安全、纯粹、高效的婚恋交友平台',
						url:staticLink||link,
						imgUrl: t.shareImg||t.$route.meta.shareImg||t.$store.state.baseFrontEndURL+'static/logo.png?'+new Date().getTime(),
					}
					t.qq&&t.qq.shareNews({
						...obj,
						type:type
					},function(ret,err){
					  if (ret.status){
						//alert("分享成功！");
					  } else {
						//api.alert({msg: JSON.stringify(err)});
					  }
					});
				} else {
					t.$vux.toast.show({
						type:"text",
						text: "当前设备未安装QQ客户端",
						position:"bottom",
						width:"auto",
					});
				}
			});

			
		}
	}
  }
</script>

<style scoped lang="scss">
  .shade {
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    & > div {
      overflow: hidden;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: relative;
     bottom: 0;
    }
  }
</style>
