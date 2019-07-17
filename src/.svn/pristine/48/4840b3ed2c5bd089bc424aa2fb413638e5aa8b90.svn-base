<template>
	<div class="new_login">
		<Loading v-if="isloading"></Loading>
		<p class="new_login_join_text" v-if="!qkId && !qkName"><span>您的好友 <i>{{qkName}}({{qkId}})</i> 邀请你加入乾坤岛</span></p>
		<div class="new_login_photo">
			<i>&#xe663;</i>
			<p>上传清晰本人近照，<em>查看示例</em></p>
		</div>
		<ul class="new_login_ul">
			<li>
				<span>昵称</span>
				<div class="new_login_ul_con"><input type="text"></div>
			</li>
			<li>
				<span>年龄</span>
				<div class="new_login_ul_con"></div>
			</li>
		</ul>
	</div>
</template>
<script>
  import md5 from 'js-md5';
  import agreement from './agreement.vue';
  import Loading from '@other/loading.vue';
  import {TransferDom, Actionsheet, PopupPicker, Group, Datetime, XDialog} from 'vux'
  import selectPhoto from '../plugs/selectPhoto'

  export default {
    name: 'login',
    components: {
      Actionsheet,
      PopupPicker,
      Loading,
      agreement,
      selectPhoto,
      Group,
      Datetime,
      XDialog
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        hide:false,
        isloading: false,
        colorRed: {'color': '#ff788c', 'border-color': '#ff788c'},
        file: null,
        iconUrl:null,
        userIcon: '',
        showToast: false,
        loginName: '',
        visibility: false,
        birthday: '',
        sex: null,
        phone:'',
        verificationCode: '',
        verificationCodeContent: "获取验证码",
        verificationCodeUse: true,
        verificationCodeTime: 60,
        qkId: '',
        qkName: '',
        width:640,
        height:368,
      }
    },
    computed: {
      endDate(){
        let nowYear = this.$utils.format(new Date(),'yyyy')
        return (nowYear-18)+'-'+this.$utils.format(new Date(),'MM-dd');
      },
      startDate(){
        let nowYear = this.$utils.format(new Date(),'yyyy')
        return (nowYear-70)+'-'+this.$utils.format(new Date(),'MM-dd');
      },
      showOpacity() {
        return !!((this.file||this.userIcon)&&this.loginName&&this.birthday&&this.sex&&this.phone&&this.verificationCode);
      },
      handleRoute() {
        return this.$store.state.handleRoute;
      },
    },
    watch: {
      verificationCode(curVal) {
        if (curVal && typeof curVal == 'string') {
          this.verificationCode = curVal.match(/^\d{0,6}/)[0];
        }
      }
    },
    created() {
      this.width=window.screen.width||document.documentElement.clientWidth||window.innerWidth
      this.height=this.width*368/640
    },
	  async mounted(){
		const t=this;
		
      if(t.$store.state.qrcode.pid&&t.$store.state.qrcode.id){
		try{
			let userInfo = await t.$server.getUserInfo({userId: t.$store.state.qrcode.id});
			if(t.$store.state.qrcode.pid==userInfo.data.data.jyNumber){
				t.qkId = t.$store.state.qrcode.pid;
				t.qkName = userInfo.data.data.aliasName;
			}
		}catch(e){
			console.log(JSON.stringify(e));
		}
      }
		//alert(JSON.stringify(this.$store.state.otherLogin)+"---------"+this.$store.state.gotoBlindDatepay);
	},
    methods: {
      totop(){
        this.$refs.scroll.scrollTop=0;
        this.hide=false;
      },
      scroll(e){
        if(this.$refs.scroll.scrollTop>10){
          this.hide=true;
        }else{
          this.hide=false;
        }
      },
      getVerificationCode: function () {
        if (!this.verificationCodeUse) {
          return false;
        }
        if (!this.$utils.isPhoneNum(this.phone)) {
          this.$vux.toast.show({
            type: "text",
            text: "请输入正确的手机号",
            position: "middle",
            width: "auto",
          });
          return false;
        }
        this.verificationCodeUse = false
        this.$vux.loading.show()
        this.$server.get_code({phoneNumber: this.phone}).then((result) => {
          this.$vux.loading.hide()
          let interval = setInterval(() => {
            this.verificationCodeTime--;
            if (this.verificationCodeTime == -1) {
              clearInterval(interval);
              this.verificationCodeUse = true
              this.verificationCodeTime = 60
              this.colorRed = {'color': '#ff788c', 'border-color': '#ff788c'}
              this.verificationCodeContent = "发送"
            } else {
              this.colorRed = {}
              this.verificationCodeContent = this.verificationCodeTime + "(s)"
            }
          }, 1000)
          // this.colorRed={'color':'red'}
          this.colorRed = {}
          this.verificationCodeContent = this.verificationCodeTime + "(s)"
        }, (err) => {
          this.verificationCodeUse = true;
        })
        return;
      },
      async fileBack (obj) {
        const t = this
        if(obj.serverId){
          let result = await t.$server.wxMpMedia({
            mediaId:obj.serverId[0]
          })
          t.userIcon = t.$utils.getFullPath(result.data.data&&result.data.data.path)
          t.iconUrl = result.data.data&&result.data.data.path;
        }else{
          t.file = obj.file[0]//提交的图片
          t.$utils.getBase64(t.file, (url) => {
            t.userIcon = 'data:image/png;base64,' + url   //显示的图片
          })
        }
      },
      async login() {
        const _this = this;
        if (!_this.file&&!_this.userIcon) {
          _this.$vux.toast.show({
            type: "text",
            text: "请上传头像",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if (_this.loginName == '') {
          _this.$vux.toast.show({
            type: "text",
            text: "请填写您的真实姓名",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if (_this.birthday == '') {
          _this.$vux.toast.show({
            type: "text",
            text: "请选择您的生日",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if (_this.sex == null) {
          this.$vux.toast.show({
            type: 'cancel',
            text: '请选择性别',
            position: 'middle',
            width: 'auto',
          })
          return
        }
        if (_this.phone == '') {
          _this.$vux.toast.show({
            type: "text",
            text: "请输入您的手机号码",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if (this.verificationCode == "") {
          _this.$vux.toast.show({
            type: "text",
            text: "请填写验证码",
            position: "middle",
            width: "auto",
          });
          return;
        }
        let location = {};
        this.$vux.loading.show()
        try {
          location = await _this.$store.dispatch("getMylocation");
        } catch (e) {
          _this.$vux.loading.hide()
          _this.$vux.toast.show({
            type: "text",
            text: "获取定位失败",
            position: "middle",
            width: "auto",
          });
          return;
        }

		try{
			let headimgAttachmentId = _this.iconUrl;
			if(_this.file){
			  let param = new FormData() //创建form对象
			  param.append('file', _this.file, _this.file.name) //单个图片 ，多个用循环 append 添加
			  let result1 = await _this.$server.uploadPic(param)
			  headimgAttachmentId = result1.data.data.path
			}
			let data = {
			  source:_this.$store.state.isWeixin?1:4,
			  longitude: location.lon,
			  latitude: location.lat,
			  headimgAttachmentId: headimgAttachmentId,
			  aliasName: _this.loginName,
			  birthday: _this.birthday,
			  sex: _this.sex,
			  loginName: _this.phone,
			  code: _this.verificationCode,
			  pid: _this.qkId,//推荐人
			}
			window.$api.setStorage('loginData', data);
			let result = await _this.$server.fillingData(data);
			_this.$store.commit("CHANGEACCESSTOKEN", result.data.data);
			let userInfo = await _this.$server.getUserInfo({userId: result.data.data.userId});
			_this.$vux.loading.hide()
			_this.$store.commit("LOGIN", userInfo.data.data);
		}catch(e){
			_this.$vux.loading.hide()
			alert(e.message||JSON.stringify(e));
		}
		let hasWrong=false;
        if (_this.$store.state.otherLogin.isBind) {
          try {
            let bind;
            if (_this.$store.state.otherLogin.type == 'wx') {
              bind = await _this.$server.bindwx({
                accessToken: _this.$store.state.otherLogin.accessToken,
                openId: _this.$store.state.otherLogin.openId,
              });
            } else if (_this.$store.state.otherLogin.type == 'qq') {
              bind = await _this.$server.bindqq({
                accessToken: _this.$store.state.otherLogin.accessToken,
              });
            } else if (_this.$store.state.otherLogin.type == 'wxmp') {
              bind = await _this.$server.WxMpbind({
                unionid: _this.$store.state.otherLogin.unionid,
                openid: _this.$store.state.otherLogin.openid,
              });
            }
           /* _this.$vux.toast.show({
              type: "text",
              text: "绑定账号成功",
              position: "bottom",
              width: "2rem",
            });*/

          } catch (e) {
			   _this.$store.commit("LOGINOUT");//清空登录信息
				hasWrong=true;
				console.log("绑定出错:"+JSON.stringify(e));
          }
        }
		if(hasWrong){
			return false;
		}
        setTimeout(()=>{
			if (_this.$store.state.otherLogin.isBind) {
				if(_this.$store.state.gotoBlindDatepay){
					if(_this.$store.state.gotoBlindDatepay=='baoming'){
						_this.$router.replace({
						  name: "blindDatePay",
						  query: {id:_this.$store.state.otherLogin.params.query.id}
						});
					}else if(_this.$store.state.gotoBlindDatepay=='guanzhu'){
						_this.$router.replace({
						  name: "activityDetailStatic",
						  query: {id:_this.$store.state.otherLogin.params.query.id}
						});
					}
					_this.$store.commit("CHANGESTORE",{name:"gotoBlindDatepay",value:false});//
				}else if(_this.$route.query.redirectUrl||(_this.$store.state.otherLogin.params.query&&_this.$store.state.otherLogin.params.query.redirectUrl)){
					let params=_this.Fn.toWxUrl("#/?state="+(_this.$route.query.redirectUrl||(_this.$store.state.otherLogin.params.query&&_this.$store.state.otherLogin.params.query.redirectUrl)),":");
					//alert(JSON.stringify(params));
					let url=params.name+".php";
					if(params.query){
						Object.keys(params.query).forEach(attr => {
							if(url.indexOf("?")!=-1){
								url+='&'+attr+"="+params.query[attr];
							}else{
								url+='?'+attr+"="+params.query[attr];
							}
						});
					}
					//alert(_this.$store.state.phpURL+"/mobile/"+url)
					window.location.href=_this.$store.state.phpURL+"/mobile/"+url;
				}else if (_this.$store.state.otherLogin.type == 'wxmp'&&_this.$store.state.otherLogin.params.name){
					if(_this.$store.state.otherLogin.params.name=='login'||_this.$store.state.notBack){
						_this.$router.replace({
						  path: '/home'
						})
					}else{
						_this.$router.replace({
						  name: _this.$store.state.otherLogin.params.name,
						  query: _this.$store.state.otherLogin.params.query
						});
					}
				}else if(_this.$store.state.redirect){
					_this.$router.replace(_this.$store.state.redirect);
				}else {
					_this.$router.replace({
					  path: '/home'
					})
				  }
			}else if(_this.$store.state.redirect){
					_this.$router.replace(_this.$store.state.redirect);
			} else {
			  _this.$router.replace({
				path: '/home'
			  })
			}
		},10)
      }
    }
  }
</script>
<style scoped lang="scss">
	@import '../../sass/base.scss';
	.new_login{
		padding-top:0.75rem;height:100%;overflow-x:auto;overflow-y:auto;background-color:#fff;@include box-sizing;
	}
	.jy_isBrowser{
		.new_login{
			padding-top:0;
		}
	}
	.new_login_join_text{
		color:#999;margin-top:0.6rem;font-size:0.36rem;text-align:center;@extend %oneLine;vertical-align:top;
		i{
			color:#ff3552;
		}
		span{
			display:inline-block;padding:0.1rem 0.4rem;border-radius:2rem;border:1px solid #ff3552;
		}
	}
	.new_login_photo{
		text-align:center;
		i{
			display:inline-block;height:2.4rem;width:2.4rem;font-size:1rem;line-height:2.4rem;color:#fff;text-align:center;margin:0.9rem 0 0.4rem;border-radius:50%;background-color:#D3D3D3;@extend %iconfont;
		}
		p{
			font-size:0.36rem;color:#999;
			em{
				color:#ff3552;margin-left:0.1rem;
			}
		}
	}
	.new_login_ul{
		width:8rem;margin:0.6rem auto 0;overflow:hidden;
		li{
			position:relative;overflow:hidden;font-size:0.4rem;color:#c3c7cf;padding:0.3rem 0;border-bottom:1px solid #eee;
			span{
				
			}
			.new_login_ul_con{
				width:50%;text-align:right;float:right;
			}
		}
	}
</style>
