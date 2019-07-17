<template>
<div class="main jy_all_top jy_new_love jy_state_top">
	<div class="header">
		<div class="top">
			<a class="left" @click="close"><i class="iconfont">&#xe613;</i></a><a @click="makesure" class="right">确定</a><p>筛选</p>
		</div>
	</div>
	<div class="jy_setsort_list">
		<p class="jy_setsort_tit">性别</p>
		<div class="jy_setsort_ul">
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:sex==-1}" @click="sex=-1"><i>不限</i></div>
			<div class="jy_setsort_li jy_setsort_li_third onBorder" :class="{cur:sex==2}" @click="sex=2"><i>男</i></div>
			<div class="jy_setsort_li jy_setsort_li_third onBorder" :class="{cur:sex==1}" @click="sex=1"><i>女</i></div>
		</div>
		
		<p class="jy_setsort_tit">地区</p>
		<div class="jy_setsort_ul">
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:location==0}" @click="location=0"><i>不限</i></div>
			<div class="jy_setsort_li jy_setsort_li_two jy_setsort_li_jt" :class="{cur:location==1}" @click="showPlacePicker"><i>{{place===''?'请选择地区':place}}</i></div>
		</div>
    <group style="display: none">
      <popup-picker :data="areaData" :columns="3" v-model="selectArea" show-name ref="placePicker" :show.sync="shPlacePicker"></popup-picker>
    </group>
		<p class="jy_setsort_tit">时间</p>
		<div class="jy_setsort_ul">
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:datingTime==0}" @click="datingTime=0"><i>不限</i></div>
			<div class="jy_setsort_li jy_setsort_li_two jy_setsort_li_jt" :class="{cur:datingTime==1}" @click="shStartDate=true;datingTime=1"><i>{{startDate===''?'请选择时间':startDate+'~'+endDate}}</i></div>
		</div>
    <group style="display: none">
      <datetime v-model="startDate" :show.sync="shStartDate"></datetime>
    </group>
    <group style="display: none">
      <datetime v-model="endDate" :show.sync="shEndDate"></datetime>
    </group>
		<p class="jy_setsort_tit">认证</p>
		<div class="jy_setsort_ul">
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:withoutAuth}" @click="auth"><i>不限</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:authentication.idcard == 1}" @click="authentication.idcard = 1"><i>&#xe69c;</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:authentication.house == 1}" @click="authentication.house = 1"><i>&#xe6a2;</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:authentication.video == 1}" @click="authentication.video = 1"><i>&#xe77e;</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:authentication.car == 1}" @click="authentication.car = 1"><i>&#xe699;</i></div>
			
		</div>
		<p class="jy_setsort_tit">学历</p>
		<div class="jy_setsort_ul">
      <div v-for="item in result" class="jy_setsort_li jy_setsort_li_third" :class="{cur:education==item.value}" @click="education=item.value"><i>{{item.label}}</i></div>
		</div>
		<p class="jy_setsort_tit">身高要求</p>
		<div class="jy_setsort_ul">
			<div class="jy_setsort_li jy_setsort_li_five" :class="{cur:minHeight==-1}" @click="minHeight=-1"><i>不限</i></div>
			<div class="jy_setsort_li jy_setsort_li_five" :class="{cur:minHeight==150}" @click="minHeight=150"><i>≥150</i></div>
			<div class="jy_setsort_li jy_setsort_li_five" :class="{cur:minHeight==155}" @click="minHeight=155"><i>≥155</i></div>
			<div class="jy_setsort_li jy_setsort_li_five" :class="{cur:minHeight==160}" @click="minHeight=160"><i>≥160</i></div>
			<div class="jy_setsort_li jy_setsort_li_five" :class="{cur:minHeight==165}" @click="minHeight=165"><i>≥165</i></div>
			<div class="jy_setsort_li jy_setsort_li_five" :class="{cur:minHeight==170}" @click="minHeight=170"><i>≥170</i></div>
			<div class="jy_setsort_li jy_setsort_li_five" :class="{cur:minHeight==175}" @click="minHeight=175"><i>≥175</i></div>
			<div class="jy_setsort_li jy_setsort_li_five" :class="{cur:minHeight==180}" @click="minHeight=180"><i>≥180</i></div>
			<div class="jy_setsort_li jy_setsort_li_five" :class="{cur:minHeight==185}" @click="minHeight=185"><i>≥185</i></div>
			<div class="jy_setsort_li jy_setsort_li_five" :class="{cur:minHeight==190}" @click="minHeight=190"><i>≥190</i></div>
		</div>
		<p class="jy_setsort_tit">年龄要求</p>
		<div class="jy_setsort_ul">
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:minAge==-1&&maxAge==-1}" @click="minAge=-1;maxAge=-1"><i>不限</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:minAge==18&&maxAge==23}" @click="minAge=18;maxAge=23"><i>18-23</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:minAge==24&&maxAge==29}" @click="minAge=24;maxAge=29"><i>24-29</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:minAge==30&&maxAge==35}" @click="minAge=30;maxAge=35"><i>30-35</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:minAge==36&&maxAge==40}" @click="minAge=36;maxAge=40"><i>36-40</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:minAge==41&&maxAge==-1}" @click="minAge=41;maxAge=-1"><i>41以上</i></div>
		</div>
	</div>
