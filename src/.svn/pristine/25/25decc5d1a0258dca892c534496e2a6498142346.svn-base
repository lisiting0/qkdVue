<template>
  <div class="login">
    <selectPhoto :cutting="true" @fileBack="fileBack">
      <div class="registered_logo" :style="'background-image:url('+userIcon+');'">
        <i v-if="!userIcon" class="iconfont">&#xe663;</i>
      </div>
    </selectPhoto>
    <p style="text-align: center;color:#d2d5db;font-size: 0.36rem;margin: 0.2rem 0 0.9rem;">上传真实头像，成功率更高哦</p>
    <div class="div_input">
      <input class="userName" v-model="aliasName" type="text" placeholder="写个昵称吧，比如 令狐冲">
    </div>
    <div class="div_input">
      <span class="userName" @click="visibility=true" :class="{grey:!birthday}">{{birthday?birthday:'请选择您的生日'}}</span><i class="birthday_i iconfont">&#xe702;</i>
      <group style="display: none">
        <datetime v-model="birthday" :start-date="startDate" :end-date="endDate" confirm-text="确定" cancel-text="取消" :show.sync="visibility" :default-selected-value="endDate"></datetime>
      </group>
    </div>

	<div class="div_input">
		<div class="male-cls">
		  <em>性别</em><div class="jy_login_sex"><input type="radio" id="male" name="sex" v-model="sex" value="2"/>
		  <label for="male">男</label>
		  <input type="radio" id="female" name="sex" v-model="sex" value="1"/>
		  <label for="female">女</label></div>
		</div>
	  </div>
   <!-- <div class="div_input">
      <span class="userName" @click="shEducation=true" :class="{grey:!educationText}">{{educationText?educationText:'请选择您的学历'}}</span>
      <i class="birthday_i iconfont">&#xe702;</i>
      <group style="display: none">
        <popup-picker title="学历" :data="educationList" v-model="educationArr" ref="educationPicker" :show.sync="shEducation"></popup-picker>
      </group>
    </div>
    <div class="div_input">
      <span class="userName" @click="shHeight=true" :class="{grey:!heightText}">{{heightText?heightText:'请选择您的身高'}}</span>
      <i class="birthday_i iconfont">&#xe702;</i>
      <group style="display: none">
        <popup-picker title="身高" :data="heightList" v-model="heightArr" ref="heightPicker" :show.sync="shHeight"></popup-picker>
      </group>
    </div>
-->
    <div @click="updateProfile" :class="{'btn_logined':showOpacity}" class="btn_login">保存</div>
	<!--<p class="jy_login_nb"><a @click.stop="showWin=true">跳过</a></p>-->
	<div class="choose_sex_bg" v-if="showWin">
		<div class="choose_sex_c">
			<p class="choose_sex_tit">请选择你的性别</p>
			<i class="choose_sex_close" @click.stop="showWin=false">&#xe7de;</i>
			<ul class="choose_sex_btn">
				<li><a @click.stop="choose(2)"><i>&#xe605;</i><p>男</p></a></li>
				<li><a @click.stop="choose(1)"><i>&#xe64a;</i><p>女</p></a></li>
			</ul>
		</div>
	</div>
  </div>
