<template>
  <div class="main jy_all_top">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back><a v-if="!$store.state.isBrowser" class="right" @click="clickShare"><i class="iconfont">&#xe679;</i></a>
        <p>招商</p>
      </div>
    </div>
    <div class="image_div" :style="$store.state.isBrowser?'margin-top: 1.42rem;':''">
      <img src="static/activityDetailStatic/zs/zs_01.jpg" alt="">
      <img src="static/activityDetailStatic/zs/zs_02.jpg" alt="">
      <img src="static/activityDetailStatic/zs/zs_03.jpg" alt="">
      <img src="static/activityDetailStatic/zs/zs_04.jpg" alt="">
      <img src="static/activityDetailStatic/zs/zs_05.jpg" alt="">
      <img src="static/activityDetailStatic/zs/zs_06.jpg" alt="">
      <img src="static/activityDetailStatic/zs/zs_07.jpg" alt="">
      <img src="static/activityDetailStatic/zs/zs_08.jpg" alt="">
      <img src="static/activityDetailStatic/zs/zs_09.jpg" alt="">
      <img src="static/activityDetailStatic/zs/zs_10.jpg" alt="">
      <div class="form">
        <div class="form-panel">
          <label for="user">姓名</label>
          <input type="text" id=user name="user" value="" placeholder="请输入您的名字" v-model="username"/>
        </div>
        <div class="form-panel">
          <label>出生日期</label>
          <div class="input_birthday" @click="birthdayClick">{{birthday? birthday: '请选择您的出生日期'}}</div>
          <group style="display: none">
            <datetime v-model="birthday" :start-date="startDate" :end-date="endDate" confirm-text="确定" cancel-text="取消" :show.sync="visibility" :default-selected-value="endDate"></datetime>
          </group>
        </div>
        <div class="form-panel">
          <label>性别</label>
          <div class="radio_panel">
            <input type="radio" id="female" name="female" value="1" v-model="sex"/><label for="female" class="sex_class">女</label>
            <input type="radio" id="male" name="male" value="2" v-model="sex"/><label for="male" class="sex_class">男</label>
          </div>
        </div>
        <div class="form-panel">
          <label for="phone">手机号码</label>
          <input type="text" id="phone" name="phone" value="" placeholder="请输入您的手机号码" v-model="phone"/><br />
        </div>
        <div class="form-panel">
          <label for="remark">留言</label>
          <textarea name="remark" id="remark" cols="30" rows="6" placeholder="请输入您的留言" v-model="remark"></textarea>
        </div>
        <div class="pink_btn" @click="zsCcommit">提交</div>
      </div>
      <!--<img src="static/activityDetailStatic/zs/zs_11.jpg" alt="">-->
      <img src="static/activityDetailStatic/zs/zs_12.jpg" alt="">
      <img src="static/activityDetailStatic/zs/zs_13.jpg" alt="">
      <img src="static/activityDetailStatic/zs/zs_14.jpg" alt="">
    </div>
	<share :show="showShare" :shareTitle="shareTitle" :shareDesc="shareDesc" :shareImg="shareImg" :shareUrl="shareUrl" @changeShow="changeShow"></share>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import {Group, Datetime} from 'vux'