</div>
</template>
<script>
import {PopupPicker,Group,Datetime} from 'vux'
export default {
	name: 'setSort',
	data () {
		return {
      datingTime: 0,//1选择0不限
      shStartDate:false,
      shEndDate:false,
      startDate: '',
      endDate: '',
      shPlacePicker:false,
      areaData: [],
      selectArea: [],
      location: 0,//1选择0不限
      place: '',
      sex:-1,
      areaId:null,
      beginActivityStarttime:null,
      endActivityStarttime:null,
      authentication: {//认证信息0不需要1需要
        idcard: 0,
        car: 0,
        house: 0,
        video: 0,
      },
      education:-1,
      minHeight:-1,//-1表示无要求
      minAge:-1,//
      maxAge:-1,//
      result:[],//学历枚举
		}
	},
  components: {
    PopupPicker,
    Group,
    Datetime,
  },
  computed: {
    withoutAuth() {
      return this.authentication.idcard == 0 && this.authentication.car == 0 && this.authentication.house == 0 && this.authentication.video == 0
    },
    handleRoute(){
      return this.$store.state.handleRoute;
    },
  },
	watch:{
    startDate(newv){
      if(newv){
        this.shEndDate=true;
      }
    },
    endDate(newv){
      if(newv){
        let start = new Date(this.startDate.replace("-", "/").replace("-", "/"));
        let end = new Date(newv.replace("-", "/").replace("-", "/"));
        if (end < start) {
          this.$vux.toast.show({
            type: "text",
            text: "开始日期不能大于结束日期",
            position: "bottom",
            width: "2rem",
          })
        }
      }
    },
    selectArea(newv){
      console.log(newv)
      if(this.$refs.placePicker){
        this.place = this.$refs.placePicker.getNameValues();
      }
      this.areaId = newv[2]||null;
    },
	},
	async mounted () {
    let result = await this.$server. enum({
      type:'ExpEducationEnum'
    })
		this.result = result.data.data
    let listData = await this.$server.getDistrict();
    this.areaData = listData.data.data;
	},
	destroyed () {
		
	},
	methods:{
    showPlacePicker(){
      this.location=1;
      this.shPlacePicker=!this.shPlacePicker;
    },
    auth() {
      this.authentication.idcard = 0;
      this.authentication.car = 0;
      this.authentication.house = 0;
      this.authentication.video = 0;
    },
    close(){
      this.$emit('close',false)
    },
    async makesure() {
      let obj={}
      if(this.location==0?null:this.areaId){
        obj=await this.$store.dispatch('getCoordsFromName',(this.place.split(" "))[1],(this.place.split(" "))[2])
      }
      let result={
        lat:obj.lat?obj.lat:null,
        lon:obj.lon?obj.lon:null,
        sex:this.sex,
        areaId:this.location==0?null:this.areaId,
        beginActivityStarttime:this.datingTime==0?null:this.startDate,
        endActivityStarttime:this.datingTime==0?null:this.endDate,
        authentication:this.authentication,
        education:this.education,
        minHeight:this.minHeight,
        minAge:this.minAge,
        maxAge:this.maxAge,
      }
      this.$emit('makesure', result)
    },
	}
}
</script>
<style lang="scss" scoped>
  .main{
    position: absolute;
    top:0;
    z-index: 410;
  }
</style>