</template>
<script>
  import login_logo from '../../images/login_logo.png'
  import step2 from '../../images/step2.png'
  import {TransferDom, Actionsheet, Group, Datetime ,Popup, PopupPicker} from 'vux'
  import selectPhoto from '../plugs/selectPhoto'
	import routerBack from '@/plus/routerBack.js';
	routerBack.init("fillInUserInfo",{
		visibility:null,
		shEducation:null,
		shHeight:null,
	})
  
  export default {
    name: 'fillInUserInfo',
	mixins:[routerBack],
    components: {
      Actionsheet,
      Group,
      Datetime,
      selectPhoto,
      Popup,
      PopupPicker,
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        imgs: {login_logo: login_logo, step: step2},
        language: 'cn',
        show: false,
        menus: {
          cn: '简体中文',
          en: 'English'
        },
        userIcon: '',
        aliasName: '',
        sex: null,
        birthday: '',
        visibility: false,
        colorRed: {},
        password: '',
        phoneNumber: '',
        verificationCode: '',
        file: null,
        iconUrl:null,

        heightList: [[
          {name: '150cm', value: '150'},
          {name: '151cm', value: '151'},
          {name: '152cm', value: '152'},
          {name: '153cm', value: '153'},
          {name: '154cm', value: '154'},
          {name: '155cm', value: '155'},
          {name: '156cm', value: '156'},
          {name: '157cm', value: '157'},
          {name: '158cm', value: '158'},
          {name: '159cm', value: '159'},

          {name: '160cm', value: '160'},
          {name: '161cm', value: '161'},
          {name: '162cm', value: '162'},
          {name: '163cm', value: '163'},
          {name: '164cm', value: '164'},
          {name: '165cm', value: '165'},
          {name: '166cm', value: '166'},
          {name: '167cm', value: '167'},
          {name: '168cm', value: '168'},
          {name: '169cm', value: '169'},

          {name: '170cm', value: '170'},
          {name: '171cm', value: '171'},
          {name: '172cm', value: '172'},
          {name: '173cm', value: '173'},
          {name: '174cm', value: '174'},
          {name: '175cm', value: '175'},
          {name: '176cm', value: '176'},
          {name: '177cm', value: '177'},
          {name: '178cm', value: '178'},
          {name: '179cm', value: '179'},

          {name: '180cm', value: '180'},
          {name: '181cm', value: '181'},
          {name: '182cm', value: '182'},
          {name: '183cm', value: '183'},
          {name: '184cm', value: '184'},
          {name: '185cm', value: '185'},
          {name: '186cm', value: '186'},
          {name: '187cm', value: '187'},
          {name: '188cm', value: '188'},
          {name: '189cm', value: '189'},

          {name: '190cm', value: '190'},
          {name: '191cm', value: '191'},
          {name: '192cm', value: '192'},
          {name: '193cm', value: '193'},
          {name: '194cm', value: '194'},
          {name: '195cm', value: '195'},
          {name: '196cm', value: '196'},
          {name: '197cm', value: '197'},
          {name: '198cm', value: '198'},
          {name: '199cm', value: '199'},

          {name: '200cm', value: '200'},
          {name: '201cm', value: '201'},
          {name: '202cm', value: '202'},
          {name: '203cm', value: '203'},
          {name: '204cm', value: '204'},
          {name: '205cm', value: '205'},
          {name: '206cm', value: '206'},
          {name: '207cm', value: '207'},
          {name: '208cm', value: '208'},
          {name: '209cm', value: '209'},
          {name: '210cm', value: '210'},
        ]],
        heightArr: [],//选中的数组
        heightVal: null,//联动显示的值
        heightText: '',//获取值相应的文字
        shHeight: false,

        educationList: [[
          {name: '大专以下', value: '0'},
          {name: '大专', value: '10'},
          {name: '本科', value: '11'},
          {name: '硕士', value: '12'},
          {name: '博士', value: '13'},
          {name: '出国留学', value: '14'}
        ]],
        educationArr: [],//选中的数组
        educationVal: null,//联动显示的值
        educationText: '',//获取值相应的文字
        shEducation: false,
		showWin:false,
      }
    },
    computed:{
      endDate(){
        let nowYear = this.$utils.format(new Date(),'yyyy')
        return (nowYear-18)+'-'+this.$utils.format(new Date(),'MM-dd');
      },
      startDate(){
        let nowYear = this.$utils.format(new Date(),'yyyy')
        return (nowYear-70)+'-'+this.$utils.format(new Date(),'MM-dd');
      },
      showOpacity(){
        return !!((this.file||this.iconUrl)&&this.aliasName&&this.birthday&&this.sex&&this.heightVal&&this.educationVal);
      },
    },
    watch:{
      showOpacity(newV){
        if(newV){

        }else{

        }
      },
      heightArr() {
        if (this.$refs.heightPicker) {
          this.heightText = this.$refs.heightPicker.getNameValues();
          this.heightVal = this.heightArr[0];
        }
      },
      educationArr() {
        if (this.$refs.educationPicker) {
          this.educationText = this.$refs.educationPicker.getNameValues();
          this.educationVal = this.educationArr[0];
        }
      },
    },
    methods: {
		choose(flag){
			const t=this;
			t.sex=flag;
			t.$vux.confirm.show({
			  title: '温馨提示',
			  theme: 'android',
			  content: '你选择"'+(flag==1?'女':'男')+'",性别选择后无法修改!',
			  confirmText: '确定',
				cancelText:'再想一想',
			  onCancel () {
				
			  },
			  onConfirm () {
				t.subData(true);
			  }
			})
		},
      updateProfile () {
        if (!this.file&&!this.iconUrl) {
          this.$vux.toast.show({
            type: 'cancel',
            text: '请选择头像',
            position: 'middle',
            width: 'auto',
          })
          return
        } else if (this.aliasName == '') {
          this.$vux.toast.show({
            type: 'cancel',
            text: '请填写昵称',
            position: 'middle',
            width: 'auto',
          })
          return
        } else if (this.birthday == '') {
          this.$vux.toast.show({
            type: 'cancel',
            text: '请选择生日',
            position: 'middle',
            width: 'auto',
          })
          return
        } else if (this.sex == null) {
          this.$vux.toast.show({
            type: 'cancel',
            text: '请选择性别',
            position: 'middle',
            width: 'auto',
          })
          return
        }/*else if (this.educationVal == null) {
          this.$vux.toast.show({
            type: 'cancel',
            text: '请选择学历',
            position: 'middle',
            width: 'auto',
          })
          return
        }else if (this. heightVal == null) {
          this.$vux.toast.show({
            type: 'cancel',
            text: '请选择身高',
            position: 'middle',
            width: 'auto',
          })
          return
        }*/
        const _this = this
        this.$vux.confirm.show({
          content: '性别和生日保存后无法修改，确认保存吗？',
          cancelText:'再想一想',
          onCancel () {
          },
          async onConfirm () {
            _this.subData();
          }
        })
      },
	  async subData(flag){	
		const _this=this;
		
            let data={};
			if(flag){
				data = {
				  sex: _this.sex,
				}
			}else{
				let headimgAttachmentId=_this.iconUrl;
				if(_this.file){
				  let param = new FormData() //创建form对象
				  param.append('file', _this.file, _this.file.name) //单个图片 ，多个用循环 append 添加
				  param.append('dataSources','fillInUserInfo');
				  let result = await _this.$server.uploadPic(param)
				  headimgAttachmentId = result.data.data.path
				}
				data = {
				  aliasName: _this.aliasName,
				  birthday: _this.birthday,
				  sex: _this.sex,
				  // headimgAttachmentId: result.data.data.id
				  headimgAttachmentId: headimgAttachmentId,
				  //height: _this.heightVal,
				  //education: _this.educationVal,
				}
			}
            _this.$vux.loading.show()
            let submitResult = await _this.$server.update_register(data);
            let userInfo = await _this.$server.getUserInfo({userId:_this.$store.state.userId});
            _this.$vux.loading.hide()
            _this.$store.commit("LOGIN",userInfo.data.data);
			
			if(_this.$store.state.otherLogin&&_this.$store.state.otherLogin.unionkey){
				_this.$router.replace({name:'activityDetail',query: _this.$store.state.otherLogin.params.query});
				_this.$store.commit("CHANGEOTHERLOGIN",{});//清空第三方临时登录信息
			}else if(_this.$store.state.redirect){
				_this.$router.replace(_this.$store.state.redirect);
			}else{
				_this.$router.replace({
				  path: '/home'
				})
			}
	  },
      async fileBack (obj) {
        const t = this
        if(obj.serverId){
          // t.userIcon = obj.serverId;
          let result = await t.$server.wxMpMedia({
            mediaId:obj.serverId[0],
			dataSources:'fillInUserInfo'
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
    },
  }
</script>
<style scoped lang="scss">
  @import '../../sass/base.scss';
  .shade{
    display: block !important;
    width: 2.68rem;
    height: 2.68rem;
    margin: 2.22rem auto 0;
  }
  .registered_logo {
    overflow: hidden;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-color: rgba(255, 255, 255, 0.15);
    i {
      display: block;
      font-size: 1.5rem;
      width: 2.66rem;
      height: 2.66rem;
      line-height: 2.66rem;
      text-align: center;
      color: #FFF;
      background-color: #d3d3d3;
    }
  }
.login .div_input input {
    padding-left: 0;
}
  .div_input {
    .grey{
      color: #c6cad1 !important;
    }
    .new_login_qkId{
		color:#666!important;
		em{
			position:absolute;left:0;top:0.58rem;
		}
		input{
			width:100%; text-align:right;padding-left:2.6rem;@include box-sizing;
		}
		p{
			text-align:right;padding-left:2.6rem;@include box-sizing;
		}
	}
    .male-cls {
      padding: 0.58rem 0;font-size:0.4rem;color:#c3c7cf;
      border-bottom: 1px solid #eee;
	  display:flex;
	  justify-content:space-between;
      label {
        color: #c3c7cf;
        font-size: 0.44rem;
        margin-left: 1.2rem;
      }
      label::before {
        content: "\a0"; /*不换行空格*/
        display: inline-block;
        vertical-align: middle;
        font-size: 0.5rem;
        width: 0.6em;
        height: 0.6em;
        margin-right: .4em;
        border-radius: 50%;
        border: 1px solid rgba(210,213,219, 0.5);
        line-height: 1;
        padding: .2em;
        background-clip: content-box;
      }
      input[type="radio"] {
        position: absolute;
        clip: rect(0, 0, 0, 0);
      }
      input[type="radio"]:checked + label::before {
        background-color: #000;
        background-clip: content-box;
      }
    }
    position: relative;
    input::-webkit-input-placeholder {
      color: #c6cad1;
    }
    input::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #c6cad1;
    }
    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #c6cad1;
    }
    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #c6cad1;
    }
    .birthday_i{
      position: absolute;
      right: 0;
      top:50%;margin-top:-0.38rem;
      color:#d2d5db;
    }
  }

  .other_login {
    .btn_toLogin {
      color: #FFF;
    }
    span {
      color: #00e6b4;
    }
  }

</style>