import { wxShare } from '@js/wxjssdk'
import Share from '@/components/home/share.vue'
  export default {
    name: "investment",//静态详情页面
    components: {
      Loading,
      Back,
      Group,
      Datetime,
	  Share,
    },
    data() {
      return {
        isloading: false,
        username: null,
        visibility: false,
        birthday: '',
        sex: 1,
        phone: null,
        remark: null,
		showShare: false,
		shareTitle:'',
		shareDesc:'',
		shareImg:'',
		shareUrl:'',
      }
    },
    watch: {
		handleRoute(newV) {//返回键触发
			const t=this;
			if (!newV) {
				if(t.showShare){
					t.showShare=false;
				}
			}
		},
		showShare(val){
			const t=this;
			let status = val;
			t.$store.commit("CHANGEHANDLEROUTE", status);
		},
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
	  handleRoute() {//返回键
			return this.$store.state.handleRoute;
		},
    },
    mounted() {
		const t=this;
		let shareTitle="乾坤岛区域合伙人";
		let shareDesc="想赚大钱，过来成为乾坤岛区域合伙人。";	
		let shareLink =this.$store.state.baseURL+"/api/account/publicAddressLoginUrl?&state=investment"
		if(this.$store.state.userInfo.id){
		  shareLink = shareLink + "__pid_"+this.$store.state.userInfo.jyNumber+ "_taskId_39";
		}
		t.shareTitle=shareTitle;
		t.shareDesc=shareDesc;
		t.shareUrl=shareLink;
		  wxShare&&wxShare({
			  title: shareTitle, // 分享标题
			  desc: shareDesc, // 分享描述
			  link: shareLink, // 分享链接
			  imgUrl: this.$store.state.baseFrontEndURL+'static/logo.png', // 分享图标
			  debug:false
		  },{
			success(){
			//	alert("分享成功");
			},
			cancel(){
				//alert("分享失败");
			}
		  });
    },
    destroyed() {
    },
    methods: {
		clickShare() {
			this.showShare = !this.showShare;
		  },
		 changeShow(val) {
        this.showShare = val;
      },
      birthdayClick(){
        this.visibility=true
      },
      async zsCcommit(){
        if(!this.username){
          this.$vux.toast.show({
            type:"text",
            text: "请输入您的名字",
            position:"middle",
            width:"auto",
          });
          return;
        }
        if(!this.birthday){
          this.$vux.toast.show({
            type:"text",
            text: "请选择您的出生日期",
            position:"middle",
            width:"auto",
          });
          return;
        }
        if(!this.$utils.isPhoneNum(this.phone)){
          this.$vux.toast.show({
            type:"text",
            text: "请输入正确的手机号码",
            position:"middle",
            width:"auto",
          });
          return;
        }
        if(!this.remark){
          this.$vux.toast.show({
            type:"text",
            text: "请输入您的留言",
            position:"middle",
            width:"auto",
          });
          return;
        }
        let result= await this.$server.zsCcommit({
          type: 2,
          realName:this.username,
          birthday: this.birthday,
          sex:this.sex,
          phone: this.phone,
          desc: this.remark
        });
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type:"success",
          text: '提交成功',
          position:"middle",
          width:"auto",
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .image_div {
    font-size: 0;
    overflow: hidden;
    background-color: #FFF;
    img {
      width: 100%;
      display: block;
    }
    .form{
      margin:0px;
      width: 100%;
      .form-panel{
        margin: 0.2rem 0 0.4rem 0;
        label{
          &:first-child{
            float: left;
            width: 18%;
            line-height:25px;
            font-size: 0.48rem;
            color:#6a6a6a;
            font-weight: 500;
            text-align: center;
          }
          &.sex_class{
            display: inline-block;
            font-size: 0.4rem;
            color:#666666;
          }
        }
        input[type=text]{
          width: 69%;
          height: 0.8rem;
          line-height: 0.8rem;
          padding: 0.1rem 0.4rem;
          border: 1px solid #c9c9c9;
          background-color: #f2f2f2;
          color: #9c9c9c;
          font-size: 0.48rem;
          &:hover,&:focus{
            border: 1px solid #ff3876;
          }
        }
        .input_birthday{
          display: inline-block;
          width: 69%;
          height: 0.8rem;
          line-height: 0.8rem;
          padding: 0.1rem 0.4rem;
          border: 1px solid #c9c9c9;
          background-color: #f2f2f2;
          font-size: 0.48rem;
          color: #9c9c9c;
        }
        .radio_panel{
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;

          input[type=radio]{
            width: 20%;
            height: 0.6rem;
          }
        }
        textarea{
          width: 69%;
          border: 1px solid #c9c9c9;
          background-color: #f2f2f2;
          color: #9c9c9c;
          padding: 0.1rem 0.4rem;
          &:hover,&:focus{
            border: 1px solid #ff3876;
          }
        }
      }
      .pink_btn{
        width: 4rem;
        height: 1rem;
        line-height: 1rem;
        margin: 0.4rem auto 0;
        color: #ffffff;
        font-size: 0.4rem;
        text-align: center;
        border-radius: 0.8rem;
        background-color: #ff3876;
      }
    }
  }

</style>
